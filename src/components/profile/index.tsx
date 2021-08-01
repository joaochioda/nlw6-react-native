import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { Avatar } from '../avatar';
import {style} from './styles';
import {RectButton} from 'react-native-gesture-handler';

export function Profile() {
    const {user, signOut} = useAuth();

    function handleSignOut() {
        Alert.alert('Logout', 'Deseja s air do Gameplay?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => signOut()
            }
        ])
    }

    return (
        <View style={style.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar}/>
            </RectButton>
            <View>
                <View style={style.user}>
                    <Text style={style.greeting}>
                        Olá,
                    </Text>
                    <Text style={style.username}>
                        {user.firstName}
                    </Text>
                </View>
                <Text style={style.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
        )
}