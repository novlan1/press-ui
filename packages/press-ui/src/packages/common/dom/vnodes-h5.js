function flattenVNodes(vnodes) {
  const result = [];

  function traverse(vnodes) {
    vnodes.forEach((vnode) => {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map(item => item.$vnode));
      }

      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
}


// sort children instances by vnodes order
export function sortChildren(children, parent) {
  // #ifndef VUE3
  const { componentOptions } = parent.$vnode;

  if (!componentOptions?.children) {
    return;
  }

  const vnodes = flattenVNodes(componentOptions.children);
  children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
  // #endif
}
