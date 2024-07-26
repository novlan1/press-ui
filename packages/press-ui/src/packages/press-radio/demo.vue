<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-radio-group
        :value="valueMap.basic"
        @change="(val) => onChange(val, 'basic')"
      >
        <press-radio name="a">
          {{ t('radio') }} 1
        </press-radio>
        <press-radio name="b">
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('horizontal')">
      <press-radio-group
        :value="valueMap.horizontal"
        direction="horizontal"
        @change="(val) => onChange(val, 'horizontal')"
      >
        <press-radio name="a">
          {{ t('radio') }} 1
        </press-radio>
        <press-radio name="b">
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('disabled')">
      <press-radio-group
        :value="valueMap.disabled"
        disabled
        @change="(val) => onChange(val, 'disabled')"
      >
        <press-radio name="a">
          {{ t('radio') }} 1
        </press-radio>
        <press-radio name="b">
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('customShape')">
      <press-radio-group
        :value="valueMap.square"
        @change="(val) => onChange(val, 'square')"
      >
        <press-radio
          name="a"
          shape="square"
        >
          {{ t('radio') }} 1
        </press-radio>
        <press-radio
          name="b"
          shape="square"
        >
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('customColor')">
      <press-radio-group
        :value="valueMap.customStyle"
        @change="(val) => onChange(val, 'customStyle')"
      >
        <press-radio
          name="a"
          checked-color="#07c160"
        >
          {{ t('radio') }} 1
        </press-radio>
        <press-radio
          name="b"
          checked-color="#07c160"
        >
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('customIconSize')">
      <press-radio-group
        :value="valueMap.customSize"
        @change="(val) => onChange(val, 'customSize')"
      >
        <press-radio
          name="a"
          icon-size="24px"
        >
          {{ t('radio') }} 1
        </press-radio>
        <press-radio
          name="b"
          icon-size="24px"
        >
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('customIcon')">
      <press-radio-group
        :value="valueMap.customIcon"
        @change="(val) => onChange(val, 'customIcon')"
      >
        <press-radio
          name="a"
          use-icon-slot
        >
          {{ t('radio') }} 1
          <template #icon>
            <img
              class="img"
              :src="valueMap.customIcon === 'a' ? icon.active : icon.normal"
            >
          </template>
        </press-radio>
        <press-radio
          name="b"
          use-icon-slot
        >
          {{ t('radio') }} 2
          <template #icon>
            <img
              class="img"
              :src="valueMap.customIcon === 'b' ? icon.active : icon.normal"
            >
          </template>
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block :title="t('disableLabel')">
      <press-radio-group
        :value="valueMap.labelDisabled"
        @change="(val) => onChange(val, 'labelDisabled')"
      >
        <press-radio
          name="a"
          label-disabled
        >
          {{ t('radio') }} 1
        </press-radio>
        <press-radio
          name="b"
          label-disabled
        >
          {{ t('radio') }} 2
        </press-radio>
      </press-radio-group>
    </demo-block>

    <demo-block
      :title="t('withCell')"
      section-style="margin: 0;"
    >
      <press-radio-group
        :value="valueMap.cell"
        @change="val => onChange(val, 'cell')"
      >
        <press-cell-group>
          <press-cell
            :title="`${t('radio')} 1`"
            clickable
            data-name="1"
            @click="valueMap.cell = '1'"
          >
            <template #right-icon>
              <press-radio
                name="1"
              />
            </template>
          </press-cell>
          <press-cell
            :title="`${t('radio')} 2`"
            clickable
            data-name="2"
            @click="valueMap.cell = '2'"
          >
            <template #right-icon>
              <press-radio
                name="2"
              />
            </template>
          </press-cell>
        </press-cell-group>
      </press-radio-group>
    </demo-block>
  </div>
</template>
<script>
import PressRadio from 'press-ui/press-radio/press-radio.vue';
import PressRadioGroup from 'press-ui/press-radio-group/press-radio-group.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressCellGroup from 'press-ui/press-cell-group/press-cell-group.vue';


export default {
  i18n: {
    'zh-CN': {
      radio: '单选框',
      text1: '未选中禁用',
      text2: '选中且禁用',
      withCell: '与 Cell 组件一起使用',
      horizontal: '水平排列',
      customIcon: '自定义图标',
      customColor: '自定义颜色',
      customShape: '自定义形状',
      customIconSize: '自定义大小',
      disableLabel: '禁用文本点击',
    },
    'en-US': {
      radio: 'Radio',
      text1: 'Disabled',
      text2: 'Disabled and checked',
      withCell: 'Inside a Cell',
      horizontal: 'Hrizontal',
      customIcon: 'Custom Icon',
      customColor: 'Custom Color',
      customShape: 'Custom Shape',
      customIconSize: 'Custom Icon Size',
      disableLabel: 'Disable label click',
    },
  },

  components: {
    PressRadio,
    PressRadioGroup,
    PressCell,
    PressCellGroup,
  },
  data() {
    return {
      valueMap: {
        basic: 'a',
        horizontal: 'a',
        disabled: 'a',
        square: 'a',
        customStyle: 'a',
        customSize: 'a',
        customIcon: 'a',
        labelDisabled: 'a',
        cell: '1',
      },
      icon: {
        normal: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-inactive.png',
        active: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fuser-active.png',
      },
    };
  },
  methods: {
    onChange(val, type) {
      console.log('onChange.val', val);
      // #ifdef Vue2
      this.$set(this.valueMap, type, val);
      // #endif

      // #ifdef VUE3
      this.valueMap[type] = val;
      // #endif
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .press-radio {
  margin-bottom: 8px;
}
.img {
  height: 20px;
  width: 25px;
}
</style>
