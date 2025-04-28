import { snapshotDemo } from '../../../../tests/unit/demo';
import Demo from '../demo.vue';

jest.mock('t-comm/es/clipboard/index', () => ({
  clipboardMp: () => {},
  clipboardWeb: () => {},
}));

snapshotDemo(Demo);
