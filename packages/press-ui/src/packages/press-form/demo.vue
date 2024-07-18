<template>
  <div class="demo-wrap">
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
          :model-value="model1.userInfo.name"
          :border="false"
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
          :border="false"
          :readonly="isMp"
          @click-input="showSex = true; hideKeyboard()"
        />
        <template #right>
          <PressIconPlus
            name="arrow"
          />
        </template>
      </PressFormItem>

      <PressFormItem
        ref="item2"
        label="水果"
        prop="radiovalue1"
        border-bottom
      >
        <PressRadioGroup
          :value="model1.radiovalue1"
          direction="horizontal"
          @change="val => model1.radiovalue1 = val"
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
          :value="model1.checkboxValue1"
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
          :border="false"
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
          :border="false"
          placeholder="请填写验证码"
        />
        <template #right>
          <PressButton
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
                  <span class="item">{{ timeData.seconds }}</span><span>秒重新获取</span>
                </template>
              </span>
            </press-count-down>
          </PressButton>
        </template>
      </PressFormItem>
    </PressForm>

    <press-action-sheet
      :show="showSex"
      :actions="actions"
      @close="showSex = false"
      @select="sexSelect"
    />

    <div class="submit-wrap">
      <PressButton
        type="primary"
        custom-style="margin-right: 20px;width: 100px;"
        @click="submit"
      >
        提交
      </PressButton>
      <PressButton
        custom-style="width: 100px;"
        @click="reset"
      >
        重置
      </PressButton>
    </div>
  </div>
</template>
<script>
import PressForm from 'press-ui/press-form/press-form.vue';
import PressFormItem from 'press-ui/press-form-item/press-form-item.vue';
import PressField from 'press-ui/press-field/press-field.vue';
import PressIconPlus from 'press-ui/press-icon-plus/press-icon-plus.vue';
import PressCheckbox from 'press-ui/press-checkbox/press-checkbox';
import PressCheckboxGroup from 'press-ui/press-checkbox-group/press-checkbox-group';
import PressRadio from 'press-ui/press-radio/press-radio';
import PressRadioGroup from 'press-ui/press-radio-group/press-radio-group';
import PressButton from 'press-ui/press-button/press-button';
import PressActionSheet from 'press-ui/press-action-sheet/press-action-sheet';
import PressCountDown from 'press-ui/press-count-down/press-count-down';
import { isChinese } from 'press-ui/common/utils/validator';

const DEFAULT_COUNTDOWN = 30 * 1000;

export default {
  components: {
    PressForm,
    PressFormItem,
    PressField,
    PressIconPlus,
    PressCheckbox,
    PressCheckboxGroup,
    PressRadio,
    PressRadioGroup,
    PressButton,
    PressActionSheet,
    PressCountDown,
  },
  onReady() {
    // 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.form1.setRules(this.rules);
  },
  data() {
    return {
      time: -1,
      timeData: {},

      fileList1: [],
      disabled1: false,
      tips: '',
      value: '',
      showCalendar: false,
      showBirthday: false,

      showSex: false,
      birthday: Number(new Date()),

      model1: {
        userInfo: {
          name: '楼兰',
          sex: '',
          birthday: '',
        },
        radiovalue1: '苹果',
        checkboxValue1: [],
        intro: '',
        code: '',
      },
      actions: [{
        name: '男',
      },
      {
        name: '女',
      },
      {
        name: '保密',
      },
      ],
      rules: {
        'userInfo.name': [{
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change'],
        }, {
          // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
          validator: (rule, value) => isChinese(value),
          message: '姓名必须为中文',
          // 触发器可以同时用blur和change，二者之间用英文逗号隔开
          trigger: ['change', 'blur'],
        }],
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
          message: '橙子有毒',
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
      },
      radiolist1: [{
        name: '苹果',
        disabled: false,
      },
      {
        name: '香蕉',
        disabled: false,
      },
      {
        name: '毒橙子',
        disabled: false,
      },
      ],
      checkboxList1: [{
        name: '羽毛球',
        disabled: false,
      },
      {
        name: '跑步',
        disabled: false,
      },
      {
        name: '爬山',
        disabled: false,
      },
      ],
    };
  },
  computed: {
    isMp() {
      let mp = false;
      // #ifdef MP
      mp = true;
      // #endif
      return mp;
    },
  },
  methods: {
    onChange(value) {
      console.log('value', value);
      this.model1.userInfo.name = value;
    },
    afterRead(event) {
      this.fileList1.push({
        url: event.file,
        status: 'uploading',
        message: '上传中',
      });
    },
    groupChange() {
      // console.log('groupChange', n);
    },
    radioChange() {
      // console.log('radioChange', n);
    },
    navigateBack() {
      uni.navigateBack();
    },
    sexSelect(e) {
      this.model1.userInfo.sex = e.name;
      this.$refs.form1.validateField('userInfo.sex');
    },
    change(value) {
      this.model1.checkboxValue1 = value;
      // console.log(e);
    },
    formatter(day) {
      const d = new Date();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      if (day.month == month && day.day == date + 3) {
        day.bottomInfo = '有优惠';
        day.dot = true;
      }
      return day;
    },
    calendarConfirm(e) {
      this.showCalendar = false;
      this.model1.hotel = `${e[0]} / ${e[e.length - 1]}`;
      this.$refs.form1.validateField('hotel');
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.time <= 0 || this.timeData.seconds <= 0) {
        // 模拟向后端请求验证码
        // this.onGShowLoading('正在获取验证码');
        // setTimeout(() => {
        // uni.hideLoading();
        // 这里此提示会被this.start()方法中的提示覆盖
        // uni.showToast('验证码已发送');
        this.onGTip('验证码已发送');
        this.time = 0;
        setTimeout(() => {
          this.time = DEFAULT_COUNTDOWN;
        });
        // }, 1000);
      } else {
        this.onGTip('倒计时结束后再发送');
      }
    },
    onChangeTime(val) {
      this.timeData = val;
    },
    calendarClose() {
      this.showCalendar = false;
      this.$refs.form1.validateField('hotel');
    },
    birthdayClose() {
      this.showBirthday = false;
      this.$refs.form1.validateField('userInfo.birthday');
    },
    birthdayConfirm(e) {
      this.showBirthday = false;
      this.model1.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd');
      this.$refs.form1.validateField('userInfo.birthday');
    },
    submit() {
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form1.validate().then((res) => {
        console.log('[submit]', res);
        this.onGTip('校验通过');
      })
        .catch((errors) => {
          console.log('[errors]', errors);
          this.onGTip('校验失败');
        });
    },
    reset() {
      const validateList = ['userInfo.name', 'userInfo.sex', 'radiovalue1', 'checkboxValue1', 'intro',
        'hotel', 'code', 'userInfo.birthday'];
      this.$refs.form1.resetFields();
      this.$refs.form1.clearValidate();
      setTimeout(() => {
        this.$refs.form1.clearValidate(validateList);
        // 或者使用 this.$refs.form1.clearValidate()
      }, 10);
    },
    hideKeyboard() {
      uni.hideKeyboard();
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding: 0 20px;
}
.countdown-wrap {
  color: #fff;
  padding: 0 6px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.submit-wrap {
  margin: 20px auto;
  text-align: center;
}
</style>
