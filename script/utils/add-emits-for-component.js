const glob = require('glob');
const { addEmitsForComponent } = require('t-comm/lib/component/add-emits');

function main() {
  const list = glob.sync('src/packages/**/*.vue');
  // const list = ['src/packages/press-live-player/live-player-message.vue'];

  list.forEach((file) => {
    addEmitsForComponent(file);
  });
}


main();
