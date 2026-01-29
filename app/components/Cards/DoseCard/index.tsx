
import { HorarioRemedio } from '@/app/types/types';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DoseCardProps {
  dose: HorarioRemedio;
  onTake: (id: string, doseId: string) => void;
  onDelay: (id: string) => void;
}

function verificaDataDose(horario: Date): string {
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  const dataDose = new Date(horario);
  if (hoje.toDateString() === dataDose.toDateString()) {
    return dataDose.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } else if (amanha.toDateString() === dataDose.toDateString()) {
    return 'Amanhã';
  } else {
    return dataDose.toLocaleDateString('pt-BR');
  }
}

const DoseCard: React.FC<DoseCardProps> = ({ dose, onTake, onDelay }) => {

  const isTakeable = dose.status === 'pendente';

  return (
    <View style={[styles.card, dose.status === 'tomado' && styles.cardTaken]}>
      <View style={styles.header}>
        <View style={styles.infoRow}>
          <View style={[styles.iconBox]}>
            <FontAwesome5 name={dose.form} size={24} color={'#009183'} />
          </View>
          <View style={styles.textDetails}>
            <Text style={styles.name}>{dose.medication}</Text>
            <Text style={styles.dosage}>
              {dose.dosage}
              {dose.form === 'pills'
                ? (dose.dosage === 1 ? '• comprimido' : '• comprimidos')
                : dose.form === 'tint'
                  ? (dose.dosage === 1 ? '• gota' : '• gotas')
                  : null}

            </Text>
          </View>
        </View>
        <View style={[styles.badge, dose.countdown === '15 min' && styles.badgeAlert]}>
          <Text style={[styles.badgeText, dose.countdown === '15 min' && styles.badgeTextAlert]}>
            {dose.horario ? 
              verificaDataDose(dose.horario) : 'Sem horário'}
          </Text>
        </View>
      </View>

      {isTakeable ? (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onTake(dose.treatmentId, dose.doseId)}
            style={styles.takeBtn}
            activeOpacity={0.7}
          >

            <FontAwesome5 name="check" size={18} color="#fff" />
            <Text style={styles.takeBtnText}>Tomar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelay(dose.doseId)}
            style={styles.delayBtn}
            activeOpacity={0.7}
          >

            <FontAwesome5 name="clock" size={18} color="#64748b" />
            <Text style={styles.delayBtnText}>Adiar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.confirmedContainer}>

          <FontAwesome5 name="check-circle" size={20} color="#009183" />
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
