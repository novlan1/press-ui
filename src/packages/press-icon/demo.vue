<template>
  <div class="demo-wrap">
    <press-card
      :is-shadow="false"
      is-full
    >
      <text class="uni-h6">
        仅保留 empty 图标，其他图标请使用 press-icon-plus。
      </text>
    </press-card>
    <demo-block title="图标">
      <div class="icon-content">
        <div
          v-for="(item,index) in pressIconList"
          :key="index"
          class="icon-item"
          @click="switchActive(index,item)"
        >
          <press-icon
            :type="item.name"
            :color="activeIndex === index?'#007aff':'#5e6d82'"
            size="30"
          />
          <text
            :style="{color: activeIndex === index ? '#007aff':'#5e6d82'}"
            class="uni-mt-5 uni-subtitle"
          >
            {{ checked? item.unicode: item.name }}
          </text>
        </div>
      </div>
    </demo-block>

    <demo-block title="icon-music">
      <div class="icon-content flex-end">
        <div class="icon-item">
          <PressIconMusic />
        </div>

        <div class="icon-item">
          <PressIconMusic
            color="rgb(94, 109, 130)"
          />
        </div>

        <div class="icon-item">
          <PressIconMusic :number="5" />
        </div>

        <div class="icon-item">
          <PressIconMusic
            width="60px"
            height="60px"
          />
        </div>
      </div>
    </demo-block>
  </div>
</template>

<script>
import IconMap from 'src/common/icon.json';
import PressCard from 'src/packages/press-card/press-card.vue';
import PressIconMusic from 'src/packages/press-icon/press-icon-music.vue';

export default {
  components: {
    PressCard,
    PressIconMusic,
  },
  data() {
    const pressIconList = Object.keys(IconMap).map(key => ({
      name: key,
      unicode: IconMap[key].unicode,
    }));
    return {
      pressIconList,
      activeIndex: -1,
      checked: false,
    };
  },
  mounted() {
  },
  methods: {
    change(e) {
      // e.detail.value在安卓手机上可能是String类型，后续修复后要修改
      this.checked = !(e.detail.value === 'false' || !e.detail.value);
    },
    switchActive(index, item) {
      this.activeIndex = index;
      uni.setClipboardData({
        data: !this.checked ? item.name : item.unicode,
        success: () => {
          uni.showToast({
            icon: 'none',
            title: `${!this.checked ? '图标名称' : 'unicode'}复制成功`,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  // justify-content: center;
  &.flex-end {
    align-items: flex-end;
  }

  .icon-item {
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    width: calc(100% / 5);
    /* #endif */
    /* #ifdef APP-NVUE */
    width: 187rpx;
    /* #endif */
    align-items: center;
    padding: 10px;
    text-align: center;
    flex-direction: column;
  }
}
</style>
