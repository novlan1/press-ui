# Common 公共方法

Press UI 内部有一些公共方法，外部用户也可以使用。

由于 Press UI 提供的是未编译的包，所以可以包含条件编译，这是其他库不能提供的。

## 1. setClipboardData

设置粘贴板内容，内部通过条件编译区分 H5 平台和其他平台。

```ts
import { setClipboardData } from 'press-ui/common/clipboard/clipboard';

setClipboardData('abc');

setClipboardData('123')
  .then(() => {
    console.log('Copies Success!')
  })
```

## 2. getActClass

获取活动组件的类名。

```ts
import { getActClass } from 'press-ui/common/utils/act-bem';

const TIP_CLASS_MAP = {
  popup: 'tip-match-bottom-popup-wrap',
  content: 'tip-match-popup-content',
};

function main(useTipClass, args) {
  return getActClass(useTipClass, TIP_CLASS_MAP, args);
}
```

## 3. COLOR_MAP

一些常用的颜色变量。

```ts
import { COLOR_MAP, RED } form 'press-ui/common/constant/color';

console.log(COLOR_MAP.RED); // #ee0a24
console.log(RED); // #ee0a24
```

具体包含内容如下：

```ts
export const RED = '#ee0a24';
export const BLUE = '#1989fa';
export const WHITE = '#fff';
export const GREEN = '#07c160';
export const ORANGE = '#ff976a';
export const GRAY = '#323233';
export const GRAY_DARK = '#969799';
```

## 4. timeStampFormat

同 [T Comm](https://novlan1.github.io/docs/t-comm/zh/time.html) 的同名方法。

```ts
import { timeStampFormat } from 'press-ui/common/format/time';

const stamp = new Date('2020-11-27 8:23:24').getTime();

const res = timeStampFormat(stamp, 'yyyy-MM-dd hh:mm:ss');

// 2020-11-27 08:23:24
```

## 5. deepClone

深度克隆

```ts
import { deepClone } from 'press-ui/common/utils/deep-clone';

deepClone({ a: { b: [1, 2] } });

deepClone(/\d/)

deepClone(['a', 'b'])

deepClone(new Map())
```

## 6. hasOwn

判断对象是否有某属性。

```ts
import { hasOwn } from 'press-ui/common/utils/object-base';

const obj = {a: 1}
hashOwn(obj, a)
```


