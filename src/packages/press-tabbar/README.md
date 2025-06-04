---
url : pages/press/tabbar/tabbar
---

## Tabbar 标签栏

底部导航栏，用于在不同页面之间进行切换。

## 引入

```ts
import PressTabbar from 'press-ui/press-tabbar/press-tabbar.vue';
import PressTabbarItem from 'press-ui/press-tabbar-item/press-tabbar-item.vue';

export default {
  components: {
    PressTabbar,
    PressTabbarItem,
  }
}
```

## 代码演示

### 基础用法

```html
<press-tabbar :active="active" @change="onChange">
  <press-tabbar-item icon="home-o">标签</press-tabbar-item>
  <press-tabbar-item icon="search">标签</press-tabbar-item>
  <press-tabbar-item icon="friends-o">标签</press-tabbar-item>
  <press-tabbar-item icon="setting-o">标签</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    onChange(value) {
      this.active = value;
    },
  }
};
```

### 通过名称匹配

在标签指定`name`属性的情况下，`v-model`的值为当前标签的`name`。

```html
<press-tabbar :active="active" @change="onChange">
  <press-tabbar-item name="home" icon="home-o">标签</press-tabbar-item>
  <press-tabbar-item name="search" icon="search">标签</press-tabbar-item>
  <press-tabbar-item name="friends" icon="friends-o">标签</press-tabbar-item>
  <press-tabbar-item name="setting" icon="setting-o">标签</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 'home',
    }
  },
  methods: {
    onChange(value) {
      this.active = value;
    },
  }
};
```

### 显示徽标

```html
<press-tabbar :active="active" @change="onChange">
  <press-tabbar-item icon="home-o">标签</press-tabbar-item>
  <press-tabbar-item icon="search" dot>标签</press-tabbar-item>
  <press-tabbar-item icon="friends-o" info="5">标签</press-tabbar-item>
  <press-tabbar-item icon="setting-o" info="20">标签</press-tabbar-item>
</press-tabbar>
```

### 自定义图标

可以通过 slot 自定义图标，其中 icon slot 代表未选中状态下的图标，icon-active slot 代表选中状态下的图标。

```html
<press-tabbar :active="active" @change="onChange">
  <press-tabbar-item info="3">
    <img
      slot="icon"
      src="{{ icon.normal }}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
    />
    <img
      slot="icon-active"
      src="{{ icon.active }}"
      mode="aspectFit"
      style="width: 30px; height: 18px;"
    />
    自定义
  </press-tabbar-item>
  <press-tabbar-item icon="search">标签</press-tabbar-item>
  <press-tabbar-item icon="setting-o">标签</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0,
      icon: {
        normal: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-inactive.png',
        active: '//mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-active.png',
      },
    }
  },
   methods: {
    onChange(value) {
      this.active = value;
    },
  }
};
```

### 自定义颜色

```html
<press-tabbar
  :active="active"
  active-color="#07c160"
  inactive-color="#000"
  @change="onChange"
>
  <press-tabbar-item icon="home-o">标签</press-tabbar-item>
  <press-tabbar-item icon="search">标签</press-tabbar-item>
  <press-tabbar-item icon="friends-o">标签</press-tabbar-item>
  <press-tabbar-item icon="setting-o">标签</press-tabbar-item>
</press-tabbar>
```


### 切换标签事件

```html
<press-tabbar :active="active" @change="onChange">
  <press-tabbar-item icon="home-o">标签1</press-tabbar-item>
  <press-tabbar-item icon="search">标签2</press-tabbar-item>
  <press-tabbar-item icon="friends-o">标签3</press-tabbar-item>
  <press-tabbar-item icon="setting-o">标签4</press-tabbar-item>
</press-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 'home',
    }
  },
  methods: {
    onClick(value) {
      console.log('value:', value);
    },
  }
};
```

## API

### Tabbar Props

| 参数                   | 说明                                               | 类型      | 默认值    |
| ---------------------- | -------------------------------------------------- | --------- | --------- |
| active                 | 当前选中标签的索引                                 | _number_  | -         |
| fixed                  | 是否固定在底部                                     | _boolean_ | `true`    |
| placeholder            | 固定在底部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `false`   |
| border                 | 是否展示外边框                                     | _boolean_ | `true`    |
| z-index                | 元素 z-index                                       | _number_  | `1`       |
| active-color           | 选中标签的颜色                                     | _string_  | `#1989fa` |
| inactive-color         | 未选中标签的颜色                                   | _string_  | `#7d7e80` |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离                    | _boolean_ | `true`    |

### Tabbar Event

| 事件名  | 说明           | 参数                                     |
| ------- | -------------- | ---------------------------------------- |
| @change | 切换标签时触发 | event.detail: 当前选中标签的名称或索引值 |

### TabbarItem Props

| 参数        | 说明                                                                      | 类型               | 默认值           |
| ----------- | ------------------------------------------------------------------------- | ------------------ | ---------------- |
| name        | 标签名称，作为匹配的标识符                                                | _string \| number_ | 当前标签的索引值 |
| icon        | 图标名称或图片链接，可选值见 [Icon 组件](./press-icon-plus)               | _string_           | -                |
| icon-prefix | 图标类名前缀，同 IconPlus 组件的 [class-prefix 属性](./press-icon-plus#props) | _string_           | `press-icon`     |
| dot         | 是否显示小红点                                                            | _boolean_          | -                |
| info        | 图标右上角提示信息                                                        | _string \| number_ | -                |

### TabbarItem Slot

| 名称        | 说明           |
| ----------- | -------------- |
| icon        | 未选中时的图标 |
| icon-active | 选中时的图标   |

## 常见问题

### 头条小程序样式问题

头条小程序中使用 `tabbar-item` 时，需要加上属性 `flex: 1`，比如：

```html
<press-tabbar>
  <press-tabbar-item style="flex: 1">
    标签
  </press-tabbar-item>
</press-tabbar>
```

## 在线调试

<debug-online />
