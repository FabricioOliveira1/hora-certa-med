import { HorarioRemedio, ProgressoTratamento } from "../types/types";

interface RoutineItem {
  routineId: number;
  hour: string;
  timestamp: Date;
}

interface UseHandleAplicationRoutineReturn {
  handleNextRoutine: (agenda: HorarioRemedio[]) => HorarioRemedio | null;
  gerarAgendaRemedios: (dataInicial: Date, repeticoes: number, intervaloHoras: number) => HorarioRemedio[];
  calcularProgressoTratamento: (dataInicial: Date, diasTotais: number) => ProgressoTratamento;
  /*   todayList: (lista: HorarioRemedio[]) => RoutineItem[];*/
}

function useHandleAplicationRoutine(): UseHandleAplicationRoutineReturn {

  function handleNextRoutine(agenda: HorarioRemedio[]) {
    const now = new Date();
    const proxima = agenda.find(item => item.horario > now);

    return proxima || null; // retorna null se todas já passaram
  }

  function calcularCountdown(horario: Date, agora: Date): string {
    const diferencaMs = horario.getTime() - agora.getTime();

    // Se o horário já passou
    if (diferencaMs < 0) {
      const diffPositivo = Math.abs(diferencaMs);
      const horas = Math.floor(diffPositivo / (1000 * 60 * 60));
      const minutos = Math.floor((diffPositivo % (1000 * 60 * 60)) / (1000 * 60));
      return `Atrasado há ${horas}h ${minutos}min`;
    }

    // Se o horário está no futuro
    const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));

    if (dias > 0) {
      return `${dias}d ${horas}h ${minutos}min`;
    } else if (horas > 0) {
      return `${horas}h ${minutos}min`;
    } else {
      return `${minutos}min`;
    }
  }

  function gerarAgendaRemedios(dataInicial: Date, repeticoes: number, intervaloHoras: number): HorarioRemedio[] {

    const agenda: HorarioRemedio[] = [];
    const agora = new Date();

    // Calcula o horário final (data inicial + número de dias)
    const dataFinal = new Date(dataInicial);
    dataFinal.setDate(dataFinal.getDate() + repeticoes);

    // Gera os horários continuamente até o fim do período
    let horarioAtual = new Date(dataInicial);

    while (horarioAtual < dataFinal) {
      // Determina o status baseado se o horário já passou
      const status: 'tomado' | 'pendente' = horarioAtual < agora ? 'tomado' : 'pendente';

      // Calcula o countdown
      const countdown = calcularCountdown(horarioAtual, agora);

      agenda.push({
        horario: new Date(horarioAtual),
        status,
        countdown
      });

      // Adiciona o intervalo em horas
      horarioAtual.setHours(horarioAtual.getHours() + intervaloHoras);
    }

    return agenda;
  }

  function calcularProgressoTratamento(
    dataInicial: Date,
    diasTotais: number
  ): ProgressoTratamento {
    const agora = new Date();
    const dataFinal = new Date(dataInicial);
    dataFinal.setDate(dataFinal.getDate() + diasTotais);

    // Se ainda não começou o tratamento
    if (agora < dataInicial) {
      return {
        texto: `0/${diasTotais} dias de uso`,
        porcentagem: 0,
        diasDecorridos: 0,
        diasTotais
      };
    }

    // Se já terminou o tratamento
    if (agora >= dataFinal) {
      return {
        texto: `${diasTotais}/${diasTotais} dias de uso`,
        porcentagem: 100,
        diasDecorridos: diasTotais,
        diasTotais
      };
    }

    // Calcula os dias decorridos
    const diferencaMs = agora.getTime() - dataInicial.getTime();
    const diasDecorridos = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    // Calcula a porcentagem
    const porcentagem = Math.round((diasDecorridos / diasTotais) * 100);

    return {
      texto: `${diasDecorridos}/${diasTotais} dias de uso`,
      porcentagem,
      diasDecorridos,
      diasTotais
    };
  }

  /*   function handleAgenda(dataInicial: Date, repeticoes: number, intervaloHoras: number) {
      const agenda: RoutineItem[] = [];
  
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
    } */

  function todayList(lista: HorarioRemedio[]) {
    const hoje = new Date();

    return lista.filter(item => {
      const dataItem = new Date(item.horario);
      return (
        dataItem.getFullYear() === hoje.getFullYear() &&
        dataItem.getMonth() === hoje.getMonth() &&
        dataItem.getDate() === hoje.getDate()
      );
    });
  }

  return {
    gerarAgendaRemedios,
    handleNextRoutine,
    calcularProgressoTratamento
    /* todayList */
  };
}

export default useHandleAplicationRoutine;
