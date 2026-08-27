---
url : pages/press/form/form
---

## Form

This component is generally used in form scenarios. You can configure any form item and perform form validation.

## Import

```ts
import PressForm from 'press-ui/press-form/press-form.vue';
import PressFormItem from 'press-ui/press-form-item/press-form-item.vue';

export default {
  components: {
    PressForm,
    PressFormItem,
  }
}
```

## Code demonstration

### Basic usage

Each form field consists of a press-form-item, in which press-field, press-checkbox, press-radio, press-switch, etc. can be placed.

- In the form group, an object is bound through the model parameter. The properties of this object are the corresponding variables of the components in each `press-form-item`.
- Since `ref` is required for form validation and binding form rules, the `form` component needs to be declared with the `ref="form"` attribute.
- For other components that may be included in `press-from-item`, such as `field` and `radio`, please refer to the relevant documentation of each component.

Note: The attribute names in `rules` are the same as those in `form`, and the `prop` parameter passed to `press-form-item` is also bound to the same attribute name. Note that the `prop` parameter here is bound to a string (attribute name), not a variable.

```html
<PressForm
  ref="form1"
  label-position="left"
  :rules="rules"
  :model="model1"
>
  <PressFormItem
    ref="item1"
    label="Name"
    prop="userInfo.name"
    border-bottom
  >
    <PressField
      :value="model1.userInfo.name"
      @change="onChange"
    />
  </PressFormItem>

  <PressFormItem
    ref="item1"
    label="Gender"
    prop="userInfo.sex"
    border-bottom
    @click="showSex = true; hideKeyboard()"
  >
    <PressField
      v-model="model1.userInfo.sex"
      disabled-color="#ffffff"
      placeholder="Please select gender"
      @click-input="showSex = true; hideKeyboard()"
    />
    <PressIcon
      slot="right"
      name="arrow"
    />
  </PressFormItem>
  <PressFormItem
    ref="item2"
    label="fruit"
    prop="radiovalue1"
    border-bottom
  >
    <PressRadioGroup
      v-model="model1.radiovalue1"
      direction="horizontal"
    >
      <PressRadio
        v-for="(item, index) in radiolist1"
        :key="index"
        custom-style="margin-right: 16px"
        :label="item.name"
        :name="item.name"
      >
        {{ item.name }}
      </PressRadio>
    </PressRadioGroup>
  </PressFormItem>
  <PressFormItem
    ref="item3"
    label="interests and hobbies"
    prop="checkboxValue1"
    border-bottom
    label-width="80"
  >
    <PressCheckboxGroup
      v-model="model1.checkboxValue1"
      shape="square"
      direction="horizontal"
      @change="change"
    >
      <PressCheckbox
        v-for="(item, index) in checkboxList1"
        :key="index"
        custom-style="margin-right: 16px"
        :name="item.name"
      >
        {{ item.name }}
      </PressCheckbox>
    </PressCheckboxGroup>
  </PressFormItem>
  <PressFormItem
    ref="item3"
    label="Introduction"
    prop="intro"
    border-bottom
  >
    <PressField
      v-model="model1.intro"
      placeholder="No less than 3 words"
      count
      type="textarea"
      show-word-limit
      :always-embed="true"
      :maxlength="100"
      autosize
      wrapper-style="width: 100%"
    />
  </PressFormItem>
  <PressFormItem
    label="Verification code"
    prop="code"
    label-width="80"
    border-bottom
  >
    <PressField
      v-model="model1.code"
      placeholder="Please fill in the verification code"
    />
    <PressButton
      slot="right"
      type="primary"
      size="mini"
      :disabled="disabled1"
      @click="getCode"
    >
      <press-count-down
        use-slot
        :time="time"
        @change="onChangeTime"
      >
        <span class="countdown-wrap">
          <template v-if="!Object.keys(timeData).length">Get information</template>
          <template v-else-if="timeData.seconds <= 0">Re-acquire</template>
          <template v-else>
            <span class="item">{{ timeData.seconds }}</span>Re-acquire in seconds
          </template>
        </span>
      </press-count-down>
    </PressButton>
  </PressFormItem>
</PressForm>
```

