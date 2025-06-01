---
url : pages/press/picker-plus/picker-plus
---

## PickerPlus 选择器

选择器组件，用于表单。

## 引入

```ts
import PressPickerPlus from 'press-ui/press-picker-plus/press-picker-plus.vue';

export default {
  components: {
    PressPickerPlus,
  }
}
```

## 代码演示

### 基本用法

**示例**


```html
<press-picker-plus
  v-if="pickerOption.tip.show"
  :title="pickerOption.tip.title"
  :arrowIcon="pickerOption.tip.arrowIcon"
  :list="pickerOption.tip.list"
  :tip="pickerOption.tip.tip"
  :current="pickerOption.tip.current"
  @confirm="pickerOption.tip.confirm"
  @cancel="pickerOption.tip.cancel"
/>
```

```ts
export default {
  data() {
    return {
       pickerOption: {
        tip: {
          show: false,
          title: 'Ban位设置',
          tip: '创建比赛后，可按比赛轮次精确设置。',
          arrowIcon: false,
          list: bpList,
          current: { label: bpList[0].label, value: 1 },
          confirm: (boItem) => {
            this.pickerOption.tip.show = false;
          },
          cancel: () => {
            this.pickerOption.tip.show = false;
          },
        },
      },
    }
  },
  methods: {
    onShowPicker(type) {
      if (this.pickerOption[type]) {
        this.pickerOption[type].show = true;
      }
    },
    onConfirm(...args) {
      this.pickerOption[args[1]].show = false;
    },
    onChange(...args) {
      console.log('onChange.args', args);
    },
  }
},
```

### 函数式调用

支持函数式调用，需要在页面下预埋组件，并指定`mode`为`functional`。


```html
<press-picker-plus
  :id="PRESS_PICKER_ID"
  mode="functional"
/>
```

```ts
export default {
  methods: {
     onShowFunctionalPicker() {
      const { bpList } = this;
      showFunctionalComponent.call(this, {
        selector: `#${PRESS_PICKER_ID}`,
        list: bpList,
        arrowIcon: true,
        current: { label: bpList[1].label, value: 3 },
        title: this.t('banSet'),
        tip: this.t('tipContent'),
      }).then((item) => {
        this.onSuccessTip(item);
      })
        .catch(() => {
          this.onTip('cancel');
        });
    },
  }
}
```

### 虚拟列表

对于数量大于`virtual-list-threshold`的列表，`picker`内部会使用虚拟列表。

实现原理是在`picker-view`上下各插入了一个占位`Dom`，并根据`currentIndex`计算它们的高度，同时将展示的数据减少。

```html
<div
  :style="transformStyle"
>
  <div :style="hiddenUpPartStyle" />
  <div
    v-for="(item, index) in showingData"
    :key="index"
  >
    {{ item.label }}
  </div>
  <div :style="hiddenBottomPartStyle" />
</div>
```

```ts
export default {
  computed: {
    hiddenUpPartStyle() {
      const { currentIndex, itemHeight, virtualListThreshold } = this;
      return `height: ${(currentIndex - virtualListThreshold) * itemHeight}px;`;
    },
    hiddenBottomPartStyle() {
      const { currentIndex, data, itemHeight, virtualListThreshold } = this;
      return `height: ${(data.length - currentIndex - virtualListThreshold) * itemHeight}px;`;
    },
    showingData() {
      const { currentIndex, virtualListThreshold } = this;
      const upMissed = Math.max(0, currentIndex - virtualListThreshold);
      return this.data
        .slice(upMissed, currentIndex + virtualListThreshold).map((item, index) => ({
          ...item,
          uniqueKey: index + upMissed,
        }));
    },
    transformStyle() {
      const res = `transform: translate3d(0, ${this.currentScroll}px, 0);`;
      return res;
    },
  }
}
```


## API

### Props

| 参数                   | 说明                                           | 类型      | 默认值  |
| ---------------------- | ---------------------------------------------- | --------- | ------- |
| title                  | 标题                                           | _string_  | -       |
| arrow-icon             | 左上角是否显示为返回箭头                       | _boolean_ | `false` |
| list                   | 数据列表，每一项为对象，需包含`label`、`value` | _array_   | `[]`    |
| current                | 当前选中项                                     | _object_  | `null`  |
| tip                    | 提示                                           | _string_  | -       |
| mode                   | 函数式调用时传`functional`                     | _string_  | -       |
| virtual-list-threshold | 触发虚拟列表的最小数量                         | _number_  | `50`    |



### Events

| 事件    | 说明     | 返回值 |
| ------- | -------- | ------ |
| cancel  | 点击取消 | -      |
| confirm | 点击确定 | -      |


以下为废弃属性（`v0.7.32`）：



| 类型  | 旧              | 新         |
| ----- | --------------- | ---------- |
| Prop  | show-back-arrow | arrow-icon |
| Prop  | select-list     | list       |
| Prop  | select-item     | current    |
| Event | onClickConfirm  | confirm    |
| Event | onRemove        | cancel     |





## 在线调试

<debug-online />


## 常见问题

### 虚拟列表对比

下面是`picker`有`8000`项时的对比，左图是未使用虚拟列表，右图是使用虚拟列表。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/7/virtual-list-before.gif" width="400">

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/7/virtual-list-after.gif" width="400">

