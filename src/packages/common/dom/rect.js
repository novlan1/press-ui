export function getRect(context, selector) {
  return new Promise((resolve) => {
    // #ifdef H5
    const el = context.$el;
    if (el) {
      const child =  el.querySelector(selector);
      if (!child) {
        resolve({});
      }
      const rect = child.getBoundingClientRect();
      resolve(rect);
      return;
    }
    // #endif

    uni.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

export function getAllRect(context, selector) {
  return new Promise((resolve) => {
  // #ifdef H5
    const el = context.$el;
    if (el) {
      const children =  el.querySelectorAll(selector);
      const rect = [...children].map(item => item.getBoundingClientRect());
      resolve(rect);
      return;
    }
    // #endif

    uni.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => {
        resolve(rect[0]);
      });
  });
}

