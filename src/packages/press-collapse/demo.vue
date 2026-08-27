<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCollapse
        :value="activeNames"
        @change="onChange"
        @open="onOpen"
        @close="onClose"
      >
        <PressCollapseItem
          :title="`${t('title')} 1`"
          name="1"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} 2`"
          name="2"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} 3`"
          name="3"
        >
          {{ t('text') }}
        </PressCollapseItem>
      </PressCollapse>
    </demo-block>

    <demo-block
      :title="t('accordion')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressCollapse
        :value="activeNames2"
        accordion
        @change="onChangeAccordion"
      >
        <PressCollapseItem
          :title="`${t('title')} A`"
          name="1"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} B`"
          name="2"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} C`"
          name="3"
        >
          {{ t('text') }}
        </PressCollapseItem>
      </PressCollapse>
    </demo-block>

    <demo-block
      :title="t('disabled')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <PressCollapse
        :value="activeNames3"
        accordion
        @change="onChangeDisabled"
      >
        <PressCollapseItem
          :title="`${t('title')} X`"
          name="1"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} Y`"
          disabled
          name="2"
        >
          {{ t('text') }}
        </PressCollapseItem>
        <PressCollapseItem
          :title="`${t('title')} Z`"
          name="3"
          disabled
        >
          {{ t('text') }}
        </PressCollapseItem>
      </PressCollapse>
    </demo-block>

    <demo-block
      :title="t('titleSlot')"
      :section-style="sectionStyle"
      :header-style="headerStyle"
    >
      <PressCollapse
        :value="activeNamesTitle"
        @change="onChangeTitle"
      >
        <PressCollapseItem name="1">
          <template #title>
            <div>
              {{ t('title') }} 1
              <PressIcon name="question-o" />
            </div>
          </template>
          {{ t('text') }}
        </PressCollapseItem>

        <PressCollapseItem
          :title="`${t('title')} 2`"
          name="2"
          icon="shop-o"
        >
          {{ t('text') }}
        </PressCollapseItem>
      </PressCollapse>
    </demo-block>
  </div>
</template>
<script>
import PressCollapseItem from 'press-ui/press-collapse-item/press-collapse-item.vue';
import PressCollapse from 'press-ui/press-collapse/press-collapse.vue';
import PressIcon from 'press-ui/press-icon/press-icon.vue';


export default {
  i18n: {
    'zh-CN': {
      accordion: '手风琴',
      titleSlot: '自定义标题内容',
      text: '代码是写出来给人看的，附带能在机器上运行',
    },
    'en-US': {
      accordion: 'Accordion',
      titleSlot: 'Custom title',
      text: 'Content',
    },
  },

  components: {
    PressCollapseItem,
    PressCollapse,
    PressIcon,
  },
  data() {
    return {
      activeNames: ['1'],
      activeNames2: '1',
      activeNames3: ['1'],
      activeNamesTitle: ['1'],
      sectionStyle: 'margin: 0;',
      headerStyle: 'background: #f7f8fa;',
    };
  },
  methods: {
    onChange(value) {
      console.log('onChange.value: ', value);
      this.activeNames = value;
    },
    onOpen(value) {
      this.onGTip(`open: ${value}`);
      console.log('onOpen.value: ', value);
    },
    onClose(value) {
      this.onGTip(`close: ${value}`);
      console.log('onClose.value: ', value);
    },
    onChangeAccordion(value) {
      this.activeNames2 = value;
    },
    onChangeDisabled(value) {
      this.activeNames3 = value;
    },
    onChangeTitle(value) {
      this.activeNamesTitle = value;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
