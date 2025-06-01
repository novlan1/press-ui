---
url : pages/press/popup-cell/popup-cell
---

## PopupCell 弹出层单元格


弹出层包裹的单元格，有`cell`、`checkbox`、`button`、`switch`、`tab`等类型，推荐函数调用。


## 引入

```ts
import PressPopupPlusCell from 'press-ui/press-popup-cell/press-popup-cell.vue';

export default {
  components: {
    PressPopupPlusCell,
  }
}
```

## 代码演示

### 基本使用

先在模板中预埋下。

```html
<PressPopupPlusCell
  :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
  mode="functional"
/>
```

```ts
import PressPopupPlusCell from 'press-ui/press-popup-cell/press-popup-cell.vue';

function showPopupCell(options) {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL}`,
    ...options,
  });
}

export default {
  components: {
    PressPopupPlusCell
  },
  methods: {
    onShowBasicPopupCell() {
      showPopupCell({
        closeIcon: true,
        title: 'Popup Cell',
        cellList: [{
          label: '决胜方式',
          value: '一局胜负',
          click: ({ context }) => {
            context.closeDialog();
          }
        },
        {
          label: 'Ban位',
          value: '各禁4英雄',
          click: ({ context }) => {
            context.closeDialog();
          }
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

#### checkbox


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
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
            {
              label: '手动开赛',
              description: '管理员手动点击开赛，选手才能进行比赛。',
              type: 'checkbox',
              checked: true,
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
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

#### multiple checkbox


```ts
export default {
  data() {
    return {
       customType: {
        multipleCheckboxType: {
          title: 'Checkbox',
          button: '确定',
          asyncConfirm: ({ checkedIndexList }) => {
            if (!checkedIndexList?.length) {
              this.onGTip('必须选择一路');
              return false;
            }

            const nameStr = this.customType.multipleCheckboxType.cellList
              .filter((_, index) => checkedIndexList.indexOf(index) > -1)
              .map(item => item.label)
              .join('、');
            this.onGTip(`修改成功，${nameStr}`);
            return true;
          },
          cellList: [
            {
              label: '对抗路',
              type: 'checkbox',
              click: () => {},
            },
            {
              label: '中路',
              type: 'checkbox',
              checked: true,
              click: () => {},
            },
            {
              label: '发育路',
              type: 'checkbox',
              checked: true,
              click: () => {},
            },
          ],
        },
      },
    }
  },
}
```


#### tab


```ts
const local = {
  activeRoundType: 'winner',
};


export default {
  data() {
    return {
       customType: {
        tabType: {
          title: 'Tab',
          cellList: [
            {
              type: 'tab',
              label: '分组',
              active: local.activeRoundType,
              tabList: [
                {
                  label: '胜者组',
                  value: 'winner',
                }, {
                  label: '败者组',
                  value: 'loser',
                },
              ],
              click: ({ tabItem, item }) => {
                local.activeRoundType = tabItem.value;
                this.customType.tabType.cellList[0].active = tabItem.value;
                this.onGTip(`已切换至${tabItem.label}`);
              },
            },
          ],
        },
      },
    }
  },
}
```

#### switch


```ts
export default {
  data() {
    return {
       customType: {
        switchType: {
          title: 'Switch',
          cellList: [
            {
              label: '巅峰对决',
              description: '最后一局英雄不限，双方阵容互不可见',
              type: 'switch',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
      },
    }
  },
}
```


#### button

```ts
export default {
  data() {
    return {
       customType: {
        buttonType: {
          title: 'Button',
          bottomButton: '取消',
          cellList: [
            {
              label: '批量设置定时开赛',
              type: 'button',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
            {
              label: '批量设置截止上场时间',
              type: 'button',
              click: ({ context: popupContext }) => {
                popupContext.closeDialog();
                that.onGTip('修改成功');
              },
            },
          ],
        },
      },
    }
  },
}
```


## API

### PopupCell Props 

| 属性名                 | 说明                       | 类型      | 默认值  |
| ---------------------- | -------------------------- | --------- | ------- |
| show-title             | 是否显示标题               | _boolean_ | `true`  |
| title                  | 弹窗标题                   | _string_  | -       |
| button                 | 弹窗标题按钮               | _string_  | -       |
| border-button          | 标题按钮是否为线型         | _boolean_ | `false` |
| z-index                | 弹窗层级                   | _string_  | `99`    |
| popup-class            | 类名                       | _string_  | -       |
| close-on-click-overlay | 是否可以点击蒙版关闭       | _boolean_ | `true`  |
| close-icon             | 是否显示关闭按钮           | _boolean_ | `false` |
| arrow-icon             | 是否显示为返回箭头         | _boolean_ | `false` |
| mode                   | 函数式调用时传`functional` | _string_  | -       |
| cell-list              | `cell`列表                 | _array_   | -       |
| tip                    | 底部提示                   | _string_  | -       |


### PopupCell Events

| 事件    | 说明     | 返回值 |
| ------- | -------- | ------ |
| cancel  | 点击取消 | -      |
| confirm | 点击确定 | -      |

### PopupCell Item Props 

| 属性名   | 说明                                              | 类型                                      | 默认值 |
| -------- | ------------------------------------------------- | ----------------------------------------- | ------ |
| label    | `cell`标题                                        | _string_                                  | -      |
| value    | `cell`内容，`type`为`cell`时有效                  | _string_                                  | -      |
| type     | `cell`类型，可为`cell/switch/checkbox/button/tab` | _string_                                  | `cell` |
| open     | 是否开启，`type`为`switch`时有效                  | _boolean_                                 | -      |
| disabled | 是否禁用，`type`为`switch`时有效                  | _boolean_                                 | -      |
| tab-list | `tab`列表，`type`为`tab`时有效                    | _array<{label: string, active: boolean}>_ | -      |
| checked  | 是否开启，`type`为`checkbox`时有效                | _boolean_                                 | -      |


### PopupCell Item Events


| 事件  | 说明           | 返回值 |
| ----- | -------------- | ------ |
| click | 点击`cellItem` | -      |
