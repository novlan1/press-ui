import Demo from '../demo.vue';
import { snapshotDemo } from '../../../../tests/unit/demo';

jest.mock('swiper-next/es/src/components/swiper', () => ({
  Swiper: {},
}));
jest.mock('swiper-next/es/src/components/swiper-item', () => ({
  SwiperItem: {},
}));
jest.mock('swiper-next/dist/index.css');

snapshotDemo(Demo);
