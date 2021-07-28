import React from 'react';
import {style} from './styles';
import { View, Text } from 'react-native';

type Props = {
    title: string;
    subtitle: string;
}

export function ListHeader({title, subtitle}: Props) {
    return (
        <View style={style.container}>
            <Text style={style.title}>
                {title}
            </Text>
            <Text style={style.subtitle}>
                {subtitle}
            </Text>
        </View>
    )
}