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
                  'press-protocol__text--light': infoItem.light,
                  'press-protocol__text--underline': infoItem.underline,
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
  emits: ['click'],
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

<style lang="scss" scoped src="./css/index.scss">
</style>
