---
url : pages/press/transition/transition
---

## Transition 动画



使元素从一种样式逐渐变化为另一种样式的效果。



## 引入

```ts
import PressTransition from 'press-ui/press-transition/press-transition';

export default {
  components: {
    PressTransition,
  }
}
```

## 代码演示

### 基础用法

将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画。

```html
<press-transition :show="show" custom-class="block">内容</press-transition>
```

### 动画类型

transition 组件内置了多种动画，可以通过`name`字段指定动画类型。

```html
<press-transition name="fade-up" />
```

### 高级用法

可以通过外部样式类自定义过渡效果，还可以定制进入和移出的持续时间。

```html
<press-transition
  :show="options.custom"
  :duration="{ enter: 1000, leave: 1000 }"
  custom-class="block"
  name=""
  enter-class="press-enter-class"
  enter-active-class="press-enter-active-class"
  leave-active-class="press-leave-active-class"
  leave-to-class="press-leave-to-class"
/>
```

```css
.press-enter-active-class,
.press-leave-active-class {
  transition-property: background-color, transform;
}

.press-enter-class,
.press-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
```

## API

### Props

| 参数         | 说明                 | 类型               | 默认值 |
| ------------ | -------------------- | ------------------ | ------ |
| name         | 动画类型             | _string_           | `fade` |
| show         | 是否展示组件         | _boolean_          | `true` |
| duration     | 动画时长，单位为毫秒 | _number \| object_ | `300`  |
| custom-style | 自定义样式           | _string_           | -      |

### Events

| 事件名       | 说明       | 参数 |
| ------------ | ---------- | ---- |
| before-enter | 进入前触发 | -    |
| enter        | 进入中触发 | -    |
| after-enter  | 进入后触发 | -    |
| before-leave | 离开前触发 | -    |
| leave        | 离开中触发 | -    |
| after-leave  | 离开后触发 | -    |

### 外部样式类

| 类名               | 说明                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| custom-class       | 根节点样式类                                                                                                                                                        |
| enter-class        | 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。                                                                                        |
| enter-active-class | 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。       |
| enter-to-class     | 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。                                                         |
| leave-class        | 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。                                                                                                  |
| leave-active-class | 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。 |
| leave-to-class     | 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。                                                     |

### 动画类型

| 名称        | 说明     |
| ----------- | -------- |
| fade        | 淡入     |
| fade-up     | 上滑淡入 |
| fade-down   | 下滑淡入 |
| fade-left   | 左滑淡入 |
| fade-right  | 右滑淡入 |
| slide-up    | 上滑进入 |
| slide-down  | 下滑进入 |
| slide-left  | 左滑进入 |
| slide-right | 右滑进入 |

## 在线调试

<debug-online />