---
url : pages/press/datetime-picker/datetime-picker
---

## DatetimePicker

用于选择时间，支持日期、时分等时间维度，通常与 弹出层 组件配合使用。

## 引入

```ts
import PressDatetimePicker from 'press-ui/press-datetime-picker/press-datetime-picker';

export default {
  components: {
    PressDatetimePicker,
  }
}
```

## 代码演示

### 选择完整时间

`value` 为时间戳。

```html
<press-datetime-picker
  type="datetime"
  :value="currentDate"
  :min-date="minDate"
  :max-date="maxDate"
  @input="onInput"
/>
```

```javascript
export default {
  data() {
    return {
      minDate: new Date().getTime(),
      maxDate: new Date(2099, 10, 1).getTime(),
      currentDate: new Date().getTime(),
    };
  },
  methods: {
    onInput(event) {
      this.currentDate = event;
    },
  },
};
```

### 选择日期（年月日）

`value` 为时间戳，通过传入 `formatter` 函数对选项文字进行处理。

```html
<press-datetime-picker
  type="date"
  :value="currentDate"
  :min-date="minDate"
  :filter="filter"
  :formatter="formatter"
  @input="onInput"
/>
```

```js
export default {
  data() {
    return {
      isOpen: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date().getTime(),
      maxDate: new Date(2099, 10, 1).getTime(),
      currentDate: new Date().getTime(),

      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } if (type === 'month') {
          return `${val}月`;
        } if (type === 'day') {
          return `${val}日`;
        } if (type === 'hour') {
          return `${val}时`;
        } if (type === 'minute') {
          return `${val}分`;
        }
      },
      filter(type, options) {
        if (type === 'minute') {
          return options.filter(option => option % 5 === 0);
        }
        return options;
      },
    };
  },
  methods: {
    onInput(event) {
      console.log('onInput.event', event);
      this.currentDate = event;
    },
  },
};
```

### 选择日期（年月）

`value` 为时间戳。

```html
<press-datetime-picker
  type="year-month"
  :value="currentDate"
  :min-date="minDate"
  @input="onInput"
/>
```

```js
export default {
  data() {
    return {
      minDate: new Date().getTime(),
      currentDate: new Date().getTime(),
    };
  },
  methods: {
    onInput(event) {
      this.currentDate = event;
    },
  },
};
```

### 选择时间

`value` 为字符串。

```html
<press-datetime-picker
  type="time"
  :value="currentTime"
  :min-hour="minHour"
  :max-hour="maxHour"
  @input="onInputTime"
/>
```

```js
export default {
  data() {
    return {
      minHour: 10,
      maxHour: 20,
      currentTime: '12:00',
    };
  },
  methods: {
    onInputTime(event) {
      console.log('onInputTime.event', event);
      this.currentTime = event;
    },
  },
};
```

### 选项过滤器

通过传入 `filter` 函数，可以对选项数组进行过滤，实现自定义时间间隔。

```html
<press-datetime-picker
  type="time"
  :value="currentTime"
  :filter="filter"
/>
```

```js
Page({
  data: {
    currentTime: '12:00',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }

      return options;
    },
  },
});
```

### 结合 PopupPlus

提供了 `datetime-picker-popup-plus`。本质上是对 `popup-plus` 组件和 `datetime-picker` 的封装。

`popup-plus` 的参数展平传入，`datetime-picker` 的参数除 `filter/formatter` 展平传入外，其他属性通过 `datetimePicker` 对象控制。

```html
<PressDatetimePickerPopupPlus
  :show="popupPlus.show"
  :datetime-picker="popupPlus.datetimePicker"
  :formatter="formatter"
  :filter="filter"
  @cancel="popupPlus.show = false"
  @confirm="onConfirm"
  @input="onInput"
/>
```

```ts
import PressDatetimePickerPopupPlus from 'press-ui/press-datetime-picker/press-datetime-picker-popup-plus.vue';

export default {
  data() {
    return {
      popupPlus: {
        show: false,
        datetimePicker: {
          showToolbar: true,
          minDate,
          maxDate,
        },
      },
    };
  },
  methods: {
    onInput(event) {
      this.currentDate = event;
      this.onTip(`${timeStampFormat(event, 'yyyy-MM-dd hh:mm')}`);
    },
    onConfirm(value) {
      this.popupPlus.show = false;
      console.log('[confirm]', value);
      this.onInput(value);
    }
  },
}
```

支持属性包括：

```ts
type IProps = {
  show?: boolean;
  closeOnClickOverlay?: boolean;
  datetimePicker: {
    value?: number;
    showToolbar?: boolean;
    itemHeight?: number;
    type?: string;
    maxDate?: number;
    minDate?: number;
    immediateCheck?: boolean;
    title?: string;
  };
  formatter?: Function;
  filter?: Function;
}
```


### 结合 Popup

