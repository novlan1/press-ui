<template>
  <PressHorDialog
    title="比赛规则"
    popup-with="9.6"
    @close="close"
  >
    <div class="press-rule">
      <div v-html="rule" />
    </div>
  </PressHorDialog>
</template>
<script>
import PressHorDialog from '../press-hor-dialog/press-hor-dialog';


export default {
  name: 'PressHorRule',
  components: {
    PressHorDialog,
  },
  props: {
    rule: {
      type: String,
      desc: '比赛规则',
      default: '比赛规则',
    },
  },
  options: {
    virtualHost: true,
  },
  emits: [
    'close',
  ],
  data() {
    return {
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    close(...args) {
      this.$emit('close', ...args);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
