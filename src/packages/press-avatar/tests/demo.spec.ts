import { snapshotDemo } from '../../../../tests/unit/demo';
import Demo from '../demo.vue';


snapshotDemo(Demo, {
  // Demo 页面包含开启了随机背景色的头像组件，mock `Math.random` 函数以维持 snapshot 一致。
  beforeTest: () => {
    jest.spyOn(Math, 'random')
      .mockReturnValueOnce(0.67)
      .mockReturnValue(0.34);
  },
});
