// #ifdef H5
import { loadVConsole } from 't-comm/lib/v-console/v-console';
// #endif


const V_CONSOLE_STORAGE = {
  KEY: 'SHOW_V_CONSOLE',
  VALUE: '1',
};

export const V_CONSOLE_STATE = {
  show: false,
};

function loadTheVConsole() {
  loadVConsole().then((instance) => {
    window.vConsole = instance;
  });
}


export function showVConsole() {
// #ifdef H5
  V_CONSOLE_STATE.show = true;
  localStorage.setItem(V_CONSOLE_STORAGE.KEY, V_CONSOLE_STORAGE.VALUE);
  loadTheVConsole();
// #endif
}


export function closeVConsole() {
// #ifdef H5
  localStorage.removeItem(V_CONSOLE_STORAGE.KEY);
  V_CONSOLE_STATE.show = false;
  window.vConsole?.destroy();
// #endif
}

export function toggleVConsole() {
  if (V_CONSOLE_STATE.show) {
    closeVConsole();
  } else {
    showVConsole();
  }
  return V_CONSOLE_STATE.show;
}


export function checkAndShowVConsole() {
// #ifdef H5
  const showVConsole = localStorage.getItem(V_CONSOLE_STORAGE.KEY) === V_CONSOLE_STORAGE.VALUE;
  if (showVConsole) {
    V_CONSOLE_STATE.show = true;
    loadTheVConsole();
  }
// #endif
}
