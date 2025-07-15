import { createContext, useEffect, useState } from "react";
import useGetGlobalTodayList from "../hooks/useGetTodayGlobalList";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";

export const TreatmentContext = createContext();

export default function TreatmentProvider({ children }) {

  const [treatment, setTreatment] = useState([]);
  const [list, setList] = useState([])

  const { getGlobalList } = useGetGlobalTodayList()
  const { handleAgenda, handleNextRoutine, todayList } = useHandleAplicationRoutine()

  useEffect(() => {
    setList(getGlobalList(treatment))
  }, [treatment])

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

  return (
    <TreatmentContext.Provider value={{
      onAddingTreatment,
      onConsumingMedicine,
      treatment,
      setTreatment,
      list
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}