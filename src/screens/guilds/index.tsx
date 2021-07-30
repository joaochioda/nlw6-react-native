import React from 'react';
import {style} from './styles';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/guild';
import { ListDivider } from '../../components/listDivider';

type Props = {
    handleGuildsSelected: (guild: GuildProps) => void;
}

export function Guilds({handleGuildsSelected}: Props) {
   const guilds = [{
       id: '1',
       name: 'Lendarios',
       icon: 'null',
       owner: true
   },]

    return (
        <View style={style.container}>
            <FlatList 
                data={guilds} 
                keyExtractor={item => item.id}
                renderItem={({item}) => <Guild data={item} onPress={() =>handleGuildsSelected(item)} />}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                ListHeaderComponent={() => <ListDivider isCentered/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
                style={style.guilds}
            />
        </View>
    )
}