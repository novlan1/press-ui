import ZH_CN_LANG from './zh-CN';

export default {
  ...ZH_CN_LANG,

  name: '姓名',
  tel: '電話',
  save: '保存',
  confirm: '確認',
  cancel: '取消',
  delete: '刪除',
  complete: '完成',
  loading: '加載中...',
  telEmpty: '請填寫電話',
  nameEmpty: '請填寫姓名',
  nameInvalid: '請輸入正確的姓名',
  confirmDelete: '確定要刪除嗎',
  telInvalid: '請填寫正確的電話',
  reply: '回复',
  calendar: {
    end: '結束',
    start: '開始',
    title: '日期選擇',
    confirm: '確定',
    startEnd: '開始/結束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: maxRange => `選擇天數不能超過 ${maxRange} 天`,
  },
  picker: {
    confirm: '確定',
  },
};
