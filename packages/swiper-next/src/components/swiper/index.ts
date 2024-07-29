import _Swiper from './swiper';
import { registerInstall, withInstall } from '../register-install';
import './swiper.css';

const Swiper = withInstall(_Swiper);

export default registerInstall(_Swiper);
export type SWiperInstance = InstanceType<typeof _Swiper>;
export { Swiper };
