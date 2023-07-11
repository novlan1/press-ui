<template>
  <PickerInner
    v-if="innerShow"
    :data="getPropOrData('list')"
    :current="getPropOrData('current')"
    :title="getPropOrData('title')"
    :arrow-icon="getPropOrData('arrowIcon')"
    :tip="getPropOrData('tip')"
    :virtual-list-threshold="getPropOrData('virtualListThreshold')"
    @onCancel="remove"
    @onSelect="onClickSelect"
  />
</template>

<script>
import PickerInner from './picker-inner.vue';
import { allProps, propsKeyMap } from './computed';
import { functionalMixin } from '../mixins/functional';

export default {
  name: 'PresPicker',
  components: {
    PickerInner,
  },
  mixins: [functionalMixin(allProps, {
    showProp: false,
    propsKeyMap,
  })],
  props: {
  },
  data() {
    return {
    };
  },
  mounted() {
    if (!this.isFunctionMode) {
      this.showDialog();
    }
  },
  methods: {
    onClickSelect(item) {
      this.$emit('onClickConfirm', item);
      this.$emit('confirm', item);
      this.innerShow = false;
      if (this.getPropOrData('confirm')) {
        this.getPropOrData('confirm')(item);
      }

      this.promiseCallback('confirm', { item });
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    remove() {
      this.$emit('onRemove');
      this.$emit('cancel');
      this.innerShow = false;
      if (this.getPropOrData('cancel')) {
        this.getPropOrData('cancel')();
      }

      this.promiseCallback('cancel');
      setTimeout(() => {
        this.destroy();
      }, 100);
    },
    destroy() {
      if (this.isFunctionMode) return;

      this.$destroy();

      // #ifdef H5
      if (document.body.contains(this.$el)) {
        this.$el?.parentElement?.removeChild?.(this.$el);
      }
      // #endif
    },

  },
};
</script>

<style scoped>
</style>
