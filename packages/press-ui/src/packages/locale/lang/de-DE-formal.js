import EN_US_LANG from './en-US';

export default {
  ...EN_US_LANG,

  name: 'Name',
  tel: 'Telefon',
  save: 'Speichern',
  confirm: 'Bestätigen',
  cancel: 'Abbrechen',
  delete: 'Löschen',
  complete: 'Complete',
  loading: 'Laden...',
  telEmpty: 'Bitte füllen Sie das Telefon aus',
  nameEmpty: 'Bitte geben Sie den Name an',
  nameInvalid: 'Ungültiger Name',
  confirmDelete: 'Sind Sie sicher, dass Sie löschen möchten?',
  telInvalid: 'Ungültige Telefonnummer',
  reply: 'Reply',
  clear: 'Clear',
  calendar: {
    end: 'Ende',
    start: 'Start',
    title: 'Kalender',
    startEnd: 'Start/Ende',
    weekdays: ['So', 'Mo', 'Di', 'Mo', 'Do', 'Fr', 'Sa'],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: maxRange => `Wähle nicht mehr als ${maxRange} Tage`,
  },
};
