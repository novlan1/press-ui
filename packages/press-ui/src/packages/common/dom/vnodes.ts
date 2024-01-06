function flattenVNodes(vnodes: Array<any>) {
  const result: Array<any> = [];

  function traverse(vnodes: Array<any>) {
    vnodes.forEach((vnode) => {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map((item: any) => item.$vnode));
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
export function sortChildren(children: Array<any>, parent: any) {
  // #ifndef VUE3
  const { componentOptions } = parent.$vnode;

  if (!componentOptions?.children) {
    return;
  }

  const vnodes = flattenVNodes(componentOptions.children);
  children.sort((a, b) => vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode));
  // #endif
}


export function sortMPChildren(children: Array<any>) {
  const shouldSort = children.find(child => child.sortIndex);
  if (shouldSort) {
    children.sort((a, b) => a.sortIndex - b.sortIndex);
  }
}
