import React from 'react';
import {style} from './styles';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../../global/styles/theme';

export function Loading() {
   
    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={theme.colors.primary}/>
        </View>
    )
}