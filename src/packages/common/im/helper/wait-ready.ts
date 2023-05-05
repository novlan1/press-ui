import { TIM } from './tim';

export async function waitReady(tim) {
  if (tim.isReady) {
    return Promise.resolve(1);
  }
  return new Promise((resolve) => {
    tim.on(TIM.EVENT.SDK_READY, resolve);
  });
}
