<template>
  <PressIconPlusMusicRaw
    :width="width"
    :height="height"
    :number="number"
    :color="color"
  />
</template>
<script>
import { PROPS } from '../press-icon-music/computed';
import PressIconPlusMusicRaw from '../press-icon-music/press-icon-music.vue';


export default {
  name: 'PressIconPlusMusicV2',
  components: {
    PressIconPlusMusicRaw,
  },
  props: {
    ...PROPS,
  },
};
</script>

