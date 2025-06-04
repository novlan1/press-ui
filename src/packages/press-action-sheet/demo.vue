<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(item,index) of demoList"
      :key="index"
      :title="item.title"
    >
      <PressCell
        v-for="(info) of item.list"
        :key="info.title"
        :title="info.title"
        is-link
        @click="onShowActionSheet(info.type)"
      />
    </demo-block>


    <PressActionSheet
      :show="show"
      :actions="curActions"
      :cancel-text="cancelText"
      :description="description"
      :title="title"
      @close="onClose"
      @select="onSelect"
      @getuserinfo="onGetUserInfo"
      @cancel="onClose"
    />

    <PressActionSheet
      :show="showCustom"
      :title="t('title')"
      @close="onClose"
      @select="onSelect"
      @cancel="onClose"
    >
      <div style="padding: 16px;font-size: 16px;">
        {{ t('content') }}
      </div>
    </PressActionSheet>
  </div>
</template>
<script>
import PressActionSheet from 'press-ui/press-action-sheet/press-action-sheet.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';

function getWxOpenTitle() {
  let openTitle = '';
  // #ifdef MP-WEIXIN
  openTitle = 'wxOpen';
  // #endif
  // #ifdef MP-QQ
  openTitle = 'qqOpen';
  // #endif
  // #ifdef MP-ALIPAY
  openTitle = 'alipayOpen';
  // #endif

  return openTitle;
}

export default {
  i18n: {
    'zh-CN': {
      custom: '自定义',
      option1: '选项一',
      option2: '选项二',
      option3: '选项三',
      subname: '描述信息',
      showCancel: '展示取消按钮',
      buttonText: '弹出菜单',
      customPanel: '自定义面板',
      description: '这是一段描述信息',
      optionStatus: '选项状态',
      coloredOption: '着色选项',
      disabledOption: '禁用选项',
      showDescription: '展示描述信息',
      wxOpen: '微信开放能力',
      qqOpen: 'QQ开放能力',
      alipayOpen: '支付宝开放能力',
      mpOpen: '小程序开放能力',
      getUserInfo: '获取用户信息',
    },
    'en-US': {
      custom: 'Custom',
      option1: 'Option 1',
      option2: 'Option 2',
      option3: 'Option 3',
      subname: 'Description',
      showCancel: 'Show Cancel Button',
      buttonText: 'Show ActionSheet',
      customPanel: 'Custom Panel',
      description: 'Description',
      optionStatus: 'Option Status',
      coloredOption: 'Colored Option',
      disabledOption: 'Disabled Option',
      showDescription: 'Show Description',
      wxOpen: 'Wechat Open API',
      qqOpen: 'QQ Open API',
      alipayOpen: 'Alipay Open API',
      mpOpen: 'Mini Program Open API',
      getUserInfo: 'Get User Info',
    },
  },

  components: {
    PressActionSheet,
    PressCell,
  },
  data() {
    const demoList = [
      {
        title: this.t('basicUsage'),
        list: [
          {
            title: this.t('check'),
            type: 'basic',
          },
        ],
      },
      {
        title: this.t('custom'),
        list: [
          {
            title: this.t('optionStatus'),
            type: 'status',
          },
          {
            title: this.t('showCancel'),
            type: 'cancel',
          },
          {
            title: this.t('showDescription'),
            type: 'description',
          },
          {
            title: this.t('customPanel'),
            type: 'title',
          },
        ],
      },
    ];

    // #ifdef MP
    demoList.push({
      title: this.t(getWxOpenTitle() || 'mpOpen'),
      list: [
        {
          title: this.t('check'),
          type: 'wxOpen',
        },
      ],
    });
    // #endif

    return {
      demoList,
      show: false,
      showCustom: false,
      cancelText: '',
      description: '',
      title: '',
      curActions: [],
    };
  },
  computed: {
    actions() {
      return [
        {
          name: this.t('option1'),
        },
        {
          name: this.t('option2'),
        },
        {
          name: this.t('option3'),
          subname: this.t('subname'),
          openType: 'share',
        },
      ];
    },
  },
  mounted() {
    this.curActions = this.actions;
  },
  methods: {
    onShowActionSheet(type) {
      const statusActions = [
        { name: this.t('coloredOption'), color: '#ee0a24' },
        { loading: true },
        { name: this.t('disabledOption'), disabled: true },
      ];

      const wxActions = [
        { name: this.t('getUserInfo'), color: '#07c160', openType: 'getUserInfo' },
      ];
      let cancelText = '';
      let description = '';
      let curActions = [];
      let title = '';
      switch (type) {
        case 'title': {
          this.showCustom = true;
          return;
        }
        case 'basic': {
          curActions = this.actions;
          break;
        }
        case 'wxOpen': {
          curActions = wxActions;
          title = this.t('title');
          break;
        }
        case 'status': {
          curActions = statusActions;
          break;
        }
        case 'cancel': {
          curActions = this.actions;
          cancelText = this.t('cancel');
          break;
        }
        case 'description': {
          curActions = this.actions;
          description =  this.t('description');
          break;
        }
        default: {
        }
      }
      this.show = true;
      this.cancelText = cancelText;
      this.description = description;
      this.curActions = curActions;
      this.title = title;
    },
    onClose() {
      this.show = false;
      this.showCustom = false;
    },
    onSelect(e) {
      console.log('onSelect.e', e);
    },
    onGetUserInfo(e) {
      console.log('onGetUserInfo.e', e);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
