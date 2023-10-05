<script>
import { updateManager } from 't-comm/lib/mp/update-manager';
import { setLang } from 'src/utils/i18n/i18n';
import { watchMessage } from 'src/utils/post-message/post-message';
import { getAutoLaunchGameMixin } from './utils/mixin/auto-launch-game';

export default {
  mixins: [
    getAutoLaunchGameMixin(),
  ],
  onLaunch() {
    watchMessage();
    updateManager();
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


<style lang="scss" src="src/utils/style/reset.scss"></style>
<style lang="scss" src="src/utils/style/iconfont-mp.scss"></style>
<style lang="scss" src="src/utils/style/font-peace.scss"></style>
