---
url : pages/press/icon/icon
---

## Icon

It is used to display `icons` icons, currently only `empty` is reserved, please use `press-icon-plus` for other icons.

## Code Demo

### Basic Usage

Using components in ``template``

```html
<press-icon type="empty" size="30"></press-icon>
```

### Music player icon

Basic usage:

```html
<press-icon-music />
```

```ts
import PressIconMusic from 'press-ui/press-icon/press-icon/music';

export default {
  components: {
    PressIconMusic,
  }
}
```

Specify the color:

```html
<press-icon-music
   color="rgb(94, 109, 130)"
/>
```

Specify the number of `bar`:

```html
<press-icon-music :number="5"/>
```


Specify icon width and height:

```html
<press-icon-plus
   width="60px"
   height="60px"
/>
```



## API

### Icon Props

| property name |  type  | default value |            description             |
| :-----------: | :----: | :-----------: | :--------------------------------: |
|     size      | Number |      24       |             Icon size              |
|     type      | String |       -       | icon pattern, refer to the example |
|     color     | String |       -       |             icon color             |

### Icon Events

| event name |           description            | return value |
| :--------: | :------------------------------: | :----------: |
|   @click   | Click the Icon to fire the event |      -       |


### Icon Music Props


| property name |  type  | default value |                  description                  |
| :-----------: | :----: | :-----------: | :-------------------------------------------: |
|    number     | Number |       3       | The number of vertical bars, supporting `1-5` |
|     color     | String |   `#2979ff`   |                  icon color                   |
|     width     | String |    `40px`     |        the overall height of the icon         |
|    height     | String |    `50px`     |         the overall width of the icon         |