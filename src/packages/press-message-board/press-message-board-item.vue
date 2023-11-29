<template>
  <div
    class="press-message-board-item"
    :class="customClass"
    :style="customStyle"
  >
    <!-- 玩家留言 -->
    <div
      v-if="item.msg_type ===1"
      class="press-message-board-item__normal-comment"
    >
      <div class="press-message-board-item__user">
        <!-- <img class="press-message-board-avatar" v-lazy="item.head"> -->
        <p class="press-message-board-item__nick">
          {{ item.nick }}
        </p>
      </div>

      <div class="press-message-board-item__comment-content">
        <template v-if="colon">
          ：
        </template>
        {{ item.content_info }}
      </div>

      <slot name="right-up-corner" />

      <div class="press-message-board-item__info">
        <div class="press-message-board-item__comment-time">
          {{ item.create_time }}
        </div>
        <p
          class="press-message-board-item__reply-btn"
          @click.stop="replyClick(item)"
        >
          {{ replyContent }}
        </p>
      </div>

      <!-- 回复内容 -->
      <div
        v-if="item.comm_list && item.comm_list.length > 0"
        class="press-message-board-item-reply"
      >
        <div
          v-for="(comment, index2) in item.comm_list"
          :key="index2"
          class="press-message-board-item__reply-item"
          @click.stop="replyClick(comment)"
        >
          <div
            class="press-message-board-item__reply-wrap"
          >
            <div
              v-if="captainUid && comment.uid === captainUid && !captionBadgeAtRight"
              class="press-message-board-item__reply-avatar"
            >
              队长
            </div>

            <!-- A回复B: -->
            <div
              v-if="comment.parent_comm_id"
              class="press-message-board-item__reply-nick"
            >
              {{ comment.nick }}
              <div
                v-if="captainUid && comment.uid === captainUid && captionBadgeAtRight"
                class="press-message-board-item__reply-avatar"
              />
              <p
                class="press-message-board-item__reply-word"
              >
                {{ replyContent }}
              <!-- <template v-if="replyColon">
                ：
              </template> -->
              </p>
              {{ comment.parent_nick }}
            </div>

            <!-- 没有回复关键字，即 A: -->
            <div
              v-else
              class="press-message-board-item__reply-nick"
            >
              {{ comment.nick }}
            </div>
            <div
              v-if="captainUid && comment.uid === captainUid && captionBadgeAtRight"
              class="press-message-board-item__reply-avatar"
            >
              队长
            </div>
          </div>
          <!-- <div
            v-if="captainUid && comment.uid === captainUid && captionBadgeAtRight"
            class="press-message-board-item__reply-avatar"
          /> -->
          <p
            class="press-message-board-item__reply-content"
          >
            <template v-if="replyColon">
              ：
            </template>
            {{ comment.content_info }}
          </p>
        </div>

        <!-- 回复条数大于2时折叠,点击展开 -->
        <!-- <div class="press-message-board-item__fold">
                更多
              </div> -->
      </div>
      <div :id="item.msg_id" />
    </div>
    <!-- 欢迎 xx 加入战队/进入房间 -->
    <div
      v-else
      class="press-message-board-item__system-comment"
    >
      <slot name="system-comment-left" />
      <p
        class="press-message-board-item__comment-content"
      >
        {{ item.content_info }}
      </p>
      <div class="press-message-board-item__comment-time">
        {{ item.create_time }}
      </div>
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { t } from '../locale';

