<script>
import { updateManager } from './utils/update-manager/update-manager';
import { setLang } from 'src/utils/i18n/i18n';
import { watchMessage } from 'src/utils/post-message/post-message';


export default {
  onLaunch() {
    console.log('App Launch');
    watchMessage();
    updateManager();
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  watch: {
    $route: {
      handler() {
        setLang();
      },
      immediate: true,
    },
  },
};
</script>

<style>
/*每个页面公共css */
uni-page-body {
  height: 100%;
  background: #fff;
}
page {
  min-height: 100%;
  background: #fff !important;
}
</style>
<style lang="scss" src="src/common/style/reset.scss"></style>
<style lang="scss" src="src/common/style/iconfont-mp.scss"></style>
