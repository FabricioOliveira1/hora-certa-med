import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";
import { TreatmentProps } from "../types/types";

/* export interface Treatment {
  treatmentId: number;
  name: string;
  initialDate: string;
  interval: number;
  amount: number;
  aplicationRoutine: any[];
  nextAplication?: any;
  today?: any;
} */

interface TreatmentContextType {
  onDeleteTreatment: (id: string) => void;
  adicionarTratamento: (treatmentData: TreatmentProps) => void; 
  setTreatments: React.Dispatch<React.SetStateAction<TreatmentProps[]>>;
  treatments: TreatmentProps[];
}


export const TreatmentContext = createContext<TreatmentContextType | null>(null);

export default function TreatmentProvider({ children }: { children: React.ReactNode }) {

  const [treatments, setTreatments] = useState<TreatmentProps[]>([]);
  /*   const [list, setList] = useState<any[]>([])
   */
  const { gerarAgendaRemedios, handleNextRoutine, calcularProgressoTratamento } = useHandleAplicationRoutine()

  /*   useEffect(() => {
      sincronizaTratamentos(treatment)
      setList(getGlobalList(treatment))
      console.log("treatment no useEffect do provider: ", treatment)
    }, [treatment]) */

  /*   async function sincronizaTratamentos(treatment: Treatment[]) {
      try {
        const user = auth.currentUser;
        if (!user || !treatment) {
          return;
        }
        console.log("Sincronizando tratamentos com o Firestore:", treatment);
        await setDoc(doc(db, 'users', user.uid), { treatment })
      } catch (e) {
        console.error("Erro ao buscar tratamentos: ", e);
      }
    }
   */
  function adicionarTratamento(treatmentData: TreatmentProps) {
    const {
      medication,
      form,
      dosage,
      aplicationInterval,
      isContinuous,
      isDailyUse,
      duration,
      hasAlarm,
      notes,
      initialDate,
    } = treatmentData;
    const treatmentId = uuidv4();


    const agenda = gerarAgendaRemedios(treatmentId, medication, dosage, initialDate, duration, aplicationInterval);
    const nextAplication = handleNextRoutine(agenda);
    const progressBar = calcularProgressoTratamento(initialDate, duration);

    /* try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const aplicationRoutine = handleAgenda(initialDate, amount, interval)
      const nextAplication = handleNextRoutine(aplicationRoutine)
      const todaysList = todayList(aplicationRoutine)

      console.log("treatment antes de iterar: ", treatment)
*/
    const tratamento: TreatmentProps[] = [
      ...treatments,
      {
        treatmentId: treatmentId,
        medication: medication,
        form: form,
        dosage: dosage,
        aplicationInterval: aplicationInterval,
        initialDate: initialDate,
        agenda: agenda,
        isContinuous: isContinuous,
        isDailyUse: isDailyUse,
        duration: duration,
        hasAlarm: hasAlarm,
        notes: notes,
        nextAplication: nextAplication,
        progressBar: progressBar
      }
    ]
    setTreatments(tratamento);
    /*
          setTreatment(tratamento)
          Alert.alert("Adicionado com sucesso!");
        } catch (e) {
          Alert.alert("Não foi possível adicionar.");
          console.error("Erro ao adicionar tratamento: ", e);
        } */
  }

  const onDeleteTreatment = (id: string) => {
    const updatedTreatment = treatments.filter(treatment => treatment.treatmentId !== id)
    setTreatments(updatedTreatment)
  }

  return (
    <TreatmentContext.Provider value={{
      onDeleteTreatment,
      adicionarTratamento,
      setTreatments,
      treatments
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}
