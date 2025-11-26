import { useContext } from "react";
import { TreatmentContext } from "./TreatmentProvider";

export default function useTreatamentContext() {
  const context = useContext(TreatmentContext)

  if(!context) {
    throw new Error('Tentando acessar contexto fora do treatmentProvider')
  }
  return context
}