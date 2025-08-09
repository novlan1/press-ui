<template>
  <rich-text
    :nodes="html"
  />
</template>

<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import { HIGHLIGHT_PROPS } from './props';

export default {
  name: 'PressHighlightUni',
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
    html() {
      const { keywords, sourceString, highlightClass, caseSensitive } = this;
      const isEmpty = Array.isArray(keywords)
        ? !keywords.length
        : !keywords;
      if (isEmpty) {
        return sourceString;
      }

      const str = Array.isArray(keywords) ? keywords.join('|') : keywords;
      const reg = new RegExp((`(${str})`), caseSensitive ? 'gm' : 'gmi');
      const replace = `<span class="press-highlight__tag ${highlightClass}">$1</span>`;
      return sourceString.replace(reg, replace);
    },
  },
};
</script>

<style scoped lang="scss" src="./css/index.scss">
