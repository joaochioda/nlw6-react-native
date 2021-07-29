import React from 'react';
import {style} from './styles';
import { TextInput, TextInputProps } from 'react-native';

export function SmallInput({...rest}: TextInputProps) {
    return (
        <TextInput style={style.container} {...rest} keyboardType="numeric"/>
    )
}