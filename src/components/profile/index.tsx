import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '../avatar';
import {style} from './styles';

export function Profile() {
    return (
        <View style={style.container}>
            <Avatar urlImage="https://github.com/joaochioda.png"/>
            <View>
                <View style={style.user}>
                    <Text style={style.greeting}>
                        Olá,
                    </Text>
                    <Text style={style.username}>
                        João
                    </Text>
                </View>
                <Text style={style.message}>
                    Hoje é dia de vitória
                </Text>
            </View>
        </View>
        )
}