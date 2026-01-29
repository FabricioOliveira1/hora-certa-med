import useTreatamentContext from '@/app/context/useTreatmentContext';
import { TreatmentProps } from '@/app/types/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const App: React.FC = () => {
  const [medication, setMedication] = useState('');
  const [form, setForm] = useState('pills');
  const [dosage, setDosage] = useState(1);
  const [aplicationInterval, setAplicationInterval] = useState<number>(12);
  const [isContinuous, setIsContinuous] = useState(false);
  const [isDailyUse, setIsDailyUse] = useState(false);
  const [duration, setDuration] = useState(7);
  const [hasAlarm, setHasAlarm] = useState(true);
  const [notes, setNotes] = useState('');
  const [hora, setHora] = useState<number>(12);
  const [initialDate, setInitialDate] = useState<Date>(new Date());

  const { adicionarTratamento } = useTreatamentContext();
  const router = useRouter();

  const handleAddTreatment = () => {
    if (medication.trim() === '') {
      Alert.alert('Campo obrigatório', 'Por favor, digite o nome do medicamento.');
      return;
    }

    adicionarTratamento({
      medication,
      form,
      dosage,
      aplicationInterval,
      isContinuous,
      isDailyUse,
      duration,
      hasAlarm,
      notes,
      initialDate
    } as TreatmentProps);
    clearForm();
    router.replace('/treatments');
  };

  const clearForm = () => {
    setMedication('');
    setForm('pills');
    setDosage(1);
    setAplicationInterval(5);
    setIsContinuous(false);
    setIsDailyUse(false);
    setDuration(7);
    setHasAlarm(true);
    setNotes('');
  };

  const handleChange = (value: string) => {
    setMedication(value);
  };

  useEffect(() => {
    if (isDailyUse) {
      setAplicationInterval(24);
    } else {
      setAplicationInterval(12);
    }
  }, [isDailyUse]);

  useEffect(() => {
    if (isDailyUse) {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      date.setHours(hora, 0, 0, 0);
      setInitialDate(date);
    }
  }, [hora]);

    useEffect(() => {
      if (aplicationInterval <= 1) {
        setAplicationInterval(1);
      }
      if (aplicationInterval >= 24) {
        setAplicationInterval(24);
      }
    }, [aplicationInterval]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity><Text style={styles.headerButtonText}>Cancelar</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Tratamento</Text>
        <TouchableOpacity onPress={handleAddTreatment}><Text style={styles.headerButtonText}>Salvar</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Medicamento */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Medicamento</Text>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="pills" size={24} color="#0d9488" style={styles.inputIcon} />
            <TextInput
              value={medication}
              onChangeText={handleChange}
              placeholder="Ex: Dipirona 500mg"
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Forma Farmacêutica */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Forma Farmacêutica</Text>
          <View style={styles.formButtonsContainer}>
            <TouchableOpacity onPress={() => setForm('pills')} style={[styles.formButton, form === 'pills' && styles.formButtonActive]}>
              <FontAwesome5 name="pills" size={20} color={form === 'pills' ? 'white' : '#374151'} />
              <Text style={[styles.formButtonText, form === 'pills' && styles.formButtonTextActive]}>Comprimido</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForm('tint')} style={[styles.formButton, form === 'tint' && styles.formButtonActive]}>
              <FontAwesome5 name="tint" size={20} color={form === 'tint' ? 'white' : '#374151'} />
              <Text style={[styles.formButtonText, form === 'tint' && styles.formButtonTextActive]}>Gotas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dosagem */}
        <View style={[styles.section, styles.card]}>
          <View style={styles.cardTag}><Text style={styles.cardTagText}>Por vez</Text></View>
          <Text style={styles.cardTitle}>Dosagem</Text>
          <View style={styles.dosageContainer}>
            <View style={styles.dosageControl}>
              <TouchableOpacity onPress={() => setDosage(Math.max(1, dosage - 1))} style={styles.dosageButton}>
                <FontAwesome5 name="minus" size={20} color="#4b5563" />
              </TouchableOpacity>
              <Text style={styles.dosageValue}>{dosage}</Text>
              <TouchableOpacity onPress={() => setDosage(dosage + 1)} style={[styles.dosageButton, styles.dosageButtonPlus]}>
                <FontAwesome5 name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Frequência */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { flexDirection: 'row', alignItems: 'flex-end' }]}>
            <Text style={styles.sectionLabel}>Frequência</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Dose Única</Text>
              <Switch value={isDailyUse} onValueChange={setIsDailyUse} trackColor={{ false: '#e5e7eb', true: '#0d9488' }} thumbColor="#ffffff" />
            </View>
          </View>
          {!isDailyUse ? (
            <View>
              <View style={styles.segmentedControl}>
                <TouchableOpacity onPress={() => setAplicationInterval(4)} style={[styles.segmentedButton, aplicationInterval === 4 && styles.segmentedButtonActive]}>
                  <Text style={[styles.segmentedButtonText, aplicationInterval === 4 && styles.segmentedButtonTextActive]}>4h em 4h</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAplicationInterval(8)} style={[styles.segmentedButton, aplicationInterval === 8 && styles.segmentedButtonActive]}>
                  <Text style={[styles.segmentedButtonText, aplicationInterval === 8 && styles.segmentedButtonTextActive]}>8h em 8h</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAplicationInterval(12)} style={[styles.segmentedButton, aplicationInterval !== 4 && aplicationInterval !== 8 && styles.segmentedButtonActive]}>
                  <Text style={[styles.segmentedButtonText, aplicationInterval !== 4 && aplicationInterval !== 8 && styles.segmentedButtonTextActive]}>Personalizado</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.card, { marginTop: 12 }]}>
                <View>
                  <Text style={styles.cardSubText}>Aplicação de {aplicationInterval} em {aplicationInterval} horas. </Text>
                </View>
                <View style={styles.dosageContainer}>
                  <View style={styles.dosageControl}>
                    <TouchableOpacity onPress={() => setAplicationInterval(Math.max(1, aplicationInterval - 1))} style={styles.dosageButton}>
                      <FontAwesome5 name="minus" size={20} color="#4b5563" />
                    </TouchableOpacity>
                    <Text style={styles.dosageValue}>{aplicationInterval}</Text>
                    <TouchableOpacity onPress={() => setAplicationInterval(aplicationInterval + 1)} style={[styles.dosageButton, styles.dosageButtonPlus]}>
                      <FontAwesome5 name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={[styles.card, { marginTop: 12 }]}>
              <View>
                <Text style={styles.cardSubText}>Todos os dias às {hora}h</Text>
              </View>
              <View style={styles.dosageContainer}>
                <View style={styles.dosageControl}>
                  <TouchableOpacity onPress={() => setHora(hora - 1)} style={styles.dosageButton}>
                    <Text style={styles.iconText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.dosageValue}>{hora}</Text>
                  <TouchableOpacity onPress={() => setHora(hora + 1)} style={[styles.dosageButton, styles.dosageButtonPlus]}>
                    <Text style={[styles.iconText, { color: 'white' }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Duração */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Duração</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Uso Contínuo</Text>
              <Switch value={isContinuous} onValueChange={setIsContinuous} trackColor={{ false: '#e5e7eb', true: '#0d9488' }} thumbColor="#ffffff" />
            </View>
          </View>
          {!isContinuous && (
            <View style={[styles.card, { marginTop: 12 }]}>
              <View style={styles.durationInfo}>
                <Text style={styles.cardSubText}>Dias de tratamento</Text>
                <Text style={styles.durationDays}>{duration} dias</Text>
              </View>
              <View style={styles.dosageContainer}>
                <View style={styles.dosageControl}>
                  <TouchableOpacity onPress={() => setDuration(Math.max(1, duration - 1))} style={styles.dosageButton}>
                    <FontAwesome5 name="minus" size={20} color="#4b5563" />

                  </TouchableOpacity>
                  <Text style={styles.dosageValue}>{duration}</Text>
                  <TouchableOpacity onPress={() => setDuration(duration + 1)} style={[styles.dosageButton, styles.dosageButtonPlus]}>
                    <FontAwesome5 name="plus" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Lembrete com alarme */}
        <View style={[styles.section, styles.card, styles.alarmCard]}>
          <View style={styles.alarmContent}>
            <View style={styles.alarmIconContainer}>
              <FontAwesome5 name="bell" size={24} color="#f59e0b" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Lembrete com alarme</Text>
              <Text style={styles.cardSubText}>Notificar na hora certa</Text>
            </View>
          </View>
          <Switch value={hasAlarm} onValueChange={setHasAlarm} trackColor={{ false: '#e5e7eb', true: '#0d9488' }} thumbColor="#ffffff" style={{ transform: [{ scale: 1.1 }] }} />
        </View>
        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleAddTreatment} style={styles.saveButton}>
            <FontAwesome5 name="save" size={20} color="white" />
            <Text style={styles.saveButtonText}>Salvar Tratamento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TEAL_COLOR = '#0d9488';
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  headerButtonText: {
    color: TEAL_COLOR,
    fontWeight: '500',
    fontSize: 16
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1f2937'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#f9fafb'
  },
  section: {
    marginBottom: 24
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 44,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    backgroundColor: 'white',
    fontSize: 16
  },
  formButtonsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  formButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white'
  },
  formButtonActive: {
    backgroundColor: TEAL_COLOR,
    borderColor: TEAL_COLOR
  },
  formButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151'
  },
  formButtonTextActive: {
    color: 'white'
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  cardTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  },
  cardTagText: {
    color: '#115e59',
    fontSize: 12,
    fontWeight: '500'
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#1f2937',
    fontSize: 16
  },
  dosageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  },
  dosageControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  dosageButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#f3f4f6'
  },
  dosageButtonPlus: {
    backgroundColor: TEAL_COLOR
  },
  dosageValue: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 32,
    textAlign: 'center'
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b5563'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    backgroundColor: '#f3f4f6',
    padding: 4,
    borderRadius: 999,
    marginTop: 8
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999
  },
  segmentedButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  segmentedButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#4b5563',
    fontSize: 14
  },
  segmentedButtonTextActive: {
    color: TEAL_COLOR
  },
  cardSubText: {
    fontSize: 14,
    color: '#4b5563'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151'
  },
  durationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  durationDays: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEAL_COLOR
  },
  alarmCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alarmContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  alarmIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#fef3c7'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6'
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: TEAL_COLOR,
    paddingVertical: 16,
    borderRadius: 16
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default App;