import React, { useState, useEffect } from 'react';
import {style} from './styles';
import { View, ImageBackground, Text, FlatList, Alert, Share, Platform } from 'react-native';
import { Background } from '../../components/background';
import { ListHeader } from '../../components/listHeader';

import { Header } from '../../components/header';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Fontisto} from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'
import { Members, MembersProps } from '../../components/members';
import { ListDivider } from '../../components/listDivider';
import { ButtonIcon } from '../../components/buttonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/appointment';
import { api } from '../../service/api';
import { Loading } from '../../components/loading';
import * as Linking from 'expo-linking';

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MembersProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const [widget,setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading,setLoading] = useState(true);
    const route = useRoute();
    const { guildSelected } = route.params as Params;

    useEffect(() => {
        fetchGuildInfo();
    },[])

    function handleShareInvitation () {
        const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;
        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    async function fetchGuildInfo() {
        try{
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        }catch{
            Alert.alert("Verifique as configurações do servidor")
        } finally {
            setLoading(false);
        }
    }
   
    return (
        <Background>
            <Header 
             title="Detalhes"
             action={
                 guildSelected.guild.owner &&
                 <BorderlessButton onPress={handleShareInvitation}>
                     <Fontisto name="share" size={24} color={theme.colors.primary} />
                 </BorderlessButton>
             }
            />
            <ImageBackground source={BannerImg} style={style.banner}>
                <View style={style.bannerContent}>
                    <Text style={style.title}>
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={style.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? <Loading /> :
            <>
            <ListHeader title="Jogadores" subtitle={`Total de ${widget.members.length}`}/>

            <FlatList 
            data={widget.members} 
            keyExtractor={item => item.id} 
            renderItem={({item}) => (
                <Members data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                style={style.members}
                />
                </>
            }
            {
                guildSelected.guild.owner &&
            <View style={style.footer}>
                <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild}/>
            </View>
            }
        </Background>
    )
}