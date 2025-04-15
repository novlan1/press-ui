---
url : pages/press/dialog/dialog
---

## Dialog 


Pop-up window component, support function call

### Basic Usage

**example**

```html
<press-dialog id="tip-match-comm-tips-dialog" />
```

```ts
import { showDialog } from 'press-ui/press-dialog';

export default {
   methods: {
     onShowDialog() {
       showDialog({
         title: 'Prompt',
         content: 'Only for the captain to sign up, send it to the captain to sign up! ',
         confirmText: 'Confirm',
         cancelText: 'Cancel',
       }).then(() => {})
         .catch(() => {});
     },
   },
};
```

## API

### Props

| property name | type   | default value | description         |
| ------------- | ------ | ------------- | ------------------- |
| title         | String | Tips          | Title               |
| htmlContent   | String | -             | html content        |
| content       | String | -             | content             |
| confirmText   | String | OK            | Confirm button text |
| cancelText    | String | -             | Cancel button text  |