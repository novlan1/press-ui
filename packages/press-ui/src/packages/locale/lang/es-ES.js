import EN_US_LANG from './en-US';


export default {
  ...EN_US_LANG,

  name: 'Nombre',
  tel: 'Teléfono',
  save: 'Guardar',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  complete: 'Completado',
  loading: 'Cargando...',
  telEmpty: 'Por favor rellena el teléfono',
  nameEmpty: 'Por favor rellena el nombre',
  nameInvalid: 'nombre inválido',
  confirmDelete: 'Estás seguro de eliminarlo?',
  telInvalid: 'Teléfono inválido',
  reply: 'Reply',
  calendar: {
    end: 'Fin',
    start: 'Inicio',
    title: 'Calendario',
    startEnd: 'Inicio/Fin',
    weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: maxRange => `Elija no más de ${maxRange} días`,
  },
};
