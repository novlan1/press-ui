<template>
  <PressIconMusicRaw
    :width="width"
    :height="height"
    :number="number"
    :color="color"
  />
</template>
<script>
import { PROPS } from '../press-icon-music/computed';
import PressIconMusicRaw from '../press-icon-music/press-icon-music.vue';


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

