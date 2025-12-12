import { Treatment } from "../context/TreatmentProvider";
import { RoutineItem } from "../hooks/useHandleAplicationRoutine";

export default function getGlobalList(treatment: Treatment[]) {
    const todayList: Array<{routineId: number; id: number; name: string; amount: number; hour: string}> = []

    if (treatment.length !== 0){
      treatment.map((item) => {
      const treatmentName = item.name;
      const treatmentAmount = item.amount;
      
       item.today?.map((today: RoutineItem) => {
        todayList.push({
          routineId: today.routineId,
          id: todayList.length + 1,
          name: treatmentName,
          amount: treatmentAmount,
          hour: today.hour
        }) 
      }) 

    })
    }
    return todayList;
  } 
