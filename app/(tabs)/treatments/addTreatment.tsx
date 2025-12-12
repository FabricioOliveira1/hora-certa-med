import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import useTreatamentContext from "../../context/useTreatmentContext"; 

export default function AddTreatment(): React.ReactElement {

  const { adicionarTratamento } = useTreatamentContext()
  const router = useRouter();

  const [treatmentName, setTreatmentName] = useState<string>('')
  const [treatmentInitialDate, setTreatmentInitialDate] = useState<Date>(new Date())
  const [treatmentInterval, setTreatmentInterval] = useState<string>('')
  const [treatmentAmount, setTreatmentAmount] = useState<string>('')
  const [currentDateLabel, setCurrentDateLabel] = useState<string>(treatmentInitialDate.toLocaleString('pt-BR'))
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [alertEmptyField, setAlertEmptyField] = useState<boolean>(false)

  const onChange = ({ type }: any, date?: Date) => {
    if (type === 'set' && date) {
      const currentDate = date
      setTreatmentInitialDate(currentDate);
      if (Platform.OS === 'android') {
        setCurrentDateLabel(currentDate.toLocaleString('pt-BR'))
        toggleDatePicker()
      } else {
        toggleDatePicker()
      }
    } else if (type === 'dismissed') {
      toggleDatePicker()
      setCurrentDateLabel(treatmentInitialDate.toLocaleString('pt-BR'))
    }
  }
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const cleanFields = () => {
    setTreatmentName('')
    setTreatmentInitialDate(new Date())
    setTreatmentInterval('')
    setTreatmentAmount('')
  }

  const handleTreatmentData = () => {

    if (treatmentName === '' ||
      treatmentInterval === '' ||
      treatmentAmount === '') {
      setAlertEmptyField(true)
      return
    } else {
      const newTreatment = {
        name: treatmentName,
        initialDate: treatmentInitialDate,
        interval: Number(treatmentInterval),
        amount: Number(treatmentAmount),
      }
      adicionarTratamento(newTreatment)
      setAlertEmptyField(false)
      cleanFields()
      router.push('./treatment')
    }
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
            <Text style={styles.title}>Adicionar{"\n"} Medicamento</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Nome do Medicamento:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTreatmentName}
              value={treatmentName} />

            <Text style={styles.label}>Data de Inicio:</Text>

            {showPicker &&
              <DateTimePicker
                value={treatmentInitialDate}
                mode="date"
                display="spinner"
                onChange={onChange}
                style={styles.date}
                locale="pt-BR"
              />
            }

            <Pressable onPress={toggleDatePicker}>
              <Text style={styles.dateText}>
                {currentDateLabel}
              </Text>
            </Pressable>

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
              inputMode='numeric' />
            {alertEmptyField && <Text style={styles.alert}>Preencha os campos corretamente</Text>}

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
    padding: 5
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
  },
  dateText: {
    backgroundColor: '#009183',
    borderRadius: 10,
    fontSize: 18,
    color: '#fff',
    width: '60%',
    padding: 2
  },
  alert: {
    color: 'red',
    fontSize: 18,
    textAlign: 'right'
  }
})
