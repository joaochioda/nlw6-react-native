import React from 'react';
import {style} from './styles';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';

export function ButtonAdd({...rest}: RectButtonProps) {

    return (
        <RectButton style={style.container} {...rest}>
            <MaterialCommunityIcons name="plus" size={24} color={theme.colors.heading} />
        </RectButton>
        )
}