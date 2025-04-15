export let SUPPORT_PASSIVE = false;

try {
  const opts = {};
  Object.defineProperty(opts, 'passive', ({
    get() {
      SUPPORT_PASSIVE = true;
      return true;
    },
  }));
  // https://github.com/facebook/flow/issues/285
  window.addEventListener('test-passive', () => {}, opts);
} catch (e) {}


export const passive = (passive = true) => (SUPPORT_PASSIVE
  ? {
    passive,
  }
  : false);


export const PASSIVE_OPTIONS = passive();
