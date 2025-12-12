import { useContext } from "react";
import { TreatmentContext, TreatmentContextType } from "./TreatmentProvider";

export default function useTreatamentContext(): TreatmentContextType {
  const context = useContext(TreatmentContext)

  if(!context) {
    throw new Error('Tentando acessar contexto fora do treatmentProvider')
  }
  return context
}
