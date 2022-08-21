import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from'react-native';

import { styles } from './styles';

import { Participant } from '../../components/Participant';

export function Home(){
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  //função para adicionar participantes
  function handleParticipantAdd(){
    if (participants.includes(participantName)) {
      return Alert.alert("Este participante Existe" , "Já existe um participante com esse nome na lista.");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  //função para remover os participantes
  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Deseja realmente remover ${name} da lista`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Van Lounge Bar
      </Text>
      
      <Text style={styles.eventDate}>
        Sexta, 26 de Agosto de 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder= "Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity
        style={styles.button}
        onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém entrou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        )}
      />

    </View>
  );
}