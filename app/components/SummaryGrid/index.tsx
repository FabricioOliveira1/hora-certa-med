import { HealthMetric } from '@/app/types/types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SummaryGrid: React.FC = () => {
  const metrics: HealthMetric[] = [
    {
      id: 'meds',
      label: 'Medicações',
      value: '5 Ativos',
      icon: <FontAwesome name="briefcase" size={20} color="#009183" />,
      bgIcon: '#f0fdfa',
    },
    {
      id: 'glucose',
      label: 'Glicose',
      value: '140',
      unit: 'mg/dL',
      trend: 'up',
      icon: <FontAwesome name="tint" size={20} color="#0d9488" />,
      bgIcon: '#f0fdfa',
    },
    {
      id: 'alert',
      label: 'Alerta',
      value: 'Interação Detectada',
      alert: true,
      icon: <FontAwesome name="exclamation-triangle" size={20} color="#dc2626" />,
      bgIcon: '#fef2f2',
      textColor: '#b91c1c'
    },
    {
      id: 'refill',
      label: 'Refil',
      value: 'Em 3 dias',
      icon: <FontAwesome name="archive" size={20} color="#d97706" />,
      bgIcon: '#fffbeb',
    }
  ];

  return (
    <View style={styles.grid}>
      {metrics.map((metric) => (
        <View 
          key={metric.id}
          style={[styles.item, metric.alert && styles.itemAlert]}
        >
          <View style={[styles.iconBox, { backgroundColor: metric.bgIcon }]}>
            {metric.icon}
          </View>
          <Text style={[styles.label, metric.alert && styles.labelAlert]}>{metric.label}</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.value, metric.textColor ? { color: metric.textColor } : null]}>
              {metric.value}
            </Text>
            {metric.unit && (
              <View style={styles.unitContainer}>
                <Text style={styles.unit}>{metric.unit}</Text>
                {metric.trend === 'up' && <FontAwesome name="arrow-up" size={12} color="#ef4444" />}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  item: {
    width: '47.5%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemAlert: {
    backgroundColor: 'rgba(254, 242, 242, 0.5)',
    borderColor: '#fee2e2',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 4,
  },
  labelAlert: {
    color: '#f87171',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  unit: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ef4444',
  }
});

export default SummaryGrid;
