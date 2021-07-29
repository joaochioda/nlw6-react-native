import React from 'react';
import {style} from './styles';
import { View,Text } from 'react-native';
import { Avatar } from '../avatar';
import { theme } from '../../global/styles/theme';

export type MembersProps = {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
}

type Props = {
    data: MembersProps;
}

export function Members({data}: Props) {
    const {on, primary}  = theme.colors;
   const inOnline = data.status === 'online';
    return (
        <View style={style.container}>
            <Avatar urlImage={data.avatar_url}/>
            <View>
                <Text style={style.title}>
                    {data.username}
                </Text>
                <View  style={style.status}>
                    <View style={[style.bulletStatus, {
                        backgroundColor: inOnline ? on : primary
                    }]}/>
                    <Text style={style.nameStatus}>
                        {inOnline ? 'Disponível' : 'Ocupado'}
                    </Text>
                </View>
            </View>
        </View>
    )
}