
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../../../themes/treatmentThemes';
import { TreatmentProps } from '../../../types/types';

interface TreatmentCardProps {
  treatment: TreatmentProps;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment }) => {
  /* const isUrgent = treatment.timeLabel !== 'Se necessário' && treatment.timeLabel !== 'Amanhã'; */

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={treatment.form} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{treatment.medication}</Text>
            <View style={[styles.timeBadge, styles.normalBadge]}>
              
              <Text style={[styles.timeText, styles.normalText]}>
                Prox: {treatment.nextAplication ? treatment.nextAplication.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sem horário'}
              </Text>
            </View>
          </View>
          <Text style={styles.dosage}>
            {treatment.form === 'pills' && `${treatment.dosage} comprimidos` || treatment.form === 'tint' && `${treatment.dosage} gotas`}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${treatment.progressBar.porcentagem}%` }]} />
        </View>
        <Text style={styles.progressDetail}>{treatment.progressBar.texto}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'Material Symbols Outlined',
    fontSize: 28,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  dosage: {
    fontSize: 13,
    color: COLORS.textSub,
    fontWeight: '500',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  urgentBadge: {
    backgroundColor: COLORS.orangeLight,
  },
  normalBadge: {
    backgroundColor: COLORS.grayLight,
  },
  timeIcon: {
    fontFamily: 'Material Symbols Outlined',
    fontSize: 14,
    color: COLORS.textSub,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  urgentText: {
    color: COLORS.orange,
  },
  normalText: {
    color: COLORS.textSub,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.grayLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressDetail: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMain,
  },
});

export default TreatmentCard;
