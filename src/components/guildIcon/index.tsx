import React from 'react';
import {style} from './styles';
import { Image, View, Text } from 'react-native';

export function GuildIcon() {
    const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLT2RE_6kVCWK1XXhBXaubMdpwE5jJh-j6gdG_l6MY9_zLwRu4LYwkEK7Xpim7VaeV7A&usqp=CAU'
   
    return (
        <Image source={{uri }} style={style.image} resizeMode="cover"/>
    )
}