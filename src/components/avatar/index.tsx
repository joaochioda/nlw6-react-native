import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import { theme } from '../../global/styles/theme';
import {style} from './styles';

type Props = { urlImage: string }

export function Avatar({urlImage}: Props) {
    const { secondary50, secondary70 } = theme.colors;

    return (
        <LinearGradient style={style.container} colors={[secondary50, secondary70]}>
            <Image source={{ uri: urlImage}} style={style.avatar}/> 
        </LinearGradient>
        )
}