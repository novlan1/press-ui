<template>
  <div
    class="press-message-list"
    :class="customClass"
  >
    <div v-if="list.length">
      <press-swipe-cell
        v-for="(item, index) in list"
        :key="index"
        :right-width="100"
        @open="onOpenCell(item)"
        @click="onClickDetail(item, index)"
        @close="onCloseCell"
      >
        <div
          class="press-message-item"
        >
          <div class="press-message-item__img-wrap">
            <img
              v-if="useLazy"
              v-lazy="item.avatar"
              class="press-message-item__img"
            >
            <img
              v-else
              class="press-message-item__img"
              :src="item.avatar"
            >

            <div
              v-if="item.unreadCount"
              class="press-message-unread-wrap"
            >
              <div class="press-message-unread-wrap__num">
                {{ item.unreadCount > 99 ? '99' : item.unreadCount }}
              </div>
            </div>
          </div>

          <div class="press-message-item__box">
            <div class="press-message-item__box__title press-message-item__box__title--ellipsis">
              {{ item.nick }}
            </div>
            <div class="press-message-item__box__content press-message-item__box__content--ellipsis">
              {{ item.content }}
            </div>
          </div>

          <div class="press-message-item__box__right">
            {{ item.time }}
          </div>
        </div>

        <template #right>
          <div
            class="press-message-item__right"
            @click.stop="e=>onDelete(item, e)"
          >
            {{ isConfirmDelete ? '确认删除' : '删除' }}
          </div>
        </template>
      </press-swipe-cell>
    </div>

    <PressLoading
      v-else-if="loading"
    />

    <div
      v-else
      class="press-message-list__empty"
    >
      <PressEmpty
        type="e-sport"
        :html-empty-content="'暂无消息'"
      />
    </div>
  </div>
</template>
<script>
import PressLoading from '../press-loading/press-loading.vue';
import PressEmpty from '../press-empty/press-empty.vue';
import PressSwipeCell from '../press-swipe-cell/press-swipe-cell.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressLoading,
    PressEmpty,
    PressSwipeCell,
  },
  props: {
    useLazy: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    ...defaultProps,
  },
  data() {
    return {
      isConfirmDelete: false,
      curOpenid: null,
    };
  },
  methods: {
    onClearAll() {
      this.$emit('clearAll');
    },
    onClickDetail(item, index) {
      this.$emit('onClickDetail', this.list[index]);
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
      if (this.curOpenid !== item.id) {
        this.isConfirmDelete = false;
      }
      this.curOpenid = item.id;
    },
    onCloseCell() {
      this.isConfirmDelete = false;
    },
  },
};

</script>
<style lang="scss" scoped src="./index.scss"></style>
