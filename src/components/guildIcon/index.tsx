import React from 'react';
import {style} from './styles';
import { Image, View, Text } from 'react-native';
import DiscordSvg from '../../assets/discord.svg';

const {CDN_IMAGE} = process.env;

type Props = {
    guildId: string;
    iconId: string | null;
}

export function GuildIcon({guildId, iconId}: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    return (
        <View style={style.container}>
        {
            iconId ?
            <Image source={{uri }} style={style.image} resizeMode="cover"/>
            : 
            <DiscordSvg width={40} height={40} />
        }
        </View>
    )
}