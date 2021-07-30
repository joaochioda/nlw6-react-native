import React, { createContext, useContext, useState, ReactNode} from 'react';

import * as AuthSession from 'expo-auth-session';
import {SCOPE, CDN_IMAGE, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE} from '../config';
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
        access_token: string;
    }
}

type AuthContextData = {
    user: User;
    signIn:  () => Promise<void>;
    loading: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider ({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    async function signIn() {
        try {
            setLoading(true);
            
            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            
            const {type, params} = await AuthSession.startAsync({authUrl }) as AuthorizarionResponse;

            if (type === 'success') {
                api.defaults.headers.authorization = `Bearer ${params.access_token}`
                const userInfo = await api.get('/users/@me');
                const firstName = userInfo.data.username.split(' ')[0];
                userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`
                setUser({
                    ...userInfo.data,
                    firstName,
                    token: params.access_token
                });
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch {
            throw new Error('Failed to start auth session');
        }
    }

    return (
        <AuthContext.Provider value={{user, signIn, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth}