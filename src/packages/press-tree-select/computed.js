function isActive(activeList, itemId) {
  if (Array.isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }

  return activeList === itemId;
}

module.exports.isActive = isActive;
