import { isNotInUni } from '../common/utils/utils';

export function getShowDemoMap() {
  const showOtherDemoMap = {
    vue2Uni: true,
    vue2NotUni: true,
    vue3Uni: true,
    vue3NotUni: true,
  };

  // #ifdef VUE2
  if (isNotInUni()) {
    showOtherDemoMap.vue2NotUni = false;
  } else {
    showOtherDemoMap.vue2Uni = false;
  }
  // #endif

  // #ifdef VUE3
  if (isNotInUni()) {
    showOtherDemoMap.vue3NotUni = false;
  } else {
    showOtherDemoMap.vue3Uni = false;
  }
  // #endif


  return showOtherDemoMap;
}
