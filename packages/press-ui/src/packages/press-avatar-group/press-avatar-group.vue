<template>
  <div
    class="press-avatar-group"
    :style="customStyle"
  >
    <div
      v-for="(item, index) in showUrl"
      :key="index"
      class="press-avatar-group__item"
      :style="true ? getItemStyle(index) : ''"
    >
      <PressAvatar
        :size="size"
        round
        :mode="mode"
        :src="getAvatarUrl(item)"
      />
      <div
        v-if="showMore && index === showUrl.length - 1 && (urls.length > maxCount || extraValue > 0)"
        class="press-avatar-group__item__show-more"
        @click="clickHandler"
      >
        <span
          :style="textStyle"
        >
          {{ extraText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import props from './computed';
import { addUnit } from '../common/utils/add-unit';
import PressAvatar from '../press-avatar/press-avatar';
import styleUtil from '../common/utils/style';


/**
	 * AvatarGroup  头像组
	 * @description 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。
	 *
	 * @property {Array}           urls     头像图片组 （默认 [] ）
	 * @property {String | Number} maxCount 最多展示的头像数量 （ 默认 5 ）
	 * @property {String}          shape    头像形状（ 'circle' (默认) | 'square' ）
	 * @property {String}          mode     图片裁剪模式（默认 'scaleToFill' ）
	 * @property {Boolean}         showMore 超出maxCount时是否显示查看更多的提示 （默认 true ）
	 * @property {String | Number} size      头像大小 （默认 40 ）
	 * @property {String}          keyName  指定从数组的对象元素中读取哪个属性作为图片地址
	 * @property {String | Number} gap      头像之间的遮挡比例（0.4代表遮挡40%）  （默认 0.5 ）
	 * @property {String | Number} extraValue  需额外显示的值
	 * @event    {Function}        showMore 头像组更多点击
	 */
export default {
  name: 'PressAvatarGroup',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressAvatar,
  },
  mixins: [props],
  emits: [
    'showMore',
  ],
  data() {
    return {

    };
  },
  computed: {
    showUrl() {
      return this.urls.slice(0, this.maxCount);
    },
    extraText() {
      const { extraValue, urls, showUrl } = this;
      return extraValue || urls.length - showUrl.length;
    },
    textStyle() {
      return styleUtil({
        color: '#fff',
        fontSize: this.size * 0.4,
        textAlign: 'center',
      });
    },
  },
  methods: {
    addUnit,
    getAvatarUrl(item) {
      if (typeof item === 'object') {
        return item[this.keyName || 'url'];
      }
      return item;
    },
    clickHandler() {
      this.$emit('showMore');
    },
    getItemStyle(index) {
      const { size, gap } = this;
      const res =  styleUtil({
        marginLeft: index === 0 ? 0 : addUnit(-size * gap),
        width: addUnit(size),
        height: addUnit(size),
      });
      console.log('res', res);
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.press-avatar-group {
  display: flex;

  &__item {
    margin-left: -10px;
    position: relative;

    &--no-indent {
      // 如果你想质疑作者不会使用:first-child，说明你太年轻，因为nvue不支持
      margin-left: 0;
    }

    &__show-more {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
    }
  }
}
</style>
