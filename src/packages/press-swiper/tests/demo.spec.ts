import { snapshotDemo } from '../../../../tests/unit/demo';
import Demo from '../demo.vue';

jest.mock('swiper-next/es/src/components/swiper', () => ({
  Swiper: {},
}));
jest.mock('swiper-next/es/src/components/swiper-item', () => ({
  SwiperItem: {},
}));
jest.mock('swiper-next/dist/index.css');

snapshotDemo(Demo);
