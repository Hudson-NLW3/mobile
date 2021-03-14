import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import MapView, { MapEvent, Marker } from "react-native-maps";

import { styles } from "../../styles/OrfanatoSelectPosition.module";

import mapMarkerImg from '../../images/map-marker.png';
import { RectButton } from "react-native-gesture-handler";

export default function OrfanatoSelectPosition() {
  
  const navigation = useNavigation();
  const [posicaoInicial, setPosicaoInicial] = useState({latitude: 0, longitude: 0})
  const [posicao, setPosicao] = useState({latitude: 0, longitude: 0})

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosicaoInicial({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })          
      },    
    );    

  }, [])
  
  if (posicaoInicial.latitude === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Buscando sua localização ...
        </Text>
      </View>
    )        
  }

  function handleNextStep() {
    navigation.navigate("OrfanatoData", {posicao});
  }

  function handleSelectMapPosition(event: MapEvent){    
    setPosicao(event.nativeEvent.coordinate)
  }

  return (    
    
    <View style={styles.container}>        
      <MapView
          initialRegion={{
            latitude: posicaoInicial.latitude,
            longitude: posicaoInicial.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
      >          
        <Marker
          icon={mapMarkerImg}
          coordinate={posicao}
        />          
      </MapView>        

      {posicao.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}
