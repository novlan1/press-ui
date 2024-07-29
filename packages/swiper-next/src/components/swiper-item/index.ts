import _SwiperItem from './swiper-item';
import { registerInstall, withInstall } from '../register-install';
import './swiper-item.css';

const SwiperItem = withInstall(_SwiperItem);

export default registerInstall(_SwiperItem);
export type SWiperItemInstance = InstanceType<typeof _SwiperItem>;
export {
  SwiperItem,
};
