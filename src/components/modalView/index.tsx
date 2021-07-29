import React, {ReactNode} from 'react';
import {style} from './styles';
import { Modal, View, ModalProps } from 'react-native';
import { Background } from '../background';

type Props = ModalProps & {
    children: ReactNode;
}

export function ModalView({children, ...rest}: Props)  {
   
    return (
        <Modal transparent animationType="slide" {...rest}>
            <View style={style.overlay}>
                <View style={style.container}>
                    <Background>
                        <View style={style.bar}/>
                        {children}
                    </Background>
                </View>
            </View>
        </Modal>
    )
}