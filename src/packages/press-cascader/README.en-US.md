---
url : pages/press/cascader/cascader
---

## Cascader cascade selection

## Import

```ts
import PressCascader from 'press-ui/press-cascader/press-cascader.vue';

export default {
  components: {
    PressCascader,
  }
}
```

## Code demonstration

### Basic usage

The cascade selection component can be used with Field and Popup components, as shown below:

```html
<press-field
  :value="fieldValue"
  is-link
  readonly
  label="Region"
  placeholder="Please select your region"
  @click="onClick"
/>
<press-popup :show="show" round position="bottom">
  <press-cascader
    v-if="show"
    :value="cascaderValue"
    title="Please select your region"
    :options="options" @close="onClose" @finish="onFinish" 
  /> 
</press-popup> 
```

```js 
const options = [
  {
    text: 'Zhejiang Province',
    value: '330000',
    children: [{ text: 'Hangzhou City', value: '330100' }],
  },
  {
    text: 'Jiangsu Province',
    value: '320000',
    children: [{ text: 'Nanjing City', value: '320100' }],
  },
];

export default {
  data() {
    return {
      show: false,
      options,
      fieldValue: '',
      cascaderValue: '',
    }
  },
  methods: {
    onClick() {
      this.show = true;
    },

    onClose() {
      this.show = false;
    },

    onFinish(detail) {
      const { selectedOptions, value } = detail;
      const fieldValue = selectedOptions
          .map((option) => option.text || option.name)
          .join('/');
      this.fieldValue = fieldValue;
      this.cascaderValue = value;
    }
  },
};
```

### Custom color

Use the `active-color` attribute to set the highlight color of the selected state.

```html
<press-cascader
  :value="cascaderValue"
  title="Please select your region"
  :options="options"
  active-color="#ee0a24"
  @close="onClose"
  @finish="onFinish"
/>
```

### Asynchronous loading options

You can listen to the `change` event and dynamically set `options` to achieve asynchronous loading options.

```html
<press-field
  :value="fieldValue"
  is-link
  readonly
  label="region"
  placeholder="Please select your region"
  @click="onClick"
/>
<press-popup :show="show" round position="bottom">
  <press-cascader
    v-if="show"
    :value="cascaderValue"
    title="Please select your region"
    :options="options"
    @close="onClose"
    @change="onChange"
    @finish="onFinish"
  />
</press-popup>
```

```js
export default {
  data() {
    return {
      options: [
        {
          text: 'Zhejiang Province',
          value: '330000',
          children: [],
        }
      ];
    }
  },
  methods: {
    onChange(detail) {
      const { value } = detail;
      if (value === this.options[0].value) {
        setTimeout(() => {
        const children = [
          { text: 'Hangzhou', value: '330100' },
          { text: 'Ningbo', value: '330200' },
        ];
        this.options[0].children = children;
        }, 500);
      }
    }
  },
};
```

### Custom field names

The field names in `options` can be customized through the `field-names` attribute.

```html
<press-cascader
  :value="code"
  title="Please select your region"
  :options="options"
  :field-names="fieldNames"
/>
```

```js
export default {
  data() {
    return {
      code: '',
      fieldNames: {
      text: 'name',
      value: 'code',
      children: 'items',
    },
    options: [
      {
        name: 'Zhejiang Province',
        code: '330000',
        items: [{ name: 'Hangzhou City', code: '330100' }],
      },
      {
        name: 'Jiangsu Province',
        code: '320000',
        items: [{ name: 'Nanjing City', code: '320100' }],
      },
      ],
    }
  },
};
```

## API

### Props

| Parameter      | Description                                                                                                | Type                 | Default value                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------- |
| title          | Top title                                                                                                  | _string_             | -                                                        |
| value          | Value of the selected item                                                                                 | _string \| number_   | -                                                        |
| options        | Optional data source                                                                                       | _CascaderOption[]_   | -                                                        |
| placeholder    | Prompt text when unselected                                                                                | _string_             | `Please select`                                          |
| active-color   | Highlight color of the selected state                                                                      | _string_             | `#1989fa`                                                |
| swipeable      | Whether to enable left and right swipe gesture switching                                                   | _boolean_            | `false`                                                  |
| closeable      | Whether to display the close icon                                                                          | _boolean_            | `true`                                                   |
| ellipsis       | Whether to omit long title text. If the text is too long, horizontal scrolling will occur after closing    | _boolean_            | `true`                                                   |
| show-header    | Whether to display the title bar                                                                           | _boolean_            | `true`                                                   |
| close-icon     | Close icon name or image link, equivalent to the [name attribute](./press-icon-plus) of the IconPlus component | _string_             | `cross`                                                  |
| field-names    | Customize the fields in the `options` structure                                                            | _CascaderFieldNames_ | `{ text: 'text', value: 'value', children: 'children' }` |
| use-title-slot | Whether to use the slot for the custom title                                                               | _boolean_            | `false`                                                  |

### CascaderOption data structure

The `options` property is an array of objects. Each object in the array configures an option. The object can contain the following values:

| Key name  | Description                                       | Type                        |
| --------- | ------------------------------------------------- | --------------------------- |
| text      | Option text (required)                            | _string_                    |
| value     | Option value (required)                           | _string \| number_          |
| color     | Option text color                                 | _string_                    |
| children  | List of child options                             | _CascaderOption[]_          |
| disabled  | Whether to disable the option                     | _boolean_                   |
| className | Add additional class for the corresponding column | _string \| Array \| object_ |

### Events

| Event     | Description                              | Callback parameter                                                                               |
| --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| change    | Triggered when the selected item changes | event.detail: _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |
| finish    | Triggered after all options are selected | event.detail: _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |
| close     | Triggered when the close icon is clicked | -                                                                                                |
| click-tab | Triggered when the tab is clicked        | event.detail: _{ tabIndex: number, title: string }_                                              |

### Slots

| Name  | Description      | Parameters |
| ----- | ---------------- | ---------- |
| title | Custom top title | -          |

## Online debugging

<debug-online />
