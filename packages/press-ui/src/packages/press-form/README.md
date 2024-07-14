---
url : pages/press/form/form
---

## Form 表单


此组件一般用于表单场景，可以配置任意表单项，并进行表单验证。

## 引入

```ts
import PressForm from 'press-ui/press-form/press-form';
import PressFormItem from 'press-ui/press-form-item/press-form-item';

export default {
  components: {
    PressForm,
    PressFormItem,
  }
}
```

## 代码演示

### 基础用法

每一个表单域由一个 press-form-item 组成，表单域中可以放置 press-field、press-checkbox、press-radio、press-switch 等。

- 在表单组中，通过model参数绑定一个对象，这个对象的属性为各个 `press-form-item` 内组件的对应变量。
- 由于表单验证和绑定表单规则时，需要通过 `ref` 操作，故这里需要给 `form` 组件声明 `ref="form"` 属性。
- 关于 `press-from-item` 内其他可能包含的诸如 `field`、`radio`等组件，请见各自组件的相关文档说明。

注意：`rules` 中的属性名和 `form` 的属性名是一致的，同时传递给 `press-form-item` 的 `prop` 参数绑定的也是相同的属性名，注意这里 `prop` 参数绑定的是 字符串(属性名)，而不是一个变量。


```html

<PressForm
  ref="form1"
  label-position="left"
  :rules="rules"
  :model="model1"
>
  <PressFormItem
    ref="item1"
    label="大名"
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
    label="性别"
    prop="userInfo.sex"
    border-bottom
    @click="showSex = true; hideKeyboard()"
  >
    <PressField
      v-model="model1.userInfo.sex"
      disabled-color="#ffffff"
      placeholder="请选择性别"
      @click-input="showSex = true; hideKeyboard()"
    />
    <PressIconPlus
      slot="right"
      name="arrow"
    />
  </PressFormItem>
  <PressFormItem
    ref="item2"
    label="水果"
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
    label="兴趣爱好"
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
    label="简介"
    prop="intro"
    border-bottom
  >
    <PressField
      v-model="model1.intro"
      placeholder="不低于3个字"
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
    label="验证码"
    prop="code"
    label-width="80"
    border-bottom
  >
    <PressField
      v-model="model1.code"
      placeholder="请填写验证码"
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
          <template v-if="!Object.keys(timeData).length">获取信息</template>
          <template v-else-if="timeData.seconds <= 0">重新获取</template>
          <template v-else>
            <span class="item">{{ timeData.seconds }}</span>秒重新获取
          </template>
        </span>
      </press-count-down>
    </PressButton>
  </PressFormItem>
</PressForm>
```


### Form-item组件说明

此组件一般需要搭配`Form`组件使用，也可以单独搭配`Field`等组件使用。

- `prop`为传入`Form`组件的`model`中的属性字段，如果需要表单验证，此属性是必填的。
- `labelPosition`可以配置左侧"label"的对齐方式，可选为`left`和`top`。
- `borderBottom`是否显示表单域的下划线，如果给`Field`组件配置了边框，可以将此属性设置为`false`，从而隐藏默认的下划线。
- 如果想在表单域配置左右的图标或小图片，可以通过`leftIcon`和`rightIcon`参数实现。


### 验证规则

