import EN_US_LANG from './en-US';


export default {
  ...EN_US_LANG,

  name: 'Nom',
  tel: 'Telephone',
  save: 'Sauvegarder',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  delete: 'Suprimer',
  complete: 'Terminé',
  loading: 'Chargement...',
  telEmpty: 'Veuillez remplir le tel',
  nameEmpty: 'Veuillez remplir le nom',
  nameInvalid: 'Nom incorrect',
  confirmDelete: 'Êtes-vous sûr de vouloir supprimer?',
  telInvalid: 'Numéro de téléphone incorrect',
  reply: 'Reply',
  calendar: {
    end: 'Fin',
    start: 'Début',
    title: 'Calendrier',
    startEnd: 'Début/Fin',
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: maxRange => `Choisir pas plus de ${maxRange} jours`,
  },
};
