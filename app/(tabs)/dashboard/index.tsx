import DoseCard from '@/app/components/Cards/DoseCard';
import Header from '@/app/components/Headers/DashboardHeader';
import SummaryGrid from '@/app/components/SummaryGrid';
import useTreatamentContext from '@/app/context/useTreatmentContext';
import { MedicationDose } from '@/app/types/types';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

/*const [medication, setMedication] = useState('');
  const [form, setForm] = useState<PharmaceuticalForm>('pill');
  const [dosage, setDosage] = useState(1);
  const [aplicationInterval, setAplicationInterval] = useState<Frequency>(12);
  const [isContinuous, setIsContinuous] = useState(false);
  const [isDailyUse, setIsDailyUse] = useState(false);
  const [duration, setDuration] = useState(7);
  const [hasAlarm, setHasAlarm] = useState(true);
  const [notes, setNotes] = useState(''); */

const INITIAL_DOSES: MedicationDose[] = [
  {
    id: '1',
    name: 'Amoxicilina 500mg',
    dosage: '1 comprimido',
    info: 'Após refeição',
    timeRemaining: '15 min',
    type: 'pill',
    status: 'pending',
    accentColor: '#009183',
  },
  {
    id: '2',
    name: 'Losartana 50mg',
    dosage: '1 comprimido',
    timeRemaining: '2h 00m',
    type: 'pill',
    status: 'pending',
    accentColor: '#9333ea',
  },
  {
    id: '3',
    name: 'Vitamina D',
    dosage: '2 gotas',
    timeRemaining: '4h 00m',
    type: 'drops',
    status: 'pending',
    accentColor: '#16a34a',
  }
];

export default function Today(): React.ReactElement {

  const { treatment } = useTreatamentContext()

  const [doses, setDoses] = useState<MedicationDose[]>(INITIAL_DOSES);

  const handleTakeDose = useCallback((id: string) => {
    setDoses(prev => prev.map(d => d.id === id ? { ...d, status: 'taken' } : d));
  }, []);

  const handleDelayDose = useCallback((id: string) => {
    console.log(`Delayed dose ${id}`);
    /* Delay logic here */
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView style={styles.cardContainer}>
        {/* <AdherenceCard lista={treatment.agenda} /> */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas Doses</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {doses.map((dose) => (
            <DoseCard
              key={dose.id}
              dose={dose}
              onTake={handleTakeDose}
              onDelay={handleDelayDose}
            />
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resumo de Saude</Text>
        </View>
          <SummaryGrid />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009183',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#009183',
  },
  list: {
    gap: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingBlock: 10,
    paddingHorizontal: 10,
  }

})
