import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';

import { styles } from "../../styles/OrfanatoCreate.module";
import api from "../../services/api";

interface OrfanatoDataRouteParams {
  posicao: {
    latitude: number;
    longitude: number;
  }
}

export default function OrfanatoData() {

  const navigation = useNavigation();
  const route = useRoute();
    
  const params = route.params as OrfanatoDataRouteParams;  

  const [nome, setNome] = useState('');
  const [sobre, setSobre] = useState('');
  const [instrucoes, setInstrucoes] = useState('');  
  const [horario, setHorario] = useState('');
  const [finalDeSemana, setFinalDeSemana] = useState(true);
  const [imagens, setImagens] = useState<string[]>([]);
  
  async function handleSelectImages() {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();        

    if (status !== 'granted') {
      alert('Cara, nós precisamos acessar suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled){
      return;
    }

    const { uri: imagem } = result;

    setImagens([...imagens, imagem])

  }
  
  async function handleSubmit() {
    const {latitude, longitude} = params.posicao;

    const data = new FormData();

    data.append('nome', nome);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('sobre', sobre);
    data.append('instrucoes', instrucoes);
    data.append('horario', horario);
    data.append('final_de_semana', String(finalDeSemana));

    imagens.forEach((imagem, index) => {
      data.append('imagens', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: imagem        
      } as any);
    })

    await api.post('orfanatos', data)
    .then((response) => {
      alert('Cadastro realizado com Sucesso');
      navigation.navigate('OrfanatosMap')      
    })
    .catch((error) => {
      alert('Não foi possível fazer o novo cadastro');      
    })
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
        <Text style={styles.title}>Dados</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput 
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Sobre</Text>
        <TextInput 
          style={[styles.input, { height: 110 }]} 
          multiline 
          value={sobre}
          onChangeText={setSobre}
        />

        {/* <Text style={styles.label}>Whatsapp</Text>
        <TextInput style={styles.input} /> */}

        <Text style={styles.label}>Fotos</Text>
        <View style={styles.uploadedImagensContainer}>
          {imagens.map(imagem => {
            return (
              <Image
                key={imagem}
                source={{uri: imagem}}
                style={styles.uploadedImagens}
              />
            )
          })}
        </View>
        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
            <Feather name="plus" size={24} color="#15B6D6" />
        </TouchableOpacity>

        <Text style={styles.title}>Visitação</Text>

        <Text style={styles.label}>Instruções</Text>
        <TextInput 
          style={[styles.input, { height: 110 }]} 
          multiline 
          value={instrucoes}
          onChangeText={setInstrucoes}
        />

        <Text style={styles.label}>Horario de visitas</Text>
        <TextInput 
          style={styles.input} 
          value={horario}
          onChangeText={setHorario}
        />

        <View style={styles.switchContainer}>
            <Text style={styles.label}>Atende final de semana?</Text>
            <Switch
              thumbColor="#fff"
              trackColor={{ false: "#ccc", true: "#39CC83" }}
              value={finalDeSemana}
              onValueChange={setFinalDeSemana}
            />
        </View>

        <RectButton style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>

    </ScrollView>
  );
}
