---
url : pages/press/guide/guide
---

## Guide

Components that provide step-by-step guidance or explanations, often used for pages that users are not familiar with or that need special emphasis.

The component implementation refers to [TDesign](https://tdesign.tencent.com/vue/components/guide).

## Import

```ts
import PressGuide from 'press-ui/press-guide/press-guide';

export default {
  components: {
    PressGuide,
  }
}
```

## Usage

### Basic Usage

```html
<div>
  <div class="main-title">
    <div class="title-major">
      title
    </div>
    <div class="title-sub">
      A button is used to start a closed-loop operation task, such as "delete" an object, "purchase" a product, etc.
    </div>
  </div>
  <div class="field label-field">
    <PressField
      label="label"
      layout="vertical"
      placeholder="Please enter text"
    />
  </div>
  <div class="field">
    <PressField
      label="label"
      layout="vertical"
      placeholder="Please enter text"
    />
  </div>
  <div class="action">
    <PressButton
      block
      theme="light"
      size="large"
    >
      Reset
    </PressButton>
    <PressButton
      block
      theme="primary"
      size="large"
    >
      Confirm
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
        title: 'title',
        body: 'User guide text',
        placement: 'center',
      },
      {
        element: '.label-field',
        title: 'title',
        body: 'User guide text',
        placement: 'bottom',
        highlightPadding: 0,
      },
      {
        element: '.action',
        title: 'title',
        body: 'User guide text',
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


### No Mask

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

### Dialog

Sets `mode` or the `mode` of a `step` to `dialog`, whichever takes precedence.

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
    <p>User guide text 1</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-1"
    class="dialog-slot-body"
  >
    <p>User guide text 2</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-2"
    class="dialog-slot-body"
  >
    <p>User guide text 3</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
</PressGuide>
```

### Multiple

Just specify a different `mode` in `step`.

```ts
const steps = [
  {
    element: '.main-title',
    title: 'title',
    body: 'User guide text',
    placement: 'center',
  },
  {
    element: '.label-field',
    title: 'title',
    mode: 'dialog',
    placement: 'bottom',
    highlightPadding: 0,
  },
  {
    element: '.action',
    title: 'title',
    body: 'User guide text',
    placement: 'bottom-right',
  },
];
```

### Custom Popover

By not setting the `title` and `body` of a `step`, you can completely customize the content.

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
    <p>User guide text 1</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-1"
    class="dialog-slot-body"
  >
    <p>User guide text 2</p>
    <PressImage
      class="guide-demo-image"
      src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
    />
  </div>
  <div
    slot="content-2"
    class="dialog-slot-body"
  >
    <p>User guide text 3</p>
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

| Parameter           | Type      | Default   | Description                                                                                                                                      |
| ------------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| back-button-props   | _object_  | -         | Transparently pass all properties of return , example: `{ content: 'Back', theme: 'default' }`. TS type: `ButtonProps`                           |
| current             | _number_  | -         | Current step, that is, the progress of the entire guide. -1 does not display, used for scenes that need to interrupt display                     |
| finish-button-props | _object_  | -         | Transparently pass all properties of finish , example: `{ content: 'Finish', theme: 'primary' }`. TS type: `ButtonProps`                         |
| hide-counter        | _boolean_ | `false`   | Whether to hide the counter                                                                                                                      |
| hide-skip           | _boolean_ | `false`   | Whether to hide the skip button                                                                                                                  |
| highlight-padding   | _number_  | `16`      | Padding of the highlight box, unit `rpx`                                                                                                         |
| mode                | _string_  | `popover` | Type of the guide box. Optional: `popover/dialog`                                                                                                |
| next-button-props   | _object_  | -         | Transparently pass all properties of the next button, example: `{ content: 'next', theme: 'primary' }`. TS Type: `ButtonProps`                   |
| show-overlay        | _boolean_ | `true`    | Whether to show the mask layer                                                                                                                   |
| skip-button-props   | _object_  | -         | Pass all properties of the skip button, `{ content: 'Skip', theme: 'default' }`. TS Type: `ButtonProps`                                          |
| steps               | _array_   | -         | Used to define the content of each step, including highlighted nodes, relative positions, and specific copy content. TS Type: `Array<GuideStep>` |
| using-custom-navbar | _boolean_ | `false`   | Whether to use a custom navigation bar                                                                                                           |
| z-index             | _number_  | `999999`  | The level of the prompt box                                                                                                                      |

### GuideStep

| Parameter           | Type      | Default | Description                                                                                                                                                                                                                                                                                                                       |
| ------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| back-button-props   | _object_  | -       | Used to customize the content of the back button of the current guide frame. TS type: `ButtonProps`                                                                                                                                                                                                                               |
| body                | _string_  | -       | The content of the current step prompt frame, supporting slots: `slot="content-{{index}}"` (1. When you want to display the `body` slot, please set `body` to empty; 2. When you want to display the `content-{{index}}` slot to fully customize the content, please set both `body` and `title` to empty)                        |
| element             | _string_  | -       | Required. Highlighted node. Example: `.main-title`                                                                                                                                                                                                                                                                                |
| finish-button-props | _object_  | -       | Pass through all properties of Finish, example: `{ content: 'finish', theme: 'primary' }`. TS type: `ButtonProps`                                                                                                                                                                                                                 |
| highlight-padding   | _number_  | -       | Padding of the highlight box, unit: rpx                                                                                                                                                                                                                                                                                           |
| mode                | _string_  | -       | Type of the guide box. Optional: `popover/dialog`                                                                                                                                                                                                                                                                                 |
| next-button-props   | _object_  | -       | Used to customize the content of the next button of the current guide box. TS Type: `ButtonProps`                                                                                                                                                                                                                                 |
| offset              | _array_   | -       | Offset `[left, top]` relative to `placement`, default unit `rpx`, example: `[-10, 20]` or `['10px', '8px']` or `['20rpx', '16rpx']` (only valid when `mode` is `popover`). TS Type: `Array<string \| number>`                                                                                                                     |
| placement           | _string_  | `top`   | The position of the guide box relative to the highlighted element (only valid when `mode` is `popover`). TS type: `StepPopoverPlacement` `type StepPopoverPlacement = 'top'\|'left'\|'right'\|'bottom'\|'top-left'\|'top-right'\|'bottom-left'\|'bottom-right'\|'left-top'\|'left-bottom'\|'right-top'\|'right-bottom'\|'center'` |
| show-overlay        | _boolean_ | `true`  | Whether to show the overlay layer                                                                                                                                                                                                                                                                                                 |
| skip-button-props   | _object_  | -       | Used to customize the skip button content of the current step guide box. TS type: `ButtonProps`                                                                                                                                                                                                                                   |
| title               | _string_  | -       | The title content of the current step, supports slots: `slot="content-{{index}}"` (1. When you want to display the `title` slot, please set `title` to empty; 2. When you want to display the `content-{{index}}` slot to fully customize the content, please set both `body` and `title` to empty)                               |

### Events

| Event name      | Parameters                                                   | Description                                 |
| --------------- | ------------------------------------------------------------ | ------------------------------------------- |
| back            | `(detail: { current: number, total: number })`               | Triggered when the back button is clicked   |
| change          | `(current: number, context?: { total: number })`             | Triggered when the current step changes     |
| finish          | `(detail: { current: number, total: number })`               | Triggered when the finish button is clicked |
| next-step-click | `(detail: { next: number, current: number, total: number })` | Triggered when the next step is clicked     |
| skip            | `(detail: { current: number, total: number })`               | Triggered when the skip button is clicked   |

### Slots

| Name                 | Description    |
| -------------------- | -------------- |
| content-`${current}` | Custom content |

## Online Debugging

<debug-online />
