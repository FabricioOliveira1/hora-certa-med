
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../../themes/treatmentThemes';
import { TreatmentProps } from '../../types/types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const StatsWidget: React.FC<{ treatments: TreatmentProps[] }> = ({ treatments }) => {

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.card, styles.primaryCard, {flex: 1}]}>
          <View style={styles.cardHeader}>
            <FontAwesome name="medkit" size={24} color={COLORS.white} />
             <View style={styles.badge}><Text style={styles.badgeText}>Hoje</Text></View>
          </View>
          <View>
            <Text style={styles.statValuePrimary}>{treatments.length}</Text>
            <Text style={styles.statLabelPrimary}>Ativos</Text>
          </View>
        </View>

{/*         <View style={styles.card}>
          <FontAwesome name="check-circle" size={24} color={COLORS.primary} />
          <View>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completos</Text>
          </View>
        </View>

        <View style={styles.card}>
          <FontAwesome name="warning" size={24} color={COLORS.orange} />
          <View>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    minHeight: 120,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryCard: {
    backgroundColor: COLORS.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'Material Symbols Outlined',
    fontSize: 24,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  statValuePrimary: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
  },
  statLabelPrimary: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    color: COLORS.textMain,
    fontSize: 32,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSub,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatsWidget;
