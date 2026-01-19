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
/*   onConsumingMedicine: (args: { name: string; routineId: number }) => void;
  onDeleteTreatment: (id: number) => void; */
  adicionarTratamento: (treatmentData: TreatmentProps) => void /* (args: {
    name: string;
    initialDate: Date;
    interval: number;
    amount: number;
  }) => Promise<void>; */
/*   setTreatment: React.Dispatch<React.SetStateAction<Treatment[]>>;
list: any[]; */
treatments: TreatmentProps[];
}


export const TreatmentContext = createContext<TreatmentContextType | null>(null);

export default function TreatmentProvider({ children }: { children: React.ReactNode }) {

  const [treatments, setTreatments] = useState<TreatmentProps[]>([]);
  /*   const [list, setList] = useState<any[]>([])
   */
  const { gerarAgendaRemedios, handleNextRoutine, calcularProgressoTratamento} = useHandleAplicationRoutine()

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
    const id = uuidv4();

    const agenda = gerarAgendaRemedios(id, medication, dosage, initialDate, duration, aplicationInterval);
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
        id: id,
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
    console.log("treatment depois de iterar: ", tratamento)
    setTreatments(tratamento);
    /*
          setTreatment(tratamento)
          Alert.alert("Adicionado com sucesso!");
        } catch (e) {
          Alert.alert("Não foi possível adicionar.");
          console.error("Erro ao adicionar tratamento: ", e);
        } */
  }

  /*  const onConsumingMedicine = ({ name, routineId }: { name: string; routineId: number }) => {
 
     const updatedTreatments = treatment.map(item => {
       if (item.name !== name) {
         return item;
       } else {
 
         const updatedAplicationRoutine = item.aplicationRoutine.filter((element: any) => element.routineId !== routineId)
 
         return {
           ...item,
           amount: item.amount - 1,
           aplicationRoutine: updatedAplicationRoutine,
           nextAplication: handleNextRoutine(updatedAplicationRoutine),
           today: todayList(updatedAplicationRoutine)
         };
       }
 
     })
 
     const treatmentfiltered = updatedTreatments.filter(item => item.amount > 0)
     setTreatment(treatmentfiltered)
   } */

  /*  const onDeleteTreatment = (id: number) => {
     const updatedTreatment = treatment.filter(treatment => treatment.treatmentId !== id)
     setTreatment(updatedTreatment)
   } */

  return (
    <TreatmentContext.Provider value={{
  /* onConsumingMedicine, */
/*   onDeleteTreatment,
 */  adicionarTratamento,
     treatments
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}
