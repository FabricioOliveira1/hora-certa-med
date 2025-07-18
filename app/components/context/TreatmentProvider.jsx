import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import useGetGlobalTodayList from "../hooks/useGetTodayGlobalList";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";

export const TreatmentContext = createContext();

export default function TreatmentProvider({ children }) {

  const TASKS_STORAGE_KEY = 'focus-tasks';

  const [treatment, setTreatment] = useState([]);
  const [list, setList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const { getGlobalList } = useGetGlobalTodayList()
  const { handleAgenda, handleNextRoutine, todayList } = useHandleAplicationRoutine()


  useEffect(() => {
    if (isLoaded) {
      storeData(treatment);
    }
    setList(getGlobalList(treatment))
  }, [treatment])

    useEffect(() => {
    const fetchData = async () => {
      const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      const loadedData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTreatment(loadedData);
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  const storeData = async (treatment) => {
    try {
      const jsonValue = JSON.stringify(treatment);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const onAddingTreatment = ({ name, initialDate, interval, amount }) => {

    const aplicationRoutine = handleAgenda(initialDate, amount, interval)
    const nextAplication = handleNextRoutine(aplicationRoutine)
    const todaysList = todayList(aplicationRoutine)

    setTreatment(oldstate => {
      return [
        ...oldstate,
        {
          treatmentId: oldstate.length + 1,
          name: name,
          initialDate: initialDate.toLocaleDateString('pt-BR'),
          interval: interval,
          amount: amount,
          aplicationRoutine: aplicationRoutine,
          nextAplication: nextAplication,
          today: todaysList
        }
      ]
    })
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
      onAddingTreatment,
      onConsumingMedicine,
      onDeleteTreatment,
      treatment,
      list
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}