import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Image, Linking, ScrollView, Text, View } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

import api from "../services/api";

import { Feather, FontAwesome } from '@expo/vector-icons';
import { styles } from "../styles/OrfanatoDetails.module";

import mapMarkerImg from '../images/map-marker.png';

interface OrfanatoDetailsRouteParams {
    id: number;
}

interface Orfanato {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    sobre: string;
    instrucoes: string;
    horario: string;
    final_de_semana: boolean;
    imagens: Array<Imagem>;
}

interface Imagem {
    url: string;
    id: string;
}

export default function OrfanatoDetails() {
    
    const route = useRoute();
    
    const params = route.params as OrfanatoDetailsRouteParams;
    
    const [orfanato, setOrfanato] = useState<Orfanato>();

    useEffect(() => {            
    
        api.get(`orfanatos/${params.id}`).then(response => {            
            setOrfanato(response.data);
        });


    }, [params.id])

    if (!orfanato) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Carregando ...
                </Text>
            </View>
        )        
    }

    function handleOpenGoogleMapRoutes() {
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${orfanato?.latitude},${orfanato?.longitude}`
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {orfanato.imagens.map(imagem => {
                        return (
                            <Image 
                                key={imagem.id} 
                                style={styles.image} 
                                source={{ uri: imagem.url }} 
                            />
                        )
                    })}                
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orfanato.nome}</Text>
                <Text style={styles.description}>{orfanato.sobre}</Text>
            
                <View style={styles.mapContainer}>
                    <MapView 
                        initialRegion={{
                        latitude: orfanato.latitude,
                        longitude: orfanato.longitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                        }} 
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker 
                        icon={mapMarkerImg}
                        coordinate={{ 
                            latitude: orfanato.latitude,
                            longitude: orfanato.longitude
                        }}
                        />
                    </MapView>

                    <View style={styles.routesContainer}>
                        <TouchableOpacity onPress={handleOpenGoogleMapRoutes}>
                            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{orfanato.instrucoes}</Text>

                <View style={styles.scheduleContainer}>

                    <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orfanato.horario}</Text>
                    </View>

                    {orfanato.final_de_semana ? (
                        <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                                Atendemos fim de semana                                
                            </Text>                             
                        </View>
                    ) : (
                        <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                            <Feather name="info" size={40} color="#FF999D" />
                            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                                Não atendemos no fim de semana                                
                            </Text>                             
                        </View>
                    )}

                </View>

                <RectButton style={styles.contactButton} onPress={() => {}}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </ScrollView>
    )
    
}