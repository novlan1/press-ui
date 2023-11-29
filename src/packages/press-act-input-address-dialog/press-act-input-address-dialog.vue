<template>
  <div
    v-if="show"
    :class="[
      getActClass('cover'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('dialog','dialog--address')]">
      <a
        :class="[getActClass('close')]"
        @click="closeDialog"
      />
      <p :class="[getActClass('title','title--address')]">
        填写收货地址
      </p>
      <div :class="[getActClass('info')]">
        <div :class="[getActClass('info-list')]">
          <div :class="[getActClass('info-item')]">
            <label>收件人：</label>
            <div :class="[getActClass('input-wrap')]">
              <input
                v-model="mUseraddr.name"
                type="text"
                placeholder="姓名"
                @input="changeAddress"
              >
            </div>
          </div>
          <div :class="[getActClass('info-item')]">
            <label>手机号：</label>
            <div :class="[getActClass('input-wrap')]">
              <input
                v-model="mUseraddr.mobile"
                type="number"
                placeholder="手机号"
                @input="changeAddress"
              >
            </div>
          </div>
          <div :class="[getActClass('info-item')]">
            <label>邮编：</label>
            <div :class="[getActClass('input-wrap')]">
              <input
                v-model="mUseraddr.zipcode"
                type="number"
                placeholder="邮编"
                @input="changeAddress"
              >
            </div>
          </div>
          <div :class="[getActClass('info-item')]">
            <label>地区：</label>
            <div :class="[getActClass('input-wrap')]">
              <div
                :class="[
                  getActClass('input-area'),
                  mUseraddr.province ? '' : getActClass('input-area--placeholder'),
                ]"
                @click="showAddressPopup = true"
              >
                {{
                  mUseraddr.province + mUseraddr.city + mUseraddr.district
                    ? mUseraddr.province + mUseraddr.city + mUseraddr.district
                    : '选择地区'
                }}
              </div>
            </div>
          </div>
          <div :class="[getActClass('info-item')]">
            <div
              :class="[getActClass('input-wrap','address-detail')]"
            >
              <textarea
                v-model="mUseraddr.detail_addr"
                placeholder="填写详细地址:"
                type="text"
                @input="changeAddress"
              />
            </div>
          </div>
        </div>
        <div :class="[getActClass('tip')]">
          *如地址不详无法送达退件，{{ gameName }}不补发处理；
        </div>
        <div :class="[getActClass('button-wrap')]">
          <a
            :class="[getActClass('btn--cancel','btn--medium-secondary')]"
            @click="closeDialog"
          >{{ cancelText || '取消' }}</a>
          <a
            :class="[getActClass('btn--sure','btn--medium-primary')]"
            @click="onClickButton"
          >{{ confirmText || '确认' }}</a>
        </div>
      </div>
    </div>

    <PressAreaPopup
      :show.sync="showAddressPopup"
      :area-list="areaList"
      :value="selectArea"
      :type="type"
      @confirm="onConfirmArea"
    />
  </div>
</template>

<script>
import PressAreaPopup from '../press-area/press-area-popup';
import { getHideBaseStyleMixin } from '../mixins/act/hide-base-style';
import { getActClass } from './utils';


export default {
  name: 'PressActInputAddressDialog',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressAreaPopup,
  },
  mixins: [getHideBaseStyleMixin()],
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    cancelText: {
      type: String,
      default: '取消',
      required: false,
    },
    confirmText: {
      type: String,
      default: '确定',
      required: false,
    },
    propsData: {
      type: Object,
      default: () => ({

      }),
    },
    gameName: {
      type: String,
      default: '',
    },
    areaList: {
      type: Object,
      default: () => ({
        province_list: {
          110000: '北京市',
          120000: '天津市',
        },
        city_list: {
          110100: '北京市',
          120100: '天津市',
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          120101: '和平区',
          120102: '河东区',
        },
      }),
    },
    type: {
      type: String,
      default: '',
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
  emits: [
    'clickButton',
    'clickCloseButton',
    'update:propsData',
    'update:show',
  ],
  data() {
    return {
      mUseraddr: {},
      showAddressPopup: false,
      selectArea: '110101',
    };
  },
  created() {},
  mounted() {
    this.mUseraddr = { ...this.propsData };
    if (this.mUseraddr) {
      // 如果地址里面有带*号的，需要置空重新填写，否则更新失败
      Object.keys(this.mUseraddr).forEach((key) => {
        if (this.mUseraddr[key] && this.mUseraddr[key].indexOf('*') !== -1) {
          this.mUseraddr[key] = '';
        }
      });
      // 如果省份城市为空，则地区也清空（后台返回时把省份城市转成*号返回了）
      if (!this.mUseraddr.province || !this.mUseraddr.city) {
        this.mUseraddr.province = '';
        this.mUseraddr.city = '';
        this.mUseraddr.district = '';
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false);
      this.$emit('clickCloseButton');
    },
    onClickButton() {
      this.$emit('clickButton');
    },
    onConfirmArea(value) {
      this.showAddressPopup = false;
      this.mUseraddr = {
        ...this.mUseraddr,
        province: value[0].name,
        city: value[1].name,
        district: value[2].name,
      };
      this.changeAddress();
    },
    changeAddress() {
      this.$emit('update:propsData', { ...this.mUseraddr });
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
// body:not(.press-act-input-address-dialog--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
