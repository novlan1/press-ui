---
url : pages/press/popup/popup
---

## Popup 弹出层


弹出层组件，在应用中弹出一个消息提示窗口、提示框等


### 关闭图标

设置`is-showpopup-close`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :is-showpopup-close="true"
    :show-back-arrow="false"
    :popup-title="title"
    popup-title-btn="确定"
    @onConfirm="onConfirm"
    @onCancel="onCancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

```ts
export default {
  data() {
    return {
      title: '决胜方式',
      show: false;
    }
  },
  methods: {
    onCancel() {
      this.show = false;
    },
    onConfirm() {
      this.show = false;
    },
  }
};
</script>
```

### 取消图标

设置`is-showpopup-close`为`true`，`show-back-arrow`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :is-showpopup-close="true"
    :show-back-arrow="true"
    :popup-title="title"
    popup-title-btn="确定"
    @onConfirm="onConfirm"
    @onCancel="onCancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 没有关闭/取消

设置`is-showpopup-close`为`false`，`show-back-arrow`为`false`。


```html
<template>
  <PressPopup
    v-if="show"
    :is-showpopup-close="false"
    :show-back-arrow="false"
    :popup-title="title"
    popup-title-btn="确定"
    @onConfirm="onConfirm"
    @onCancel="onCancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```



### 线框确认图标

设置`is-border-btn`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :is-showpopup-close="true"
    :show-back-arrow="false"
    :is-border-btn="true"
    :popup-title="title"
    popup-title-btn="确定"
    @onConfirm="onConfirm"
    @onCancel="onCancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 横版

设置`is-cross-slab`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :is-showpopup-close="true"
    :is-cross-slab="true"
    :width-number="54"
    :popup-title="title"
    @onConfirm="onConfirm"
    @onCancel="onCancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 异步关闭

```html
 <PressPopup
  v-if="popupOptions.noClose.show"
  :is-showpopup-close="false"
  :show-back-arrow="false"
  :popup-title="popupOptions.noClose.title"
  :popup-title-btn="t('confirm')"
  @onConfirm="popupOptions.noClose.onConfirm"
  @onCancel="popupOptions.noClose.onCancel"
>
  <div class="content">
    {{ t('SomeContent') }}
  </div>
</PressPopup>
```

```ts
export default {
  data() {
    return {
      popupOptions: {
        noClose: {
          show: false,
          title: this.t('wayToWin'),
          onCancel: () => {
            this.popupOptions.noClose.show = false;
          },
          onConfirm: () => {
            this.popupOptions.noClose.show = false;
          },
        },
      }
    }
  },
  methods: {
    validateConfirm() {
      if (['noClose', 'borderBtn'].indexOf(this.type) <= -1) return true;

      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.type === 'noClose') {
            console.log('异步确认后可以关闭');
            resolve(true);
          } else {
            resolve(false);
            console.log('异步确认后禁止关闭');
          }
        }, 2000);
      });
    }
  }
}
```

## API

### Popup Props 

|      属性名      |   类型   | 默认值 |                         说明                         |
| :--------------: | :------: | :----: | :--------------------------------------------------: |
|   isShowTitle    | Boolean  |  true  |                     是否显示标题                     |
|    popupTitle    |  String  |   -    |                       弹窗标题                       |
|  popupTitleBtn   |  String  |   -    |                     弹窗标题按钮                     |
|   isBorderBtn    | Boolean  | false  |                     标题按钮样式                     |
| validateConfirm  | Function |   -    | 在执行确认动画前，validateConfirm返回false则进行拦截 |
|      zIndex      |  String  |  '99'  |                       弹窗层级                       |
|    popupClass    |  String  |   -    |                        class                         |
|  canTouchRemove  | Boolean  |  true  |                 是否可以点击蒙版关闭                 |
| isShowpopupClose | Boolean  | false  |                   是否显示关闭按钮                   |
|  showBackArrow   | Boolean  | false  |                  是否显示为返回箭头                  |
|   isCrossSlab    | Boolean  | false  |                   是否切换横板样式                   |
|   widthNumber    |  Number  |  100   |                  横板弹窗宽度百分比                  |





### Popup Events

| 事件称名  |   说明   | 返回值 |
| :-------: | :------: | :----: |
| onCancel  | 点击取消 |   -    |
| onConfirm | 点击确定 |   -    |

