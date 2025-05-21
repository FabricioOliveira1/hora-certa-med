

function useHandleAplicationRoutine() {

  function handleAgenda(dataInicial, repeticoes, intervaloHoras) {

    const agenda = [];

    for (let i = 0; i < repeticoes; i++) {
      const novaData = new Date(dataInicial.getTime());
      novaData.setHours(novaData.getHours() + (i * intervaloHoras));

      // Formata como: dd/mm/yyyy - hh:mm AM/PM
      /* const dia = novaData.getDate().toString().padStart(2, '0');
      const mes = (novaData.getMonth() + 1).toString().padStart(2, '0');
      const ano = novaData.getFullYear(); */

      let horas = novaData.getHours();
      const minutos = novaData.getMinutes().toString().padStart(2, '0');
/*       const ampm = horas >= 12 ? 'PM' : 'AM';
 */      const horas12 = horas % 12 === 0 ? 12 : horas % 12;

      /* const horarioFormatado = `${dia}/${mes}/${ano} - ${horas12}:${minutos} ${ampm}`; */
      const horarioFormatado = `${horas12}:${minutos}`; 
      agenda.push(horarioFormatado);
    }
    return agenda;
  }

  function handleNextRoutine(agenda) {
    const aplicationRoutine = agenda.sort((a, b) => a.aplicationId - b.aplicationId);
    const nextAplication = aplicationRoutine[0]
    return (
      nextAplication
    )
  }

  return {
   handleAgenda,
   handleNextRoutine
  }
}
export default useHandleAplicationRoutine;


