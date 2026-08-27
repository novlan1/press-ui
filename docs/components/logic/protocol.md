---
url : pages/press/protocol/protocol
---

# Protocol 协议

解析协议，解析后的数据可以传给 [press-protocol](../press/press-protocol) 组件。

## 基础用法

```ts
import { parseProtocol } from 'press-ui/common/protocol/parse-protocol';

export default {
  computed: {
    computedProtocolList() {
      return parseProtocol(this.protocolList);
    },
  },
}
```

可以解析的数据格式如下：

```ts
interface IProtocolItem {
  text: string;
  light?: boolean;
  link?: string;
}

Array<{
  title?: string;
  list: Array<string | Array<string | IProtocolItem>>
}>
```

也就是协议列表中的每一项可以是字符串，比如：

```ts
const data = [
  {
    title: '一、序言',
    list: [
      [
        '1、“Press UI组件库”（以下简称 Press UI）是基于uni-app的跨端组件库，旨在',
        {
          text: '提升开发效率、沉淀业务组件',
          light: true,
        },
        '，为开发者提供易用、灵活、高性能的组件库。',
      ],
      '2、为规范用户行为，保障用户的合法权益，提升产品服务信息质量，特制定本规范。',
      [
        '3、本规范适用于所有使用者。',
        {
          text: '用户不得是未满18周岁的未成年人。',
          light: true,
        },
      ],
    ],
  },
];

parseProtocol(data);
```
