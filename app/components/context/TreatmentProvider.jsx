import { doc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, db } from "../../../firebaseConfig";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";
import getGlobalList from "../utils/getGlobalList";


export const TreatmentContext = createContext();

export default function TreatmentProvider({ children }) {

  const [treatment, setTreatment] = useState([]);
  const [list, setList] = useState([])

  const { handleAgenda, handleNextRoutine, todayList } = useHandleAplicationRoutine()

  useEffect(() => {
    sincronizaTratamentos(treatment)
    setList(getGlobalList(treatment))
    console.log("treatment no useEffect do provider: ", treatment)
  }, [treatment])

  async function sincronizaTratamentos(treatment) {
    try {
      // Verifica se o usuário está autenticado
      const user = auth.currentUser;
      if (!user || !treatment) {
        return;
      }
      console.log("Sincronizando tratamentos com o Firestore:", treatment);
      // A função setDoc cria ou substitui um documento em uma coleção específica
      // Aqui estou criando um documento na coleção "users" com o ID do usuário autenticado
      // A função doc(db, 'users', user.uid) cria uma referência para o documento do usuário
      // O segundo argumento de setDoc é um OBJETO com os dados que queremos armazenar no documento
      await setDoc(doc(db, 'users', user.uid), { treatment })
    } catch (e) {
      console.error("Erro ao buscar tratamentos: ", e);
    }
  }

  async function adicionarTratamento({ name, initialDate, interval, amount }) {
    try {
      // Verifica se o usuário está autenticado
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const aplicationRoutine = handleAgenda(initialDate, amount, interval)
      const nextAplication = handleNextRoutine(aplicationRoutine)
      const todaysList = todayList(aplicationRoutine)

      console.log("treatment antes de iterar: ", treatment)

      const tratamento = [  ...treatment,
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

  const onConsumingMedicine = ({ name, routineId }) => {

    const updatedTreatments = treatment.map(item => {
      if (item.name !== name) {
        return item;
      } else {

        const updatedAplicationRoutine = item.aplicationRoutine.filter(element => element.routineId !== routineId)

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

  const onDeleteTreatment = (id) => {
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