<template>
  <div class="press-live-player">
    <!-- #ifdef H5 -->
    <LivePlayerH5
      v-bind="$attrs"
      v-on="$listeners"
    />
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <LivePlayerMp
      :video-src="videoSrc"
    />
    <!-- #endif -->
  </div>
</template>
<script>
// #ifdef H5
import LivePlayerH5 from './live-player-h5.vue';
// #endif

// #ifndef H5
import LivePlayerMp from './live-player-mp.vue';
// #endif
import { LIVE_PLAYER_MIXIN } from './mixin-props';


export default {
  components: {
    // #ifdef H5
    LivePlayerH5,
    // #endif
    // #ifndef H5
    LivePlayerMp,
    // #endif
  },
  // #ifndef H5
  mixins: [LIVE_PLAYER_MIXIN],
  // #endif
};
</script>
<style scoped lang="scss">
.press-live-player {
  box-sizing: border-box;

  /* #ifndef H5 */
  height: 210px;
  min-height: 210px;
  /* #endif */

  /* #ifdef H5 */
  height: 4.2rem;
  min-height: 4.2rem;
  /* #endif */
}
</style>
