<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-card>
        <span class="press-body">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>

    <demo-block :title="t('title')">
      <press-card
        :title="t('title')"
        :extra="t('description')"
      >
        <span class="press-body">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>

    <demo-block :title="t('subtitle')">
      <press-card
        :title="t('title')"
        :sub-title="t('subtitle')"
        :extra="t('description')"
        :thumbnail="avatar"
        @click="onClick"
      >
        <span class="press-body">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>

    <demo-block :title="t('noMargin')">
      <press-card
        :title="t('title')"
        :sub-title="t('subtitle')"
        :extra="t('description')"
        :is-full="true"
        :thumbnail="avatar"
      >
        <span class="press-body">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>

    <demo-block :title="t('cover')">
      <press-card
        :cover="cover"
        @click="onClick"
      >
        <span class="press-body">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>

    <demo-block :title="t('actionBar')">
      <press-card
        @click="onClick"
      >
        <span class="press-body">
          {{ t('content') }}
        </span>
        <div
          slot="actions"
          class="card-actions"
        >
          <div
            class="card-actions-item"
            @click="actionsClick( t('share'))"
          >
            <uni-icons
              type="redo"
              size="18"
              color="#999"
            />
            <span class="card-actions-item-text">
              {{ t('share') }}
            </span>
          </div>
          <div
            class="card-actions-item"
            @click="actionsClick( t('star'))"
          >
            <uni-icons
              type="heart"
              size="18"
              color="#999"
            />
            <span class="card-actions-item-text">
              {{ t('star') }}
            </span>
          </div>
          <div
            class="card-actions-item"
            @click="actionsClick( t('comment'))"
          >
            <uni-icons
              type="chatbubble"
              size="18"
              color="#999"
            />
            <span class="card-actions-item-text">
              {{ t('comment') }}
            </span>
          </div>
        </div>
      </press-card>
    </demo-block>

    <demo-block :title="t('customTitle')">
      <press-card
        padding="10px 0"
      >
        <template #title>
          <press-cell
            :title="t('title')"
            clickable
            @click="checked = !checked"
          >
            <press-switch
              slot="right-icon"
              size="22px"
              :checked="checked"
            />
          </press-cell>
        </template>
        <span class="press-body uni-mt-5">
          {{ t('content') }}
        </span>
      </press-card>
    </demo-block>
  </div>
</template>
<script>
import PressCard from 'src/packages/press-card/press-card.vue';
import UniIcons from 'src/pages/components/uni-icons/components/uni-icons/uni-icons.vue';
import PressSwitch from 'src/packages/press-switch/press-switch.vue';

export default {
  i18n: {
    'zh-CN': {
      content: '代码是写出来给人看的，附带能在机器上运行',
      subtitle: '副标题',
      description: '描述',
      noMargin: '没有外边距',
      cover: '封面图',
      customTitle: '自定义标题',
      actionBar: '操作栏',
      share: '分享',
      star: '点赞',
      comment: '评论',
    },
    'en-US': {
      content: 'Content',
      subtitle: 'SubTitle',
      description: 'Description',
      noMargin: 'No Margin',
      cover: 'Cover',
      customTitle: 'Custom Title',
      actionBar: 'Action Bar',
      share: 'Share',
      star: 'Star',
      comment: 'Comment',
    },
  },
  components: {
    PressCard,
    UniIcons,
    PressSwitch,
  },
  data() {
    return {
      cover: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/card-cover.jpeg',
      avatar: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar.png',
      extraIcon: {
        color: '#4cd964',
        size: '22',
        type: 'gear-filled',
      },
      checked: true,
    };
  },
  methods: {
    onClick(e) {
      console.log(e);
    },
    actionsClick(text) {
      uni.showToast({
        title: text,
        icon: 'none',
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
.demo-wrap {
  padding-bottom: 20px;
}

.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px #eee solid;

  .card-actions-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    .card-actions-item-text {
      font-size: 12px;
      color: #666;
      margin-left: 5px;
    }
  }
}
</style>
