import useTreatamentContext from '@/app/context/useTreatmentContext';
import { HealthMetric } from '@/app/types/types';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SummaryGrid():React.ReactElement {

  const { treatments } = useTreatamentContext()

  function editaPressao() {
    console.log('Editar pressão acionado');
    // Adicionar a lógica para editar a pressão arterial
  }

  const metrics: HealthMetric[] = [
    {
      id: 'meds',
      label: 'Medicações',
      value: `${treatments.length} Ativos`,
      icon: <FontAwesome name="briefcase" size={20} color="#009183" />,
      bgIcon: '#f0fdfa',
    },
    {
      id: 'pressao',
      label: 'Pressão',
      value: '120/80',
      unit: 'mmHg',
      trend: 'up',
      icon: <FontAwesome5 name="heartbeat" size={20} color="#0d9488" />,
      bgIcon: '#f0fdfa',
    },
/*     {
      id: 'refill',
      label: 'Refil',
      value: 'Em 3 dias',
      icon: <FontAwesome name="archive" size={20} color="#d97706" />,
      bgIcon: '#fffbeb',
    } */
  ];

  return (
    <View style={styles.grid}>
      {metrics.map((metric) => (
        <View 
          key={metric.id}
          style={[styles.item, metric.alert && styles.itemAlert]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View style={[styles.iconBox, { backgroundColor: metric.bgIcon }]}>
              {metric.icon}
            </View>
            <TouchableOpacity onPress={editaPressao}>
              {metric.label === 'Pressão' && 
              <FontAwesome5 name="edit" size={20} color="#0d9488" />}
            </TouchableOpacity>
          </View>
          <Text style={[styles.label, metric.alert && styles.labelAlert]}>{metric.label}</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.value, metric.textColor ? { color: metric.textColor } : null]}>
              {metric.value}
            </Text>
            {metric.unit && (
              <View style={styles.unitContainer}>
                <Text style={styles.unit}>{metric.unit}</Text>
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
    color: '#009183',
  }
});