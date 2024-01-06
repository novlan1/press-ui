---
url : pages/press/protocol/protocol
---

## Protocol 


Data-driven protocol components that support text highlighting and link jumping.

## Code Demo

### Basic Usage



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
     title: '1. Preface',
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
     Press Protocol,
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

| Parameter | Description   | Type    | Default |
| --------- | ------------- | ------- | ------- |
| list      | protocol data | _array_ | -       |


### Events

| Event Name | Description                                                       | Parameters |
| ---------- | ----------------------------------------------------------------- | ---------- |
| click      | Triggered when a protocol is clicked and `info.link` is not empty | `info`     |



### list


Protocol list `list`, its structure is as follows:


```
- chapter
   - title
   - paragraph
     - sentence
```

Expressed in `typescript` as:

```ts
Array<{
   //// Chapter ////
   title?: string;
   list: Array<{

     //// Paragraph ////
     list: Array<{

       //// sentence //// 
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

`light` means that the copy is highlighted, and `link` means that the copy can be jumped.

For ease of use, `press-ui` provides the [parseProtocol](../logic/protocol) method, which can configure data flexibly.
