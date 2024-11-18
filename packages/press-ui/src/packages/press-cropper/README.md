---
url : pages/press/cropper/cropper
---

## Cropper 图片裁剪

H5 下使用的是 [vue-cropper](https://www.npmjs.com/package/vue-cropper)，非 H5 下使用的是 [nice-cropper](https://github.com/prianyu/uniapp-nice-cropper)。

`vue-cropper` 需业务侧自行引入，Vue3 需安装 `vue-cropper@next`，`nice-cropper` 组件内部已引入。


## 引入

```ts
import PressCropper from 'press-ui/press-cropper/press-cropper';

export default {
  components: {
    PressCropper,
  }
}
```

## 代码演示

### 基础用法

```html
<PressButton
  type="primary"
  block
  @click="selectImg"
>
  上传图片
</PressButton>

<PressCropper
  :show="show"
  :src="src"
  :zoom="1"
  :angle="0"
  :cut-width="'100%'"
  :bound-detect="true"
  :disable-preview="true"
  :disable-rotate="true"
  canvas-background="red"
  :is-e-sport="isESport"
  :h5-option="h5Option"
  @cropped="cropped"
  @cancel="cancel"
  @confirm="confirm"
/>
```

```ts
export default {
  data() {
    return {
      src: '',
      show: false,
      isESport: false,
       h5Option: {
        autoCrop: true,
        autoCropWidth: '80%',
        autoCropHeight: '80%',
        canMove: true,
        canMoveBox: true,
        centerBox: true,
        enlarge: 2,
        fixedBox: true,
        info: false,
        infoTrue: true,
        mode: 'contain',
        outputSize: 1,
        outputType: 'jpg',
      },
    };
  },
  mounted() {
    this.initH5Option();
  },
  methods: {
    initH5Option() {
      // #ifdef H5
      const aspectRatio = 1;
      const cropWidth = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

      this.h5Option = {
        ...this.h5Option,
        autoCropWidth: cropWidth,
        autoCropHeight: Math.floor(cropWidth * aspectRatio),
        aspectRatio,
        mode: `${cropWidth}px auto`,
        outputType: 'png',
        centerBox: true,
      };
      // #endif
    },
    selectImg() {
      uni.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const { tempFilePaths } = res;
          this.src = tempFilePaths[0];
          this.h5Option.img = this.src;
          console.log('[src]', this.src);
          this.show = true;
        },
      });
    },
    beforeDraw(context, transform) {
      context.setFillStyle('yellow');
      transform.zoom = 2;
    },
    afterDraw(ctx, info) {
      ctx.fillText('我是一行文字水印', 20, 20);
      console.log(`当前画布大小：${info.width}*${info.height}`);
    },
    cropped(imagePath, imageInfo) {
      console.log('[cropped]', imagePath, imageInfo);
    },
    confirm(...args) {
      console.log('[confirm]', args);
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
  },
}
```

## API

### Props

| 参数       | 说明                                           | 类型      | 默认值     |
| ---------- | ---------------------------------------------- | --------- | ---------- |
| show       | 是否显示弹窗                                   | _boolean_ | `false`    |
| src        | 图片地址                                       | _string_  | -          |
| show-title | 是否显示标题                                   | _boolean_ | `true`     |
| title      | 标题                                           | _string_  | `裁剪图片` |
| is-e-sport | 是否为 `ESport` 模式                           | _boolean_ | `false`    |
| h5-option  | `H5`下的参数                                   | _object_  | -          |
| delay-show | 为防止获取不到宽高，延迟显示的时间，单位为`ms` | _number_  | `200`      |

小程序参数可以参考[这里](https://github.com/prianyu/uniapp-nice-cropper)。

### Events

| 事件名  | 说明     | 参数     |
| ------- | -------- | -------- |
| confirm | 点击确认 | 图片信息 |
| cancel  | 点击取消 | -        |

可以通过 `$refs.cropper` 调用 `vue-cropper` 或 `nick-cropper` 内部的方法。

## 在线调试

<debug-online />
