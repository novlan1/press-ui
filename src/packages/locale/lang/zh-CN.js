export default {
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',
  reply: '回复',
  calendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    confirm: '确定',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year, month) => `${year}年${month}月`,
    rangePrompt: maxRange => `选择天数不能超过 ${maxRange} 天`,
  },
  picker: {
    confirm: '确定',
  },
  dialog: {
    title: '温馨提示',
  },
  scheduleTree: {
    pending: '待定',
    emptyTeam: '轮空',
    quitScore: '弃',
    champion: '冠军',
    thirdPlace: '季军',
    checkFinal: '决赛区  查看>',
    groupedChampion: isChampion => (isChampion ? '分组冠军' : '分组季军'),

    ended: '已结束',
    playing: '比赛中',
    currentBo: (curBo, boType) => `当前${curBo || ''}/${boType || ''}局`,

    joining: '上场中',
    joiningAndTimeoutAutoQuit: '上场中 超时自动弃权',
    startMatchOnTime: 'M/d hh:mm开赛',
    endTimeFormat: 'M/d hh:mm',

    startBattleAuto: '人满开赛',
    startBattleManual: '待管理员开赛',
    startBattleOnTime: '定时开赛',
  },
  scheduleList: {
    finals: '总决赛',
    finalsChampion: '冠军',
    me: '我',

    joinDeadline: 'M/d hh:mm 截止上场',

    manage: '管理',
    spectate: '观战',
    toPlay: '去比赛',
    reCap: '回顾',
    subscribe: '订阅',
    subscribed: '已订阅',
  },
  actTipDialog: {
    prompt: '提示描述',
  },
};
