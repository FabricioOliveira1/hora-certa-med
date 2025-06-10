import useTreatamentContext from "../context/useTreatmentContext";

function useGetGlobalTodayList() {
  const { treatment } = useTreatamentContext()


  function getGlobalList() {
    const todayList = []
    
    treatment.map((treatment) => {
      const treatmentName = treatment.name;
      const treatmentAmount = treatment.amount;
      
      treatment.today.map((today) => {
        todayList.push({
          id: Math.random().toString(36).substring(2),
          name: treatmentName,
          amount: treatmentAmount,
          hour: today.hour
        })
      })

    })
    return todayList
  }


  return {
    getGlobalList
  }

}

export default useGetGlobalTodayList;