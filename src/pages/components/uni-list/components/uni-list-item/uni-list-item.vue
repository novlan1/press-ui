<template>
  <!-- #ifdef APP-NVUE -->
  <cell>
    <!-- #endif -->
    <div
      :class="[{'uni-list-item--disabled': disabled,}, customClass]"
      :hover-class="(!clickable && !link) || disabled || showSwitch ? '' : 'uni-list-item--hover'"
      class="uni-list-item"
      @click="onClick"
    >
      <div
        v-if="!isFirstChild"
        class="border--left"
        :class="{ 'uni-list--border': border }"
      />
      <div
        class="uni-list-item__container"
        :class="{ 'container--right': showArrow || link, 'flex--direction': direction === 'column' }"
      >
        <slot name="header">
          <div class="uni-list-item__header">
            <div
              v-if="thumb"
              class="uni-list-item__icon"
            >
              <img
                :src="thumb"
                class="uni-list-item__icon-img"
                :class="['uni-list--' + thumbSize]"
              >
            </div>
            <div
              v-else-if="showExtraIcon"
              class="uni-list-item__icon"
            >
              <uni-icons
                :color="extraIcon.color"
                :size="extraIcon.size"
                :type="extraIcon.type"
              />
            </div>
          </div>
        </slot>
        <slot name="body">
          <div
            class="uni-list-item__content"
            :class="{ 'uni-list-item__content--center': thumb || showExtraIcon || showBadge || showSwitch }"
          >
            <span
              v-if="title"
              class="uni-list-item__content-title"
              :class="[ellipsis !== 0 && ellipsis <= 2 ? 'uni-ellipsis-' + ellipsis : '']"
            >
              {{ title }}
            </span>
            <span
              v-if="note"
              class="uni-list-item__content-note"
            >
              {{ note }}
            </span>
          </div>
        </slot>
        <slot name="footer">
          <div
            v-if="rightText || showBadge || showSwitch"
            class="uni-list-item__extra"
            :class="{ 'flex--justify': direction === 'column' }"
          >
            <span
              v-if="rightText"
              class="uni-list-item__extra-text"
            >
              {{ rightText }}
            </span>
            <uni-badge
              v-if="showBadge"
              :type="badgeType"
              :text="badgeText"
              :custom-style="badgeStyle"
            />
            <switch
              v-if="showSwitch"
              :disabled="disabled"
              :checked="switchChecked"
              @change="onSwitchChange"
            />
          </div>
        </slot>
      </div>
      <uni-icons
        v-if="showArrow || link"
        :size="16"
        class="uni-icon-wrapper"
        color="#bbb"
        type="arrowright"
      />
    </div>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>
<script>
import UniIcons from 'src/pages/components/uni-icons/components/uni-icons/uni-icons.vue';
import { isNotInUni } from 'src/packages/common/utils/utils';
import { UNI_LIST_MIXIN } from '../../mixins/uni-list-mixin';

