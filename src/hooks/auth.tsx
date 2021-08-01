import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

const { SCOPE } = process.env;
const { CDN_IMAGE } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE} = process.env;


import {COLLECTION_USERS} from '../config/database';
import { api } from '../service/api';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthorizarionResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token?: string;
        error?: string;
    }
}

type AuthContextData = {
    user: User;
    signIn:  () => Promise<void>;
    signOut:  () => Promise<void>;
    loading: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider ({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(COLLECTION_USERS);
    }

    async function signIn() {
        try {
            setLoading(true);
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            
            const {type, params} = await AuthSession.startAsync({authUrl }) as AuthorizarionResponse;

            if (type === 'success' && !params.error) {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`
                const userInfo = await api.get('/users/@me');
                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

                const userData = {
                    ...userInfo.data,
                    firstName,
                    token: params.access_token}

                await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
                setUser(userData);
            } 
        } catch {
            throw new Error('Failed to start auth session');
        } finally {
            setLoading(false);
        }
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS);
        if (storage) {
            const userLogged = JSON.parse(storage) as User;
            api.defaults.headers.authorization = `Bearer ${userLogged.token}`
            setUser(userLogged);
        }
    }

    useEffect(() => {
        loadUserStorageData();
    },[])

    return (
        <AuthContext.Provider value={{user, signIn, loading, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}