import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import CalendarStrip from '../../components/CalendarStrip';
import FilterBar from '../../components/FilterBar';
import MedicationItem from '../../components/MedicationItem';
import { MOCK_HISTORY } from '../../constants/constants';
import { FilterType, MedStatus } from '../../types/types';

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('Todos');

  const filteredHistory = MOCK_HISTORY.map(day => ({
    ...day,
    medications: day.medications.filter(med => {
      if (filter === 'Todos') return true;
      if (filter === 'Tomados') return med.status === MedStatus.TAKEN;
      if (filter === 'Adiados') return med.status === MedStatus.POSTPONED;
      return true;
    })
  })).filter(day => day.medications.length > 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="arrow-left" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Histórico</Text>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="search" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <CalendarStrip />
          
          <FilterBar active={filter} onChange={setFilter} />

          <View style={styles.listContainer}>
            {filteredHistory.map((day, dIdx) => (
              <View key={dIdx} style={styles.dayGroup}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day.date}</Text>
                  <View style={styles.dayLine} />
                </View>
                
                <View style={styles.medicationList}>
                  {day.medications.map((med) => (
                    <MedicationItem key={med.id} med={med} />
                  ))}
                </View>
              </View>
            ))}

            {filteredHistory.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhum registro encontrado</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Navigation */}
        <BottomNav activeTab="history" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  dayGroup: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  dayLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  medicationList: {
    gap: 4,
  },
  emptyState: {
    paddingTop: 80,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  }
});

export default App;