export default {
  name: 'UniListItem',
  components: {
    UniIcons,
  },
  mixins: [UNI_LIST_MIXIN],
  options: {
    addGlobalClass: true,
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'row',
    },
    title: {
      type: String,
      default: '',
    },
    note: {
      type: String,
      default: '',
    },
    ellipsis: {
      type: [Number, String],
      default: 0,
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    showArrow: {
      type: [Boolean, String],
      default: false,
    },
    link: {
      type: [Boolean, String],
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
    showBadge: {
      type: [Boolean, String],
      default: false,
    },
    showSwitch: {
      type: [Boolean, String],
      default: false,
    },
    switchChecked: {
      type: [Boolean, String],
      default: false,
    },
    badgeText: {
      type: String,
      default: '',
    },
    badgeType: {
      type: String,
      default: 'success',
    },
    badgeStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    rightText: {
      type: String,
      default: '',
    },
    thumb: {
      type: String,
      default: '',
    },
    thumbSize: {
      type: String,
      default: 'base',
    },
    showExtraIcon: {
      type: [Boolean, String],
      default: false,
    },
    extraIcon: {
      type: Object,
      default() {
        return {
          type: '',
          color: '#000000',
          size: 20,
        };
      },
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click', 'switchChange'],
  data() {
    return {
      isFirstChild: false,
    };
  },
  mounted() {
    this.initList(false);
  },
  methods: {
    onSwitchChange(e) {
      this.$emit('switchChange', e.detail);
    },
    openPage() {
      if (['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'].indexOf(this.link) !== -1) {
        this.pageApi(this.link);
      } else {
        this.pageApi('navigateTo');
      }
    },
    pageApi(api) {
      // #ifdef H5
      if (isNotInUni()) {
        this.$router.push(this.to);
        return;
      }
      // #endif

      const callback = {
        url: this.to,
        success: (res) => {
          this.$emit('click', {
            data: res,
          });
        },
        fail: (err) => {
          this.$emit('click', {
            data: err,
          });
        },
      };
      switch (api) {
        case 'navigateTo':
          uni.navigateTo(callback);
          break;
        case 'redirectTo':
          uni.redirectTo(callback);
          break;
        case 'reLaunch':
          uni.reLaunch(callback);
          break;
        case 'switchTab':
          uni.switchTab(callback);
          break;
        default:
          uni.navigateTo(callback);
      }
    },
  },
};
</script>

<style lang="scss">
$uni-font-size-sm: 12px;
$uni-font-size-base: 14px;
$uni-font-size-lg: 16px;
$uni-spacing-col-lg: 12px;
$uni-spacing-row-lg: 15px;
$uni-img-size-sm: 20px;
$uni-img-size-base: 26px;
$uni-img-size-lg: 40px;
$uni-border-color: #e5e5e5;
$uni-bg-color-hover: #f1f1f1;
$uni-text-color-grey: #999;
$list-item-pd: $uni-spacing-col-lg $uni-spacing-row-lg;
.uni-list-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  font-size: $uni-font-size-lg;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  flex-direction: row;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}
.uni-list-item--disabled {
  opacity: 0.3;
}
.uni-list-item--hover {
  background-color: $uni-bg-color-hover;
}
.uni-list-item__container {
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  padding: $list-item-pd;
  padding-left: $uni-spacing-row-lg;
  flex: 1;
  overflow: hidden;
  // align-items: center;
}
.container--right {
  padding-right: 0;
}
// .border--left {
// 	margin-left: $uni-spacing-row-lg;
// }
.uni-list--border {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  /* #ifdef APP-NVUE */
  border-top-color: $uni-border-color;
  border-top-style: solid;
  border-top-width: 0.5px;
  /* #endif */
}
/* #ifndef APP-NVUE */
.uni-list--border:after {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $uni-border-color;
}
/* #endif */
.uni-list-item__content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  padding-right: 8px;
  flex: 1;
  color: #3b4144;
  // overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.uni-list-item__content--center {
  justify-content: center;
}
.uni-list-item__content-title {
  font-size: $uni-font-size-base;
  color: #3b4144;
  overflow: hidden;
}
.uni-list-item__content-note {
  margin-top: 6rpx;
  color: $uni-text-color-grey;
  font-size: $uni-font-size-sm;
  overflow: hidden;
}
.uni-list-item__extra {
  // width: 25%;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.uni-list-item__header {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.uni-list-item__icon {
  margin-right: 18rpx;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.uni-list-item__icon-img {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  height: $uni-img-size-base;
  width: $uni-img-size-base;
  margin-right: 10px;
}
.uni-icon-wrapper {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  padding: 0 10px;
}
.flex--direction {
  flex-direction: column;
  /* #ifndef APP-NVUE */
  align-items: initial;
  /* #endif */
}
.flex--justify {
  /* #ifndef APP-NVUE */
  justify-content: initial;
  /* #endif */
}
.uni-list--lg {
  height: $uni-img-size-lg;
  width: $uni-img-size-lg;
}
.uni-list--base {
  height: $uni-img-size-base;
  width: $uni-img-size-base;
}
.uni-list--sm {
  height: $uni-img-size-sm;
  width: $uni-img-size-sm;
}
.uni-list-item__extra-text {
  color: $uni-text-color-grey;
  font-size: $uni-font-size-sm;
}
.uni-ellipsis-1 {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 1;
  text-overflow: ellipsis;
  /* #endif */
}
.uni-ellipsis-2 {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 2;
  text-overflow: ellipsis;
  /* #endif */
}
</style>
