# Protocol

Parse the protocol, and the parsed data can be passed to the [press-protocol](../press/press-protocol) component.

## Basic usage

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

The data formats that can be parsed are as follows:

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

That is, each item in the protocol list can be a string, such as:

```ts
const data = [
   {
     title: '1. Preface',
     list: [
       [
         '1. "Press UI component library" (hereinafter referred to as Press UI) is a cross-terminal component library based on uni-app, aiming at',
         {
           text: 'Improving development efficiency and precipitating business components',
           light: true,
         },
         ', providing developers with an easy-to-use, flexible, and high-performance component library. ',
       ],
       '2. In order to standardize user behavior, protect users' legitimate rights and interests, and improve the quality of product and service information, this specification is formulated. ',
       [
         '3. This specification applies to all users. ',
         {
           text: 'Users must not be minors under the age of 18. ',
           light: true,
         },
       ],
     ],
   },
];

parseProtocol(data);
```