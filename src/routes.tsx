import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrfanatosMap from './pages/OrfanatosMap';
import OrfanatoDetails from './pages/OrfanatoDetails';
import OrfanatoSelectPosition from './pages/OrfanatoCreate/OrfanatoSelectPosition';
import OrfanatoData from './pages/OrfanatoCreate/OrfanatoData';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator 
                screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'}}}
            >                

                <Screen 
                    name="OrfanatosMap" 
                    component={OrfanatosMap} 
                />
                                
                <Screen 
                    name="OrfanatoDetails" 
                    component={OrfanatoDetails} 
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/>
                    }}
                />
                
                <Screen 
                    name="OrfanatoSelectPosition" 
                    component={OrfanatoSelectPosition} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa"/>
                    }}
                />
                
                <Screen 
                    name="OrfanatoData" 
                    component={OrfanatoData} 
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}