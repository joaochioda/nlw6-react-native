import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import {style} from './styles';
import IllustrationImg from '../../assets/illustration.png';
import {ButtonIcon} from '../../components/buttonIcon';
// import { useNavigation } from '@react-navigation/native';
import { Background } from '../../components/background';
import {useAuth} from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function Signin() {
  const { signIn, loading} = useAuth();
  // const navigation = useNavigation();

  async function handleSignIn() {
    try {
      await signIn();
    }
    catch (e) {
      Alert.alert(e)
    }
    // navigation.navigate('Home');
  }
  return (
    <Background>
      <View style={style.container}>
        <Image source={IllustrationImg} style={style.image} resizeMode="stretch"/>
        <View style={style.content}>
          <Text style={style.title}>
            Conecte-se{'\n'}
            e organize suas{'\n'}
            jogatinas
          </Text>
          <Text style={style.subtitle}>
            Crie grupos para jogar seus games{'\n'}
          favoritos com seus amigos
          </Text>
          {
            loading ? <ActivityIndicator color={theme.colors.primary}/> : 
            <ButtonIcon title={'Entrar com Discord'}  onPress={handleSignIn}/>
            }
        </View>
      </View>
    </Background>
    );
  }
