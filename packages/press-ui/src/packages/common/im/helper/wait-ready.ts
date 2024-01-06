import { TIM } from './tim';

export async function waitReady(tim: any) {
  if (tim.isReady) {
    return Promise.resolve(1);
  }
  return new Promise((resolve) => {
    function resolveCallback() {
      resolve(1);
    }
    tim.on(TIM.EVENT.SDK_READY, resolveCallback);
  });
}
