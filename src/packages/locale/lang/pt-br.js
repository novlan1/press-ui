export default {
  name: 'Nome',
  tel: 'Telefone',
  save: 'Save',
  confirm: 'Salvar',
  cancel: 'Cancelar',
  delete: 'Excluir',
  complete: 'Completo',
  loading: 'Carregando...',
  telEmpty: 'Por favor preencha o tel',
  nameEmpty: 'Por favor, preencha o nome',
  nameInvalid: 'Nome malformado',
  confirmDelete: 'Tem certeza de que deseja excluir?',
  telInvalid: 'Número de telefone incorreto',
  reply: 'Recuperação',
  calendar: {
    end: 'Fim',
    start: 'Começar',
    title: 'Calendário',
    startEnd: 'Começar/Fim',
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: maxRange => `Escolha no máximo ${maxRange} dias`,
  },
  dialog: {
    title: 'Incitar',
  },
  scheduleTree: {
    pending: 'Pendente',
    emptyTeam: 'Adversário ausente',
    quitScore: 'Desistir',
    champion: 'Campeão',
    thirdPlace: 'Terceiro lugar',
    checkFinal: 'Confira Final >',
    groupedChampion: isChampion => (isChampion ? 'Grupo Campeão' : 'Terceiro lugar no grupo'),

    ended: 'Terminou',
    playing: 'Partida em andamento…',
    currentBo: (curBo, boType) => `Atual: Partida (${curBo}/${boType})`,

    joining: 'Entrando… ',
    joiningAndTimeoutAutoQuit: 'Entrando... Desistência automática por tempo expirado',
    startMatchOnTime: 'Começa em dd/MM, hh:mm (UTC±0)',
    endTimeFormat: 'dd/MM, hh:mm',

    startBattleAuto: 'Inicia ao completar',
    startBattleManual: 'Aguardando o admin. iniciar',
    startBattleOnTime: 'Início da programação',
  },
  scheduleList: {
    finals: 'Grande final',
    finalsChampion: 'Campeão',
    me: 'Eu',

    joinDeadline: 'Prazo: dd/MM hh:mm',

    manage: 'Gerenciar',
    spectate: 'Assistir',
    toPlay: 'Ir para a partida',
    reCap: 'Resumo',
    subscribe: 'Assinar',
    subscribed: 'Assinado',
  },
  actTipDialog: {
    prompt: 'Prompt Description',
  },
};
