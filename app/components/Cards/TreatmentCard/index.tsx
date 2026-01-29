import useTreatamentContext from '@/app/context/useTreatmentContext';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../../../themes/treatmentThemes';
import { TreatmentProps } from '../../../types/types';

interface TreatmentCardProps {
  treatment: TreatmentProps;
  onEdit?: (treatment: TreatmentProps) => void;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { onDeleteTreatment } = useTreatamentContext()

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o tratamento de ${treatment.medication}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => onDeleteTreatment(treatment.treatmentId) }
      ]
    );
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name={treatment.form} size={24} color={COLORS.primary} />
          </View>
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.name}>{treatment.medication}</Text>
              <View style={styles.rightSection}>
                <View style={[styles.timeBadge, styles.normalBadge]}>
                  <Text style={[styles.timeText, styles.normalText]}>
                    Prox: {treatment.nextAplication ? treatment.nextAplication.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sem horário'}
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={toggleExpand}
                  style={styles.expandButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <FontAwesome5 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={16} 
                    color={COLORS.textSub} 
                  />
                </TouchableOpacity>
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

      {/* Seção Expandida */}
      {isExpanded && (
        <View style={styles.expandedSection}>
          {/* Próximos Horários */}
          <View style={styles.scheduleSection}>
            <Text style={styles.scheduleTitle}>Próximos horários</Text>
            <View style={styles.scheduleList}>
              {treatment.agenda && treatment.agenda.length > 0 ? (
                treatment.agenda.slice(0, 8).map((agendaItem, index) => (
                  agendaItem.status === 'pendente' && (
                  <View key={index} style={styles.scheduleTag}>
                    <FontAwesome5 name="clock" size={10} color={COLORS.primary} />
                    <Text style={styles.scheduleTagText}>
                      {agendaItem.horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                  )
                ))
              ) : (
                <Text style={styles.noScheduleText}>Nenhum horário agendado</Text>
              )}
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => onEdit?.(treatment)}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="edit" size={16} color={COLORS.primary} />
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
              activeOpacity={0.7}
            >
              <FontAwesome5 name="trash-alt" size={16} color="#FF6B6B" />
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
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
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  normalBadge: {
    backgroundColor: COLORS.grayLight,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  normalText: {
    color: COLORS.textSub,
  },
  expandButton: {
    padding: 4,
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
  
  // Estilos da Seção Expandida
  expandedSection: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
  },
  scheduleSection: {
    marginBottom: SPACING.md,
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: SPACING.sm,
  },
  scheduleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scheduleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  scheduleTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  noScheduleText: {
    fontSize: 12,
    color: COLORS.textSub,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  editButton: {
    backgroundColor: COLORS.primaryLight,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: '#FFE5E5',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B6B',
  },
});

export default TreatmentCard;