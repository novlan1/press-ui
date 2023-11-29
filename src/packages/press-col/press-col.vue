<template>
  <div
    :class="''+customClass+' '+(utils.bem2('col', [span]))+' '+(offset ? 'press-col--offset-' + offset : '')"
    :style="true ? computed.rootStyle({ gutter }) : ''"
  >
    <slot />
  </div>
</template>
<script>
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_ROW as PARENT } from '../common/constant/parent-map';


export default {
  name: 'PressCol',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  props: {
    span: { type: Number, default: 0 },
    offset: { type: Number, default: 0 },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      utils,
      computed,

      gutter: 0,
    };
  },
};
</script>

<style scoped lang="scss">
.press-col {
  box-sizing: border-box;
  float: left;
}

@for $i from 1 through 24 {
  .press-col--#{$i} {
    width: $i * (100% / 24);
  }
  .press-col--offset-#{$i} {
    margin-left: $i * (100% / 24);
  }
}
</style>
