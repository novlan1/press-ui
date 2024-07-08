<template>
  <div
    class="press-avatar"
    :class="[`press-avatar--${shape}`]"
    :style="avatarStyle"
    @click.stop="clickHandler"
  >
    <slot>
      <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
      <open-data
        v-if="mpAvatar && allowMp"
        type="userAvatarUrl"
        :style="[{
          width: addUnit(size),
          height: addUnit(size)
        }]"
      />
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
      <template v-if="mpAvatar && allowMp" />
      <!-- #endif -->

      <PressIconPlus
        v-else-if="icon"
        :name="icon"
        :size="fontSize"
        :color="color"
      />
      <span
        v-else-if="text"
        :style="textStyle"
      >{{ text }}</span>

      <PressImage
        v-else
        class="press-avatar__image"
        :class="[`press-avatar__image--${shape}`]"
        :round="!!round"
        :src="avatarUrl || defaultUrl"
        :width="size"
        :radius="4"
        :height="size"
        :mode="mode"
        @error="errorHandler"
      />
    </slot>
  </div>
</template>

<script>
import props from './computed';
import { addUnit } from '../common/utils/add-unit';
import { random } from '../common/utils/utils';
import styleUtil from '../common/utils/style';
import { RANDOM_COLOR_LIST } from './config';

import PressImage from '../press-image/press-image.vue';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

const base64Avatar = 'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z';


export default {
  name: 'PressAvatar',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressImage,
    PressIconPlus,
  },
  mixins: [props],
  emits: [
    'click',
  ],
  data() {
    return {
      colors: RANDOM_COLOR_LIST,
      avatarUrl: this.src,
      allowMp: false,
    };
  },
  computed: {
    shape() {
      return this.round ? 'circle' : 'square';
    },
    imageStyle() {
      const style = {};
      return style;
    },
    avatarStyle() {
      const { text, icon, colorIndex, backgroundColor, size, colors, randomBackgroundColor } = this;
      let tBackgroundColor = 'transparent';
      if (text || icon) {
        if (randomBackgroundColor) {
          console.log('colorIndex', colorIndex);
          tBackgroundColor = colors[colorIndex > -1 ? colorIndex : random(0, 19)];
        }  else {
          tBackgroundColor = backgroundColor;
        }
      }

      const computedStyle = styleUtil([
        {
          width: addUnit(size),
          height: addUnit(size),
          background: tBackgroundColor,
        },
        this.customStyle,
      ]);

      return computedStyle;
    },
    textStyle() {
      const { fontSize, color } = this;
      return styleUtil({
        fontSize,
        color,
        textAlign: 'center',
        // justifyContent: 'center',
      });
    },
  },
  watch: {
    // 监听头像src的变化，赋值给内部的avatarUrl变量，因为图片加载失败时，需要修改图片的src为默认值
    // 而组件内部不能直接修改props的值，所以需要一个中间变量
    src: {
      immediate: true,
      handler(newVal) {
        this.avatarUrl = newVal;
        // 如果没有传src，则主动触发error事件，用于显示默认的头像，否则src为''空字符等的时候，会无内容展示
        if (!newVal) {
          this.errorHandler();
        }
      },
    },
  },
  created() {
    this.init();
  },
  methods: {
    addUnit,
    init() {
      // 目前只有这几个小程序平台具有open-data标签
      // 其他平台可以通过uni.getUserInfo类似接口获取信息，但是需要弹窗授权(首次)，不合符组件逻辑
      // 故目前自动获取小程序头像只支持这几个平台
      // #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
      this.allowMp = true;
      // #endif
    },
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      return this.src.indexOf('/') !== -1;
    },
    // 图片加载时失败时触发
    errorHandler() {
      this.avatarUrl = this.defaultUrl || base64Avatar;
    },
    clickHandler() {
      this.$emit('click', this.name);
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
