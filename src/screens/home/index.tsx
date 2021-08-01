import React, {useState, useCallback} from 'react';
import { View, FlatList } from 'react-native';
import { ButtonAdd } from '../../components/buttonAdd';
import { CategorySelect } from '../../components/categorySelect';
import { Profile } from '../../components/profile';
import { ListHeader } from '../../components/listHeader';
import { Appointment, AppointmentProps } from '../../components/appointment';
import { ListDivider } from '../../components/listDivider';
import { Background } from '../../components/background';

import {style} from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENT } from '../../config/database';
import { Loading } from '../../components/loading';

export function Home () {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const [appoinments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', {guildSelected})
    }
    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }


    async function loadAppontiments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage.filter(item => item.category));
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppontiments();
    },[category]))

    return ( 
    <Background>
        <View style={style.header}>
            <Profile />
            <ButtonAdd onPress={handleAppointmentCreate}/>
        </View>

        <View>
            <CategorySelect categorySelected={category} setCategory={handleCategorySelect} />
        </View>

        {
            loading ? <Loading /> :
            <>
            <View style={style.content}>
            <ListHeader title="Partidas agendadas" subtitle={`Total ${appoinments.length}`} />
            </View>
            <FlatList 
            data={appoinments} 
            keyExtractor={item => item.id} 
            renderItem={({ item }) => (
                <Appointment data={item} onPress={() => handleAppointmentDetails(item)}/>
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                style={style.matches}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 69}}
                />
                </>
        }
    </Background>
    );
}