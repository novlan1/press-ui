---
url : pages/press/popup/popup
---

## Popup 弹出层


弹出层组件，在应用中弹出一个消息提示窗口、提示框等


### 关闭图标

设置`close-icon`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :close-icon="true"
    :arrow-icon="false"
    :title="title"
    title-btn="确定"
    @confirm="confirm"
    @cancel="cancel"
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
    cancel() {
      this.show = false;
    },
    confirm() {
      this.show = false;
    },
  }
};
</script>
```

### 取消图标

设置`arrow-icon`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :close-icon="false"
    :arrow-icon="true"
    :title="title"
    title-btn="确定"
    @confirm="confirm"
    @cancel="cancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 没有关闭/取消

设置`close-icon`为`false`，`arrow-icon`为`false`。


```html
<template>
  <PressPopup
    v-if="show"
    :close-icon="false"
    :arrow-icon="false"
    :title="title"
    title-btn="确定"
    @confirm="confirm"
    @cancel="cancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```



### 线框确认图标

设置`border-button`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :close-icon="true"
    :arrow-icon="false"
    :border-button="true"
    :title="title"
    title-btn="确定"
    @confirm="confirm"
    @cancel="cancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 横版

设置`horizontal`为`true`。


```html
<template>
  <PressPopup
    v-if="show"
    :close-icon="true"
    :horizontal="true"
    :width-number="54"
    :title="title"
    @confirm="confirm"
    @cancel="cancel"
  >
    <view class="content">
      一些内容
    </view>
  </PressPopup>
</template>
```

### 异步关闭


可传入`asyncConfirm`、`asyncCancel`方法控制异步关闭，如果返回`false`或`Promise<false>`则不会关闭`popup`。


```html
 <PressPopup
  :close-icon="false"
  :arrow-icon="false"
  :title-btn="t('confirm')"
  :async-confirm="asyncConfirm"
  :async-close="asyncCancel"
>
  <div class="content">
    {{ t('SomeContent') }}
  </div>
</PressPopup>
```

```ts
export default {
  methods: {
    asyncConfirm() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    },
    asyncCancel() {
      return false;
    },
  }
}
```

### 受控组件

`press-popup-plus`与`press-popup`展示逻辑有很大不同，`press-popup-plus`为受控组件，`show` 默认为`false`。外界传 `true`时，展示进入动画，外界传`false`时，展示退出动画。

- 展示：组件外=> 组件内，`show`属性： `false => true`，`enter`
- 关闭：组件内 => 组件外 => 组件内，触发`close`事件，组件外手动处理 `show = false`，并传给组件内，才能关闭，`show`： `true => false`, `leave`

这种处理方式有以下好处：

- 不用在组件内声明额外关于`show`的变量
- 不用关心异步操作，当外部不想关闭时，不设置 `show` 为 `false` 即可。


`press-popup`由于历史原因，`isShow`属性（对应`press-popup-plus`的`show`）默认为`true`，且点击`cancel`、`confirm`时会关闭`popup`，大量业务这样使用：

- `v-if`控制显示，要隐藏时再传入 `isShow = false`，或者 `this.$refs.container.clickCancel()`

为什么不用`v-if`设为`false`时来退出`popup`呢，因为这样退出动画就没了。

这种方式增加了开发者的心智负担，声明了额外属性，调用了内部不稳定的方法（可能更改或废弃）。


为了使用更简单，同时兼容历史代码，`popup`内部做了一些优化，推荐用这种方式使用(`v0.7.35`之后)：

```html
<PressPopup
  :is-show="show"
  button="确认"
  title="受控组件"
  @confirm="show = false"
  @cancel="show = false"
>
  <div class="content">
    {{ t('SomeContent') }}
  </div>
</PressPopup>
```

`show`为`true`时，`popup`才显示，要关闭时，设置 `show = false` 即可.

对于异步操作，分为两种：

- 点击顶部`confirm`、`cancel`按钮，可传入`asyncConfirm`、`asyncCancel`，这两种方法返回`Promise<false>`时不会关闭`popup`。
- 其他部分，用户自行校验，根据情况设置 `show = false`。



### 函数式调用

支持函数式调用，需要在页面下预埋组件，并指定`mode`为`functional`。

```html
<press-popup
  :id="PRESS_PICKER_ID"
  mode="functional"
>
  <div class="content">
    {{ t('SomeContent') }}
  </div>
</press-popup>
```

```ts
export default {
  methods: {
    onShowFunctionalPicker() {
      showFunctionalComponent.call(this, {
      selector: `#${PRESS_PICKER_ID}`,
      title: this.t('wayToWin'),
      button: this.t('confirm'),
      horizontal: false,
      closeIcon: false,
      arrowIcon: true,
      borderButton: false,
      customStyle: '',
    }).then(() => {
      this.onTip('confirm');
    })
      .catch(() => {
        this.onTip('cancel');
      });
    },
  }
}
```


## API

### Popup Props 

|         属性名         |    类型    | 默认值  |                    说明                    |
| :--------------------: | :--------: | :-----: | :----------------------------------------: |
|       show-title       | _boolean_  | `true`  |                是否显示标题                |
|         title          |  _string_  |    -    |                  弹窗标题                  |
|         button         |  _string_  |    -    |                弹窗标题按钮                |
|     border-button      | _boolean_  | `false` |             标题按钮是否为线型             |
|        z-index         |  _string_  |  `99`   |                  弹窗层级                  |
|      popup-class       |  _string_  |    -    |                    类名                    |
| close-on-click-overlay | _boolean_  | `true`  |            是否可以点击蒙版关闭            |
|       close-icon       | _boolean_  | `false` |              是否显示关闭按钮              |
|       arrow-icon       | _boolean_  | `false` |             是否显示为返回箭头             |
|       horizontal       | _boolean_  | `false` |              是否切换横板样式              |
|      width-number      |  _number_  |  `100`  |             横板弹窗宽度百分比             |
|          mode          |  _string_  |    -    |         函数式调用时传`functional`         |
|     async-confirm      | _function_ |    -    | 异步`confirm`方法，可为`Promise`或普通方法 |
|      async-cancel      | _function_ |    -    | 异步`cancel`方法，可为`Promise`或普通方法  |
|      disabledButton    | _boolean_  | `false` |                   按钮置灰                |



### Popup Events

| 事件称名 |   说明   | 返回值 |
| :------: | :------: | :----: |
|  cancel  | 点击取消 |   -    |
| confirm  | 点击确定 |   -    |

以下为废弃属性（`v0.7.32`）：



| 类型  |         旧         |           新           |
| :---: | :----------------: | :--------------------: |
| Prop  |  show-back-arrow   |       arrow-icon       |
| Prop  | is-showpopup-close |       close-icon       |
| Prop  |   is-show-title    |       show-title       |
| Prop  |   is-cross-slab    |       horizontal       |
| Prop  |    popup-title     |         title          |
| Prop  |  popup-title-btn   |         button         |
| Prop  |   is-border-btn    |     border-button      |
| Prop  |  can-touch-remove  | close-on-click-overlay |
| Event |     onConfirm      |        confirm         |
| Event |      onCancel      |         cancel         |

## 常见问题

`transform`后的`position: fixed`失效，对于`popup`中包含`input`输入框，且需要调整高度的场景，可以使用`customStyle`:

```html
<press-popup
  :custom-style="`bottom: ${inputBottom}px;`"
>
</press-popup>
```

