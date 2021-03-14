import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View } from "react-native";
import MapView, { Geojson } from 'react-native-maps';

import { Feather } from '@expo/vector-icons'

import mapMarker from '../images/map-marker.png';

import { styles } from "../styles/OrfanatosMap.module";
import { RectButton } from "react-native-gesture-handler";

import apiSetoresAtendimento from "../services/geojson/apiSetoresAtendimento";


export default function SetoresAtendimentoMap() {    
  
  const [setoresAtendimento, setSetoresAtendimento] = useState([])
  const [posicaoInicial, setPosicaoInicial] = useState({latitude: 0, longitude: 0})

  useFocusEffect(() => {  
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosicaoInicial({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })          
      },    
    );

    apiSetoresAtendimento.get('').then(response => {      
      setSetoresAtendimento(response.data);
    })

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

  return (
    <View style={styles.container}> 
    <MapView
      initialRegion={{
        latitude: posicaoInicial.latitude,
        longitude: posicaoInicial.longitude,
        latitudeDelta: 0.010,
        longitudeDelta: 0.010,
      }}
      style={styles.map}
    >
      <Geojson geojson={setoresAtendimento} />
    </MapView>
      {/* <Geojson 
        geojson={setSetoresAtendimento}        
      ></Geojson>        */}
      {/* <WMSTile
        urlTemplate='https://atlas.caesb.df.gov.br/server/services/DISTRITO_FEDERAL/ORTOFOTO_2015/MapServer/WMSServer'
        tileSize={256}
        opacity={0.5}
        style={styles.map}
      ></WMSTile>           */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>6 Orfanatos encontrados</Text>

        <RectButton style={styles.criarOrfanatoBotao} onPress={() => {}}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}
