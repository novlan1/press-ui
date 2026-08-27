import { processEvent } from './events';

export const baseMixin = {
  methods: {
    $trigger(name, $event, detail) {
      this.$emit(name, processEvent.call(this, name, $event, detail, this.$el, this.$el));
    },
  },
};