### Form-item component description

This component generally needs to be used with the `Form` component, and can also be used alone with components such as `Field`.

- `prop` is the attribute field in the `model` passed to the `Form` component. If form validation is required, this attribute is required.
- `labelPosition` can configure the alignment of the "label" on the left, and the options are `left` and `top`.
- `borderBottom` whether to display the underline of the form field. If the `Field` component is configured with a border, this property can be set to `false` to hide the default underline.
- If you want to configure left and right icons or small pictures in the form field, you can use the `leftIcon` and `rightIcon` parameters to achieve it.

### Validation rules

The component validation part uses [async-validator](https://github.com/yiminghe/async-validator). A field can set multiple built-in rules, as well as custom rules, trigger methods, etc. The validation rules for each field are an array, and each element object of the array is one of the rules (a field validation can be configured with multiple rules), as follows:

```ts
rules: {
  'userInfo.name': {
    type: 'string',
    required: true,
    message: 'Please fill in your name',
    trigger: ['blur', 'change'],
  },
  code: {
    type: 'string',
    required: true,
    len: 4,
    message: 'Please fill in a 4-digit verification code',
    trigger: ['blur'],
  },
  'userInfo.sex': {
    type: 'string',
    max: 1,
    required: true,
    message: 'Please select male or female',
    trigger: ['blur', 'change'],
  },
  radiovalue1: {
    type: 'string',
    min: 1,
    max: 2,
    message: 'Life is beautiful, please don\'t give up treatment',
    trigger: ['change'],
  },
  checkboxValue1: {
    type: 'array',
    min: 2,
    required: true,
    message: 'Don\'t stay at home too much, select at least two',
    trigger: ['change'],
  },
  intro: {
    type: 'string',
    min: 3,
    required: true,
    message: 'No less than 3 words',
    trigger: ['change'],
  },
  hotel: {
    type: 'string',
    min: 2,
    required: true,
    message: 'Please select the time of your stay',
    trigger: ['change'],
  },
  'userInfo.birthday': {
    type: 'string',
    required: true,
    message: 'Please select your birthday',
    trigger: ['change'],
  },
},
```

### Validation rule attributes

Multiple attributes can be configured in each validation rule. The following is an explanation of the commonly used attributes. For more details, please refer to the documentation of [async-validator](https://github.com/yiminghe/async-validator):

- `trigger`{String | Array}: There are two ways to trigger validation:

- change: Validate when the field value changes

- blur: Trigger when the input box loses focus

- If you monitor two methods at the same time, you need to write it in array form: `['change', 'blur']`

- `type`{String}
Built-in validation rules. If these rules cannot meet the needs, you can use regular matching or use the `validator` custom method.
- string: must be `string` type, default type
- number: must be `number` type
- boolean: must be `boolean` type
- method: must be `function` type
- regexp: must be `regexp` type, the regular expression here refers to whether the content of the field is a regular expression, rather than using this regular expression to match the field value
- integer: must be `integer` type
- float: must be `floating point` type
- array: must be `array` type
- object: must be `object` type
- enum: must appear in the value specified by `enmu`
- date: must be `date` type
- url: must be `url` type
- hex: must be `hexadecimal` type
- email: must be `email` type
- any: any type

- `required`
Boolean value, whether it is required or not. Configuring this parameter will not display the required asterisk on the left side of the input box. If necessary, please configure `required` of `press-form-item` to `true`. Note: If you need to display an asterisk in the `swiper` tag, you need to give the first root node of `swiper-item` a certain `margin` style

- `pattern`
This parameter value is required to be a regular expression, such as: `/\d+/`, **cannot** have quotation marks, such as: `"/\d+/"`. The component will perform regular judgment on the field and return the result.

- `min`
Minimum value. If the field type is a string or array, the string length and the array length (length) will be compared with `min`. If the field is a numeric value, it will be directly compared with `min`.

- `max`
Maximum value, same rules as `min` parameter

- `len`
Specified length, same rules as `min`, higher priority than `min` and `max`

- `enum`{Array}
Specified value, used with `type: 'enum'`

- `whitespace`{Boolean}
If the field value is all spaces, it cannot pass the `required: true` validation by default. If you want to allow it to pass, you need to set this parameter to `true`

- `transform`{Function}, transform the value before validation, the function parameter is the current value, and the return value is the changed value. The parameters are as follows:

- `value`: the value of the current validation field

- `message`
Prompt message when validation fails

- `validator`{Function}: custom **synchronous** validation function, parameters are as follows:

- `rule`: the validation rule corresponding to the current validation field in `rules`

- `value`: the value of the current validation field

`callback`: callback when verification is completed. Generally, `callback` does not need to be executed. Return `true` (verification passed) or `false` (verification failed).

- `asyncValidator`{Function}: custom **asynchronous** verification function, parameters are as follows:
- `rule`: verification rule corresponding to the current verification field in `rules`
- `value`: value of the current verification field
- `callback`: callback when verification is completed. After executing asynchronous operations (such as requesting data verification from the backend), if it fails, `callback(new Error('prompt error message'))` is required. If the verification passes, execute `callback()`.

### Comprehensive practice

The above describes the rules and configuration of [async-validator](https://github.com/yiminghe/async-validator). Let's do a comprehensive
practical example. We need to enter the following verification for a certain field (there are many ways to implement verification. The following is only a guide example, not the only one, or the best practice):

1. Required, can accept `change` and `blur` trigger validation: configure `required` parameter to `true`, and configure `trigger` to `[change, blur]`
2. Must be a letter or string, convert the field value to string type before validation: configure regular expression through `pattern` parameter: `/^[0-9a-zA-Z]*$/g`, and convert the field value to string before validation through `transform` parameter
3. Length between 6-8 characters: configure `min` to `6`, `max` to `8`
4. Need to contain the letter `A`: use `includes` method, combined with `validator` custom function to implement
5. Asynchronous validation, after entering the account, when the input box loses focus, request the backend whether the account already exists: verify through the `asyncValidator` asynchronous function above

In summary, we can come up with the following configuration rule (only for comprehensive demonstration, not the best practice):

```js
rules: {
  name: [
   // Required rule
    {
      required: true,
      message: 'This is a required field',
      // Blur and change event trigger test
      trigger: ['blur', 'change'],
    },
    // Regular expression judgment is letters or numbers
    {
      pattern: /^[0-9a-zA-Z]*$/g,
      // Convert the value to a string before regular expression test
      transform(value) {
        return String(value);
      },
      message: 'Can only contain letters or numbers',
    },
    // Judgment between 6-8 characters
    {
      min: 6,
      max: 8,
      message: 'The length is between 6-8 characters',
    },
    // Custom rule to determine whether it contains the letter "A"
    {
      validator: (rule, value, callback) => value.includes('A'),
      message: 'Must include the letter "A"',
    },
    // Check if the user already exists
    {
      asyncValidator: (rule, value, callback) => {
        post('/xxx/xxx', { name: value }).then((res) => {
          // If the validation fails, you need to throw new Error('error message') in callback()
          if (res.error) {
            callback(new Error('name duplicate'));
          } else {
            // If the validation passes, you also need to execute callback() callback
            callback();
          }
        });
      },
      // If it is asynchronous validation, there is no need to write the message attribute, and the error information can be thrown through Error
      // message: 'xxx'
    },
  ],
},
```

#### Validation error prompt method

It provides a variety of validation error prompt methods, which are passed to the `errorType` parameter of the `Form` component:

- `message`: By default, the text below the input box is used for prompting
- `none`: no prompt will be given
- `border-bottom`: the underline at the bottom of the configuration scope is displayed in red, and `borderBottom=true` must be set for `form-item` to be effective
- `toast`: pop up error information in the form of `toast` prompt, and only the error information of the first form field will be popped up each time

```html
<template>
  <press-form :errorType="errorType">
  ......
  </press-form>
</template>

<script>
export default {
  data() {
    return {
      // text prompt
      errorType: 'message',
      // no prompt
      // errorType: 'none',
      // underline prompt, it is required to set borderBottom=true for form-item to be effective
      // errorType: 'border-bottom'
    };
  }
};
</script>
```

#### Verification

After the above configuration and explanation, enter the last step and perform verification:
You need to call the `validate` method of the `Form` component through `ref`. The parameter of the callback function of this method is a Boolean value. `true` means the validation is passed, otherwise it is not.

```html
<template>
  <view>
    <press-form :model="form" ref="form">
      <press-form-item label="姓名" prop="name">
        <press-field v-model="form.name" />
      </press-form-item>
    </press-form>
    <press-button @click="submit">Submit</press-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter your name',
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((res) => {
        Toast('Validation passed');
      })
        .catch((errors) => {
          Toast('Verification failed');
        });
    },
  },
};
</script>
```

## API

### Form Props

| Parameters     | Description                                                                                               | Type                            | Default value |
| :------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------------ | :------------ |
| model          | Form data object                                                                                          | object                          | -             |
| rules          | Set by `ref`. If `rules` has custom methods, etc., you need to use the `setRules` method to set the rules | object&#124;function&#124;array | -             |
| error-type     | Error prompt method, optional `none/toast/border-bottom/none`                                             | string                          | `message`     |
| border-bottom  | Whether to display the underline border of the form field                                                 | boolean                         | `true`        |
| label-position | Position of the form field prompt text, `left` left, `top` top                                            | string                          | `left`        |
| label-width    | Prompt text width, optional value or `auto`, unit px                                                      | string &#124; number            | `45`          |
| label-align    | `label` font alignment, optional `left/center/right`                                                      | string                          | `left`        |
| label-style    | `label` style, object form                                                                                | object                          | -             |

### Form Methods

This method needs to be called manually through ref

| Name          | Description                                                                                                                            | Parameters                           |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| validate      | Method for validating the entire form                                                                                                  | -                                    |
| setRules      | If there are custom methods in `rules`, this method needs to be used to set `rules` rules, otherwise the WeChat applet will be invalid | function(rules)                      |
| validateField | Validate some form fields                                                                                                              | function(value, function(errorsRes)) |
| resetFields   | Reset the entire form, reset all field values ​​to initial values ​​and remove validation results                                      | -                                    |
| clearValidate | Clear validation results                                                                                                               | function(props)                      |

### Form Item Props

| Parameters      | Description                                                                                                                                                           | Type                  | Default value |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------ |
| label           | Left prompt text                                                                                                                                                      | string                | -             |
| prop            | The property name of the form field `model` object. This property is required when using the `validate` and `resetFields` methods.                                    | string                | -             |
| border-bottom   | Whether to display the bottom border. If you do not need the bottom border, you need to set the parameter of the same name of `press-form` to `false`.                | string &#124; boolean | `true`        |
| label-width     | The width of the prompt text, in rpx. If set, it will override the parameter of the same name of `press-form`.                                                        | string &#124; number  | -             |
| label-position  | The position of `label`, optional `left/top`                                                                                                                          | string                | -             |
| right-icon      | Custom font icon on the right (limited to built-in icons) or image address                                                                                            | string                | -             |
| left-icon       | Custom font icon on the left (limited to built-in icons) or image address                                                                                             | string                | -             |
| left-icon-style | Style of custom font icon on the left                                                                                                                                 | string &#124; object  | -             |
| required        | Whether to display the `*` on the left, which is only for display. If you need to verify the required field, please configure the required field rule through `rules` | boolean               | `false`       |

### Form Item Slot

| Name  | Description                                                                                                                                                      |
| :---- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -     | Content of Form Item                                                                                                                                             |
| right | Custom content on the right, you can pass in a button here to get verification code and other scenarios                                                          |
| error | Customize the information displayed when the verification error is passed in, and expose the internal current `message` error information through the scope slot |

### Form Item Events

| Event name | Description            | Callback parameter | Version |
| :--------- | :--------------------- | :----------------- | :------ |
| click      | Triggered when clicked | -                  | -       |

## Online debugging

<debug-online />

## Frequently asked questions

### setRules

To be compatible with WeChat Mini Programs, and if the validation rules contain methods, etc., you can only set the rules through the setRules method.

```ts
onReady() {
//onReady is one of the life cycles supported by uni-app
this.$refs.form.setRules(this.rules)
},
```