提供了 `datetime-picker-popup`，并支持函数式调用。本质上是对 `popup` 组件和 `datetime-picker` 的封装。

`popup` 的参数展平传入，`datetime-picker` 的参数可传入 `datetimePicker` 对象。


```html
<PressDatetimePickerPopup
  :id="DATE_TIME_PICKER_ID"
  :ref="DATE_TIME_PICKER_ID"
  mode="functional"
/>
```

```ts
import PressDatetimePickerPopup from 'press-ui/press-datetime-picker/press-datetime-picker-popup.vue';
import { showFunctionalComponent } from 'press-ui/common/functional-component/index';


export default {
  components: {
    PressDatetimePickerPopup
  },
  methods: {
    onShowFunctionalPicker() {
      let inputValue = '';
      showFunctionalComponent.call(this, {
        context: this,
        selector: `#${DATE_TIME_PICKER_ID}`,
        title: this.t('timeType'),
        button: this.t('confirm'),
        horizontal: false,
        closeIcon: false,
        arrowIcon: false,
        borderButton: false,
        customStyle: '',
        datetimePicker: {
          value: new Date().getTime(),
          minDate: new Date().getTime() - ONE_YEAR_MIL_SECONDS,
          maxDate: new Date().getTime() + ONE_YEAR_MIL_SECONDS,
          input(event) {
            that.onInput(event);
            inputValue = event;
            console.log('inputValue', inputValue);
          },
        },
      }).then((resp = {}) => {
        const { context } = resp;
        console.log('inputValue', inputValue);
        this.onTip('confirm');
        context.innerShow = false;
      })
        .catch((err = {}) => {
          const { context } = err;
          this.onTip('cancel');
          context.innerShow = false;
        });
    },
  }
}
```

## API

### Props

| 参数                | 说明                                                                           | 类型                       | 默认值     |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------- | ---------- |
| value               | 当前选中值                                                                     | _string \| number_         | -          |
| type                | 类型，可选值为 `date` `time` `year-month` <br> <strong>不建议动态修改</strong> | _string_                   | `datetime` |
| min-date            | 可选的最小时间，精确到分钟                                                     | _number_                   | 十年前     |
| max-date            | 可选的最大时间，精确到分钟                                                     | _number_                   | 十年后     |
| min-hour            | 可选的最小小时，针对 time 类型                                                 | _number_                   | `0`        |
| max-hour            | 可选的最大小时，针对 time 类型                                                 | _number_                   | `23`       |
| min-minute          | 可选的最小分钟，针对 time 类型                                                 | _number_                   | `0`        |
| max-minute          | 可选的最大分钟，针对 time 类型                                                 | _number_                   | `59`       |
| filter              | 选项过滤函数(`type` 可能值为 `year`, `month`, `day`, `hour`, `minute`)         | _(type, values) => values_ | -          |
| formatter           | 选项格式化函数(`type` 可能值为 `year`, `month`, `day`, `hour`, `minute`)       | _(type, value) => value_   | -          |
| title               | 顶部栏标题                                                                     | _string_                   | `''`       |
| show-toolbar        | 是否显示顶部栏                                                                 | _boolean_                  | `true`     |
| loading             | 是否显示加载状态                                                               | _boolean_                  | `false`    |
| item-height         | 选项高度                                                                       | _number_                   | `44`       |
| confirm-button-text | 确认按钮文字                                                                   | _string_                   | `确认`     |
| cancel-button-text  | 取消按钮文字                                                                   | _string_                   | `取消`     |
| visible-item-count  | 可见的选项个数                                                                 | _number_                   | `6`        |
| use-momentum        | 是否使用惯性滚动                                                               | _boolean_                  | `false`    |
| swipe-duration      | 快速滑动时惯性滚动的时长，单位 `ms`                                            | _number \| string_         | `1000`     |

### Events

| 事件名称 | 说明                     | 回调参数   |
| -------- | ------------------------ | ---------- |
| input    | 当值变化时触发的事件     | 当前 value |
| change   | 当值变化时触发的事件     | 组件实例   |
| confirm  | 点击完成按钮时触发的事件 | 当前 value |
| cancel   | 点击取消按钮时触发的事件 | -          |

### change 事件

在`change`事件中，可以获取到组件实例，对组件进行相应的更新等操作：

| 函数                           | 说明                                       |
| ------------------------------ | ------------------------------------------ |
| getColumnValue(index)          | 获取对应列中选中的值                       |
| setColumnValue(index, value)   | 设置对应列中选中的值                       |
| getColumnValues(index)         | 获取对应列中所有的备选值                   |
| setColumnValues(index, values) | 设置对应列中所有的备选值                   |
| getValues()                    | 获取所有列中被选中的值，返回一个数组       |
| setValues(values)              | `values`为一个数组，设置所有列中被选中的值 |

## 在线调试

<debug-online />

