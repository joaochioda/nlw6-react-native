import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import { ButtonAdd } from '../../components/buttonAdd';
import { CategorySelect } from '../../components/categorySelect';
import { Profile } from '../../components/profile';
import { ListHeader } from '../../components/listHeader';
import { Appointment } from '../../components/appointment';
import { ListDivider } from '../../components/listDivider';

import {style} from './styles';

export function Home () {
    const [category, setCategory] = useState('');

    const appoinments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendárrios',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'É hoque quee vamos chegar ao challenger sem perder uma partida'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Legends',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40',
            description: 'É hoque quee vamos chegar ao challenger sem perder uma partida'
        }
    ] 

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return ( 
    <View>
        <View style={style.header}>
            <Profile />
            <ButtonAdd />
        </View>

        <View>
            <CategorySelect categorySelected={category} setCategory={handleCategorySelect} />
        </View>

        <View style={style.content}>
            <ListHeader title="Partidas agendadas" subtitle="Total 6" />
        </View>

        <FlatList 
            data={appoinments} 
            keyExtractor={item => item.id} 
            renderItem={({ item }) => (
                <Appointment data={item}/>
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={style.matches}
            showsVerticalScrollIndicator={false}
        />
    </View>
    );
}