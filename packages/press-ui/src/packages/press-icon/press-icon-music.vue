<template>
  <PressIconMusicRaw
    :width="width"
    :height="height"
    :number="number"
    :color="color"
  />
</template>
<script>
import PressIconMusicRaw from '../press-icon-music/press-icon-music.vue';
import { PROPS } from '../press-icon-music/computed';


export default {
  name: 'PressIconMusicV2',
  components: {
    PressIconMusicRaw,
  },
  props: {
    ...PROPS,
  },
};
</script>

