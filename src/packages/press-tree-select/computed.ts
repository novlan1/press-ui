export function isActive(activeList: Array<string | number>, itemId: string | number) {
  if (Array.isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }

  return activeList === itemId;
}

