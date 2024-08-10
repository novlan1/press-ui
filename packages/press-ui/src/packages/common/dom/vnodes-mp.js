export function sortMPChildren(children) {
  const shouldSort = children.find(child => child.sortIndex);
  if (shouldSort) {
    children.sort((a, b) => a.sortIndex - b.sortIndex);
  }
}
