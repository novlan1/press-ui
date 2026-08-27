---
url : pages/press/highlight/highlight
---

# Highlight

### Intro

Highlight the specified text content.

### Install

```ts
import PressHighlight from 'press-ui/press-highlight/press-highlight.vue';

export default {
  components: {
    PressHighlight,
  }
}
```

## Usage

### Basic Usage

You can specify keywords to be highlighted with `keywords` and source text with `source-string`.

```html
<press-highlight :keywords="keywords" :source-string="text" />
```

```ts
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.';
    const keywords = 'questions';

    return {
      text,
      keywords,
    };
  },
};
```

### Multiple Keywords

If you need to specific more than one keywords, you can pass in `keywords` as an array.

```html
<press-highlight :keywords="keywords" :source-string="text" />
```

```ts
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.';
    const keywords = ['time', 'life', 'answer'];

    return {
      text,
      keywords,
    };
  },
};
```

### Custom Class

Set the `highlight-class` of the highlighted tag to customize the style.

```html
<press-highlight
  :keywords="keywords"
  :source-string="text"
  highlight-class="custom-class"
/>
```

```ts
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.';
    const keywords = 'life';

    return {
      text,
      keywords,
    };
  },
};
```

```css
.custom-class {
  color: red;
}
```

## API

### Props

| Attribute         | Description                           | Type                 | Default |
| ----------------- | ------------------------------------- | -------------------- | ------- |
| auto-escape       | Whether to automatically escape       | _boolean_            | `true`  |
| case-sensitive    | Is case sensitive                     | _boolean_            | `false` |
| highlight-class   | Class name of the highlight element   | _string_             | -       |
| highlight-tag     | HTML Tag of highlighted element       | _string_             | `span`  |
| keywords          | Expected highlighted text             | _string \| string[]_ | -       |
| source-string     | Source text                           | _string_             | -       |
| tag               | HTML Tag of root element              | _string_             | `div`   |
| unhighlight-class | Class name of the unhighlight element | _string_             | -       |
| unhighlight-tag   | HTML Tag of unhighlight element       | _string_             | `span`  |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. 

| Name                        | Default Value                | Description               |
| --------------------------- | ---------------------------- | ------------------------- |
| --press-highlight-tag-color | _var(--press-primary-color)_ | Color of highlighted text |
