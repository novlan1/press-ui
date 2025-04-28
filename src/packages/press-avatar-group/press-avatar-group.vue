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
import { addUnit } from '../common/utils/add-unit';
import styleUtil from '../common/utils/style';
import PressAvatar from '../press-avatar/press-avatar.vue';

import props from './computed';


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
      return res;
    },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
