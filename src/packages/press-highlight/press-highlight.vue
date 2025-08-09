<template>
  <PressHighlightWeb
    v-if="true"
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
  <PressHighlightUni
    v-else
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
</template>
<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';

import { HIGHLIGHT_PROPS } from './props';
import PressHighlightUni from './uni.vue';
import PressHighlightWeb from './web.vue';

export default {
  name: 'PressHighlight',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressHighlightUni,
    PressHighlightWeb,
  },
  props: {
    ...HIGHLIGHT_PROPS,
    ...defaultProps,
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss">
</style>
