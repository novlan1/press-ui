---
url : pages/press/picker/picker
---

## Picker 选择器


选择器组件，用于表单

### 基本用法

**示例**


```html
<press-picker
  v-if="pickerOption.tip.show"
  :title="pickerOption.tip.title"
  :show-back-arrow="pickerOption.tip.showBackArrow"
  :select-list="pickerOption.tip.selectList"
  :tip="pickerOption.tip.tip"
  :select-item="pickerOption.tip.selectItem"
  @onClickConfirm="pickerOption.tip.onClickConfirm"
  @onRemove="pickerOption.tip.onRemove"
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
          showBackArrow: false,
          selectList: bpList,
          selectItem: { label: bpList[0].label, value: 1 },
          onClickConfirm: (boItem) => {
            this.pickerOption.tip.show = false;
          },
          onRemove: () => {
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


## API

### Props

|属性名				|类型		|默认值	|说明																																														|
|:-:					|:-:		|:-:		|:-:																																														|
|title					|String	|-			|标题																																												|
|showBackArrow					|Boolean	|false|左上角是否显示为返回箭头|
|selectList					|Array	|[]|数据列表|
|selectItem					|Object	|null|当前选中项|
|tip					|String	|-|提示|




### Events

|    事件称名    |   说明   | 返回值 |
| :------------: | :------: | :----: |
|    onRemove    | 点击取消 |   -    |
| onClickConfirm | 点击确定 |   -    |


## 主题定制

<theme-config />