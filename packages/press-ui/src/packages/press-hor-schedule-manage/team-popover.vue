<template>
  <div
    :class="[getActClass('team-popover', {
      'team-popover--reversed': reversed
    })]"
  >
    <div :class="[getActClass('team-popover-name')]">
      {{ team.teamname }}
    </div>

    <div :class="[getActClass('team-popover-list')]">
      <PersonInfo
        v-for="(mem) of team.members"
        :key="mem.uid"
        :personal-info="mem"
      />
    </div>
  </div>
</template>
<script>
import PersonInfo from './person-info';
import { getActClass } from './utils';

import { ClickOutsideMixin } from '../mixins/click-outside';


export default {
  name: 'PressTeamPopover',
  components: {
    PersonInfo,
  },
  mixins: [
    // #ifdef H5
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClickOutside',
    }),
    // #endif
  ],
  props: {
    team: {
      type: Object,
      default: () => ({}),
    },
    reversed: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'onClickOutside',
  ],
  data() {
    return {

    };
  },
  methods: {
    onClickOutside() {
      this.$emit('onClickOutside');
    },
    getActClass,
  },
};
</script>
<style lang="scss" src="./css/team-popover.scss" scoped></style>
