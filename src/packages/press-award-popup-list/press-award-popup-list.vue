<template>
  <div class="press-award">
    <div
      v-for="(item,index) in propsCheckList"
      :key="index"
      class="press-award__item"
      @click.stop="onItemClick(item)"
    >
      <div class="press-award__img">
        <img
          v-if="item.goodscfg && item.goodscfg.goodsicon"
          v-lazy="item.goodscfg.goodsicon"
          size="98"
        >
      </div>
      <div class="press-award__main">
        <div class="press-award__info">
          <p class="press-award__name">
            {{ item.displayName || '' }}
          </p>
          <p
            v-if="item.propType"
            class="press-award__desc"
          >
            {{ item.propType }}
          </p>
          <p
            v-else-if="item.displayOverduetime"
            class="press-award__desc"
          >
            兑换有效期至{{ item.displayOverduetime || '' }}
          </p>
        </div>
        <p
          v-if="item.isShowCheck"
          class="press-award__price"
        >
          &yen;{{ item.propsPrice || '' }}
        </p>
        <p
          v-else
          class="press-award__num"
        >
          数量：{{ item.propsNum || 1 }}
        </p>
      </div>
      <!-- 选中添加类名：press-award__check--active -->
      <div
        v-if="item.isShowCheck"
        :class="['press-award__check',
                 item.isChecked ? 'press-award__check--active':'']"
        @click.stop="onCheckClick(item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropsCheck',
  props: {
    propsCheckList: {
      type: Array,
      default: () => [
        {
          goodscfg: {
            goodsicon: 'https://dummyimage.com/200x200',
          },
          displayName: '道具名称',
          displayOverduetime: '2/2',
          propsPrice: '18.88',
          propsNum: '1',
          isShowCheck: false,
          isChecked: false,
        }, {
          goodscfg: {
            goodsicon: 'https://dummyimage.com/200x200',
          },
          displayName: '道具名称',
          displayOverduetime: '2/2',
          propsPrice: '18.88',
          propsNum: '1',
          isShowCheck: false,
          isChecked: false,
        },
      ],
      required: true,
    },
  },
  options: {
    virtualHost: true,
  },
  emits: ['onCheckClick', 'onItemClick'],
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    onCheckClick(...args) {
      this.$emit('onCheckClick', ...args);
    },
    onItemClick(...args) {
      this.$emit('onItemClick', ...args);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
