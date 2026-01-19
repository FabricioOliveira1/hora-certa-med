
import { MedicationDose } from '@/app/types/types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DoseCardProps {
  dose: MedicationDose;
  onTake: (id: string) => void;
  onDelay: (id: string) => void;
}

const DoseCard: React.FC<DoseCardProps> = ({ dose, onTake, onDelay }) => {
  const getIcon = () => {
    const size = 24;
    const color = dose.accentColor;
    switch (dose.type) {
      case 'pill': return <FontAwesome name="flask" size={size} color={color} />;
      case 'liquid': return <FontAwesome name="tint" size={size} color={color} />;
      case 'drops': return <FontAwesome name="tint" size={size} color={color} />;
      default: return <FontAwesome name="flask" size={size} color={color} />;
    }
  };

  const isTakeable = dose.status === 'pending';

  return (
    <View style={[styles.card, dose.status === 'taken' && styles.cardTaken]}>
      <View style={styles.header}>
        <View style={styles.infoRow}>
          <View style={[styles.iconBox, { backgroundColor: `${dose.accentColor}15` }]}>
            {getIcon()}
          </View>
          <View style={styles.textDetails}>
            <Text style={styles.name}>{dose.name}</Text>
            <Text style={styles.dosage}>
              {dose.dosage} {dose.info ? `• ${dose.info}` : ''}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, dose.timeRemaining === '15 min' && styles.badgeAlert]}>
          <Text style={[styles.badgeText, dose.timeRemaining === '15 min' && styles.badgeTextAlert]}>
            {dose.timeRemaining}
          </Text>
        </View>
      </View>

      {isTakeable ? (
        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={() => onTake(dose.id)}
            style={styles.takeBtn}
            activeOpacity={0.7}
          >
            
            <FontAwesome name="check" size={18} color="#fff" />
            <Text style={styles.takeBtnText}>Tomar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onDelay(dose.id)}
            style={styles.delayBtn}
            activeOpacity={0.7}
          >
            
            <FontAwesome name="clock-o" size={18} color="#64748b" />
            <Text style={styles.delayBtnText}>Adiar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.confirmedContainer}>
          
          <FontAwesome name="check-circle" size={20} color="#009183" />
          <Text style={styles.confirmedText}>Dose Confirmada</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  cardTaken: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  dosage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeAlert: {
    backgroundColor: '#fef2f2',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  badgeTextAlert: {
    color: '#ef4444',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  takeBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#009183',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 3,
    shadowColor: '#009183',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  takeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  delayBtn: {
    flex: 1,
    height: 44,
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  delayBtnText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  confirmedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#009183',
  }
});

export default DoseCard;
