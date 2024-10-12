<template>
  <div class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressColorPicker
        @change="onChange"
        @palette-bar-change="onPaletteBarChange"
      />
    </demo-block>

    <demo-block
      :title="t('multiple')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressColorPicker
        type="multiple"
        @change="onChange"
        @palette-bar-change="onPaletteBarChange"
      />
    </demo-block>

    <demo-block
      :title="t('format')"
      description="abc"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressColorPicker
        type="multiple"
        enable-alpha
        :format="curFormat"
        @change="onChange"
        @palette-bar-change="onPaletteBarChange"
      />

      <press-radio-group
        :value="curFormat"
        @change="val => changeFormat(val)"
      >
        <press-cell-group>
          <press-cell
            v-for="(format) of formatList"
            :key="format.value"
            :title="`${t('mode', format.value)}`"
            clickable
            data-name="1"
            @click="() => changeFormat(format.value)"
          >
            <template #right-icon>
              <press-radio
                :name="format.value"
              />
            </template>
          </press-cell>
        </press-cell-group>
      </press-radio-group>
    </demo-block>

    <demo-block
      :title="t('preview')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressColorPicker
        type="multiple"
        show-preview
        enable-alpha
        value="#70de2f"
        @change="onChange"
        @palette-bar-change="onPaletteBarChange"
      />
    </demo-block>
  </div>
</template>
<script>
import PressColorPicker from 'press-ui/press-color-picker/press-color-picker.vue';
import PressRadio from 'press-ui/press-radio/press-radio.vue';
import PressRadioGroup from 'press-ui/press-radio-group/press-radio-group.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';
import PressCellGroup from 'press-ui/press-cell-group/press-cell-group.vue';

export default {
  i18n: {
    'zh-CN': {
      multiple: '带色板',
      format: '自定义格式',
      mode: a => `${a} 模式`,
      preview: '显示预览',
    },
    'en-US': {
      multiple: 'Multiple',
      format: 'Format',
      mode: a => `Mode ${a}`,
      preview: 'Preview',
    },
  },
  components: {
    PressColorPicker,
    PressRadio,
    PressRadioGroup,
    PressCell,
    PressCellGroup,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      curFormat: 'CSS',
      formatList: ['CSS', 'HEX', 'RGB', 'HSL', 'HSV', 'CMYK'].map(item => ({
        label: `${item} 模式`,
        value: item,
      })),
    };
  },
  methods: {
    changeFormat(value) {
      console.log('>>> changeFormat.value ', value);
      this.curFormat = value;
    },
    onChange(value) {
      console.log('>>> change.value ', value);
    },
    onPaletteBarChange(value) {
      console.log('>>> paletteBarChange.value ', value);
    },

  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  --press-color-picker-panel-width: 100%;
}
</style>