组件验证部分采用了 [async-validator](https://github.com/yiminghe/async-validator)，一个字段可以设置多个内置规则，以及自定义规则，触发方式等， 每个字段的验证规则为一个数组，数组的每一个元素对象为其中一条规则(一个字段的验证可以配置多个规则)，如下：

```ts
rules: {
  'userInfo.name': {
    type: 'string',
    required: true,
    message: '请填写姓名',
    trigger: ['blur', 'change'],
  },
  code: {
    type: 'string',
    required: true,
    len: 4,
    message: '请填写4位验证码',
    trigger: ['blur'],
  },
  'userInfo.sex': {
    type: 'string',
    max: 1,
    required: true,
    message: '请选择男或女',
    trigger: ['blur', 'change'],
  },
  radiovalue1: {
    type: 'string',
    min: 1,
    max: 2,
    message: '生命是美好的，请不要放弃治疗',
    trigger: ['change'],
  },
  checkboxValue1: {
    type: 'array',
    min: 2,
    required: true,
    message: '不能太宅，至少选两项',
    trigger: ['change'],
  },
  intro: {
    type: 'string',
    min: 3,
    required: true,
    message: '不低于3个字',
    trigger: ['change'],
  },
  hotel: {
    type: 'string',
    min: 2,
    required: true,
    message: '请选择住店时间',
    trigger: ['change'],
  },
  'userInfo.birthday': {
    type: 'string',
    required: true,
    message: '请选择生日',
    trigger: ['change'],
  },
}
```


### 验证规则属性

每一个验证规则中，可以配置多个属性，下面对常用的属性进行讲解，更具体的可以查看[async-validator](https://github.com/yiminghe/async-validator)的文档说明：

- `trigger`{String | Array}：触发校验的方式有2种：
  - change：字段值发生变化时校验
  - blur：输入框失去焦点时触发
  - 如果同时监听两种方式，需要写成数组形式：`['change', 'blur']`

- `type`{String}  
内置校验规则，如这些规则无法满足需求，可以使用正则匹配、或者使用`validator`自定义方法。  
  - string：必须是 `string` 类型，默认类型  
  - number：必须是 `number` 类型  
  - boolean：必须是 `boolean` 类型  
  - method：必须是 `function` 类型  
  - regexp：必须是 `regexp` 类型，这里的正则，指的是判断字段的内容是否一个正则表达式，而不是用这个正则去匹配字段值 
  - integer：必须是`整数`类型  
  - float：必须是`浮点数`类型  
  - array：必须是 `array` 类型  
  - object：必须是 `object` 类型  
  - enum：必须出现在 `enmu` 指定的值中  
  - date：必须是 `date` 类型  
  - url：必须是 `url` 类型  
  - hex：必须是 `16` 进制类型  
  - email：必须是 `email` 类型  
  - any：任意类型
  
- `required`  
布尔值，是否必填，配置此参数不会显示输入框左边的必填星号，如需要，请配置`press-form-item`的`required`为`true`，注意：如需在`swiper`标签内显示星号，需要给予`swiper-item`第一个根节点一定的`margin`样式

- `pattern`  
要求此参数值为一个正则表达式，如： `/\d+/`，**不能**带引号，如：`"/\d+/"`，组件会对字段进行正则判断，返回结果。

- `min`  
最小值，如果字段类型为字符串和数组，会取字符串长度与数组长度(length)与`min`比较，如果字段是数值，则直接与`min`比较。

- `max`  
最大值，规则同`min`参数

- `len`  
指定长度，规则同`min`，优先级高于`min`和`max`  

- `enum`{Array}
指定的值，配合 `type: 'enum'` 使用

- `whitespace`{Boolean}  
如果字段值内容都为空格，默认无法通过`required: true`校验，如果要允许通过，需要将此参数设置为`true`

- `transform`{Function}，校验前对值进行转换，函数的参数为当前值，返回值为改变后的值，参数如如下：
  - `value`：当前校验字段的值

- `message`  
校验不通过时的提示信息  

- `validator`{Function}：自定义**同步**校验函数，参数如下：
  - `rule`：当前校验字段在 `rules` 中所对应的校验规则
  - `value`：当前校验字段的值
  - `callback`：校验完成时的回调，一般无需执行`callback`，返回`true`(校验通过)或者`false`(校验失败)即可

- `asyncValidator`{Function}：自定义**异步**校验函数，参数如下：
  - `rule`：当前校验字段在 `rules` 中所对应的校验规则
  - `value`：当前校验字段的值
  - `callback`：校验完成时的回调，执行完异步操作(比如向后端请求数据验证)，如果不通过，需要`callback(new Error('提示错误信息'))`，如果校验通过，执行`callback()`即可



### 综合实战

上面讲述了[async-validator](https://github.com/yiminghe/async-validator)的规则和配置，下面我们进行一个综合
实战示例，要入对某一个字段进行如下验证(验证实现有多种方法，下方仅为引导示例，非唯一，或最优做法)：

1. 必填，同时可接受`change`和`blur`触发校验：配置`required`参数为`true`，同时配置`trigger`为`[change, blur]`
2. 必须为字母或字符串，校验前先将字段值转为字符串类型：通过`pattern`参数配置正则：`/^[0-9a-zA-Z]*$/g`，通过`transform`参数在校验前对字段值转换为字符串
3. 长度6-8个字符之间：通过 配置`min`为`6`，`max`为`8`
4. 需要包含字母`A`：使用`includes`方法，并结合`validator`自定义函数实现
5. 异步校验，输入完账号，输入框失去焦点时，向后端请求该账号是否已存在：通过上方的`asyncValidator`异步函数进行验证。


综上，我们可以得出如下的一个配置规则(仅为综合演示，非最优做法)：

```js
rules: {
  name: [
    // 必填规则
    {
      required: true,
      message: '此为必填字段',
      // blur和change事件触发检验
      trigger: ['blur', 'change'],
    },
    // 正则判断为字母或数字
    {
      pattern: /^[0-9a-zA-Z]*$/g,
      // 正则检验前先将值转为字符串
      transform(value) {
        return String(value);
      },
      message: '只能包含字母或数字'
    },
    // 6-8个字符之间的判断
    {
      min: 6,
      max: 8,
      message: '长度在6-8个字符之间'
    },
    // 自定义规则判断是否包含字母"A"
    {
      validator: (rule, value, callback) => {
        return value.includes("A");
      },
      message: '必须包含字母"A"'
    },
    // 校验用户是否已存在
    {
      asyncValidator: (rule, value, callback) => {
        post('/xxx/xxx', {name: value}).then(res => {
          // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
          if(res.error) {
            callback(new Error('姓名重复'));
          } else {
            // 如果校验通过，也要执行callback()回调
            callback();
          }
        })
      },
      // 如果是异步校验，无需写message属性，错误的信息通过Error抛出即可
      // message: 'xxx'
    }
  ]
}
```


#### 校验错误提示方式

提供了多种校验的错误提示方式，传递给`Form`组件的`errorType`参数：

- `message`：默认为输入框下方用文字进行提示
- `none`：不会进行任何提示
- `border-bottom`：配置作用域底部的下划线显示为红色，要求给`form-item`设置了`borderBottom=true`才有效
- `toast`：以`toast`提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息

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
      // 文字提示
      errorType: 'message',
      // 不提示
      // errorType: 'none',
      // 下划线提示，要求给form-item设置了borderBottom=true才有效
      // errorType: 'border-bottom'
    };
  }
};
</script>
```


#### 校验

进行了上方的配置和讲解后，进入到最后一步，执行验证：  
需要通过`ref`调用`Form`组件的`validate`方法，该方法回调函数的参数为一个布尔值，`true`为校验通过，否则反之。

```html
<template>
  <view>
    <press-form :model="form" ref="form">
      <press-form-item label="姓名" prop="name">
        <press-field v-model="form.name" />
      </press-form-item>
    </press-form>
    <press-button @click="submit">提交</press-button>
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
            message: '请输入姓名',
            trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(res => {
        Toast('校验通过')
      }).catch(errors => {
        Toast('校验失败')
      })
    }
  },
};
</script>
```

## API

### Form Props
  
| 参数           | 说明                                                                       | 类型                            | 默认值    |
| :------------- | :------------------------------------------------------------------------- | :------------------------------ | :-------- |
| model          | 表单数据对象                                                               | object                          | -         |
| rules          | 通过`ref`设置，如果`rules`中有自定义方法等，需要使用`setRules`方法设置规则 | object&#124;function&#124;array | -         |
| error-type     | 错误的提示方式，可选`none/toast/border-bottom/none`                        | string                          | `message` |
| border-bottom  | 是否显示表单域的下划线边框                                                 | boolean                         | `true`    |
| label-position | 表单域提示文字的位置，`left` 左侧，`top` 上方                              | string                          | `left`    |
| label-width    | 提示文字的宽度，可选数值或者 `auto`，单位px                                | string &#124; number            | `45`      |
| label-align    | `label`字体的对齐方式，可选 `left/center/right`                            | string                          | `left`    |
| label-style    | `label`的样式，对象形式                                                    | object                          | -         |


### Form Methods

此方法如要通过ref手动调用

| 名称          | 说明                                                                         | 参数                                 |
| :------------ | :--------------------------------------------------------------------------- | :----------------------------------- |
| validate      | 对整个表单进行校验的方法                                                     | -                                    |
| setRules      | 如果`rules`中有自定义方法等，需要用此方法设置`rules`规则，否则微信小程序无效 | function(rules)                      |
| validateField | 对部分表单字段进行校验                                                       | function(value, function(errorsRes)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                   | -                                    |
| clearValidate | 清空校验结果                                                                 | function(props)                      |


### Form Item Props

| 参数            | 说明                                                                                     | 类型                  | 默认值  |
| :-------------- | :--------------------------------------------------------------------------------------- | :-------------------- | :------ |
| label           | 左侧提示文字                                                                             | string                | -       |
| prop            | 表单域`model`对象的属性名，在使用 `validate`、`resetFields` 方法的情况下，该属性是必填的 | string                | -       |
| border-bottom   | 是否显示下边框，如不需要下边框，需同时将`press-form`的同名参数设置为`false`              | string &#124; boolean | `true`  |
| label-width     | 提示文字的宽度，单位rpx，如设置，将覆盖`press-form`的同名参数                            | string &#124; number  | -       |
| label-position  | `label`的位置，可选 `left/top`                                                           | string                | -       |
| right-icon      | 右侧自定义字体图标(限内置图标)或图片地址                                                 | string                | -       |
| left-icon       | 左侧自定义字体图标(限内置图标)或图片地址                                                 | string                | -       |
| left-icon-style | 左侧自定义字体图标的样式                                                                 | string  &#124; object | -       |
| required        | 是否显示左边的`*`号，这里仅起展示作用，如需校验必填，请通过`rules`配置必填规则           | boolean               | `false` |

### Form Item Slot

| 名称  | 说明                                                                          |
| :---- | :---------------------------------------------------------------------------- |
| -     | Form Item 的内容                                                              |
| right | 右侧自定义内容，可以在此传入一个按钮，用于获取验证码等场景                    |
| error | 自定义传入校验错误时显示的信息，通过作用域插槽暴露了内部当前`message`错误信息 |

### Form Item Events

| 事件名 | 说明       | 回调参数 | 版本 |
| :----- | :--------- | :------- | :--- |
| click  | 点击时触发 | -        | -    |


## 在线调试

<debug-online />


## 常见问题

### setRules

要兼容微信小程序，并且校验规则中含有方法等，只能通过 setRules 方法设置规则。

```ts
onReady() {
  //onReady 为 uni-app 支持的生命周期之一
  this.$refs.form.setRules(this.rules)
},
```
