function sortComponentConfig(config) {
  return Object.keys(config).reduce((acc, key) => {
    const value = config[key];
    console.log('value', value);

    value.list.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });
    acc = {
      ...acc,
      [key]: {
        ...value,
      },
    };
    return acc;
  }, {});
}

module.exports = {
  sortComponentConfig,
};

