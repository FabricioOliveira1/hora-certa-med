import { createContext, useState } from "react";
import useHandleAplicationRoutine from "../hooks/useHandleAplicationRoutine";

export const TreatmentContext = createContext();

export default function TreatmentProvider({ children }) {

  const [treatment, setTreatment] = useState([]);

  const {handleAgenda, handleNextRoutine} = useHandleAplicationRoutine()
  /* {
    name: Dipirona
    initialDate: new Date().now
    interval: 8 em 8
    amount: 30 comprimidos
    aplicationRoutine: [
      {hour: 10:00, aplicationId: 1},
      {hour: 18:00, aplicationId: 2},
      {hour: 24:00, aplicationId: 3},
    ] será um hook personalizado com a logica de gerar a rotina 
    nextAplication: {
        aplicationRoutine.sort((a, b) => a.aplicationId - b.aplicationId);
        const nextAplication = aplicationRoutine[0]
        */
  const onAddingTreatment = ({ name, initialDate, interval, amount }) => {

    const aplicationRoutine = handleAgenda(initialDate, amount, interval)
    const nextAplication = handleNextRoutine(aplicationRoutine)
    setTreatment(oldstate => {
      return [
        ...oldstate,
        {
          id: oldstate.length + 1,
          name: name,
          initialDate: initialDate.toLocaleDateString(),
          interval: interval,
          amount: amount,
          aplicationRoutine: aplicationRoutine,
          nextAplication: nextAplication
        }
      ]
    })
  }

  const onConsumingMedicine = (id, aplicationId, consumedTime) => {
  setTreatment(prev =>
    prev.map((t) => {
      if (t.id === id) {
        if (t.nextAplication?.aplicationId === aplicationId) {
          // Remove aplicação consumida
          const updatedRoutine = t.aplicationRoutine.filter(
            (item) => item.aplicationId !== aplicationId
          );

          // Recalcula a próxima aplicação (se houver)
          const sortedRoutine = [...updatedRoutine].sort(
            (a, b) => a.aplicationId - b.aplicationId
          );
          const nextAplication = sortedRoutine.length > 0 ? sortedRoutine[0] : null;

          return {
            ...t,
            aplicationRoutine: updatedRoutine,
            amount: t.amount - 1,
            nextAplication,
          };
        }
      }
      return t;
    })
  );
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