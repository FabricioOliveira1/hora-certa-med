import { HorarioRemedio } from '@/app/types/types';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

/* Pegar a lista de todos os remedios da semana para caucular a adesão semanal */

export default function AdherenceCard ({lista}: {lista: HorarioRemedio[]}): React.ReactElement {

  console.log("lista no adherence card: ", lista)

  const percentage = 50;
  const strokeWidth = 3.5;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Adesão Diária</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <View style={styles.streak}>
          <FontAwesome name="fire" size={16} color="#f97316" />
          <Text style={styles.streakText}>7 dias streak</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
        <View style={styles.chartContainer}>
          <Svg height="100" width="100" viewBox="0 0 36 36" style={{ transform: [{ rotate: '-90deg' }] }}>
            <Circle
              cx="18"
              cy="18"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx="18"
              cy="18"
              r={radius}
              stroke="#009183"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
          <View style={styles.chartCenter}>
            <FontAwesome name="check-circle" size={24} color="#009183" />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <View style={styles.legendContainer}>
              <View style={[styles.dot, { backgroundColor: '#009183' }]} />
              <Text style={styles.statLabel}>Tomados</Text>
            </View>
            <Text style={styles.statValue}>19</Text>
          </View>
          <View style={styles.statRow}>
            <View style={styles.legendContainer}>
              <View style={[styles.dot, { backgroundColor: '#e2e8f0' }]} />
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
            <Text style={styles.statValue}>1</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.detailsBtn}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  percentage: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 4,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff7ed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffedd5',
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c2410c',
  },
  chartContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCenter: {
    position: 'absolute',
  },
  statsContainer: {
    flex: 1,
    gap: 14,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  detailsBtn: {
    color: '#009183',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  }
});

