// 不要引用这个文件，H5 和 小程序环境无法区分打包
export { getH5ComponentHandler } from './h5-handler';
export { getMPComponentHandler } from './mp-handler';
export {
  formatPropKey,
  parseOptions,
  getPropsWatch,
  getPropsData,
  setPropsToData,
  makeExtraMethods,
} from './component-handler';
