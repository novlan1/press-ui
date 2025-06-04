<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressRow>
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
      </PressRow>

      <PressRow>
        <PressCol
          :span="4"
          class="press-col--in-tag"
        >
          span: 4
        </PressCol>
        <PressCol
          :span="10"
          :offset="4"
          class="press-col--in-tag"
        >
          offset: 4, span: 10
        </PressCol>
      </PressRow>

      <PressRow>
        <PressCol
          :offset="12"
          :span="12"
          class="press-col--in-tag"
        >
          offset: 12, span: 12
        </PressCol>
      </PressRow>
    </demo-block>

    <demo-block :title="t('title2')">
      <PressRow :gutter="20">
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
        <PressCol
          :span="8"
          class="press-col--in-tag"
        >
          span: 8
        </PressCol>
      </PressRow>
    </demo-block>
  </div>
</template>
<script>
import PressCol from 'press-ui/press-col/press-col.vue';
import PressRow from 'press-ui/press-row/press-row.vue';

export default {
  i18n: {
    'zh-CN': {
      title2: '设置列元素间距',
    },
    'en-US': {
      title2: 'Column Spacing',
    },
  },
  components: {
    PressCol,
    PressRow,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  ::v-deep .press-col {
    margin-bottom: 10px;
    color: #fff;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    background-clip: content-box;


    /* #ifndef MP-TOUTIAO */
    &:nth-child(odd) {
      background-color: #39a9ed;
    }
    &:nth-child(even) {
      background-color: #66c6f2;
    }
    /* #endif */
  }

  /* #ifdef MP-TOUTIAO */
  ::v-deep .press-col--in-tag {
     &:nth-child(odd) .press-col {
      background-color: #39a9ed;
    }
    &:nth-child(even) .press-col{
      background-color: #66c6f2;
    }
  }
  /* #endif */
}
</style>
