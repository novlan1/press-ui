function displayTitle(item: any) {
  if (item.title) {
    return item.title;
  }

  const match = item.options.filter((option: Record<string, any>) => option.value === item.value);
  const displayTitle = match.length ? match[0].text : '';
  return displayTitle;
}

export default {
  displayTitle,
};
