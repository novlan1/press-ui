<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <component
    :is="tag"
    class="press-highlight"
  >
    <!-- #ifdef VUE2 -->
    <template
      v-for="(chunk, index) of highlightChunks"
    >
      <component
        :is="chunk.highlight ? highlightTag : unhighlightTag"
        :key="index"
        :class="chunk.highlight ? `press-highlight__tag ${highlightClass}` : unhighlightClass"
      >
        <!-- #endif -->

        <!-- #ifdef VUE3 -->
        <template
          v-for="(chunk, index) of highlightChunks"
          :key="index"
        >
          <component
            :is="chunk.highlight ? highlightTag : unhighlightTag"
            :class="chunk.highlight ? `press-highlight__tag ${highlightClass}` : unhighlightClass"
          >
            <!-- #endif -->

            {{ sourceString.slice(chunk.start, chunk.end) }}

            <!-- #ifdef VUE3 -->
          </component>
        </template>
        <!-- #endif -->

        <!-- #ifdef VUE2 -->
      </component>
    </template>
  <!-- #endif -->
  </component>
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import { HIGHLIGHT_PROPS } from './props';
import { getHighlightChunks } from './utils';

export default {
  name: 'PressHighlightWeb',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  props: {
    ...HIGHLIGHT_PROPS,
    ...defaultProps,
  },
  data() {
    return {

    };
  },
  computed: {
    highlightChunks() {
      const {
        autoEscape,
        caseSensitive,
        keywords,
        sourceString,
      } = this;
      return getHighlightChunks({
        autoEscape,
        caseSensitive,
        keywords,
        sourceString,
      });
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
