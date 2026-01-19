import GeralHeader from '@/app/components/Headers/GeralHeader';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/Calendar';
import SegmentedControl from '../../components/SegmentedControl';
import Timeline from '../../components/Timeline';
import { Medication, MedStatus } from '../../types/types';

const { width } = Dimensions.get('window');

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'Semana' | 'Mês'>('Mês');
  const [selectedDay, setSelectedDay] = useState(5);

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Losartana',
      dosage: '50mg',
      form: '1 Comprimido',
      time: '08:00',
      status: MedStatus.TAKEN,
      icon: 'pill',
      iconType: 'pill',
    },
    {
      id: '2',
      name: 'Omega 3',
      dosage: '1000mg',
      form: '1 Cápsula',
      time: '12:30',
      status: MedStatus.PENDING,
      icon: 'nutrition',
      color: 'orange',
      iconType: 'bottle',
    },
    {
      id: '3',
      name: 'Metformina',
      dosage: '850mg',
      form: '1 Comprimido',
      time: '20:00',
      status: MedStatus.POSTPONED,
      icon: 'medication',
      iconType: 'pill',
    },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <GeralHeader title="Calendário" />
        <View style={styles.spacing}>
          <SegmentedControl
            options={['Semana', 'Mês']}
            active={viewMode}
            onChange={(val) => setViewMode(val as any)}
          />
        </View>
        <Calendar
          month="Outubro 2023"
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <View style={styles.mainContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Agenda de Hoje</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3 Medicamentos</Text>
              </View>
            </View>

            <Timeline medications={medications} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  content: {
    width: Math.min(width, 450),
    flex: 1,
    backgroundColor: '#ffffff',
  },
  spacing: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#f0f9f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  badgeText: {
    color: '#008f81',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default App;