export default {
  name: 'PressMessageBoardItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    captainUid: {
      type: String,
      default: '',
    },
    captionBadgeAtRight: {
      type: Boolean,
      default: false,
    },
    colon: {
      type: Boolean,
      default: true,
    },
    replyColon: {
      type: Boolean,
      default: true,
    },
    customStyle: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: ['replyClick'],
  data() {
    return {
    };
  },
  computed: {
    replyContent() {
      return t('reply');
    },
  },
  mounted() {

  },
  methods: {
    replyClick(...args) {
      this.$emit('replyClick', ...args);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/smoba/layout.scss";
@import "../common/style/smoba/mixin.scss";

.press-message-board-item {
  // &__list-item {
  position: relative;

  &:last-child {
    border: none;
  }
  // }

  &__system-comment::after,
  &__normal-comment::after {
    @include halfBottomBorder($color-gray-7);
  }

  // 加入提示
  &__system-comment {
    // height: 1.72rem;
    line-height: 0.4rem;
    font-size: $font-xm;
    padding: 0.16rem 0 0.18rem;
    // border-top: .02rem solid $color-gray-3 ;

    .press-message-board-item__comment-time {
      font-size: $font-s;
      line-height: 0.4rem;
      margin-top: 0.08rem;
    }

    .press-message-board-item__comment-content {
      color: $color-primary;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-top: 0.08rem;

    .press-message-board-item__comment-time {
      font-size: $font-s;
    }

    .press-message-board-item__reply-btn {
      height: 0.4rem;
      color: $color-gray-5;
      font-size: $font-s;
      line-height: 0.4rem;
      text-align: right;
    }
  }

  &__user {
    display: flex;
    display: inline;
    align-items: center;
    justify-content: space-between;

    .press-message-board-item__avatar {
      display: none;
      height: 0.64rem;
      width: 0.64rem;
      border-radius: 50%;
      border: 0.02rem solid $color-gray-3;
      margin-right: 0.16rem;
    }

    .press-message-board-item__nick {
      display: inline;
      line-height: 0.44rem;
      // color: $color-black;
      color: $color-gray;
      font-size: $font-xm;
      // font-weight: bold;
      @include single-line-ellipsis;
    }
  }

  &__comment-time {
    color: $color-gray;
    line-height: 0.44rem;
    font-size: $font-xm;
  }

  // 玩家评论
  &__normal-comment {
    font-size: $font-l;
    color: $color-gray-5;
    padding: 0.24rem 0;
    // border-top: .02rem solid $color-gray-3;
    overflow-x: hidden;

    .press-message-board-item__comment-content {
      display: inline;
      font-size: $font-xm;
      // padding-top: .24rem;
      // padding-left: .8rem;
      color: $color-gray-5;
      line-height: 0.44rem;
    }

    .press-message-board-item-reply {
      // margin-left: .8rem;
      margin-top: 0.08rem;
      padding: 0.12rem 0.16rem 0.12rem;
      background-color: $color-gray-7;
      border-radius: 0.08rem;
      font-size: $font-s;
      overflow: hidden;

      .press-message-board-item__reply-item {
        // margin-bottom: .12rem;

        .press-message-board-item__reply-content {
          display: inline;
          width: 100%;
          vertical-align: middle;
          line-height: 0.44rem;
        }
      }

      .press-message-board-item__reply-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .press-message-board-item__reply-avatar {
        position: relative;
        top: 0.02rem;
        // display: inline-block;
        height: 0.28rem;
        // line-height: 0.28rem;
        font-size: 0.2rem;
        color: $color-white;
        padding: 0 0.08rem;
        border-radius: 0.08rem 0 0.08rem 0;
        background-image: linear-gradient(135deg, #ffa51f 0%, #ffd857 100%);
      }

      .press-message-board-item__reply-nick {
        color: $color-gray;
        // display: inline;
        // line-height: 0.44rem;
        // vertical-align: middle;

        .press-message-board-item__reply-word {
          display: inline;
          // width: 100%;
          // vertical-align: middle;
          // line-height: 0.44rem;
          color: $color-black;
        }
      }
    }

    .press-message-board-item__fold {
      height: 0.4rem;
      // margin-bottom: .12rem;
      // color: $color-primary;
      color: $color-gray;
      font-size: $font-s;
      line-height: 0.4rem;
      text-align: left;
      display: flex;
      align-items: center;

      .icon-back {
        color: $color-gray;
        font-size: $font-xs;
        transform: rotate(-90deg);
        margin-left: 0.1rem;
      }
    }

    .press-message-board-item__unfold {
      width: 2rem;
      height: 0.4rem;
      // margin-bottom: .12rem;
      // color: $color-primary;
      color: $color-gray;
      font-size: $font-s;
      line-height: 0.44rem;
      text-align: left;
      display: flex;
      align-items: center;

      .icon-back {
        color: $color-gray;
        font-size: $font-xs;
        transform: rotate(90deg);
        margin-left: 0.1rem;
      }
    }
  }
}
</style>
