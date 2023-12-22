import { getUrlPara } from 't-comm/lib/url/url';
import {
  launchGNGameRoom,
} from 't-comm/lib/launch-game/launch-game';

export function getAutoLaunchGameMixin() {
  return {
    mounted() {
      if (getUrlPara('enterGame') === 'true' && getUrlPara('roomId')) {
        console.info('[auto launch game roomId]', getUrlPara('roomId'));

        launchGNGameRoom({
          roomId: getUrlPara('roomId'),
          roomPwd: getUrlPara('roomPwd'),
          context: this,
          qrCodeLib: null,
          dialogHandler: null,
          otherDialogParams: null,
        } as any).then(() => {
        })
          .catch((err) => {
            console.warn('[auto launch game err]', err);
          });
      }
    },
  };
}
