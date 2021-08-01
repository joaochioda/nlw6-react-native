import React, {useState, useEffect} from 'react';
import {style} from './styles';
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from '../../components/guild';
import { ListDivider } from '../../components/listDivider';
import { Loading } from '../../components/loading';
import { api } from '../../service/api';

type Props = {
    handleGuildsSelected: (guild: GuildProps) => void;
}

export function Guilds({handleGuildsSelected}: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');
        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    },[])

    return (
        <View style={style.container}>
            {
                loading ? <Loading /> :
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
            }
        </View>
    )
}