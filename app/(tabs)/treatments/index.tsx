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
import { TreatmentProps } from '../../types/types';

const App: React.FC = () => {

const { treatments } = useTreatamentContext();

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
          <TreatmentCard key={treatment.treatmentId} treatment={treatment} />
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
