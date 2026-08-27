<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressAvatar :src="src" />
    </demo-block>

    <demo-block :title="t('shape')">
      <PressAvatar
        :src="src"
        round
        :custom-style="customStyle"
      />
      <PressAvatar
        :src="src"
        :round="false"
      />
    </demo-block>

    <demo-block :title="t('size')">
      <PressAvatar
        :src="src"
        size="30"
        :custom-style="customStyle"
      />
      <PressAvatar
        :src="src"
        size="40"
        :custom-style="customStyle"
      />
      <PressAvatar
        :src="src"
        size="50"
      />
    </demo-block>

    <demo-block :title="t('icon')">
      <PressAvatar
        :src="src"
        icon="star-o"
        :custom-style="customStyle"
      />
      <PressAvatar
        :src="src"
        icon="like-o"
      />
    </demo-block>

    <demo-block :title="t('text')">
      <PressAvatar
        text="Y"
        :custom-style="customStyle"
      />
      <PressAvatar
        text="G"
        random-background-color
        :custom-style="customStyle"
      />
      <PressAvatar
        text="杨"
        random-background-color
      />
    </demo-block>

    <demo-block :title="t('error')">
      <PressAvatar />
    </demo-block>

    <demo-block :title="t('avatarGroup')">
      <PressAvatarGroup
        :urls="urls"
        custom-style="margin-bottom: 16px"
        @showMore="showMore"
      />

      <PressAvatarGroup
        :urls="urls"
        gap="0.6"
        custom-style="margin-bottom: 16px"
        @showMore="showMore"
      />

      <PressAvatarGroup
        :urls="urls"
        size="50"
        custom-style="margin-bottom: 16px"
        @showMore="showMore"
      />
    </demo-block>
  </div>
</template>
<script>
import PressAvatarGroup from 'press-ui/press-avatar-group/press-avatar-group.vue';
import PressAvatar from 'press-ui/press-avatar/press-avatar.vue';


const src = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_0ab8e66284a3617ed9.jpeg';


export default {
  i18n: {
    'zh-CN': {
      shape: '头像形状',
      size: '头像尺寸',
      icon: '图标头像',
      text: '文字头像',
      error: '加载失败',
      avatarGroup: '头像组',
    },
    'en-US': {
      shape: 'Shape',
      size: 'Size',
      icon: 'Icon',
      text: 'Text',
      error: 'Error',
      avatarGroup: 'Avatar Group',
    },
  },
  components: {
    PressAvatar,
    PressAvatarGroup,
  },
  data() {
    return {
      src,
      customStyle: 'margin-right: 20px',
      urls: [
        src,
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_ef8e6956717db34745.jpg',
        src,
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_7157200e469d0468b3.jpg',
        src,
        'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_a17f94292a34e9f644.jpeg',
        src,
      ],
    };
  },
  methods: {
    showMore() {
      this.onGTip('[showMore]');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
