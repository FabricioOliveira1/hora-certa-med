import GeralHeader from '@/app/components/Headers/GeralHeader';
import useTreatamentContext from '@/app/context/useTreatmentContext';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TreatmentCard from '../../components/Cards/TreatmentCard';
import StatsWidget from '../../components/StatsWidget';
import { COLORS, SPACING } from '../../themes/treatmentThemes';
import { AppStats, Treatment, TreatmentIcon, TreatmentProps, TreatmentStatus } from '../../types/types';

/*const [medication, setMedication] = useState('');
  const [form, setForm] = useState<PharmaceuticalForm>('pill');
  const [dosage, setDosage] = useState(1);
  const [presentation, setPresentation] = useState("500mg");
  const [aplicationInterval, setAplicationInterval] = useState<Frequency>(12);
  const [isContinuous, setIsContinuous] = useState(false);
  const [isDailyUse, setIsDailyUse] = useState(false);
  const [duration, setDuration] = useState(7);
  const [hasAlarm, setHasAlarm] = useState(true);
  const [notes, setNotes] = useState(''); */

const MOCK_TREATMENTS: Treatment[] = [
  {
    id: '1',
    name: 'Amoxicilina',
    dosage: '1 comprimido',
    presentation: '500mg',
    icon: TreatmentIcon.PILL,
    colorClass: 'primary',/* nao usado aqui */
    progress: 48, /* nao usado aqui */
    timeLabel: '14:00', /* buscar proxima aplicação */
    timeType: 'schedule',/* nao usado aqui */
    status: TreatmentStatus.ONGOING,
    detailLabel: '12/21 dias'
  },
  {
    id: '2',
    name: 'Vitamina D',
    dosage: '2000UI',
    presentation: '1 cápsula',
    icon: TreatmentIcon.SUN,
    colorClass: 'yellow',
    progress: 96,
    timeLabel: 'Amanhã',
    timeType: 'calendar',
    status: TreatmentStatus.ONGOING,
    detailLabel: 'Uso contínuo'
  },
  {
    id: '3',
    name: 'Dipirona',
    dosage: '1g',
    presentation: '30 gotas',
    icon: TreatmentIcon.DROP,
    colorClass: 'blue',
    progress: 15,
    timeLabel: 'Se necessário',
    timeType: 'none',
    status: TreatmentStatus.ONGOING,
    detailLabel: '2/10 doses'
  },
  {
    id: '4',
    name: 'Paracetamol',
    dosage: '750mg',
    presentation: '1 comprimido',
    icon: TreatmentIcon.PILL,
    colorClass: 'primary',
    progress: 30,
    timeLabel: '20:00',
    timeType: 'schedule',
    status: TreatmentStatus.ONGOING,
    detailLabel: '3/10 dias'
  }
];



const App: React.FC = () => {


const { treatments } = useTreatamentContext();
/*   const [activeTab, setActiveTab] = useState('treatments');
 */
  const stats: AppStats = {
    active: treatments.length,
    completed: 2,
    pending: 0
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <GeralHeader iconName="plus" title="Meus Tratamentos" />

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StatsWidget treatments={treatments} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Em andamento</Text>
        </View>

        {treatments.map((treatment: TreatmentProps) => (
          <TreatmentCard key={treatment.id} treatment={treatment} />
        ))}

        {/* Espaçamento inferior para o ScrollView */}
        <View style={{ height: 5 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textMain,
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  viewMore: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default App;
