import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import useTreatamentContext from "../components/context/useTreatmentContext";

export default function AddTreatment({ screen }) {

  const { onAddingTreatment } = useTreatamentContext()

  const [treatmentName, setTreatmentName] = useState()
  const [treatmentInitialDate, setTreatmentInitialDate] = useState(new Date())
  const [treatmentInterval, setTreatmentInterval] = useState()
  const [treatmentAmount, setTreatmentAmount] = useState()


  /* const [selectedDate, setSelectedDate] = useState(new Date()); */
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, date) => {
    setShowPicker(Platform.OS === 'ios'); // no iOS o picker permanece visível
    if (date) {
      setTreatmentInitialDate(date);
    }
  }

  const cleanFields = () => {
    setTreatmentName('')
    setTreatmentInitialDate(new Date())
    setTreatmentInterval('')
    setTreatmentAmount('')
  }

  const handleTreatmentData = () => {
    /*  if (treatmentName === '' ||
       treatmentInitialDate === '' ||
       treatmentInterval === '' ||
       treatmentAmount === '') {
       return
     } */
    const newTreatment = {
      name: treatmentName,
      initialDate: treatmentInitialDate,
      interval: treatmentInterval,
      amount: treatmentAmount,
    }
    onAddingTreatment(newTreatment)
    cleanFields()
    router.navigate('./treatment')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
        <View>
          <View>
            <Text style={styles.title}>Adicionar{'\n'} Medicamento</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Nome do Medicamento:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTreatmentName}
              value={treatmentName} />

            <Text style={styles.label}>Data de Inicio:</Text>           
            <DateTimePicker
              value={treatmentInitialDate}
              mode="date"
              display="default"
              onChange={onChange}
              style={styles.date}
              locale="pt-BR"
              onPress={() => setShowPicker(!showPicker)}
            />

            <Text style={styles.label}>Quantas em quantas horas:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTreatmentInterval}
              value={treatmentInterval}
              inputMode='numeric' />

            <Text style={styles.label}>Quantidade de unidades da Cartela:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTreatmentAmount}
              value={treatmentAmount} 
              inputMode='numeric'/>

            <View style={styles.actions}>
              <Pressable
                style={styles.button}
                onPress={handleTreatmentData}>
                <FontAwesome name="save" size={24} color={'#009183'} />
                <Text style={styles.label}>
                  Salvar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009183',
    flex: 1,
    justifyContent: 'center',
    paddingInline: 10
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  form: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 8,
    padding: 10,
    gap: 8
  },
  label: {
    fontSize: 20,
    color: '#009183'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#009183',
    borderRadius: 10,
    height: 30
  },
  actions: {
    alignItems: 'flex-end'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  date: {
    backgroundColor: '#009183',
    borderColor: '#009183',
    borderRadius: 10,
  }
})