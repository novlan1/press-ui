---
url : pages/press/transition/transition
---

## Transition 



The effect of gradually changing an element from one style to another.



## Code Demo

### Basic usage

Wrap the element in the transition component, when the element is displayed/hidden, there will be a corresponding transition animation.

```html
<press-transition :show="show" custom-class="block">Content</press-transition>
```

### Animation Type

The transition component has a variety of built-in animations, and the animation type can be specified through the `name` field.

```html
<press-transition name="fade-up" />
```

### Advanced usage

Transition effects can be customized through external style classes, and the duration of entry and exit can also be customized.

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

| Parameter    | Description                        | Type               | Default |
| ------------ | ---------------------------------- | ------------------ | ------- |
| name         | animation type                     | _string_           | `fade`  |
| show         | Whether to show the component      | _boolean_          | `true`  |
| duration     | animation duration in milliseconds | _number \| object_ | `300`   |
| custom-style | custom style                       | _string_           | -       |

### Events

| Event Name   | Description              | Parameters |
| ------------ | ------------------------ | ---------- |
| before-enter | trigger before entering  | -          |
| enter        | Entering trigger         | -          |
| after-enter  | Triggered after entering | -          |
| before-leave | Fires before leaving     | -          |
| leave        | fires while leaving      | -          |
| after-leave  | fires after leaving      | -          |

### External style classes

| class name         | description                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| custom-class       | root node style class                                                                                                                                                                                                                                                                                             |
| enter-class        | Defines the start state of the enter transition. It takes effect before the element is inserted, and is removed in the next frame after the element is inserted.                                                                                                                                                  |
| enter-active-class | Defines the state when the enter transition is active. Applied throughout the entry transition phase, applied before the element is inserted, and removed after the transition/animation completes. This class can be used to define process times, delays and curve functions into transitions.                  |
| enter-to-class     | Defines the end state of the enter transition. Applied the next frame after the element is inserted (at the same time the enter-class is removed), removed after the transition/animation is complete.                                                                                                            |
| leave-class        | Defines the start state of the leave transition. Immediately after the exit transition is triggered, it is removed the next frame.                                                                                                                                                                                |
| leave-active-class | Defines the state when the leave transition is active. Applied throughout the exit transition phase, immediately when the exit transition is triggered, and removed after the transition/animation completes. This class can be used to define process times, delays and curve functions for leaving transitions. |
| leave-to-class     | Defines the end state of the leave transition. Applied the next frame after the leave transition is triggered (while the leave-class is removed), removed after the transition/animation is complete.                                                                                                             |

### Animation Type

| Name        | Description            |
| ----------- | ---------------------- |
| fade        | fade in                |
| fade-up     | Slide up and fade in   |
| fade-down   | Slide down and fade in |
| fade-left   | Swipe left to fade in  |
| fade-right  | Swipe right to fade in |
| slide-up    | slide up               |
| slide-down  | slide down             |
| slide-left  | Swipe left to enter    |
| slide-right | Swipe right to enter   |