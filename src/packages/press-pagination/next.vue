<template>
  <div
    class="press-pagination"
    :class="customClass"
  >
    <div class="press-pagination__items">
      <div
        :class="[bem2('pagination__item', {
          disabled: current === 1,
          border: mode === 'simple',
          prev: true
        })]"
      >
        <div
          :disabled="current === 1"
          @click.stop="() => updateModelValue(current - 1)"
        >
          <slot name="prev-text">
            {{ prevText }}
          </slot>
        </div>
      </div>

      <div
        v-if="mode === 'simple'"
        class="press-pagination__page-desc"
      >
        {{ `${current}/${count}` }}
      </div>
      <template v-else>
        <div
          v-for="(page, pageIndex) of pages"
          :key="pageIndex"
          :class="[
            bem2(
              'pagination__item',
              {
                active: page.active, page: true
              }
            ),
            'press-hairline--surround'
          ]"
          @click.stop="() => updateModelValue(page.number)"
        >
          <div>
            <slot
              name="page"
              :number="page.number"
              :active="page.active"
              :text="page.text"
            >
              {{ page.text }}
            </slot>
          </div>
        </div>
      </template>

      <div
        :class="[bem2('pagination__item', {
          disabled: current === count,
          border: mode === 'simple',
          next: true
        })]"
      >
        <div
          :disabled="current === count"
          @click.stop="() => updateModelValue(current + 1)"
        >
          <slot name="next-text">
            {{ nextText }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from '../common/format/number';
import { bem2 } from '../common/utils/bem';

import { PAGINATION_NEXT_PROPS, PAGINATION_COMMON_PROPS } from './props';


const makePage = (
  number,
  text,
  active,
) => ({ number, text, active });


export default {
  name: 'PressPaginationNext',
  props: {
    ...PAGINATION_NEXT_PROPS,
    ...PAGINATION_COMMON_PROPS,
  },
  emits: ['change'],
  data() {
    return {

    };
  },
  computed: {
    count() {
      const { total, totalItems, itemsPerPage } = this;
      const count = +total || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count);
    },
    pages() {
      const items = [];
      const pageCount = this.count;
      const showPageSize = +this.showPageSize;
      const { current, forceEllipses } = this;

      // Default page limits
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;

      // recompute if showPageSize
      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(current - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;

        // Adjust if limit is exceeded
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }

      // Add page number links
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === current);
        items.push(page);
      }

      // Add links to move between page sets
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, '...');
          items.unshift(prevPages);
        }

        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, '...');
          items.push(nextPages);
        }
      }

      return items;
    },
  },
  methods: {
    bem2,
    updateModelValue(value) {
      value = range(value, 1, this.count);

      if (this.current !== value) {
        this.$emit('change', value);
      }
    },
  },
};
</script>
<style scoped lang="scss" src="./css/next.scss">
</style>
