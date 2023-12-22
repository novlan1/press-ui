---
url : pages/press/steps/steps
---

## Steps 

It is used to display each link of the operation process, so that users can understand the position of the current operation in the overall process.


## Code Demo

### Basic usage

```html
<press-steps :steps="steps" :active="active" />
```

```javascript
export default {
   data() {
     return {
       steps: [
         {
           text: 'Step 1',
           desc: 'Description information',
         },
         {
           text: 'Step 2',
           desc: 'Description information',
         },
         {
           text: 'Step 3',
           desc: 'Description information',
         },
         {
           text: 'Step 4',
           desc: 'Description information',
         },
       ],
       active: 1,
     }
   },
};
```

### Custom styles

The active icon and color can be set via the `active-icon` and `active-color` properties.

```html
<press-steps
   :steps="steps"
   :active="active"
   active-icon="success"
   active-color="#38f"
/>
```

### Custom icon

The icon for each item can be set separately via the `inactiveIcon` and `activeIcon` properties.

```html
<press-steps :steps="steps" :active="active" />
```

```javascript
Page({
   data: {
     steps: [
       {
         text: 'Step 1',
         desc: 'Description information',
         inactiveIcon: 'location-o',
         activeIcon: 'success',
       },
       {
         text: 'Step 2',
         desc: 'Description information',
         inactiveIcon: 'like-o',
         activeIcon: 'plus',
       },
       {
         text: 'Step 3',
         desc: 'Description information',
         inactiveIcon: 'star-o',
         activeIcon: 'cross',
       },
       {
         text: 'Step 4',
         desc: 'Description information',
         inactiveIcon: 'phone-o',
         activeIcon: 'fail',
       },
     ],
   },
});
```

### Vertical step bar

You can change the way the step bar is displayed by setting the `direction` property.

```html
<press-steps
   :steps="steps"
   :active="active"
   direction="vertical"
   active-color="#ee0a24"
/>
```

## API

### Steps Props

| Parameter      | Description                                                                       | Type                            | Default      |
| -------------- | --------------------------------------------------------------------------------- | ------------------------------- | ------------ |
| active         | current step                                                                      | _number_                        | 0            |
| steps          | step configuration collection, see configuration items below                      | _Step configuration item array_ | `[]`         |
| direction      | display direction, optional values are `horizontal` `vertical`                    | _string_                        | `horizontal` |
| active-color   | active state color                                                                | _string_                        | `#07c160`    |
| inactive-color | inactive state color                                                              | _string_                        | `#969799`    |
| active-icon    | active bottom icon, see [Icon Component](./press-icon-plus) for optional values   | _string_                        | `checked`    |
| inactive-icon  | Inactive bottom icon, see [Icon Component](./press-icon-plus) for optional values | _string_                        | -            |

### Events

| Event Name | Description                            | Callback Parameters                         |
| ---------- | -------------------------------------- | ------------------------------------------- |
| click-step | event triggered when a step is clicked | event.detail: the index of the current step |

### External style classes

| class name   | description                         |
| ------------ | ----------------------------------- |
| custom-class | root node style class               |
| desc-class   | description information style class |

### Step configuration item

| key name     | description                                                                                                                   | type     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| text         | current step name                                                                                                             | _string_ |
| desc         | current step description                                                                                                      | _string_ |
| activeIcon   | bottom icon of active state of current step                                                                                   | _string_ |
| inactiveIcon | The icon at the bottom of the inactive state of the current step, see [Icon Component](./press-icon-plus) for optional values | _string_ |

## Theme customization

<theme-config />