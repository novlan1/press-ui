---
url : pages/press/collapse/collapse
---

## Collapse 折叠面板


将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

## 引入

```ts
import PressCollapse from 'press-ui/press-collapse/press-collapse.vue';
import PressCollapseItem from 'press-ui/press-collapse-item/press-collapse-item.vue';

export default {
  components: {
    PressCollapse,
    PressCollapseItem,
  }
}
```

## 代码演示

### 基础用法

通过`value`控制展开的面板列表，`activeNames`为数组格式。

```html
<press-collapse :value="activeNames" @change="onChange">
  <press-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题3" name="3" disabled>
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
</press-collapse>
```

```javascript
export default {
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    onChange(value) {
      this.setData({
        activeNames: value,
      });
    },
  }
};
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式。

```html
<press-collapse accordion :value="activeName" @change="onChange">
  <press-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题3" name="3">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
</press-collapse>
```

```javascript
export default {
  data() {
    return {
      activeName: '1',
    }
  },
  methods: {
    onChange(value) {
      this.setData({
        activeName: value,
      });
    },
  }
};
```

### 事件监听

`press-collapse` 提供了 `change`, `open` 和 `close` 事件。`change` 事件在面板切换时触发，`open` 事件在面板展开时触发，`close` 事件在面板关闭时触发。

```html
<press-collapse
  :value="activeNames"
  @change="onChange"
  @open="onOpen"
  @close="onClose"
>
  <press-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题2" name="2">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题3" name="3">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
</press-collapse>
```

```javascript
export default {
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    onChange(value) {
      this.setData({
        activeNames: value,
      });
    },
    onOpen(value) {
      Toast(`展开: ${value}`);
    },
    onClose(value) {
      Toast(`关闭: ${value}`);
    },
  }
};
```

### 自定义标题内容

```html
<press-collapse :value="activeNames" @change="onChange">
  <press-collapse-item name="1">
    <div slot="title">标题1<press-icon-plus name="question-o" /></div>
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
  <press-collapse-item title="标题2" name="2" icon="shop-o">
    代码是写出来给人看的，附带能在机器上运行
  </press-collapse-item>
</press-collapse>
```

```javascript
export default {
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    onChange(value) {
      this.setData({
        activeNames: value,
      });
    },
  }
};
```

## API

### Collapse Props

| 参数               | 说明                    | 类型                                                                   | 默认值  |
| ------------------ | ----------------------- | ---------------------------------------------------------------------- | ------- |
| value              | 当前展开面板的 name     | 非手风琴模式：_(string \| number)[]_<br>手风琴模式：_string \| number_ | -       |
| accordion          | 是否开启手风琴模式      | _boolean_                                                              | `false` |
| border             | 是否显示外边框          | _boolean_                                                              | `true`  |
| default-expand-all | 是否默认展开全部        | _boolean_                                                              | `false` |
| duration           | 动画持续时间，单位 `ms` | _number_                                                               | `240`   |

### Collapse Event

| 事件名 | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
| change | 切换面板时触发 | activeNames: _string \| Array_  |
| open   | 展开面板时触发 | currentName: _string \| number_ |
| close  | 关闭面板时触发 | currentName: _string \| number_ |

### CollapseItem Props

| 参数      | 说明                                                                  | 类型               | 默认值  |
| --------- | --------------------------------------------------------------------- | ------------------ | ------- |
| name      | 唯一标识符，默认为索引值                                              | _string \| number_ | `index` |
| title     | 标题栏左侧内容                                                        | _string \| number_ | -       |
| size      | 标题栏大小，可选值为`large`                                           | _string_           | -       |
| icon      | 标题栏左侧图标名称或图片链接，可选值见 [Icon 组件](./press-icon-plus) | _string_           | -       |
| value     | 标题栏右侧内容                                                        | _string \| number_ | -       |
| label     | 标题栏描述信息                                                        | _string_           | -       |
| border    | 是否显示内边框                                                        | _boolean_          | `true`  |
| is-link   | 是否展示标题栏右侧箭头并开启点击反馈                                  | _boolean_          | `true`  |
| clickable | 是否开启点击反馈                                                      | _boolean_          | `false` |
| disabled  | 是否禁用面板                                                          | _boolean_          | `false` |

### CollapseItem Slot

| 名称       | 说明                          |
| ---------- | ----------------------------- |
| -          | 面板内容                      |
| value      | 自定义显示内容                |
| icon       | 自定义`icon`                  |
| title      | 自定义`title`                 |
| right-icon | 自定义右侧按钮，默认是`arrow` |


## 在线调试

<debug-online />
