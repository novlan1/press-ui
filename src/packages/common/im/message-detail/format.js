import { MESSAGE_TYPE_MAP } from './config';
import { formatTime, isJsonStr } from './helper';

const INSERT_TIME_DURATION = 1 * 60 * 60;


function formatMessageContent(message, userInfo) {
  if (!isJsonStr(message)) {
    return { text: message };
  }
  let info = {};

  try {
    info = JSON.parse(message);
  } catch (e) {
    return { text: message };
  }

  return {
    title: info.title || '',
    text: info.content || '',
    link: info.jumpUrl || '',
    picUrl: info.picUrl || '',

    phone: userInfo?.cardInfo?.phone || '',
    wechat: userInfo?.cardInfo?.wx_account || '',
    qq: userInfo?.cardInfo?.qq_account || '',
  };
}

function addTimeMsg(list, lastTime) {
  if (!list.length) return;

  let recentTime = list[list.length - 1].timeStamp;
  if (lastTime) {
    recentTime = lastTime;
  }

  // 倒序插入，如果从前往后插，index会变
  for (let i = list.length - 1;i >= 0;i--) {
    const item = list[i];

    if (recentTime > item.timeStamp + INSERT_TIME_DURATION) {
      const nextTime = list[i + 1].timeStamp;

      list.splice(i + 1, 0, {
        msgType: MESSAGE_TYPE_MAP.TIME,
        id: `id-time-${i + 1}-${nextTime}`,
        timeStamp: nextTime,
        content: {
          text: formatTime(nextTime),
        },
      });

      recentTime = item.timeStamp;
    }
  }
  // 在第一个之前插入时间tag
  // 如果传入lastTime，说明是接收信息，则只有在这条消息超过 INSERT_TIME_DURATION 后才再次插入tag
  if (!lastTime || list?.[0]?.timeStamp > lastTime + INSERT_TIME_DURATION) {
    list.splice(0, 0, {
      msgType: MESSAGE_TYPE_MAP.TIME,
      id: `id-time-0-${list[0].id}`,
      timeStamp: list[0].timeStamp,
      content: {
        text: formatTime(list[0].timeStamp),
      },
    });
  }
}


function deleteRevokedMessages(list) {
  return list = list.filter(item => !item.isRevoked);
}


export function baseFormatMessageDetailList(
  list,
  myInfo,
  oppositeInfo,
  lastTimeStampTag,
) {
  let mList = list;
  mList = deleteRevokedMessages(mList);

  mList = mList.map((item) => {
    const { time, from, to, payload, isPeerRead, ID: id, isCustomFail, isRevoked } = item;
    const { text } = payload || {};
    const isMine = from === myInfo.uid;
    const uid = isMine ? myInfo.uid : oppositeInfo.uid;

    let parsedText = {};
    if (text && isJsonStr(text)) {
      try {
        parsedText = JSON.parse(text);
      } catch (e) {
        parsedText = {};
      }
    }

    return {
      id: `id-${id}`,
      time: formatTime(time),
      timeStamp: time,
      msgType: MESSAGE_TYPE_MAP.MESSAGE_TEXT,

      parsedText,

      from,
      to,
      isPeerRead,
      isCustomFail,

      avatar: isMine ? myInfo.avatar : oppositeInfo.avatar,
      nick: isMine ? myInfo.nick : oppositeInfo.nick,
      uid,
      isMine,

      isOwner: isMine ? myInfo.isOwner : oppositeInfo.isOwner,
      laddergrade: isMine ? myInfo.laddergrade : oppositeInfo.laddergrade,
      content: formatMessageContent(text, isMine ? myInfo : oppositeInfo),
      isRevoked,
    };
  });

  addTimeMsg(mList, lastTimeStampTag);
  return mList;
}


