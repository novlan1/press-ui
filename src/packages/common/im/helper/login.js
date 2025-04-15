// import { filterSameRequest } from './filter-same-request';
import { Scheduler } from '../../scheduler/scheduler';


let scheduler;


async function innerLogin({
  tim,
  userId,
  userSig,
}) {
  const resp = await tim.login({ userID: userId, userSig }).catch((e) => {
    console.warn(e);
    return Promise.reject(e);
  });
  tim.updateOnlineStatus(true);
  console.log('[TIM] login success: ', resp.data);

  if (resp.data.repeatLogin === true) {
    console.log(resp.data.errorInfo);
  }

  return {
    userSig,
    userId,
  };
}

export async function login({
  userId,
  userSig,
  tim,
}) {
  if (!scheduler) {
    scheduler = new Scheduler(1);
  }
  // const url = 'LOGIN';

  tim.updateUserId?.(userId);
  tim.updateUserSig?.(userSig);

  // const reqData = { userId, userSig };

  return await scheduler.add(innerLogin.bind(null, {
    userId,
    userSig,
    tim,
  }));

  // return await filterSameRequest({
  //   url,
  //   reqData,
  //   handle: innerLogin.bind(null, {
  //     userId,
  //     userSig,
  //     tim,
  //   }),
  // });
}
