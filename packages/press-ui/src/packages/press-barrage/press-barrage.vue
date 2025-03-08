<template>
  <div
    :id="barrageId"
    ref="barrageWrapper"
    class="press-barrage"
    :style="barrageStyle"
  >
    <slot />

    <!-- #ifndef H5 -->
    <span
      v-for="(item) of barrageItems"
      :id="item.id"
      :key="item.id"
      class="press-barrage__item"
      :style="item.customStyle"
      @animationend="animationend(item)"
    >
      {{ item.innerText }}
    </span>
    <!-- #endif -->
  </div>
</template>
<script>
import { getVModelMixin } from '../common/vue3/adapter';
import styles from '../common/utils/style';
import { getRect } from '../common/dom/rect';


const className = 'press-barrage__item';
let id = 0;


export default {
  name: 'PressBarrage',
  mixins: [getVModelMixin({
    type: [Array],
    defaultValue: () => ([]),
  })],
  props: {
    autoPlay: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: [Number, String],
      default: 4,
    },
    top: {
      type: [Number, String],
      default: 10,
    },
    duration: {
      type: [Number, String],
      default: 4000,
    },
    delay: {
      type: Number,
      default: 300,
    },
    itemHeight: {
      type: Number,
      default: 26,
    },
  },
  data() {
    return {
      isInitBarrage: true,
      barrageItems: [],
      isPlay: false,

      total: 0,
      barrageStyle: '',
      barrageId: '',
    };
  },
  computed: {
  },
  watch: {
    realModelValue: {
      handler(newValue, oldValue) {
        this.updateBarrages(newValue, oldValue);
      },
      deep: true,
    },
  },
  mounted() {
    id += 1;
    this.barrageId = `press-barrage-${id}`;
    setTimeout(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const cb = () => {
        setTimeout(() => {
          this.updateBarrages(this.realModelValue, []);
        });
      };

      // #ifdef H5
      const { offsetWidth } = this.$refs.barrageWrapper;
      this.barrageStyle = `--move-distance: -${offsetWidth}px`;
      cb();
      // #endif

      // #ifndef H5
      getRect(this, `#${this.barrageId}`, true).then((rect) => {
        if (rect.width) {
          this.barrageStyle = `--move-distance: -${rect.width}px`;
        }
        cb();
      });
      // #endif
    },
    play()  {
      this.isPlay = true;
      this.barrageItems.forEach((item) => {
        // #ifdef H5
        item.style.animationPlayState = 'running';
        // #endif

        // #ifndef H5
        item.styleObj = {
          ...item.styleObj,
          animationPlayState: 'running',
        };
        item.customStyle = styles(item.styleObj);
        // #endif
      });
    },

    pause() {
      this.isPlay = false;
      this.barrageItems.forEach((item) => {
        // #ifdef H5
        item.style.animationPlayState = 'paused';
        // #endif

        // #ifndef H5
        item.styleObj = {
          ...item.styleObj,
          animationPlayState: 'paused',
        };
        item.customStyle = styles(item.styleObj);
        // #endif
      });
    },

    createBarrageItem(
      text,
      delay = this.delay,
    ) {
      let item = {};

      // #ifdef H5
      item = document.createElement('span');
      item.style.animationDuration = `${this.duration}ms`;
      item.style.animationDelay = `${delay}ms`;
      item.style.animationTimingFunction = 'linear';
      // #endif

      item.className = className;
      item.innerText = String(text);

      // #ifndef H5
      item.styleObj = {
        animationDuration: `${this.duration}ms`,
        animationDelay: `${delay}ms`,
        animationTimingFunction: 'linear',
      };
      item.customStyle = styles(item.styleObj);
      // #endif


      return item;
    },
    appendBarrageItem({ id, text }, i) {
      const item = this.createBarrageItem(
        text,
        this.isInitBarrage ? i * this.delay : undefined,
      );
      if (!this.autoPlay && this.isPlay === false) {
        // #ifdef H5
        item.style.animationPlayState = 'paused';
        // #endif

        // #ifndef H5
        item.styleObj = {
          ...item.styleObj,
          animationPlayState: 'paused',
        };
        // #endif
      }

      // #ifdef H5
      this.$refs.barrageWrapper?.append(item);
      // #endif

      this.total += 1;
      let offsetHeight = this.itemHeight;

      // #ifdef H5
      offsetHeight = item.offsetHeight;
      // #endif

      const top = ((this.total - 1) % +this.rows) * offsetHeight + +this.top;

      // #ifdef H5
      item.style.top = `${top}px`;
      // #endif

      // #ifndef H5
      item.styleObj = {
        ...item.styleObj,
        top: `${top}px`,
      };
      item.customStyle = styles(item.styleObj);
      // #endif


      item.id = String(id);
      this.barrageItems.push(item);

      // #ifdef H5
      item.addEventListener('animationend', () => {
        this.emitModelValue([...this.realModelValue].filter(v => String(v.id) !== item.id));
      });
      // #endif
    },
    animationend(item) {
      this.emitModelValue([...this.realModelValue].filter(v => String(v.id) !== item.id));
    },
    updateBarrages(
      newValue,
      oldValue,
    ) {
      const map = new Map(oldValue.map(item => [item.id, item]));

      newValue.forEach((item, i) => {
        if (map.has(item.id)) {
          map.delete(item.id);
        } else {
          // add
          this.appendBarrageItem(item, i);
        }
      });

      map.forEach((item) => {
        // remove
        const index = this.barrageItems.findIndex(span => span.id === String(item.id));
        if (index > -1) {
          // #ifdef H5
          this.barrageItems[index].remove();
          // #endif
          this.barrageItems.splice(index, 1);
        }
      });

      this.isInitBarrage = false;
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
