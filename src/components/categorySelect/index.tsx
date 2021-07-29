import React from 'react';
import { ScrollView } from 'react-native';
import {style} from './styles';
import {categories} from '../../utils/categories';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { Category } from '../category';

type Props = {
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

export function CategorySelect({categorySelected, setCategory, hasCheckBox = false}: Props) {
    return (
        <ScrollView 
            style={style.container} 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                categories.map(category => (
                <Category 
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => setCategory(category.id)}
                    hasCheckBox={hasCheckBox}
                />))
            }
        </ScrollView>
    )
}