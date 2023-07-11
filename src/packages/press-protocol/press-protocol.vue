<template>
  <div
    class="press-protocol"
    :class="customClass"
    :style="customStyle"
  >
    <div class="press-protocol__layout">
      <div
        v-for="(item) of list"
        :key="item.uniqueKey"
        class="press-protocol__item"
      >
        <div
          v-if="item.title"
          class="press-protocol__item__title"
        >
          {{ item.title }}
        </div>
        <div class="press-protocol__item__infos">
          <div
            v-for="(info) of item.list"
            :key="info.uniqueKey"
            class="press-protocol__info"
          >
            <span
              v-for="(infoItem) of info.list"
              :key="infoItem.uniqueKey"
              class="press-protocol__info__item"
            >
              <span
                class="press-protocol__text "
                :class="{
                  'press-protocol__text--light': infoItem.light
                }"
                @click.stop="clickProtocol(infoItem)"
              >{{ infoItem.text }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'PressProtocol',
  options: {
  },
  components: {
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    customStyle: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    clickProtocol(infoItem) {
      if (!infoItem.link) return;
      this.$emit('click', infoItem);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../base/layout.scss";
@import "../base/mixin.scss";

.press-protocol {
  position: relative;
  flex: 1;
  overflow: hidden;
  background: url("https://image-1251917893.file.myqcloud.com/Esports/new/user/fullpage-light-bg.png")
    no-repeat;
  background-size: 100%;

  * {
    user-select: auto;
  }

  &__layout {
    height: 100%;
    overflow: auto;
  }

  &__item {
    margin: 0 0.32rem 0.4rem;

    &__title {
      font-size: $font-l;
      color: $color-black;
      font-weight: bold;
      margin-bottom: 0.24rem;
    }
  }

  &__info {
    font-size: $font-xm;
    color: $color-gray-5;
    margin-bottom: 0.24rem;
    line-height: 0.44rem;
  }

  &__text {
    &--light {
      color: $color-primary;
      display: inline;
    }
  }
}
</style>
