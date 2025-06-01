export const SCROLL_TOP_KEY = 'INDEX_SCROLL_TOP';


export const NOT_SHOW_IN_MP_COMPONENTS = [];

export const NOT_SHOW_IN_PURE_PROJECT = [];

const MAP_POSITION = {
  lat: '40.839711',
  lng: '111.738691',
};

const MAP_QQ_URL = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${MAP_POSITION.lat},${MAP_POSITION.lng};title:;addr:&referer=tip&title=查看地图`;
export const MAP_PAGE_URL = `/pages/map/map?url=${MAP_QQ_URL}`;
