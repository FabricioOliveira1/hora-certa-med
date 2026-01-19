
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
/* import { ICON_MAP } from '../constants';
 */ import { Medication, MedStatus } from '../../types/types';

interface Props {
  med: Medication;
}

const MedicationItem: React.FC<Props> = ({ med }) => {
  const isTaken = med.status === MedStatus.TAKEN;
  const isPostponed = med.status === MedStatus.POSTPONED;
  const isMissed = med.status === MedStatus.MISSED;

  const containerStyle = [
    styles.container,
    isPostponed && styles.containerPostponed,
    isMissed && styles.containerMissed,
  ];

  const iconContainerStyle = [
    styles.iconContainer,
    isPostponed ? styles.iconContainerPostponed : isMissed ? styles.iconContainerMissed : styles.iconContainerTaken,
  ];

  return (
    <View style={containerStyle}>
      <View style={iconContainerStyle}>
        <FontAwesome6 name={med.iconType} size={24} color={
          isPostponed ? '#f97316' : isMissed ? '#ef4444' : '#0d9488'
        } />
        {/* {ICON_MAP[med.iconType as keyof typeof ICON_MAP]} */}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{med.name} {med.dosage}</Text>
        <View style={styles.statusRow}>
          <Text style={[
            styles.time,
            isPostponed ? styles.timeStrikethrough : isMissed ? styles.timeMissed : styles.timeTaken
          ]}>
            {med.scheduledTime}
          </Text>
          {isPostponed && med.actualTime && (
            <Text style={styles.actualTime}>{med.actualTime}</Text>
          )}
          <Text style={styles.dot}>•</Text>
          <Text style={styles.statusText}>{med.statusText}</Text>
        </View>
      </View>

      <View style={styles.rightAction}>
        {isTaken && (
          <View style={styles.checkCircle}>
            <FontAwesome6 name="check" size={14} color="#fff" />
          </View>
        )}
        {isPostponed && (
          <View style={styles.badgePostponed}>
            <Text style={styles.badgeText}>Adiado</Text>
          </View>
        )}
        {isMissed && (
          <View style={styles.missedCircle}>
             <View style={styles.missedInner} />
          </View>
        )}
        {med.id === '4' && (
            <FontAwesome6 name="exclamation" size={16} color="#f59e0b" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  containerPostponed: {
    backgroundColor: '#fff7ed',
    borderColor: '#ffedd5',
    borderLeftWidth: 4,
    borderLeftColor: '#f97316',
  },
  containerMissed: {
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconContainerTaken: {
    backgroundColor: '#f0fdfa',
    color: '#0d9488',
  },
  iconContainerPostponed: {
    backgroundColor: '#ffedd5',
    color: '#f97316',
  },
  iconContainerMissed: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
  },
  timeTaken: {
    color: '#0d9488',
  },
  timeMissed: {
    color: '#f87171',
  },
  timeStrikethrough: {
    color: '#fb923c',
    textDecorationLine: 'line-through',
  },
  actualTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f97316',
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 4,
    color: '#94a3b8',
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0d9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePostponed: {
    backgroundColor: '#ffedd5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ea580c',
    textTransform: 'uppercase',
  },
  missedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missedInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  }
});

export default MedicationItem;
