---
url : pages/press/p-c-login/p-c-login
---

## PCLogin PC登录

PC 登录弹窗。

## 引入

```ts
import PressPCLogin from 'press-ui/press-p-c-login/press-p-c-login';

export default {
  components: {
    PressPCLogin,
  }
}
```

## 代码演示

### 基础用法


```html
<PressPCLogin
  :show.sync="show"
  @close="closeDialog"
  @jumpToLoginWX="jumpToLoginWX"
  @jumpToLoginQQ="jumpToLoginQQ"
/>
```

```ts
export default {
  components: {
    PressPCLogin,
  },
  data() {
    let show = false;
    // #ifdef H5
    show = true;
    // #endif

    return {
      show,
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    jumpToLoginWX() {
      this.onGTip('[jumpToLoginWX]');
      this.show = false;
    },
    jumpToLoginQQ() {
      this.onGTip('[jumpToLoginQQ]');
      this.show = false;
    },
    closeDialog() {    
      console.log('closeDialog');
    },
  },
};
```


## API

### Props

| 参数                  | 说明                             | 类型      | 默认值  |
| --------------------- | -------------------------------- | --------- | ------- |
| show                  | 是否展示                         | _boolean_ | `false` |
| show-q-q              | 是否显示QQ登录                   | _boolean_ | `true`  |
| show-w-x              | 是否显示微信登录                 | _boolean_ | `true`  |
| destroyed-when-closed | 是否在关闭时销毁                 | _boolean_ | `false` |
| use-tip-class         | 是否使用 `tip-comp` 为前缀的类名 | _boolean_ | `false` |

### Events

| 事件名        | 说明           | 参数 |
| ------------- | -------------- | ---- |
| close         | 弹窗关闭时触发 | -    |
| jumpToLoginQQ | 点击QQ登录     | -    |
| jumpToLoginWX | 点击微信登录   | -    |
