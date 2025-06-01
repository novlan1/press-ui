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
      <div
        v-for="(line, lineIndex) of lineList"
        :key="lineIndex"
        class="format-line"
      >
        <div
          v-for="item of line"
          :key="item"
          class="format-item"
          :class="curFormat === item ? 'active' : ''"
          @click.stop="clickFormat(item)"
        >
          <PressIcon
            v-if="curFormat === item"
            name="success"
            size="12"
            custom-style="position: absolute;left: 2.5px;top: 2.1px;z-index: 1;color: #fff"
          />
          {{ item }}
        </div>
      </div>
      <PressColorPicker
        type="multiple"
        enable-alpha
        :format="curFormat"
        @change="onChange"
        @palette-bar-change="onPaletteBarChange"
      />
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
import PressIcon from 'press-ui/press-icon/press-icon.vue';


export default {
  i18n: {
    'zh-CN': {
      multiple: '带色板',
      format: '自定义格式',
      mode: '组件模式选择',
      preview: '显示预览',
    },
    'en-US': {
      multiple: 'Multiple',
      format: 'Format',
      mode: 'Mode',
      preview: 'Preview',
    },
  },
  components: {
    PressColorPicker,
    PressIcon,
  },
  data() {
    return {
      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',
      curFormat: 'CSS',
      lineList: [
        ['CSS', 'HEX', 'RGB'],
        ['HSL', 'HSV', 'CMYK'],
      ],
    };
  },
  methods: {
    onChange(value) {
      console.log('>>> change.value ', value);
    },
    onPaletteBarChange(value) {
      console.log('>>> paletteBarChange.value ', value);
    },
    clickFormat(value) {
      this.curFormat = value;
    },

  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  --press-color-picker-panel-width: 100%;
}

.format-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  margin: 0 16px 20px;
}

.format-item {
  border-radius: 6px;
  height: 100%;
  background-color: #fff;
  padding: 16px;
  line-height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
}

.format-item.active {
  border: 1px solid #0052d9;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    border-top-left-radius: 6px;
    border-top: 28px solid #0052d9;
    border-right: 28px solid transparent;
    border-radius: 0;
  }
}

.format-item:not(:last-child) {
  margin-right: 12px;
}
</style>
