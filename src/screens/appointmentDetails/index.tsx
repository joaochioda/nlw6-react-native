import React from 'react';
import {style} from './styles';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { Background } from '../../components/background';
import { ListHeader } from '../../components/listHeader';

import { Header } from '../../components/header';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Fontisto} from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'
import { Members } from '../../components/members';
import { ListDivider } from '../../components/listDivider';
import { ButtonIcon } from '../../components/buttonIcon';
export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Joao',
            avatar_url: 'https://github.com/joaochioda.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Joao',
            avatar_url: 'https://github.com/joaochioda.png',
            status: 'offline'
        },
    ]
   
    return (
        <Background>
            <Header 
             title="Detalhes"
             action={
                 <BorderlessButton>
                     <Fontisto name="share" size={24} color={theme.colors.primary} />
                 </BorderlessButton>
             }
            />
            <ImageBackground source={BannerImg} style={style.banner}>
                <View style={style.bannerContent}>
                    <Text style={style.title}>
                        Lendários
                    </Text>

                    <Text style={style.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View>
            </ImageBackground>
            <ListHeader title="Jogadores" subtitle="Total 2"/>

            <FlatList 
                data={members} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => (
                    <Members data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDivider/>}
                style={style.members}
            />
            <View style={style.footer}>
                <ButtonIcon title="Entrar na partida"/>
            </View>
        </Background>
    )
}