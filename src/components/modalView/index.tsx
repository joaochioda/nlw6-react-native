import React, {ReactNode} from 'react';
import {style} from './styles';
import { Modal, View, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { Background } from '../background';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}

export function ModalView({children,closeModal, ...rest}: Props)  {
   
    return (
        <Modal transparent animationType="slide" {...rest} statusBarTranslucent>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={style.overlay}>
                    <View style={style.container}>
                        <Background>
                            <View style={style.bar}/>
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}