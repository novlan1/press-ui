---
url : pages/press/popup-cell/popup-cell
---

## PopupCell 弹出层单元格


弹出层包裹的单元格，有`cell`、`checkbox`、`button`、`switch`、`tab`等类型，推荐函数调用。


### 基本使用

先在模板中预埋下。

```html
<PressPopupCell
  :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
  mode="functional"
/>
```

```ts
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';

function showPopupCell(options) {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL}`,
    ...options,
  });
}

export default {
  components: {
    PressPopupCell
  },
  methods: {
    onShowBasicPopupCell() {
      showPopupCell({
        closeIcon: true,
        title: 'Popup Cell',
        cellList: [{
          label: '决胜方式',
          value: '一局胜负',
        },
        {
          label: 'Ban位',
          value: '各禁4英雄',
        },
        ],
      }).catch(({ context }) => {
        context.closeDialog();
      });
    },
  }
}
```


### 自定义类型

目前支持`cell`、`checkbox`、`button`、`switch`、`tab`等类型。


```ts
export default {
  data() {
    return {
       customType: {
        checkboxType: {
          title: 'Checkbox',
          cellList: [
            {
              label: '人满开赛',
              description: '参赛双方满10人准备就绪即可比赛。',
              type: 'checkbox',
            },
            {
              label: '手动开赛',
              description: '管理员手动点击开赛，选手才能进行比赛。',
              type: 'checkbox',
              checked: true,
            },
          ],
        },
        tabType: {
          title: 'Tab',
          cellList: [
            {
              type: 'tab',
              label: '分组',
              active: 'winner',
              tabList: [
                {
                  label: '胜者组',
                  value: 'winner',
                }, {
                  label: '败者组',
                  value: 'loser',
                },
              ],
            },
          ],
        },
        switchType: {
          title: 'Switch',
          cellList: [
            {
              label: '巅峰对决',
              description: '最后一局英雄不限，双方阵容互不可见',
              type: 'switch',
            },
          ],
        },
        buttonType: {
          title: 'Button',
          bottomButton: '取消',
          cellList: [
            {
              label: '批量设置定时开赛',
              type: 'button',
            },
            {
              label: '批量设置截止上场时间',
              type: 'button',
            },
          ],
        },
      },
    }
  },
  methods: {
    onShowCustomType(type) {
      const options = this.customType[type] || {};
      showPopupCell({
        closeIcon: true,
        ...options,
      }).catch(({ context }) => {
        context.closeDialog();
      });
    },
  }
}
```


## API

### PopupCell Props 

|         属性名         |   类型    | 默认值  |            说明            |
| :--------------------: | :-------: | :-----: | :------------------------: |
|       show-title       | _boolean_ | `true`  |        是否显示标题        |
|         title          | _string_  |    -    |          弹窗标题          |
|         button         | _string_  |    -    |        弹窗标题按钮        |
|     border-button      | _boolean_ | `false` |     标题按钮是否为线型     |
|        z-index         | _string_  |  `99`   |          弹窗层级          |
|      popup-class       | _string_  |    -    |            类名            |
| close-on-click-overlay | _boolean_ | `true`  |    是否可以点击蒙版关闭    |
|       close-icon       | _boolean_ | `false` |      是否显示关闭按钮      |
|       arrow-icon       | _boolean_ | `false` |     是否显示为返回箭头     |
|          mode          | _string_  |    -    | 函数式调用时传`functional` |
|        cellList        |  _Array_  |    -    |         `cell`列表         |
|          tip           | _string_  |    -    |          底部提示          |


### PopupCell Events

| 事件称名 |   说明   | 返回值 |
| :------: | :------: | :----: |
|  cancel  | 点击取消 |   -    |
| confirm  | 点击确定 |   -    |

### PopupCell Item Props 

|  属性名  |                   类型                    | 默认值 |                       说明                        |
| :------: | :---------------------------------------: | :----: | :-----------------------------------------------: |
|  label   |                 _string_                  |   -    |                    `cell`标题                     |
|  value   |                 _string_                  |   -    |         `cell`内容，`type`为`cell`时有效          |
|   type   |                 _string_                  | `cell` | `cell`类型，可为`cell/switch/checkbox/button/tab` |
|   open   |                 _boolean_                 |   -    |         是否开启，`type`为`switch`时有效          |
| disabled |                 _boolean_                 |   -    |         是否禁用，`type`为`switch`时有效          |
| tabList  | _Array<{label: string, active: boolean}>_ |   -    |          `tab`列表，`type`为`tab`时有效           |
| checked  |                 _boolean_                 |   -    |        是否开启，`type`为`checkbox`时有效         |


### PopupCell Item Events


| 事件称名 |      说明      | 返回值 |
| :------: | :------------: | :----: |
|  click   | 点击`cellItem` |   -    |
