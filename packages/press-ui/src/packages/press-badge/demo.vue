<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressBadge
        :content="5"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>

      <PressBadge
        :content="10"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>

      <PressBadge
        content="Hot"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>

      <PressBadge
        dot
      >
        <div class="child" />
      </PressBadge>
    </demo-block>

    <demo-block :title="t('max')">
      <PressBadge
        :content="20"
        max="9"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
      <PressBadge
        :content="50"
        max="20"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
      <PressBadge
        :content="200"
        max="99"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
    </demo-block>

    <demo-block :title="t('color')">
      <PressBadge
        :content="5"
        color="#1989fa"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
      <PressBadge
        :content="10"
        color="#1989fa"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
      <PressBadge
        dot
        color="#1989fa"
        :custom-style="customStyle"
      >
        <div class="child" />
      </PressBadge>
    </demo-block>

    <demo-block :title="t('slot')">
      <PressBadge :custom-style="customStyle">
        <div class="child" />
        <template #content>
          <PressIconPlus
            name="success"
            class="badge-icon"
          />
        </template>
      </PressBadge>
      <PressBadge :custom-style="customStyle">
        <div class="child" />
        <template #content>
          <PressIconPlus
            name="cross"
            class="badge-icon"
          />
        </template>
      </PressBadge>
      <PressBadge :custom-style="customStyle">
        <div class="child" />
        <template #content>
          <PressIconPlus
            name="down"
            class="badge-icon"
          />
        </template>
      </PressBadge>
    </demo-block>

    <demo-block :title="t('block')">
      <PressBadge
        :content="20"
        :custom-style="customStyle"
      />

      <PressBadge
        :content="200"
        max="99"
      />
    </demo-block>
  </div>
</template>
<script>
import PressBadge from 'press-ui/press-badge/press-badge.vue';
import PressIconPlus from 'press-ui/press-icon-plus/press-icon-plus.vue';


export default {
  i18n: {
    'zh-CN': {
      max: '最大值',
      color: '自定义颜色',
      slot: '自定义徽标内容',
      block: '独立展示',
    },
    'en-US': {
      max: 'Max',
      color: 'Color',
      slot: 'Slot',
      block: 'Block',
    },
  },
  components: {
    PressBadge,
    PressIconPlus,
  },
  data() {
    return {
      customStyle: 'margin-right: 16px',
    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}

.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}
</style>
