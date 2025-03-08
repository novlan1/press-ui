import EN_US_LANG from './en-US';


export default {
  ...EN_US_LANG,

  name: 'お名前',
  tel: '電話番号',
  save: 'セーブ',
  confirm: '確認',
  cancel: 'キャンセル',
  delete: '削除',
  complete: '完了',
  loading: '読み込み中...',
  telEmpty: '電話番号を入力してください',
  nameEmpty: '名前を入力してください',
  nameInvalid: '正しい名前を入力してください',
  confirmDelete: '本当に削除しますか',
  telInvalid: '正しい電話番号を入力してください',
  reply: 'Reply',
  clear: 'Clear',
  calendar: {
    end: '終了',
    start: '開始',
    title: '日付選択',
    startEnd: '開始/終了',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: maxRange => `${maxRange}日以内を選択してください`,
  },
};
