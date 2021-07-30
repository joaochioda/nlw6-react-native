import React from 'react';
import {style} from './styles';
import { View } from 'react-native';

type Props = {
    isCentered? :boolean;
}

export function ListDivider({isCentered}:Props) {
   
    return (
        <View style={[style.container, isCentered ? {marginVertical: 12} : {marginTop: 2, marginBottom: 31}]}/>
    )
}