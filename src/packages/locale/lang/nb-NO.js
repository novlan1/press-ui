import EN_US_LANG from './en-US';


export default {
  ...EN_US_LANG,

  name: 'Navn',
  tel: 'Telefon',
  save: 'Lagre',
  confirm: 'Bekreft',
  cancel: 'Avbryt',
  delete: 'Slett',
  complete: 'Fullfør',
  loading: 'Laster...',
  telEmpty: 'Vennligst fyll inn telefonnummer',
  nameEmpty: 'Vennligst fyll inn navn',
  nameInvalid: 'Ugyldig navn',
  confirmDelete: 'Er du sikker på at du vil slette?',
  telInvalid: 'Ugyldig telefonnummer',
  reply: 'Reply',
  clear: 'Clear',
  calendar: {
    end: 'Slutt',
    start: 'Start',
    title: 'Kalendar',
    startEnd: 'Start/Slutt',
    weekdays: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: maxRange => `Maks. ${maxRange} dager`,
  },
};
