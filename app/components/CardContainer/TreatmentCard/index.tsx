import { FontAwesome } from "@expo/vector-icons";
import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Treatment } from '../../../context/TreatmentProvider';
import useTreatamentContext from "../../../context/useTreatmentContext";

interface Props {
  tratamento: Treatment;
}

export default function TretmentCard({ tratamento }: Props): React.ReactElement {

  const { onDeleteTreatment } = useTreatamentContext()

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {tratamento.name}
        </Text>
        <Text>
          Quantidade na Cartela: {tratamento.amount}
        </Text>
        <Text>
          Data de Inicio: {tratamento.initialDate}
        </Text>
        <Text>
          Tomar de {tratamento.interval} em {tratamento.interval} horas.
        </Text>
        <Text>
          Proxima Aplicação: {tratamento.nextAplication?.hour}
        </Text>
      </View>
      <View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly'
      }}>
        <Pressable>
          <FontAwesome size={28} name="pencil" color={'#ccc'} />
        </Pressable>
        <Pressable onPress={() => onDeleteTreatment(tratamento.treatmentId)
        }>
          <FontAwesome size={28} name="trash-o" color={'#009183'} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    gap: 5
  },
  title: {
    fontSize: 24,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#009183'
  }
})
