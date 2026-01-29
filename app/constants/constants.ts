
/* import { Pill, Droplets, FlaskConical, Syringe } from 'lucide-react';
 */ import { DayLog, MedStatus } from '../types/types';

/* export const ICON_MAP = {
  pill: <FontAwesome name='flask'  />,
  drop: <Droplets className="w-5 h-5" />,
  bottle: <FlaskConical className="w-5 h-5" />,
  syringe: <Syringe className="w-5 h-5" />
}; */

// Fixed: Added explicit DayLog[] type and used MedStatus enum values. 
// This ensures that the 'status' field is not inferred as a generic string, which fixes the error in App.tsx.
export const MOCK_HISTORY: DayLog[] = [
  {
    date: "Hoje, 24 de Outubro",
    medications: [
      {
        id: '1',
        name: 'Amoxicilina',
        dosage: '500mg',
        scheduledTime: '08:00',
        statusText: 'Tomado na hora',
        status: MedStatus.TAKEN, 
        iconType: 'pill',
      },
      {
        id: '2',
        name: 'Omeprazol',
        dosage: '20mg',
        scheduledTime: '08:30',
        actualTime: '08:45',
        statusText: 'Tomado 15m depois',
         status: MedStatus.TAKEN,
         iconType: 'drop'
      },
      {
        id: '3',
        name: 'Vitamina C',
        dosage: '',
        scheduledTime: '12:00',
        actualTime: '13:00',
        statusText: 'Adiado',
         status: MedStatus.POSTPONED,
         iconType: 'bottle'
      }
    ]
  },
  {
    date: "Ontem, 23 de Outubro",
    medications: [
      {
        id: '4',
        name: 'Dipirona',
        dosage: '1g',
        scheduledTime: '20:00',
        statusText: 'Tomado',
        status: MedStatus.TAKEN, 
        iconType: 'pill'
      },
      {
        id: '5',
        name: 'Ibuprofeno',
        dosage: '600mg',
        scheduledTime: '16:00',
        statusText: 'Não registrado',
        status: MedStatus.MISSED, 
        iconType: 'syringe'
      }
    ]
  }
];

export default MOCK_HISTORY;