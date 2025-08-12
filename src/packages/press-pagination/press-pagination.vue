<template>
  <PressPaginationNext
    v-if="mode === 'multi' || mode === 'simple'"
    :mode="mode"
    :total="total"
    :current="current"
    :custom-class="customClass"

    :prev-text="prevText"
    :next-text="nextText"

    :total-items="totalItems"
    :show-page-size="showPageSize"
    :items-per-page="itemsPerPage"

    :force-ellipses="forceEllipses"
    :show-prev-button="showPrevButton"
    :show-next-button="showNextButton"

    @change="onChange"
  >
    <template #next-text>
      <slot name="next-text" />
    </template>
    <template #prev-text>
      <slot name="prev-text" />
    </template>
    <template #page="{number, active, text}">
      <slot
        name="page"
        :number="number"
        :active="active"
        :text="text"
      />
    </template>
  </PressPaginationNext>
  <PressPaginationESport
    v-else
    :mode="mode"
    :total="total"
    :current="current"
    :custom-class="customClass"

    :expand="expand"
    :tip-template="tipTemplate"
    :auto-scroll="autoScroll"
    :safe-area-inset-bottom="safeAreaInsetBottom"

    @change="onChange"
  />
</template>

<script>
import PressPaginationESport from './e-sport.vue';
import PressPaginationNext from './next.vue';
import {
  PAGINATION_E_SPORT_PROPS,
  PAGINATION_NEXT_PROPS,
  PAGINATION_COMMON_PROPS,
} from './props';

export default {
  components: {
    PressPaginationNext,
    PressPaginationESport,
  },
  props: {
    ...PAGINATION_E_SPORT_PROPS,
    ...PAGINATION_NEXT_PROPS,
    ...PAGINATION_COMMON_PROPS,
  },
  data() {
    return {

    };
  },
  methods: {
    onChange(...args) {
      this.$emit('change', ...args);
    },
  },
};
</script>
