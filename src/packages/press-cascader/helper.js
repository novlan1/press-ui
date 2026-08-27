import { getAreaData } from 'press-ui/press-area/computed';


const makeOption = (
  text,
  value,
  children,
) => ({
  text,
  value,
  children,
});

export function fetchCascaderAreaData() {
  return new Promise((resolve, reject) => {
    getAreaData().then((res) => {
      const result = parseData(res);
      resolve(result);
    })
      .catch((err) => {
        reject(err);
      });
  });
}

function parseData(areaList) {
  const {
    city_list: city,
    county_list: county,
    province_list: province,
  } = areaList;

  const provinceMap = new Map();
  Object.keys(province).forEach((code) => {
    provinceMap.set(code.slice(0, 2), makeOption(province[code], code, []));
  });

  const cityMap = new Map();

  Object.keys(city).forEach((code) => {
    const option = makeOption(city[code], code, []);
    cityMap.set(code.slice(0, 4), option);

    const province = provinceMap.get(code.slice(0, 2));
    if (province) {
      province.children.push(option);
    }
  });

  Object.keys(county).forEach((code) => {
    const city = cityMap.get(code.slice(0, 4));
    if (city) {
      city.children.push(makeOption(county[code], code));
    }
  });

  return Array.from(provinceMap.values());
}
