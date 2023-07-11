<script>
import { updateManager } from './utils/update-manager/update-manager';
import { setLang } from 'src/utils/i18n/i18n';
import { watchMessage } from 'src/utils/post-message/post-message';


export default {
  onLaunch() {
    watchMessage();
    updateManager();
  },
  onShow() {
  },
  onHide() {
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


<style lang="scss" src="src/common/style/reset.scss"></style>
<style lang="scss" src="src/common/style/iconfont-mp.scss"></style>
