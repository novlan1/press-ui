<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-row>
        <press-col :span="8">
          span: 8
        </press-col>
        <press-col :span="8">
          span: 8
        </press-col>
        <press-col :span="8">
          span: 8
        </press-col>
      </press-row>

      <press-row>
        <press-col :span="4">
          span: 4
        </press-col>
        <press-col
          :span="10"
          :offset="4"
        >
          offset: 4, span: 10
        </press-col>
      </press-row>

      <press-row>
        <press-col
          :offset="12"
          :span="12"
        >
          offset: 12, span: 12
        </press-col>
      </press-row>
    </demo-block>

    <demo-block :title="t('title2')">
      <press-row :gutter="20">
        <press-col :span="8">
          span: 8
        </press-col>
        <press-col :span="8">
          span: 8
        </press-col>
        <press-col :span="8">
          span: 8
        </press-col>
      </press-row>
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

    &:nth-child(odd) {
      background-color: #39a9ed;
    }
    &:nth-child(even) {
      background-color: #66c6f2;
    }
  }
}
</style>
