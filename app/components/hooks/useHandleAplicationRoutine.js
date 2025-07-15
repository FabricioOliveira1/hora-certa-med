function useHandleAplicationRoutine() {
  function handleAgenda(dataInicial, repeticoes, intervaloHoras) {
    const agenda = [];

    for (let i = 0; i < repeticoes; i++) {
      const novaData = new Date(dataInicial.getTime() + i * intervaloHoras * 60 * 60 * 1000);

      const horas = novaData.getHours();
      const minutos = novaData.getMinutes().toString().padStart(2, '0');
      const horas12 = horas % 12 === 0 ? 12 : horas % 12;
      const ampm = horas >= 12 ? 'PM' : 'AM';

      const horarioFormatado = `${horas12}:${minutos} ${ampm}`;

      agenda.push({
        routineId: i + 1,
        hour: horarioFormatado,
        timestamp: novaData // salva também a data original para comparações
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
