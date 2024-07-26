import { isNotInUni } from '../common/utils/utils';

export function getShowDemoMap() {
  let showOtherDemoMap = {
    vue2Uni: false,
    vue2NotUni: false,
    vue3Uni: false,
  };
  showOtherDemoMap = {
    vue2Uni: true,
    vue2NotUni: true,
    vue3Uni: true,
  };

  // #ifdef VUE3
  showOtherDemoMap.vue3Uni = false;
  // #endif

  if (isNotInUni()) {
    showOtherDemoMap.vue2NotUni = false;
  }

  // #ifndef VUE3
  if (!isNotInUni()) {
    showOtherDemoMap.vue2Uni = false;
  }
  // #endif

  return showOtherDemoMap;
}
