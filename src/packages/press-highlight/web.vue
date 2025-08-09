<template>
  <component
    :is="tag"
    class="press-highlight"
  >
    <template
      v-for="(chunk, index) of highlightChunks"
    >
      <component
        :is="chunk.highlight ? highlightTag : unhighlightTag"
        :key="index"
        :class="chunk.highlight ? `press-highlight__tag ${highlightClass}` : unhighlightClass"
      >
        {{ sourceString.slice(chunk.start, chunk.end) }}
      </component>
    </template>
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
