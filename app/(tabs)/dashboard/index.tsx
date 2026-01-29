import DoseCard from '@/app/components/Cards/DoseCard';
import Header from '@/app/components/Headers/DashboardHeader';
import SummaryGrid from '@/app/components/SummaryGrid';
import useTreatamentContext from '@/app/context/useTreatmentContext';
import useHandleAplicationRoutine from '@/app/hooks/useHandleAplicationRoutine';
import { HorarioRemedio, TreatmentProps } from '@/app/types/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Today(): React.ReactElement {

  const { treatments, setTreatments } = useTreatamentContext()
  const { handleNextRoutine } = useHandleAplicationRoutine()
  const [nextDoses, setNextDoses] = useState<HorarioRemedio[]>([]);

  useEffect(() => {
     const updatedDoses: HorarioRemedio[] = treatments.map((treatment: TreatmentProps) => {
      if (!treatment.nextAplication) {
        return 
      }
      return ({
        ...treatment.nextAplication,
        form: treatment.form,
      }) 
    }) 
    updatedDoses.sort((a, b) => a.horario.getTime() - b.horario.getTime());
    
    setNextDoses(updatedDoses);
  }, [treatments]);

  const handleTakeDose = (id: string, doseId: string) => {

    setTreatments((prevTreatments: TreatmentProps[]) => prevTreatments.map(treatment => {

      if (treatment.treatmentId === id) {
        console.log('treatment encontrado: ', treatment);
        const updatedAgenda: HorarioRemedio[] = treatment.agenda.map(dose =>
          dose.doseId === doseId ? { ...dose, status: 'tomado' } : dose
        );
        
        const nextAplication = handleNextRoutine(updatedAgenda);

        return {
          ...treatment,
          agenda: updatedAgenda,
          nextAplication: nextAplication
        };
      }
      return treatment;
    }));
  };


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
          {nextDoses.map((dose) => (
            <DoseCard
              key={dose.doseId}
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
