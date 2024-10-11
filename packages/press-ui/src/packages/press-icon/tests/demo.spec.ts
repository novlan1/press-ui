import Demo from '../demo.vue';
import { snapshotDemo } from '../../../../tests/unit/demo';

jest.mock('t-comm/es/clipboard/index', () => ({
  clipboardMp: () => {},
  clipboardWeb: () => {},
}));

snapshotDemo(Demo);
