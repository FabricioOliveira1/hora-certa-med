import { createContext, useState } from "react";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";

export const TreatmentContext = createContext();

export default function TreatmentProvider({ children }) {

  const [treatment, setTreatment] = useState([]);

  const {handleAgenda, handleNextRoutine, todayList} = useHandleAplicationRoutine()
  
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

  const onConsumingMedicine = ({id}) => {
    console.log('treatment today: ', treatment[0].today)
    console.log('treatment aplicationRoutine: ', treatment[0].aplicationRoutine)
    console.log('id: ', id)
  };


  return (
    <TreatmentContext.Provider value={{
      onAddingTreatment,
      onConsumingMedicine,
      treatment
    }}>
      {children}
    </TreatmentContext.Provider>
  )
}