<template>
  <div
    class="press-color-svpanel"
    :style="{
      backgroundColor: background
    }"
  >
    <div class="press-color-svpanel__white" />
    <div class="press-color-svpanel__black" />
    <div
      class="press-color-svpanel__cursor"
      :style="{
        top: cursorTop + 'px',
        left: cursorLeft + 'px'
      }"
    >
      <div />
    </div>
  </div>
</template>

<script>
import draggable from './draggable';


export default {
  props: {
    color: {
      required: true,
    },
  },
  data() {
    return {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)',
    };
  },
  computed: {
    colorValue() {
      const hue = this.color.get('hue');
      const value = this.color.get('value');
      return { hue, value };
    },
  },

  watch: {
    colorValue() {
      this.update();
    },
  },
  mounted() {
    draggable(this.$el, {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      },
    });

    this.update();
  },

  methods: {
    update() {
      const saturation = this.color.get('saturation');
      const value = this.color.get('value');

      const el = this.$el;
      const { clientWidth: width, clientHeight: height } = el;

      this.cursorLeft = saturation * width / 100;
      this.cursorTop = (100 - value) * height / 100;

      this.background = `hsl(${this.color.get('hue')}, 100%, 50%)`;
    },

    handleDrag(event) {
      const el = this.$el;
      const rect = el.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;
      left = Math.max(0, left);
      left = Math.min(left, rect.width);

      top = Math.max(0, top);
      top = Math.min(top, rect.height);

      this.cursorLeft = left;
      this.cursorTop = top;
      this.color.set({
        saturation: left / rect.width * 100,
        value: 100 - top / rect.height * 100,
      });
    },
  },
};
</script>
<style scoped>
.press-color-svpanel {
  position: relative;
  width: 280px;
  height: 180px;
  cursor: crosshair;
}

.press-color-svpanel__black,
.press-color-svpanel__white {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.press-color-svpanel__white {
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}
.press-color-svpanel__black {
  background: linear-gradient(0deg, #000, transparent);
}

.press-color-svpanel__cursor {
  position: absolute;
}

.press-color-svpanel__cursor > div {
  cursor: head;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%),
    0 0 1px 2px rgb(0 0 0 / 40%);
  border-radius: 50%;
  transform: translate(-2px, -2px);
}
</style>
