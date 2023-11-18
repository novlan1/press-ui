<!-- eslint-disable max-len -->
<template>
  <div
    v-if="show"
    :class="[
      getActClass('cover'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('dialog','dialog--fail')]">
      <a
        :class="[getActClass('close')]"
        @click.stop="closeDialog"
      />
      <p :class="[getActClass('title','title--fail')]">
        领取失败
      </p>
      <div :class="[getActClass('content')]">
        <p :class="[getActClass('name')]">
          没有达到领取条件哦
        </p>
        <p :class="[getActClass('user')]">
          {{ propsData.userinfo }}
        </p>
        <div :class="[getActClass('progress-wrap')]">
          <p :class="[getActClass('progress')]">
            {{ propsData.desc }}
            <template v-if="propsData.process_desc">
              <div :class="[getActClass('num')]">
                (<span>{{ propsData.targetarchive }}</span>/{{ propsData.targetdown }})
              </div>
            </template>
          </p>
          <p
            v-if="propsData.fieldid != 6"
            :class="[getActClass('progress-bar')]"
          >
            <i
              :style="{
                width:
                  propsData.targetdown !== 0
                    ? `${
                      (propsData.targetarchive / propsData.targetdown) * 100
                    }%`
                    : '0%',
              }"
            />
          </p>
        </div>
      </div>
      <div :class="[getActClass('buttons')]">
        <a
          :class="[getActClass('btn','btn--maxlarge-primary')]"
          @click.stop="onClickButton"
        >{{ propsData.btnText }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';
import { getActClass } from './utils';


export default {
  name: 'PressActNotAchievedDialog',
  options: {
    styleIsolation: 'shared',
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    propsData: {
      type: Object,
      default: () => ({
        userinfo: '科兴小刚炮QQ1区-绚烂刀锋',
        desc: '今日累计杀敌30人',
        targetarchive: 3,
        targetdown: 30,
        btnText: '完成通知我',
        fieldid: 6, // 和平特殊处理vip类型的任务
        process_desc: '任务完成进度', // 和平特殊处理任务完成进度
      }),
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('clickCloseButton');
      this.$emit('update:show', false);
    },
    onClickButton() {
      this.closeDialog();
      this.$emit('clickButton');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style scoped lang="scss">
// body:not(.press-act-not-achieved-dialog--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
