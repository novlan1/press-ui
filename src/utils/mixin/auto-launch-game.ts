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
        }).then(() => {
          // this.$router.replace({
          //   path: this.$route.path,
          //   query: {
          //     ...this.$route.query,
          //     enterGame: '',
          //     roomId: '',
          //     roomPwd: '',
          //   },
          // });
        })
          .catch((err) => {
            console.warn('[auto launch game err]', err);
          });
      }
    },
  };
}
