import React from 'react';

export interface TreatmentProps {
  treatmentId: string,
  medication: string;
  form: 'pills' | 'tint';
  dosage: number;
  aplicationInterval: number;
  isContinuous: boolean;
  isDailyUse: boolean;
  duration: number;
  hasAlarm: boolean;
  notes: string;
  initialDate: Date;
  agenda: HorarioRemedio[];
  nextAplication: HorarioRemedio | null
  progressBar: ProgressoTratamento
}

export interface HorarioRemedio {
  treatmentId: string;
  doseId: string;
  medication: string;
  dosage: number;
  horario: Date;
  status: 'tomado' | 'pendente';
  countdown: string;
  form: 'pills' | 'tint';
  info?: string
}

export interface ProgressoTratamento {
  texto: string;
  porcentagem: number;
  diasDecorridos: number;
  diasTotais: number;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  alert?: boolean;
  icon: React.ReactNode;
  bgIcon: string;
  textColor?: string;
}


/* ---------------------------------------------------------- */




export type TabType = 'Início' | 'Remédios' | 'Histórico' | 'Ajustes';

export enum TreatmentIcon {
  PILL = 'pills',
  SUN = 'wb_sunny',
  DROP = 'tint',
  CAPSULE = 'medication'
}

export enum TreatmentStatus {
  ONGOING = 'Em andamento',
  COMPLETED = 'Completo',
  PENDING = 'Pendente'
}

export interface Treatment {
  id: string;
  name: string;
  dosage: string; // e.g., "500g"
  presentation?: string; // e.g., "1 comprimido", "30 gotas"
  icon: TreatmentIcon;
  colorClass: string;
  progress: number; // 0 to 100
  timeLabel: string; // e.g., "14:00", "Amanhã"
  timeType: 'schedule' | 'calendar' | 'none';
  status: TreatmentStatus;
  detailLabel: string; // e.g., "12/21 dias", "Uso contínuo"
}

export interface AppStats {
  active: number;
  completed: number;
  pending: number;
}

export type MedicationStatus = 'TOMADO' | 'PENDENTE' | 'FUTURO' | 'ADIADO';

export enum MedStatus {
  TAKEN = 'TAKEN',
  POSTPONED = 'POSTPONED',
  MISSED = 'MISSED',
  PENDING = 'PENDING'
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  form?: string;
  time?: string;
  scheduledTime?: string;
  actualTime?: string;
  statusText?: string;
  status?: MedStatus; 
  icon?: string;
  color?: string;
  iconType: 'pill' | 'drop' | 'bottle' | 'syringe';
}

export interface DayInfo {
  day: number;
  hasActivity: boolean;
  activityCount: number;
  isToday: boolean;
  isSelected: boolean;
}

export interface DayLog {
  date: string; // e.g. "Hoje, 24 de Outubro"
  medications: Medication[];
}

export type FilterType = 'Todos' | 'Tomados' | 'Adiados';


export default TreatmentProps;