<template>
  <div class="demo-wrap">
    <demo-block
      v-for="(item, index) of demoList"
      :key="index"
      :title="item.title"
    >
      <PressCell
        v-for="info of item.list"
        :key="info.title"
        :title="info.title"
        is-link
        @click="onShowShareSheet(info.type)"
      />
    </demo-block>

    <PressShareSheet
      :show="showShare"
      :title="t('title')"
      :description="description"
      :options="curOptions"
      @select="onSelect"
      @close="onClose"
    />
  </div>
</template>
<script>
import PressShareSheet from 'press-ui/press-share-sheet/press-share-sheet.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';


export default {
  i18n: {
    'zh-CN': {
      Custom: '自定义',
      qq: 'QQ',
      name: '名称',
      link: '复制链接',
      title: '立即分享给好友',
      weibo: '微博',
      wechat: '微信',
      poster: '分享海报',
      qrcode: '二维码',
      multiLine: '展示多行选项',
      showSheet: '显示分享面板',
      withDesc: '展示描述信息',
      customIcon: '自定义图标',
      description: '描述信息',
      weappQrcode: '小程序码',
      wechatMoments: '朋友圈',
    },
    'en-US': {
      Custom: 'Custom',
      qq: 'QQ',
      name: 'Name',
      link: 'Link',
      title: 'Share',
      weibo: 'Weibo',
      wechat: 'Wechat',
      poster: 'Poster',
      qrcode: 'Qrcode',
      multiLine: 'Multi Line',
      showSheet: 'Show ShareSheet',
      withDesc: 'Show Description',
      customIcon: 'Custom Icon',
      description: 'Description',
      weappQrcode: 'Weapp Qrcode',
      wechatMoments: 'Wechat Moments',
    },
  },

  components: {
    PressShareSheet,
    PressCell,
  },
  data() {
    return {
      demoList: [
        {
          title: this.t('basicUsage'),
          list: [
            {
              title: this.t('basicUsage'),
              type: 'basic',
            },
          ],
        },
        {
          title: this.t('Custom'),
          list: [
            {
              title: this.t('multiLine'),
              type: 'multiLine',
            },
            {
              title: this.t('customIcon'),
              type: 'customIcon',
            },
            {
              title: this.t('withDesc'),
              type: 'description',
            },
          ],
        },


      ],
      showShare: false,
      description: '',
      curOptions: [],
    };
  },
  computed: {
    options() {
      return [
        { name: this.t('wechat'), icon: 'wechat', openType: 'share' },
        { name: this.t('weibo'), icon: 'weibo' },
        { name: this.t('link'), icon: 'link' },
        { name: this.t('poster'), icon: 'poster' },
        { name: this.t('qrcode'), icon: 'qrcode' },
      ];
    },
    multiLineOptions() {
      return [
        [
          { name: this.t('wechat'), icon: 'wechat' },
          { name: this.t('weibo'), icon: 'weibo' },
          { name: this.t('qq'), icon: 'qq' },
        ],
        [
          { name: this.t('link'), icon: 'link' },
          { name: this.t('poster'), icon: 'poster' },
          { name: this.t('qrcode'), icon: 'qrcode' },
        ],
      ];
    },
    customIconOptions() {
      return  [
        {
          name: this.t('name'),
          icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-fire.png',
        },
        {
          name: this.t('name'),
          icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-light.png',
        },
        {
          name: this.t('name'),
          icon: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fcustom-icon-water.png',
        },
      ];
    },
    descriptionOptions() {
      return [
        { name: this.t('wechat'), icon: 'wechat' },
        { name: this.t('weibo'), icon: 'weibo' },
        {
          name: this.t('link'),
          icon: 'link',
          description: this.t('description'),
        },
        { name: this.t('poster'), icon: 'poster' },
        { name: this.t('qrcode'), icon: 'qrcode' },
      ];
    },
  },
  mounted() {
    this.curOptions = this.options;
  },
  methods: {
    onShowShareSheet(type) {
      let description = '';
      switch (type) {
        case 'basic': {
          this.curOptions = this.options;
          break;
        }
        case 'multiLine': {
          this.curOptions = this.multiLineOptions;
          break;
        }
        case 'customIcon': {
          this.curOptions = this.customIconOptions;
          break;
        }
        case 'description': {
          this.curOptions = this.descriptionOptions;
          description = this.t('description');
          break;
        }
        default: {
        }
      }
      this.showShare = true;
      this.description = description;
    },
    onSelect(val) {
      console.log('[onSelect] val', val);

      this.showShare = false;
    },
    onClose() {
      this.showShare = false;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
