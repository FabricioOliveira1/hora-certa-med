import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";
import getGlobalList from "../utils/getGlobalList";

export interface Treatment {
  treatmentId: number;
  name: string;
  initialDate: string;
  interval: number;
  amount: number;
  aplicationRoutine: any[];
  nextAplication?: any;
  today?: any;
}

export interface TreatmentContextType {
  onConsumingMedicine: (args: { name: string; routineId: number }) => void;
  onDeleteTreatment: (id: number) => void;
  adicionarTratamento: (args: {
    name: string;
    initialDate: Date;
    interval: number;
    amount: number;
  }) => Promise<void>;
  setTreatment: React.Dispatch<React.SetStateAction<Treatment[]>>;
  treatment: Treatment[];
  list: any[];
}

export const TreatmentContext = createContext<TreatmentContextType | null>(null);

export default function TreatmentProvider({ children }: { children: React.ReactNode }) {

  const [treatment, setTreatment] = useState<Treatment[]>([]);
  const [list, setList] = useState<any[]>([])

  const { handleAgenda, handleNextRoutine, todayList } = useHandleAplicationRoutine()

  useEffect(() => {
    sincronizaTratamentos(treatment)
    setList(getGlobalList(treatment))
    console.log("treatment no useEffect do provider: ", treatment)
  }, [treatment])

  async function sincronizaTratamentos(treatment: Treatment[]) {
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

  async function adicionarTratamento({ name, initialDate, interval, amount }: { name: string; initialDate: Date; interval: number; amount: number }) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const aplicationRoutine = handleAgenda(initialDate, amount, interval)
      const nextAplication = handleNextRoutine(aplicationRoutine)
      const todaysList = todayList(aplicationRoutine)

      console.log("treatment antes de iterar: ", treatment)

      const tratamento: Treatment[] = [
        ...treatment,
        {
          treatmentId: treatment.length + 1,
          name: name,
          initialDate: initialDate.toLocaleDateString('pt-BR'),
          interval: interval,
          amount: amount,
          aplicationRoutine: aplicationRoutine,
          nextAplication: nextAplication,
          today: todaysList
        }
      ]
      console.log("treatment depois de iterar: ", tratamento)

      setTreatment(tratamento)
      Alert.alert("Adicionado com sucesso!");
    } catch (e) {
      Alert.alert("Não foi possível adicionar.");
      console.error("Erro ao adicionar tratamento: ", e);
    }
  }

  const onConsumingMedicine = ({ name, routineId }: { name: string; routineId: number }) => {

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
  }

  const onDeleteTreatment = (id: number) => {
    const updatedTreatment = treatment.filter(treatment => treatment.treatmentId !== id)
    setTreatment(updatedTreatment)
  }

  return (
    <TreatmentContext.Provider value={{
      onConsumingMedicine,
      onDeleteTreatment,
      adicionarTratamento,
      setTreatment,
      treatment,
      list
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}
