---
url : pages/press/fab/fab
---

## Fab 悬浮按钮

悬浮按钮，可以拖动。

## 引入

```ts
import PressFab from 'press-ui/press-fab/press-fab';

export default {
  components: {
    PressFab,
  }
}
```

## 代码演示

### 基础用法

```html
 <press-fab
  :pattern="pattern"
  :content="content"
  @fabClick="fabClick"
/>
```

```js
export default {
  data() {
    return {
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#007AFF',
        buttonColor: '#007AFF',
        iconColor: '#fff',
      },
      content: [{
        iconPath: '/static/image.png',
        selectedIconPath: '/static/image-active.png',
        text: '相册',
        active: false,
      },
      {
        iconPath: '/static/home.png',
        selectedIconPath: '/static/home-active.png',
        text: '首页',
        active: false,
      },
      {
        iconPath: '/static/star.png',
        selectedIconPath: '/static/star-active.png',
        text: '收藏',
        active: false,
      },
      ],
    }
  },
  methods: {
    fabClick() {
      uni.showToast({
        title: '点击了悬浮按钮',
        icon: 'none',
      });
    },
  }
}
```


### 使用插槽

支持使用插槽嵌入任意内容。

```html
<PressFab
  :init-x="initX"
  @fabClick="click"
>
  <span class="debug">OK</span>
</PressFab>
```

```js
export default {
  data() {
    return {
      initX: 300, 
    }
  },
  methods: {
    click() {
      console.log('click');
    },
  }
}
```

## API

### Props


| 参数      | 说明                                                      | 类型     | 默认值     |
| --------- | --------------------------------------------------------- | -------- | ---------- |
| pattern   | 可选样式配置项                                            | _object_ | -          |
| direction | 展开菜单显示方式。horizontal:水平显示，vertical：垂直显示 | _string_ | horizontal |
| content   | 展开菜单内容配置项                                        | _Array_  | -          |
| top       | 顶部高度                                                  | _number_ | -          |

## 在线调试

<debug-online />
