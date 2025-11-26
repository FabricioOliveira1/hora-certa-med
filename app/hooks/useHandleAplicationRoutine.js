function useHandleAplicationRoutine() {
  function handleAgenda(dataInicial, repeticoes, intervaloHoras) {
    const agenda = [];

    for (let i = 0; i < repeticoes; i++) {
      const novaData = new Date(dataInicial.getTime() + i * intervaloHoras * 60 * 60 * 1000);

      const horas = novaData.getHours().toString().padStart(2, '0');
      const minutos = novaData.getMinutes().toString().padStart(2, '0');

      const horarioFormatado = `${horas}:${minutos}`; // Formato 24 horas

      agenda.push({
        routineId: i + 1,
        hour: horarioFormatado,
        timestamp: novaData,
      });
    }

    return agenda;
  }

  function handleNextRoutine(agenda) {
    const now = new Date();
    const proxima = agenda.find(item => item.timestamp > now);

    return proxima || null; // retorna null se todas já passaram
  }

function todayList(lista) {
  const hoje = new Date();

  return lista.filter(item => {
    const dataItem = new Date(item.timestamp);
    return (
      dataItem.getFullYear() === hoje.getFullYear() &&
      dataItem.getMonth() === hoje.getMonth() &&
      dataItem.getDate() === hoje.getDate()
    );
  });
}

  return {
    handleAgenda,
    handleNextRoutine,
    todayList
  };
}

export default useHandleAplicationRoutine;
