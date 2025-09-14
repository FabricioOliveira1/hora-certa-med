export default function getGlobalList(treatment) {
    const todayList = []

    if (treatment.length !== 0){
      treatment.map((item) => {
      const treatmentName = item.name;
      const treatmentAmount = item.amount;
      
       item.today.map((today) => {
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