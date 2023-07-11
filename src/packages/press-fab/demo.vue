<template>
  <view class="demo-wrap">
    <demo-block
      :title="t('basicUsage')"
    >
      <press-cell
        :title="t('toggleDirection')"
        is-link
        @click="switchBtn(0)"
      />
      <press-cell
        :title="t('changeColor')"
        is-link
        @click="switchColor"
      />
    </demo-block>

    <press-fab
      ref="fabRef"
      :pattern="pattern"
      :content="content"
      :horizontal="horizontal"
      :vertical="vertical"
      :direction="direction"
      @trigger="trigger"
      @fabClick="fabClick"
    />
  </view>
</template>

<script>
import PressFab from 'src/packages/press-fab/press-fab.vue';

export default {
  i18n: {
    'zh-CN': {
      toggleDirection: '切换方向',
      changeColor: '修改颜色',
      prompt: '提示',
      you: '您',
      image: '相册',
      home: '首页',
      star: '收藏',
      modalContent: (target, selected) => `你${selected ? '选中了' : '取消了'}${target}`,
    },
    'en-US': {
      toggleDirection: 'Direction',
      changeColor: 'Color',
      prompt: 'Prompt',
      selected: 'selected',
      cancelled: 'cancelled',
      you: 'You',
      image: 'image',
      home: 'home',
      star: 'star',
      modalContent: (target, selected) => `You ${selected ? 'selected' : 'cancelled'} ${target}`,
    },
  },
  components: {
    PressFab,
  },
  data() {
    return {
      title: 'press-fab',
      horizontal: 'right',
      vertical: 'bottom',
      direction: 'horizontal',
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#007AFF',
        buttonColor: '#007AFF',
        iconColor: '#fff',
      },
      is_color_type: false,
      content: [{
        iconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_394e9b73a2b402c417.png',
        selectedIconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_ddaf193c855d2d4b93.png',
        text: this.t('image'),
        active: false,
      },
      {
        iconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_48f3dce2ae13561480.png',
        selectedIconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_119ad562534f721c7f.png',
        text: this.t('home'),
        active: false,
      },
      {
        iconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_069e81d6aae9e308e1.png',
        selectedIconPath: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_eda1e7d95cb62dc6e1.png',
        text: this.t('star'),
        active: false,
      },
      ],
    };
  },
  onBackPress() {
    if (this.$refs.fabRef.isShow) {
      this.$refs.fabRef.close();
      return true;
    }
    return false;
  },
  methods: {
    trigger(e) {
      const that = this;
      const { t, content } = this;
      console.log('[trigger] e: ', e);
      this.content[e.index].active = !e.item.active;

      uni.showModal({
        title: t('prompt'),
        content: this.t('modalContent', e.item.text, content[e.index].active),
        confirmText: t('confirm'),
        cancelText: t('cancel'),
        success(res) {
          if (res.confirm) {
            that.onTip('confirm');
          } else if (res.cancel) {
            that.onTip('cancel');
          }
        },
      });
    },
    onTip(title) {
      uni.showToast({
        title,
        icon: 'none',
      });
    },
    fabClick() {

    },
    switchBtn(hor, ver) {
      const { onClick, isShow } = this.$refs.fabRef;
      if (!isShow) {
        onClick?.();
      }
      if (hor === 0) {
        this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
      } else {
        this.horizontal = hor;
        this.vertical = ver;
      }
      this.$forceUpdate();
    },
    switchColor() {
      this.is_color_type = !this.is_color_type;
      if (this.is_color_type) {
        this.pattern.iconColor = '#aaa';
        this.pattern.buttonColor = '#fff';
      } else {
        this.pattern.iconColor = '#fff';
        this.pattern.buttonColor = '#007AFF';
      }
    },
  },
};
</script>

<style lang="scss">
.button {
  margin-bottom: 10px;
}
</style>

