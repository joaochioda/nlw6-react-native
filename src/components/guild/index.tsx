import React from 'react';
import {style} from './styles';
import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';
import { GuildIcon } from '../guildIcon';
import {Feather} from '@expo/vector-icons'
import { theme } from '../../global/styles/theme';

export type GuildProps = {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
}

type Props = TouchableOpacityProps & {
    data: GuildProps
}

export function Guild({data, ...rest}: Props) {
   
    return (
        <TouchableOpacity style={style.container} activeOpacity={0.7} {...rest}>
            <GuildIcon guildId={data.id} iconId={data.icon}/>
            <View style={style.content}>
                <View>
                    <Text style={style.title}>
                        {data.name}
                    </Text>

                    <Text style={style.type}>
                        {data.owner ? 'Administrador' : 'Convidado'}
                    </Text>
                </View>
            </View>
            <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={24}
            />
        </TouchableOpacity>
    )
}