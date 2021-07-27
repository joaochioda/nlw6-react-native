import React from 'react';
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {style} from './styles';

import DiscordImg from '../../assets/discord.png';

type Props = TouchableOpacityProps & {
 title: string;
}

export function ButtonIcon({title, ...rest}: Props) {
    return (
        <TouchableOpacity style={style.container} {...rest}>
            <View style={style.iconWrapper}> 
                <Image source={DiscordImg} style={style.icon}/>
            </View>
            <Text style={style.title}>
                {title}
            </Text>
        </TouchableOpacity>
        )
}