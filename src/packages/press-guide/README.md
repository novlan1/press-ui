---
url : pages/press/guide/guide
---

## Guide 引导

逐步骤进行指引或解释说明的组件，常用于用户不熟悉的或需进行特别强调的页面。

组件实现参考了 [TDesign](https://tdesign.tencent.com/vue/components/guide)。

## 引入

```ts
import PressGuide from 'press-ui/press-guide/press-guide';

export default {
  components: {
    PressGuide,
  }
}
```

## 代码演示

### 基础用法

```html
<div>
  <div class="main-title">
    <div class="title-major">
      用户引导标题
    </div>
    <div class="title-sub">
      按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
    </div>
  </div>
  <div class="field label-field">
    <PressField
      label="标签文字"
      layout="vertical"
      placeholder="请输入文字"
    />
  </div>
  <div class="field">
    <PressField
      label="标签文字"
      layout="vertical"
      placeholder="请输入文字"
    />
  </div>
  <div class="action">
    <PressButton
      block
      theme="light"
      size="large"
    >
      重置
    </PressButton>
    <PressButton
      block
      theme="primary"
      size="large"
    >
      确定
    </PressButton>
  </div>
</div>

<PressGuide
  :current="current"
  :steps="steps"
  @skip="close"
  @finish="close"
/>
```

```ts
export default {
  data() {
    const steps = [
      {
        element: '.main-title',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'center',
      },
      {
        element: '.label-field',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'bottom',
        highlightPadding: 0,
      },
      {
        element: '.action',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'bottom-right',
      },
    ];

    return {
      current: 0,
      steps,
    }
  }
}
```


### 不带遮罩的引导

设置 `showOverlay` 为 `false`。

```html
<PressGuide
  v-else
  :current="current"
  :steps="steps"
  :show-overlay="false"
  @skip="close"
  @finish="close"
/>
```

### 弹窗形式的引导

设置 `mode` 或者某 `step` 的 `mode`，为 `dialog`，优先取后者。

```html
 <PressGuide
  :current="current"
  :steps="steps"
  mode="dialog"
  @skip="close"
  @finish="close"
>
  <div
    slot="content-0"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 1</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-1"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 2</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-2"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 3</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
</PressGuide>
```

### 气泡与弹窗混合的引导

只需要在 `step` 中指定不同的 `mode` 即可。

```ts
const steps = [
  {
    element: '.main-title',
    title: '用户引导标题',
    body: '用户引导的说明文案',
    placement: 'center',
  },
  {
    element: '.label-field',
    title: '用户引导标题',
    mode: 'dialog',
    placement: 'bottom',
    highlightPadding: 0,
  },
  {
    element: '.action',
    title: '用户引导标题',
    body: '用户引导的说明文案',
    placement: 'bottom-right',
  },
];
```

### 自定义气泡

不设置 `step` 的 `title` 和 `body`，就可以完全自定义内容。

```html
<PressGuide
  v-if="showDialogGuide"
  :current="current"
  :steps="steps"
  mode="dialog"
  @skip="close"
  @finish="close"
>
  <div
    slot="content-0"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 1</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-1"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 2</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-2"
    class="dialog-slot-body"
  >
    <p>用户引导的说明文案 3</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
</PressGuide>
```

```ts
const steps = [
  {
    element: '.main-title',
    placement: 'center',
  },
  {
    element: '.label-field',
    placement: 'bottom',
    highlightPadding: 0,
  },
  {
    element: '.action',
    placement: 'bottom-right',
  },
]
```

## API

### Props

| 参数                | 类型      | 默认值    | 描述                                                                                                |
| ------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------- |
| back-button-props   | _object_  | -         | 透传 返回 的全部属性，示例：`{ content: '返回', theme: 'default' }`。TS 类型：`ButtonProps`         |
| current             | _number_  | -         | 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景                                     |
| finish-button-props | _object_  | -         | 透传 完成 的全部属性，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps`         |
| hide-counter        | _boolean_ | `false`   | 是否隐藏计数                                                                                        |
| hide-skip           | _boolean_ | `false`   | 是否隐藏跳过按钮                                                                                    |
| highlight-padding   | _number_  | `16`      | 高亮框的内边距，单位 `rpx`                                                                          |
| mode                | _string_  | `popover` | 引导框的类型。可选项：`popover/dialog`                                                              |
| next-button-props   | _object_  | -         | 透传 下一步按钮 的全部属性，示例：`{ content: '下一步', theme: 'primary' }`。TS 类型：`ButtonProps` |
| show-overlay        | _boolean_ | `true`    | 是否出现遮罩层                                                                                      |
| skip-button-props   | _object_  | -         | 透传 跳过按钮 的全部属性，`{ content: '跳过', theme: 'default' }`。TS 类型：`ButtonProps`           |
| steps               | _array_   | -         | 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。。TS 类型：`Array<GuideStep>`   |
| using-custom-navbar | _boolean_ | `false`   | 是否使用了自定义导航栏                                                                              |
| z-index             | _number_  | `999999`  | 提示框的层级                                                                                        |



### GuideStep

| 参数                | 类型      | 默认值 | 说明                                                                                                                                                                                                                                                                                         |
| ------------------- | --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| back-button-props   | _object_  | -      | 用于自定义当前引导框的返回按钮的内容。TS 类型：`ButtonProps`                                                                                                                                                                                                                                 |
| body                | _string_  | -      | 当前步骤提示框的内容，支持插槽：`slot="content-{{index}}"` (1、当要显示`body`插槽时，请将`body`设置为空；2、当要显示`content-{{index}}`插槽完全自定义内容时，请将`body`和`title`都设置为空)                                                                                                  |
| element             | _string_  | -      | 必需。高亮的节点。示例： `.main-title`                                                                                                                                                                                                                                                       |
| finish-button-props | _object_  | -      | 透传 完成 的全部属性，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps`                                                                                                                                                                                                  |
| highlight-padding   | _number_  | -      | 高亮框的内边距，单位rpx                                                                                                                                                                                                                                                                      |
| mode                | _string_  | -      | 引导框的类型。可选项：`popover/dialog`                                                                                                                                                                                                                                                       |
| next-button-props   | _object_  | -      | 用于自定义当前引导框的下一步按钮的内容。TS 类型：`ButtonProps`                                                                                                                                                                                                                               |
| offset              | _array_   | -      | 相对于 `placement` 的偏移量`[left, top]`，默认单位`rpx`，示例：`[-10, 20]` 或 `['10px', '8px']` 或 `['20rpx', '16rpx']` (仅当 `mode` 为 `popover` 时生效)。TS 类型：`Array<string \| number>`                                                                                                |
| placement           | _string_  | `top`  | 引导框相对于高亮元素出现的位置，(仅当 `mode` 为 `popover` 时生效)。TS 类型：`StepPopoverPlacement ` `type StepPopoverPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'\|'center'` |
| show-overlay        | _boolean_ | `true` | 是否出现遮罩层                                                                                                                                                                                                                                                                               |
| skip-button-props   | _object_  | -      | 用于自定义当前步骤引导框的跳过按钮的内容。TS 类型：`ButtonProps`                                                                                                                                                                                                                             |
| title               | _string_  | -      | 当前步骤的标题内容，支持插槽：`slot="content-{{index}}"` (1、当要显示`title`插槽时，请将`title`设置为空；2、当要显示`content-{{index}}`插槽完全自定义内容时，请将`body`和`title`都设置为空)                                                                                                  |


### Events

| 事件名          | 参数                                                          | 说明                   |
| --------------- | ------------------------------------------------------------- | ---------------------- |
| back            | `(detail: { current: number, total: number  })`               | 点击返回按钮时触发     |
| change          | `(current: number, context?: {  total: number })`             | 当前步骤发生变化时触发 |
| finish          | `(detail: { current: number, total: number  })`               | 点击完成按钮时触发     |
| next-step-click | `(detail: { next: number, current: number, total: number  })` | 点击下一步时触发       |
| skip            | `(detail: { current: number, total: number  })`               | 点击跳过按钮时触发     |

### Slots

| 名称                 | 说明       |
| -------------------- | ---------- |
| content-`${current}` | 自定义内容 |


## 在线调试

<debug-online />
