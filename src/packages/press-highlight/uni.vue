<template>
  <rich-text
    :nodes="html"
  />
</template>

<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import { HIGHLIGHT_PROPS } from './props';
import { escapeString } from './utils';

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
      const { autoEscape, keywords, sourceString, highlightClass, caseSensitive } = this;
      const isEmpty = Array.isArray(keywords)
        ? keywords.every(item => !item)
        : !keywords;
      if (isEmpty) {
        return sourceString;
      }

      let keywordsList = Array.isArray(keywords) ? keywords : [keywords];
      if (autoEscape) {
        keywordsList = keywordsList.map(escapeString);
      }

      const str =  keywordsList.join('|');

      const reg = new RegExp((`(${str})`), caseSensitive ? 'gm' : 'gmi');
      const replace = `<span class="press-highlight__tag ${highlightClass}">$1</span>`;
      return sourceString.replace(reg, replace);
    },
  },
};
</script>

<style scoped lang="scss" src="./css/uni.scss">
</style>
