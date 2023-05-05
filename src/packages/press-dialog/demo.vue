<template>
  <div class="wrap">
    <demo-block
      v-for="(item, index) of dialogTypeList"
      :key="index"
      :title="item.title"
      :section-style="sectionStyle"
    >
      <press-button
        type="e-sport-primary-bg"
        @click="onShowDialog(item.name)"
      >
        {{ t('check') }}
      </press-button>
    </demo-block>

    <PressDialogComp id="tip-match-comm-tips-dialog" />

    <PressDialogComp
      :title="t('title')"
      :show="show"
      content="Some fake news"
      @confirm="onConfirm()"
      @cancel="show = false"
    />

    <PressDialogComp
      :title="t('title')"
      :show="show2"
      content="Some fake news 2"
      @confirm="show2 = false"
      @cancel="show2 = false"
    />
  </div>
</template>
<script>
import PressDialog from 'src/packages/press-dialog';
import PressDialogComp from 'src/packages/press-dialog/press-dialog';

const loadingConfirm = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

export default {
  i18n: {
    'zh-CN': {
      noCancel: '没有取消按钮',
      noCancelLoading: '没有取消+加载中',
      image: '图片',
      html: 'HTML内容',
      noMask: '点击蒙层不可关闭',
      longText: '长文本',
      onlyCaption: '仅限队长报名，发给队长来报名吧！',
      custom: '自定义',
      componentCall: '组件调用',
      multiple: '多例',
      longContent: () => [
        '念奴娇·赤壁怀古',
        '大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。',
        '遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
        '<br/>',
        '沁园春·雪',
        '北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。',
        '江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。',
        '<br/>',
        '沁园春·长沙',
        '独立寒秋，湘江北去，橘子洲头。看万山红遍，层林尽染；漫江碧透，百舸争流。鹰击长空，鱼翔浅底，万类霜天竞自由。怅寥廓，问苍茫大地，谁主沉浮？',
        '携来百侣曾游，忆往昔峥嵘岁月稠。恰同学少年，风华正茂；书生意气，挥斥方遒。指点江山，激扬文字，粪土当年万户侯。曾记否，到中流击水，浪遏飞舟？',
      ].join('<br/>'),
    },
    'en-US': {
      noCancel: 'No Cancel',
      noCancelLoading: 'No Cancel and Loading',
      image: 'Image',
      html: 'HTML Content',
      noMask: 'No Close By Mask',
      longText: 'Long Text',
      onlyCaption: 'Only the captain can sign up, send it to the captain to sign up!',
      custom: 'Custom ',
      componentCall: 'Component Call',
      multiple: 'Multiple',
      longContent: () => [
        'Reflections on the Ancient Red Cliff--To the tune of Niannujiao',
        '',
        'The Great River flows,',
        'Eastward waves sweeping away,',
        'For thousands of years, gallant heroes.',
        'West of the ancient fort, they say, stands',
        'The Red Cliff of the Three-Kingdoms\' Duke Zhou.',
        'Rocks pierce the sky, shore-tearing',
        'Waves swirl into piles of snow.',
        'What a glorious sweep of land,',
        'Once a stage for so many a hero!',
        '',
        'My thoughts drift to those years when Zhou',
        'Had newly married the beautiful Qiao,',
        'Vigour and valour aglow.',
        'A feather fan and a silken hat,',
        'He masterminded the fire-attack on the foe--',
        'Over a casual chat',
        'To see their fleet perish, blow by blow.',
        'Back from my mental vagrancy in that bygone age,',
        'I must laugh at myself: letting sentiments grow',
        'Into grey hairs, too soon.',
        'But isn\'t life a dream, after all？',
        'Let me pledge this cup to the River,',
        'To the Moon.',
      ].join('<br/>'),
    },
  },
  components: {
    PressDialogComp,
  },
  data() {
    return {
      sectionStyle: '',
      show: false,
      show2: false,
      dialogTypeList: [
        {
          name: 'normal',
          title: this.t('basicUsage'),
        },
        {
          name: 'noCancel',
          title: this.t('noCancel'),
        },
        {
          name: 'loading',
          title: this.t('loadingStatus'),
        },
        {
          name: 'noCancelLoading',
          title: this.t('noCancelLoading'),
        },
        {
          name: 'img',
          title: this.t('image'),
        },
        {
          name: 'html',
          title: this.t('html'),
        },
        {
          name: 'noTouchMove',
          title: this.t('noMask'),
        },
        {
          name: 'longText',
          title: this.t('longText'),
        },
        {
          name: 'componentCall',
          title: this.t('componentCall'),
        },
        {
          name: 'multiple',
          title: this.t('multiple'),
        },
      ],
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onShowDialog(type) {
      if (type === 'componentCall') {
        this.show = true;
        return;
      }
      if (type === 'multiple') {
        this.show = true;
        this.show2 = true;
        return;
      }

      let cancelText = this.t('cancel');
      let dialogType = 1;
      let onConfirmClick = null;
      let content = this.t('onlyCaption');
      let htmlContent = '';
      let src = '';
      let canTouchRemove = true;
      let useScrollView = false;

      if (type === 'noCancel') {
        cancelText = '';
      } else if (type === 'loading') {
        dialogType = 2;
        onConfirmClick = loadingConfirm;
      } else if (type === 'noCancelLoading') {
        dialogType = 2;
        cancelText = '';
        onConfirmClick = loadingConfirm;
      } else if (type === 'html') {
        content = '',
        htmlContent = `<div>${this.t('custom')}<span style="color: red;">${this.t('content')}</span></div>`;
      } else if (type === 'img') {
        src = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/qrcode/qrcode-wx-mp.png';
      } else if (type === 'noTouchMove') {
        canTouchRemove = false;
      } else if (type === 'longText') {
        content = '';
        htmlContent = `<div style="max-height:100%;overflow:scroll;">${this.t('longContent')}</div>`;
        useScrollView = true;
      }

      PressDialog.show({
        title: this.t('title'),
        content,
        htmlContent,
        src,
        confirmText: this.t('confirm'),
        cancelText,
        dialogType,
        onConfirmClick,
        canTouchRemove,
        useScrollView,
      })
        .then(() => {
          console.log('then');
        })
        .catch(() => {
          console.log('cancel');
        });
    },

    onConfirm() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.wrap {
  padding-bottom: 20px;
}
</style>
