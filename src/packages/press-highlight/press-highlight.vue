<template>
  <!-- #ifdef H5 -->
  <PressHighlightWeb
    :source-string="sourceString"
    :keywords="keywords"

    :auto-escape="autoEscape"
    :case-sensitive="caseSensitive"

    :tag="tag"
    :highlight-tag="highlightTag"
    :unhighlight-tag="unhighlightTag"

    :highlight-class="highlightClass"
    :unhighlight-class="unhighlightClass"
  />
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <PressHighlightUni
    :source-string="sourceString"
    :keywords="keywords"

    :auto-escape="autoEscape"
    :case-sensitive="caseSensitive"

    :tag="tag"
    :highlight-tag="highlightTag"
    :unhighlight-tag="unhighlightTag"

    :highlight-class="highlightClass"
    :unhighlight-class="unhighlightClass"
  />
<!-- #endif -->
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import { HIGHLIGHT_PROPS } from './props';
// #ifndef H5
import PressHighlightUni from './uni.vue';
// #endif
// #ifdef H5
import PressHighlightWeb from './web.vue';
// #endif

export default {
  name: 'PressHighlight',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    // #ifndef H5
    PressHighlightUni,
    // #endif
    // #ifdef H5
    PressHighlightWeb,
    // #endif
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
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss">
</style>
