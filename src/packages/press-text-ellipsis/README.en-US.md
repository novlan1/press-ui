---
url : pages/press/text-ellipsis/text-ellipsis
---

## TextEllipsis 文本省略

Display ellipsis for long text and support for expanding or collapsing text.

## Usage

### Basic Usage

Show one rows by default.

```html
<press-text-ellipsis :content="text" />
```

```js
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.';
    return { text };
  },
};
```

### Expand/Collapse

Support Expand/Collapse.

```html
<press-text-ellipsis
  :content="text"
  expand-text="expand"
  collapse-text="collapse"
/>
```

```js
export default {
  setup() {
    const text =
      "The fleeting time of one's life is everything that belongs to a person. Only this thing truly belongs to you. Everything else is just a momentary pleasure or misfortune, which will soon be gone with the passing of time.";
    return { text };
  },
};
```

### Customize rows

Display the number of `rows` by setting rows.

```html
<press-text-ellipsis
  rows="3"
  :content="text"
  expand-text="expand"
  collapse-text="collapse"
/>
```

```js
export default {
  setup() {
    const text =
      "That day, I turned twenty-one. In the golden age of my life, I was full of dreams. I wanted to love, to eat, and to instantly transform into one of these clouds, part alight, part darkened. It was only later that I understood life is but a slow, drawn-out process of getting your balls crushed. Day by day, you get older. Day by day, your dreams fade. In the end you are no different from a crushed ox. But I hadn't foreseen any of it on my twenty-first birthday. I thought I would be vigorous forever, and that nothing could ever crush me.";
    return { text };
  },
};
```

### Custom Collapse Position

- Collapse the beginning part of the content:

```html
<press-text-ellipsis
  rows="1"
  :content="text"
  expand-text="expand"
  collapse-text="collapse"
  position="start"
/>
```

```js
export default {
  setup() {
    const text =
      "That day, I turned twenty-one. In the golden age of my life, I was full of dreams. I wanted to love, to eat, and to instantly transform into one of these clouds, part alight, part darkened. It was only later that I understood life is but a slow, drawn-out process of getting your balls crushed. Day by day, you get older. Day by day, your dreams fade. In the end you are no different from a crushed ox. But I hadn't foreseen any of it on my twenty-first birthday. I thought I would be vigorous forever, and that nothing could ever crush me.";
    return { text };
  },
};
```

- Collapse the middle part of the content:

```html
<press-text-ellipsis
  rows="2"
  :content="text"
  expand-text="expand"
  collapse-text="collapse"
  position="middle"
/>
```

```js
export default {
  setup() {
    const text =
      "That day, I turned twenty-one. In the golden age of my life, I was full of dreams. I wanted to love, to eat, and to instantly transform into one of these clouds, part alight, part darkened. It was only later that I understood life is but a slow, drawn-out process of getting your balls crushed. Day by day, you get older. Day by day, your dreams fade. In the end you are no different from a crushed ox. But I hadn't foreseen any of it on my twenty-first birthday. I thought I would be vigorous forever, and that nothing could ever crush me.";
    return { text };
  },
};
```

### Custom Action

Use `action` slots to custom action.

```html
<press-text-ellipsis :content="text">
  <template #action="{ expanded }">
    {{ expanded ? 'Collapse' : 'Expand' }}
  </template>
</press-text-ellipsis>
```

```js
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.';
    return { text };
  },
};
```

## API

### Props

| Attribute     | Description                    | Type               | Default |
| ------------- | ------------------------------ | ------------------ | ------- |
| rows          | Number of rows displayed       | _number \| string_ | `1`     |
| content       | The text displayed             | _string_           | -       |
| expand-text   | Expand operation text          | _string_           | -       |
| collapse-text | Collapse operation text        | _string_           | -       |
| dots          | Text content of ellipsis       | _string_           | `'...'` |
| position      | Can be set to `start` `middle` | _string_           | `'end'` |

### Events

| Event        | Description                             | Arguments           |
| ------------ | --------------------------------------- | ------------------- |
| click-action | Emitted when Expand/Collapse is clicked | _event: MouseEvent_ |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get TextEllipsis instance and call instance methods.

| Name   | Description            | Attribute            | Return value |
| ------ | ---------------------- | -------------------- | ------------ |
| toggle | Toggle expanded status | _expanded?: boolean_ | -            |

### Slots

| Name   | Description   | SlotProps               |
| ------ | ------------- | ----------------------- |
| action | Custom action | _{ expanded: boolean }_ |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. 

| Name                               | Default Value       | Description          |
| ---------------------------------- | ------------------- | -------------------- |
| --press-text-ellipsis-action-color | _var(--press-blue)_ | Color of action text |
| --press-text-ellipsis-line-height  | _1.6_               | Line height of text  |

