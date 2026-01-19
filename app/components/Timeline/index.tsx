
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Medication } from '../../types/types';

interface TimelineProps {
  medications: Medication[];
}

const Timeline: React.FC<TimelineProps> = ({ medications }) => {
  return (
    <View style={styles.container}>
      {medications.map((med, index) => {
        const isLast = index === medications.length - 1;
        const isCurrent = med.status === 'PENDENTE';
        const isPast = med.status === 'TOMADO';

        return (
          <View key={med.id} style={styles.row}>
            {/* Coluna de Horário */}
            <View style={styles.timeColumn}>
              <Text style={[
                styles.timeText, 
                isCurrent && styles.timeActive, 
                isPast && styles.timePast
              ]}>
                {med.time}
              </Text>
            </View>

            {/* Coluna da Linha Indicadora */}
            <View style={styles.lineColumn}>
              <View style={[styles.line, isPast && styles.linePast]} />
              
              {/* Fix: Usage of styles.dotActive on line 35 was failing because it was not defined in the StyleSheet */}
              <View style={[styles.dotWrapper, isCurrent && styles.dotActive]}>
                {isPast ? (
                  <View style={styles.pastDot}>
                    <FontAwesome name="check" size={12} color="#ffffff" />
                  </View>
                ) : isCurrent ? (
                  <View style={styles.currentDot} />
                ) : (
                  <View style={styles.futureDot} />
                )}
              </View>

              {!isLast && <View style={[styles.line, isPast && styles.linePast, { flex: 1 }]} />}
            </View>

            {/* Coluna do Card */}
            <View style={styles.cardColumn}>
              <View style={[
                styles.card,
                isCurrent && styles.cardCurrent,
                isPast && styles.cardPast,
                !isCurrent && !isPast && styles.cardFuture
              ]}>
                <View style={styles.cardHeader}>
                  <View style={styles.medInfo}>
                    <View style={[
                      styles.iconBox,
                      med.color === 'orange' ? styles.orangeIcon : styles.tealIcon
                    ]}>
                      <Text style={[
                        styles.medIcon,
                        med.color === 'orange' ? { color: '#f97316' } : { color: '#008f81' }
                      ]}>{med.icon}</Text>
                    </View>
                    <View>
                      <Text style={styles.medName}>{med.name}</Text>
                      <Text style={styles.medDose}>{med.dosage} • {med.form}</Text>
                    </View>
                  </View>
                  {isPast && (
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>TOMADO</Text>
                    </View>
                  )}
                </View>

                {isCurrent && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.primaryButton}>
                      <Text style={styles.primaryButtonText}>Tomar Agora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <FontAwesome name="clock-o" size={20} color="#64748b" />
                      
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  timeColumn: {
    width: 60,
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingRight: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#cbd5e1',
  },
  timeActive: {
    color: '#008f81',
  },
  timePast: {
    color: '#111827',
  },
  lineColumn: {
    width: 20,
    alignItems: 'center',
  },
  line: {
    width: 2,
    backgroundColor: '#f1f5f9',
    height: 20,
  },
  linePast: {
    backgroundColor: '#008f8122',
  },
  dotWrapper: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  /* Fix: Added missing dotActive definition to fix error in line 35 */
  dotActive: {
    // Keep as empty or add specific active wrapper styles if needed
  },
  pastDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#008f81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontFamily: 'Material Symbols Outlined',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  currentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#008f81',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#008f81',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  futureDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e2e8f0',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cardColumn: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 32,
  },
  card: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardCurrent: {
    backgroundColor: '#ffffff',
    borderColor: '#f8fafc',
    shadowColor: '#008f81',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  cardPast: {
    backgroundColor: '#f0f9f8',
    borderColor: '#008f8111',
  },
  cardFuture: {
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  medInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  tealIcon: {
    // default teal
  },
  orangeIcon: {
    backgroundColor: '#fff7ed',
  },
  medIcon: {
    fontFamily: 'Material Symbols Outlined',
    fontSize: 20,
  },
  medName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  medDose: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
  },
  statusBadge: {
    backgroundColor: '#008f811a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#008f81',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#008f81',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#008f81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  secondaryButton: {
    width: 44,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonIcon: {
    fontFamily: 'Material Symbols Outlined',
    color: '#64748b',
    fontSize: 20,
  },
});

export default Timeline;
