---
url : pages/press/protocol/protocol
---

## Protocol 协议


数据驱动的协议组件，支持文字高亮、链接跳转。

## 引入

```ts
import PressProtocol from 'press-ui/press-protocol/press-protocol';

export default {
  components: {
    PressProtocol,
  }
}
```

## 代码演示

### 基础用法


```html
 <PressProtocol
  :list="list"
  @click="onClickProtocol"
/>
```

```ts
import PressProtocol from 'press-ui/press-protocol/press-protocol.vue';

const data = [
  {
    title: '一、序言',
    list: [
      {
        list: [
          {
            text: 'xxx',
            uniqueKey: 'third-key-0',
          },
          {
            text: 'xxx',
            light: true,
            uniqueKey: 'third-key-1',
          },
          {
            text: 'xxx',
            link: 'https://baidu.com'
            uniqueKey: 'third-key-2',
          },
        ],
        uniqueKey: 'second-key-0',
      },
    ],
    uniqueKey: 'first-key-0',
  },
];


export default {
  components: {
    PressProtocol,
  },
  data() {
    return {
      list: data,
    }
  },
  onClickProtocol(infoItem) {
    window.location.href = infoItem.link;
  }
}
```


## API

### Props

| 参数 | 说明     | 类型    | 默认值 |
| ---- | -------- | ------- | ------ |
| list | 协议数据 | _array_ | -      |


### Events

| 事件名 | 说明                                  | 参数   |
| ------ | ------------------------------------- | ------ |
| click  | 点击协议，并且`info.link`不为空时触发 | `info` |



### list


协议列表`list`，其结构如下:


```
- 章节
  - 标题
  - 段落
    - 句子
```

用`typescript`表示为：

```ts
Array<{
  //// 章节 //// 
  title?: string; 
  list: Array<{

    //// 段落 //// 
    list: Array<{

      //// 句子 //// 
      text: string;
      light?: boolean;
      link?: string;
      uniqueKey: string;
    }>;
    uniqueKey: string;
  }>
  uniqueKey: string;
}>
```

`light`表示文案高亮，`link`表示文案可跳转。

为方便使用，`press-ui`提供了 [parseProtocol](../logic/protocol) 方法，可以灵活的配置数据。
