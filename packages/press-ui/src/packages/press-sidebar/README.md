---
url : pages/press/sidebar/sidebar
---

## Sidebar 侧边导航

垂直展示的导航栏，用于在不同的内容区域之间进行切换。


## 引入

```ts
import PressSidebar from 'press-ui/press-sidebar/press-sidebar';
import PressSidebarItem from 'press-ui/press-sidebar-item/press-sidebar-item';

export default {
  components: {
    PressSidebar,
    PressSidebarItem,
  }
}
```

## 代码演示

### 基础用法

通过在`press-sidebar`上设置`activeKey`属性来控制选中项。

```html
<press-sidebar :active-key="activeKey">
  <press-sidebar-item title="标签名" />
  <press-sidebar-item title="标签名" />
  <press-sidebar-item title="标签名" />
</press-sidebar>
```

```javascript
export default {
  data() {
    return {
      activeKey: 0,
    }
  },
};
```

### 徽标提示

设置`dot`属性后，会在右上角展示一个小红点。设置`badge`属性后，会在右上角展示相应的徽标。

```html
<press-sidebar :active-key="activeKe">
  <press-sidebar-item title="标签名" dot />
  <press-sidebar-item title="标签名" badge="5" />
  <press-sidebar-item title="标签名" badge="99+" />
</press-sidebar>
```

### 禁用选项

通过`disabled`属性禁用选项。

```html
<press-sidebar :active-key="activeKe">
  <press-sidebar-item title="标签名" />
  <press-sidebar-item title="标签名" disabled />
  <press-sidebar-item title="标签名" />
</press-sidebar>
```

### 监听切换事件

设置`change`方法来监听切换导航项时的事件。

```html
<press-sidebar :active-key="activeKe" @change="onChange">
  <press-sidebar-item title="标签名 1" />
  <press-sidebar-item title="标签名 2" />
  <press-sidebar-item title="标签名 3" />
</press-sidebar>
```

```js
export default {
  data() {
    return {
      activeKey: 0,
    }
  },
  methods: {
    onChange(value) {
      console.log('value', value);
    },
  }
};
```

## API

### Sidebar Props

| 参数      | 说明         | 类型               | 默认值 |
| --------- | ------------ | ------------------ | ------ |
| activeKey | 选中项的索引 | _string \| number_ | `0`    |

### Sidebar Event

| 事件名 | 说明           | 参数               |
| ------ | -------------- | ------------------ |
| change | 切换徽章时触发 | 当前选中徽章的索引 |

### SidebarItem Props

| 参数     | 说明                                              | 类型               | 默认值  |
| -------- | ------------------------------------------------- | ------------------ | ------- |
| title    | 内容                                              | _string_           | `''`    |
| dot      | 是否显示右上角小红点                              | _boolean_          | `false` |
| info     | 图标右上角徽标的内容（已废弃，请使用 badge 属性） | _string \| number_ | `''`    |
| badge    | 图标右上角徽标的内容                              | _string \| number_ | `''`    |
| disabled | 是否禁用该项                                      | _boolean_          | `false` |

### SidebarItem Slot

| 名称  | 说明                                        |
| ----- | ------------------------------------------- |
| title | 自定义标题栏，如果设置了`title`属性则不生效 |

### SidebarItem Event

| 事件名 | 说明           | 参数                            |
| ------ | -------------- | ------------------------------- |
| click  | 点击徽章时触发 | `event.detail` 为当前徽章的索引 |

## 主题定制

<theme-config />

## 在线调试

<debug-online />