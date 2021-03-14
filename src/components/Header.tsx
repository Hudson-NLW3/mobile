import React from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/Header.module';

interface HeaderProps {
    title: string,
    showCancel?: boolean
}

export default function Header({ title, showCancel = true}: HeaderProps) {

    const navigation = useNavigation();

    function handleGoBackToMap() {
        navigation.navigate('OrfanatosMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton>
                <Feather name="arrow-left" size={24} color="#15b6d6" onPress={navigation.goBack} />
            </BorderlessButton>
            
            <Text style={styles.title}>{title}</Text>

            { showCancel ? (
                <BorderlessButton>
                    <Feather name="x" size={24} color="#ff669d" onPress={handleGoBackToMap} />
                </BorderlessButton>
            ) : (
                <View/>
            )}
        </View>
    )
}