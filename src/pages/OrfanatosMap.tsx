import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png';

import { styles } from "../styles/OrfanatosMap.module";
import { RectButton } from "react-native-gesture-handler";

import api from "../services/api";

interface Orfanato {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
}

export default function OrfanatosMap() {  

  const navigation = useNavigation();
  const [posicaoInicial, setPosicaoInicial] = useState({latitude: 0, longitude: 0})
  const [orfanatos, setOrfanatos] = useState<Orfanato[]>([], );

  useFocusEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosicaoInicial({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })          
      },    
    );

    api.get('orfanatos').then(response => {
      setOrfanatos(response.data);
    });

  })  

  if (posicaoInicial.latitude === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Buscando sua localização ...
        </Text>
      </View>
    )        
  }

  function handleNavigationToOrfanato(id: string) {
    navigation.navigate('OrfanatoDetails', { id });
  }

  function handleNavigationToCreateOrfanato() {
    navigation.navigate('OrfanatoSelectPosition');
  }

  return (
    <View style={styles.container}>      
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: posicaoInicial.latitude,
          longitude: posicaoInicial.longitude,
          latitudeDelta: 0.010,
          longitudeDelta: 0.010,
        }}
        style={styles.map}
      >

        {orfanatos.map(orfanato => {
          return (
            <Marker
              key={orfanato.id}
              icon={mapMarker}
              coordinate={{
                latitude: orfanato.latitude,
                longitude: orfanato.longitude,
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
            >
              <Callout
                tooltip
                onPress={() => handleNavigationToOrfanato(orfanato.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orfanato.nome}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}          
      </MapView>      

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orfanatos.length} Orfanatos encontrados</Text>

        <RectButton style={styles.criarOrfanatoBotao} onPress={handleNavigationToCreateOrfanato}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}
