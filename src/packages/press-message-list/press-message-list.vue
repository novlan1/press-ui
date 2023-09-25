<template>
  <scroll-view
    class="press-message-list"
    scroll-with-animation
    :scroll-y="true"
  >
    <div
      v-for="(item) in computedList"
      :key="item.uniqueKey"
      @click.stop="onClickDetail(item)"
    >
      <press-swipe-cell
        :right-width="100"
        @open="onOpenCell(item)"
        @close="onCloseCell"
      >
        <div
          class="press-message-item"
          @click.stop="onClickDetail(item)"
        >
          <div class="press-message-item__avatar-wrap">
            <img
              :src="item.avatar"
              class="press-message-item__avatar"
            >
            <div
              v-if="item.showRedDot"
              class="press-message-item__red-dot"
            />
            <div
              v-else-if="item.unreadCount"
              class="press-message-item__unread-icon"
            >
              <div class="press-message-item__unread-count">
                {{ item.unreadCount > 99 ? '99' : item.unreadCount }}
              </div>
            </div>
          </div>
          <div class="press-message-item__box">
            <div class="press-message-item__nick">
              {{ item.nick }}
            </div>
            <div
              v-if="item.content"
              class="press-message-item__content"
            >
              {{ item.content }}
              <!-- {{ item.content.indexOf('TipBusinessCard') > -1 ? '【名片信息】'
                : item.content.replace('\\n', '').replace('\n', '') }} -->
            </div>
          </div>
          <div class="press-message-item__time">
            {{ item.time }}
          </div>
        </div>
        <template #right>
          <div
            class="press-message-item__delete"
            @click.stop="e=>onDelete(item, e)"
          >
            {{ isConfirmDelete ? '确认删除' : '删除' }}
          </div>
        </template>
      </press-swipe-cell>
    </div>
  </scroll-view>
</template>
<script>
import PressSwipeCell from '../press-swipe-cell/press-swipe-cell.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  name: 'PressMessageList',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressSwipeCell,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    ...defaultProps,
  },
  emits: ['onClickDetail', 'onDelete'],
  data() {
    return {
      isConfirmDelete: false,
      curOpenid: null,
    };
  },
  computed: {
    computedList() {
      return this.list.map(item => ({
        uniqueKey: `unique-key-${item.uniqueKey || ''}-${item.id}`,
        ...item,
      }));
    },
  },
  methods: {
    onClickDetail(item) {
      this.$emit('onClickDetail', item);
    },
    onDelete(item, event) {
      if (typeof event?.stopPropagation === 'function') {
        event.stopPropagation();
      }

      if (this.isConfirmDelete) {
        this.$emit('onDelete', item, () => {
          this.isConfirmDelete = false;
        });
      } else {
        this.isConfirmDelete = true;
      }
    },
    onOpenCell(item) {
      if (this.curOpenid !== item.uniqueKey) {
        this.isConfirmDelete = false;
      }
      this.curOpenid = item.uniqueKey;
    },
    onCloseCell() {
      this.isConfirmDelete = false;
    },
  },
};

</script>
<style lang="scss" scoped src="./index.scss"></style>
