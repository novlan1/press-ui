<template>
  <div class="container">
    <press-card
      :is-shadow="false"
      is-full
    >
      <text class="uni-h6">
        仅保留 empty 图标，其他图标请使用 press-icon-plus。
      </text>
    </press-card>
    <uni-section
      title="图标"
      type="line"
    >
      <!-- <template #right>
        <div>
          <switch
            :checked="checked"
            @change="change"
          />
        </div>
      </template> -->
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
            :style="{color:activeIndex === index?'#007aff':'#5e6d82'}"
            class="uni-mt-5 uni-subtitle"
          >
            {{ checked? item.unicode: item.name }}
          </text>
        </div>
      </div>
    </uni-section>
  </div>
</template>

<script>
import IconMap from 'src/common/icon.json';
import PressCard from 'src/packages/press-card/press-card.vue';
import UniSection from 'src/pages/components/uni-section/components/uni-section/uni-section.vue';

export default {
  components: {
    PressCard,
    UniSection,
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

<style lang="scss">
.icon-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  // justify-content: center;

  .icon-item {
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    width: calc(100% / 4);
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
