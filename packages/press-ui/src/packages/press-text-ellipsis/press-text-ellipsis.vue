<template>
  <div
    ref="root"
    class="press-text-ellipsis"
  >
    {{ expanded ? content : text }}
    <span
      v-if="hasAction"
      ref="actionRef"
      class="press-text-ellipsis__action"
      @click="onClickAction"
    >
      <slot
        name="action"
        :expanded="expanded"
      >
        {{ actionText }}
      </slot>
      <!-- <template v-if="useActionSlot">
        <slot
          name="action"
          :expanded="expanded"
        />
      </template>
      <template v-else>{{ actionText }}</template> -->
    </span>
    <div
      :id="id"
      :style="hideStyle"
      class="press-text-ellipsis"
    >
      {{ hideText }}
    </div>
  </div>
</template>
<script>
import styles from '../common/utils/style';
let id = 0;


export default {
  name: 'PressTextEllipsis',
  props: {
    rows: {
      type: [Number, String],
      default: 1,
    },
    dots: {
      type: String,
      default: '...',
    },
    content: {
      type: String,
      default: '',
    },
    expandText: {
      type: String,
      default: '',
    },
    collapseText: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'end',
    },
    useActionSlot: {
      type: Boolean,
      default: false,
    },
    adjustString: {
      type: [Object, String],
      default: () => ({
        end: 'a',
        start: 'a',
        middle: 'aa',
      }),
    },
  },
  data() {
    return {
      text: this.content,
      expanded: false,
      hasAction: false,
      needRecalculate: false,

      hideText: this.content,
      id: 'hideDom-0',
    };
  },
  computed: {
    innerAdjustString() {
      if (typeof this.adjustString === 'string') {
        return this.adjustString;
      }
      return this.adjustString[this.position];
    },
    hideStyle() {
      return styles({
        position: 'fixed',
        zIndex: '-9999',
        top: '-9999px',
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'auto',
      });
    },
    actionText() {
      return this.expanded ? this.collapseText : this.expandText;
    },
  },
  watch: {
    content: {
      handler(value) {
        this.calcEllipsised();
        this.hideText = value;
      },
    },
    rows: 'calcEllipsised',
    position: 'calcEllipsised',
  },
  mounted() {
    this.calcEllipsised();
    id += 1;
    this.id = `hideDom-${id}`;

    if (this.useActionSlot) {
      setTimeout(() => {
        this.calcEllipsised();
      });
    }

    // #ifdef H5
    window.addEventListener('resize', this.watchResize, { passive: true });
    window.addEventListener('orientationchange', this.watchResize, { passive: true });
    // #endif
  },
  activated() {
    if (this.needRecalculate) {
      this.needRecalculate = false;
      this.calcEllipsised();
    }
  },
  beforeDestroy() {
    this.onBeforeUnMount();
  },
  beforeUnmount() {
    this.onBeforeUnMount();
  },
  methods: {
    onBeforeUnMount() {
      // #ifdef H5
      window.removeEventListener('resize', this.watchResize);
      window.removeEventListener('orientationchange', this.watchResize);
      // #endif
    },
    watchResize() {
      this.calcEllipsised();
    },
    pxToNum(value) {
      if (!value) return 0;
      const match = (`${value}`).match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    },
    updateContainer(container, key, value) {
      // #ifdef H5
      container[key] = value;
      // #endif
      // #ifndef H5
      if (key === 'innerText' || key === 'innerHTML') {
        this.updateHideText?.(value);
      }
      // #endif
    },
    getContainerHeight(container) {
      let result;
      // #ifdef H5
      result = Promise.resolve({
        offsetHeight: container.offsetHeight,
        paddingTop: container.style.paddingBottom,
        paddingBottom: container.style.paddingTop,
        lineHeight: container.style.lineHeight,
      });
      // #endif

      // #ifndef H5
      result = new Promise((resolve) => {
        setTimeout(() => {
          this.getHideDom().then((res) => {
            resolve({
              offsetHeight: res.height,
              paddingTop: res.paddingBottom,
              paddingBottom: res.paddingTop,
              lineHeight: res.lineHeight,
            });
          });
        }, 1);
      });
      // #endif

      return result;
    },

    cloneContainer() {
      if (!this.$refs.root || !this.$refs.root.isConnected) return;

      const originStyle = window.getComputedStyle(this.$refs.root);
      const container = document.createElement('div');
      const styleNames = Array.prototype.slice.apply(originStyle);

      styleNames.forEach((name) => {
        container.style.setProperty(name, originStyle.getPropertyValue(name));
      });

      container.style.position = 'fixed';
      container.style.zIndex = '-9999';
      container.style.top = '-9999px';
      container.style.height = 'auto';
      container.style.minHeight = 'auto';
      container.style.maxHeight = 'auto';

      container.innerText = this.content;
      document.body.appendChild(container);

      return container;
    },

    async calcEllipsisText(container, maxHeight) {
      const { content, position, dots } = this;
      const end = content.length;
      const middle = (0 + end) >> 1;
      const actionHTML = this.useActionSlot
        ? this.$refs.actionRef?.outerHTML ?? ''
        : this.expandText;


      const calcEllipse = async () => {
        // calculate the former or later content
        const tail = async (left, right) => {
          if (right - left <= 1) {
            if (position === 'end') {
              return content.slice(0, left) + dots;
            }
            return dots + content.slice(right, end);
          }

          const middle = Math.round((left + right) / 2);

          let curText = '';

          // Set the interception location
          if (position === 'end') {
            curText = content.slice(0, middle) + dots;
          } else {
            curText = dots + content.slice(middle, end);
          }
          this.updateContainer(container, 'innerText', curText);


          let resultHtml = curText + this.innerAdjustString + actionHTML;
          // #ifdef H5
          resultHtml = container.innerHTML + actionHTML;
          // #endif

          this.updateContainer(container, 'innerHTML', resultHtml);
          const { offsetHeight: containerHeight } = await this.getContainerHeight(container);


          // The height after interception still does not match the rquired height
          if (containerHeight > maxHeight) {
            if (position === 'end') {
              return await tail(left, middle);
            }
            return await tail(middle, right);
          }

          if (position === 'end') {
            return await tail(middle, right);
          }

          return await tail(left, middle);
        };

        return await tail(0, end);
      };

      const middleTail = async (
        leftPart,
        rightPart,
      ) => {
        if (
          leftPart[1] - leftPart[0] <= 1
          && rightPart[1] - rightPart[0] <= 1
        ) {
          return (
            content.slice(0, leftPart[0])
            + dots
            + content.slice(rightPart[1], end)
          );
        }

        const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
        const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);

        const curText = this.content.slice(0, leftMiddle)
          + this.dots
          + this.content.slice(rightMiddle, end);

        this.updateContainer(container, 'innerText', curText);

        let resultHtml = curText + this.innerAdjustString + actionHTML;
        // #ifdef H5
        resultHtml = container.innerHTML + actionHTML;
        // #endif
        this.updateContainer(container, 'innerHTML', resultHtml);

        const { offsetHeight: containerHeight } = await this.getContainerHeight(container);
        if (containerHeight >= maxHeight) {
          return await middleTail(
            [leftPart[0], leftMiddle],
            [rightMiddle, rightPart[1]],
          );
        }

        return await middleTail(
          [leftMiddle, leftPart[1]],
          [rightPart[0], rightMiddle],
        );
      };

      return this.position === 'middle'
        ? await middleTail([0, middle], [middle, end])
        : await calcEllipse();
    },

    async calcEllipsised() {
      // Calculate the interceptional text
      let container = {
        offsetHeight: 0,
        innerHTML: '',
        innerText: '',
      };
      // #ifdef H5
      container = this.cloneContainer();

      if (!container) {
        this.needRecalculate = true;
        return;
      }
      // #endif

      const info = await this.getContainerHeight(container);

      const { paddingBottom, paddingTop, lineHeight, offsetHeight } = info;
      const maxHeight = Math.ceil((Number(this.rows) + 0.5) * this.pxToNum(lineHeight)
          + this.pxToNum(paddingTop)
          + this.pxToNum(paddingBottom));

      if (maxHeight < offsetHeight) {
        this.hasAction = true;
        this.text = await this.calcEllipsisText(container, maxHeight);
      } else {
        this.hasAction = false;
        this.text = this.content;
      }

      // #ifdef H5
      document.body.removeChild(container);
      // #endif
    },

    toggle(isExpanded = !this.expanded) {
      this.expanded = isExpanded;
    },

    onClickAction(event) {
      this.toggle();
      this.$emit('clickAction', event);
    },
    getHideDom() {
      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)
          .select(`#${this.id}`)
          .fields({
            size: true,
            computedStyle: ['lineHeight', 'paddingBottom', 'paddingTop'],
          }, (res) => {
            console.log('res', res);
            resolve(res);
          })
          .exec();
      });
    },
    updateHideText(value) {
      this.hideText = value;
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
