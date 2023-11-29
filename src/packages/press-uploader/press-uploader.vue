<template>
  <div
    class="press-upload"
    :style="customStyle"
  >
    <div class="press-upload__wrap">
      <template v-if="previewImage">
        <div
          v-for="(item, index) in lists"
          :key="index"
          class="press-upload__wrap__preview"
        >
          <image
            v-if="item.isImage || (item.type && item.type === 'image')"
            :src="item.thumb || item.url"
            :mode="imageMode"
            class="press-upload__wrap__preview__image"
            :style="[{
              width: addUnit(width),
              height: addUnit(height)
            }]"
            @click="onPreviewImage(item)"
          />
          <div
            v-else
            class="press-upload__wrap__preview__other"
          >
            <PressIconPlus
              color="#80CBF9"
              size="26"
              :name="item.isVideo || (item.type && item.type === 'video') ? 'movie' : 'folder'"
            />
            <span class="press-upload__wrap__preview__other__text">
              {{ item.isVideo || (item.type && item.type === 'video') ? '视频' : '文件' }}
            </span>
          </div>
          <div
            v-if="item.status === 'uploading' || item.status === 'failed'"
            class="press-upload__status"
          >
            <div class="press-upload__status__icon">
              <PressIconPlus
                v-if="item.status === 'failed'"
                name="close"
                color="#ffffff"
                size="22"
              />
              <PressLoadingPlus
                v-else
                size="22"
                mode="circle"
                color="#ffffff"
              />
            </div>
            <span
              v-if="item.message"
              class="press-upload__status__message"
            >
              {{ item.message }}
            </span>
          </div>
          <div
            v-if="item.status !== 'uploading' && (deletable || item.deletable)"
            class="press-upload__deletable"
            @click.stop="deleteItem(index)"
          >
            <!-- <div class="press-upload__deletable__icon"> -->
            <PressIconPlus
              name="cross"
              color="#ffffff"
              size="16"
              custom-class="press-upload__deletable__icon"
            />
            <!-- </div> -->
          </div>
          <div
            v-if="item.status === 'success' && false"
            class="press-upload__success"
          >
            <!-- #ifdef APP-NVUE -->
            <image
              :src="successIcon"
              class="press-upload__success__icon"
            />
            <!-- #endif -->
            <!-- #ifndef APP-NVUE -->
            <div class="press-upload__success__icon">
              <PressIconPlus
                name="passed"
                color="#ffffff"
                size="12"
              />
            </div>
            <!-- #endif -->
          </div>
        </div>
      </template>

      <template v-if="isInCount">
        <div
          v-if="$slots.default || $slots.$default"
          @click="chooseFile"
        >
          <slot />
        </div>
        <div
          v-else
          class="press-upload__button"
          :hover-class="!disabled ? 'press-upload__button--hover' : ''"
          hover-stay-time="150"
          :class="[disabled && 'press-upload__button--disabled']"
          :style="[{
            width: addUnit(width),
            height: addUnit(height)
          }]"
          @click="chooseFile"
        >
          <PressIconPlus
            :name="uploadIcon"
            size="26"
            :color="uploadIconColor"
          />
          <span
            v-if="uploadText"
            class="press-upload__button__text"
          >
            {{ uploadText }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { chooseFile } from './utils';
import mixin from './mixin';
import props from './computed';
import { addUnit } from '../common/utils/add-unit';
import PressIconPlus from '../press-icon-plus/press-icon-plus';
import PressLoadingPlus from '../press-loading-plus/press-loading-plus.vue';
import * as test from './test';


export default {
  name: 'PressUploader',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressLoadingPlus,
  },
  mixins: [mixin, props],
  emits: [
    'afterRead',
    'error',
    'oversize',
  ],
  data() {
    return {
      // #ifdef APP-NVUE
      successIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAACP0lEQVRYCc3YXygsURwH8K/dpcWyG3LF5u/6/+dKVylSypuUl6uUPMifKMWL8oKEB1EUT1KeUPdR3uTNUsSLxb2udG/cbvInNuvf2rVnazZ/ZndmZ87snjM1Z+Z3zpzfp9+Z5mEAhlvjRtZgCKs+gnPAOcAkkMOR4jEHfItjDvgRxxSQD8cM0BuOCaAvXNCBQrigAsXgggYUiwsK0B9cwIH+4gIKlIILGFAqLiBAOTjFgXJxigJp4BQD0sIpAqSJow6kjSNAFTnRaHJwLenD6Mud52VQAcrBfTd2oyq+HtGaGGWAcnAVcXWoM3bCZrdi+ncPfaAcXE5UKVpdW/vitGPqqAtn98d0gXJwX7Qp6MmegUYVhvmTIezdmHlxJCjpHRTCFerLkRRu4k0aqdajN3sWOo0BK//msHa+xDuPC/oNFMKRhTtM4xjIX0SCNpXL4+7VIaHuyiWEp2L7ahWLf8fejfPdqPmC3mJicORZUp1CQzm+GiphvljGk+PBvWRbxii+xVTj5M6CiZ/tsDufvaXyxEUDxeLIyvu3m0iOyEFWVAkydcVYdyFrE9tQk9iMq6f/GNlvwt3LjQfh60LUrw9/cFyyMJUW/XkLSNMV4Mi6C5ML+ui4x5ClAX9sB9w0wV6wglJwJCv5fOxcr6EstgbGiEw4XcfUry4cWrcEUW8n+ARKxXEJHhw2WG43UKSvwI/TSZgvl7kh0b3XLZaLEy0QmMgLZAVH7J+ALOE+AVnDvQOyiPMAWcW5gSzjCPAV+78S5WE0GrQAAAAASUVORK5CYII=',
      // #endif
      lists: [],
      isInCount: true,
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      immediate: true,
      handler() {
        this.formatFileList();
      },
    },
  },
  methods: {
    addUnit,
    formatFileList() {
      const {
        fileList = [], maxCount,
      } = this;
      const lists = fileList.map(item => Object.assign(Object.assign({}, item), {
        // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
        isImage: this.accept === 'image' || test.image(item.url || item.thumb),
        isVideo: this.accept === 'video' || test.video(item.url || item.thumb),
        deletable: typeof(item.deletable) === 'boolean' ? item.deletable : this.deletable,
      }));
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile() {
      const {
        maxCount,
        multiple,
        lists,
        disabled,
      } = this;
      if (disabled) return;
      // 如果用户传入的是字符串，需要格式化成数组
      let capture;
      try {
        capture = Array.isArray(this.capture) ? this.capture : this.capture.split(',');
      } catch (e) {
        capture = [];
      }
      chooseFile(Object.assign({
        accept: this.accept,
        multiple: this.multiple,
        capture,
        compressed: this.compressed,
        maxDuration: this.maxDuration,
        sizeType: this.sizeType,
        camera: this.camera,
      }, {
        maxCount: maxCount - lists.length,
      }))
        .then((res) => {
          this.onBeforeRead(multiple ? res : res[0]);
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead,
      } = this;
      let res = true;
      // beforeRead是否为一个方法
      if (test.func(beforeRead)) {
        // 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            'beforeRead',
            Object.assign(
              Object.assign({
                file,
              }, this.getDetail()),
              {
                callback: (ok) => {
                  ok ? resolve() : reject();
                },
              },
            ),
          );
        });
      }
      if (!res) {
        return;
      }
      if (test.promise(res)) {
        res.then(data => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index,
      };
    },
    onAfterRead(file) {
      const {
        maxSize,
        afterRead,
      } = this;
      const oversize = Array.isArray(file)
        ? file.some(item => item.size > maxSize)
        : file.size > maxSize;
      if (oversize) {
        this.$emit('oversize', Object.assign({
          file,
        }, this.getDetail()));
        return;
      }
      if (typeof afterRead === 'function') {
        afterRead(file, this.getDetail());
      }
      this.$emit('afterRead', Object.assign({
        file,
      }, this.getDetail()));
    },
    deleteItem(index) {
      this.$emit(
        'delete',
        Object.assign(Object.assign({}, this.getDetail(index)), {
          file: this.fileList[index],
        }),
      );
    },
    // 预览图片
    onPreviewImage(item) {
      if (!item.isImage || !this.previewFullImage) return;
      uni.previewImage({
        // 先filter找出为图片的item，再返回filter结果中的图片url
        urls: this.lists.filter(item => this.accept === 'image' || test.image(item.url || item.thumb)).map(item => item.url || item.thumb),
        current: item.url || item.thumb,
        fail() {
          // uni.$u.toast('预览图片失败');
        },
      });
    },
    onPreviewVideo(event) {
      if (!this.data.previewFullImage) return;
      const {
        index,
      } = event.currentTarget.dataset;
      const {
        lists,
      } = this.data;
      wx.previewMedia({
        sources: lists
          // .filter(item => test.video(item))
          .map(item => Object.assign(Object.assign({}, item), {
            type: 'video',
          })),
        current: index,
        fail() {
          // uni.$u.toast('预览视频失败');
        },
      });
    },
    onClickPreview(event) {
      const {
        index,
      } = event.currentTarget.dataset;
      const item = this.data.lists[index];
      this.$emit(
        'clickPreview',
        Object.assign(Object.assign({}, item), this.getDetail(index)),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
$press-upload-preview-border-radius: 2px !default;
$press-upload-preview-margin: 0 8px 8px 0 !default;
$press-upload-image-width: 80px !default;
$press-upload-image-height: $press-upload-image-width;
$press-upload-other-bgColor: rgb(242, 242, 242) !default;
$press-upload-other-flex: 1 !default;
$press-upload-text-font-size: 11px !default;
$press-upload-text-color: #909193 !default;
$press-upload-text-margin-top: 2px !default;
$press-upload-deletable-right: 0 !default;
$press-upload-deletable-top: 0 !default;
$press-upload-deletable-bgColor: rgb(55, 55, 55) !default;
$press-upload-deletable-height: 14px !default;
$press-upload-deletable-width: $press-upload-deletable-height;
$press-upload-deletable-boder-bottom-left-radius: 100px !default;
$press-upload-deletable-zIndex: 3 !default;
$press-upload-success-bottom: 0 !default;
$press-upload-success-right: 0 !default;
$press-upload-success-border-style: solid !default;
$press-upload-success-border-top-color: transparent !default;
$press-upload-success-border-left-color: transparent !default;
$press-upload-success-border-bottom-color: #5ac725 !default;
$press-upload-success-border-right-color: $press-upload-success-border-bottom-color;
$press-upload-success-border-width: 9px !default;
$press-upload-icon-top: 0px !default;
$press-upload-icon-right: 0px !default;
$press-upload-icon-h5-top: 1px !default;
$press-upload-icon-h5-right: 0 !default;
$press-upload-icon-width: 16px !default;
$press-upload-icon-height: $press-upload-icon-width;
$press-upload-success-icon-bottom: -10px !default;
$press-upload-success-icon-right: -10px !default;
$press-upload-status-right: 0 !default;
$press-upload-status-left: 0 !default;
$press-upload-status-bottom: 0 !default;
$press-upload-status-top: 0 !default;
$press-upload-status-bgColor: rgba(0, 0, 0, 0.5) !default;
$press-upload-status-icon-Zindex: 1 !default;
$press-upload-message-font-size: 12px !default;
$press-upload-message-color: #ffffff !default;
$press-upload-message-margin-top: 5px !default;
$press-upload-button-width: 80px !default;
$press-upload-button-height: $press-upload-button-width;
$press-upload-button-bgColor: rgb(244, 245, 247) !default;
$press-upload-button-border-radius: 2px !default;
$press-upload-botton-margin: 0 8px 8px 0 !default;
$press-upload-text-font-size: 11px !default;
$press-upload-text-color: #909193 !default;
$press-upload-text-margin-top: 2px !default;
$press-upload-hover-bgColor: rgb(230, 231, 233) !default;
$press-upload-disabled-opacity: 0.5 !default;

.press-upload {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__wrap {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    &__preview {
      border-radius: $press-upload-preview-border-radius;
      margin: $press-upload-preview-margin;
      position: relative;
      overflow: hidden;
      display: flex;

      &__image {
        width: $press-upload-image-width;
        height: $press-upload-image-height;
      }

      &__other {
        width: $press-upload-image-width;
        height: $press-upload-image-height;
        background-color: $press-upload-other-bgColor;
        flex: $press-upload-other-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__text {
          font-size: $press-upload-text-font-size;
          color: $press-upload-text-color;
          margin-top: $press-upload-text-margin-top;
        }
      }
    }
  }

  &__deletable {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    // top: $press-upload-deletable-top;
    // right: $press-upload-deletable-right;
    background-color: $press-upload-deletable-bgColor;
    // height: $press-upload-deletable-height;
    // width: $press-upload-deletable-width;
    display: flex;
    border-bottom-left-radius: $press-upload-deletable-boder-bottom-left-radius;
    align-items: center;
    justify-content: center;
    z-index: $press-upload-deletable-zIndex;

    ::v-deep .press-upload__deletable__icon,
    &__icon {
      position: absolute;
      transform: scale(0.5);
      top: -2px;
      right: -2px;
      font-size: 16px;
      // top: $press-upload-icon-top;
      // right: $press-upload-icon-right;
      /* #ifdef H5 */
      // top: $press-upload-icon-h5-top;
      // right: $press-upload-icon-h5-right;
      /* #endif */
    }
  }

  &__success {
    position: absolute;
    bottom: $press-upload-success-bottom;
    right: $press-upload-success-right;
    display: flex;
    // 由于weex(nvue)为阿里巴巴的KPI(部门业绩考核)的laji产物，不支持css绘制三角形
    // 所以在nvue下使用图片，非nvue下使用css实现
    /* #ifndef APP-NVUE */
    border-style: $press-upload-success-border-style;
    border-top-color: $press-upload-success-border-top-color;
    border-left-color: $press-upload-success-border-left-color;
    border-bottom-color: $press-upload-success-border-bottom-color;
    border-right-color: $press-upload-success-border-right-color;
    border-width: $press-upload-success-border-width;
    align-items: center;
    justify-content: center;
    /* #endif */

    &__icon {
      /* #ifndef APP-NVUE */
      position: absolute;
      transform: scale(0.7);
      bottom: $press-upload-success-icon-bottom;
      right: $press-upload-success-icon-right;
      /* #endif */
      /* #ifdef APP-NVUE */
      width: $press-upload-icon-width;
      height: $press-upload-icon-height;
      /* #endif */
    }
  }

  &__status {
    position: absolute;
    top: $press-upload-status-top;
    bottom: $press-upload-status-bottom;
    left: $press-upload-status-left;
    right: $press-upload-status-right;
    background-color: $press-upload-status-bgColor;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__icon {
      position: relative;
      z-index: $press-upload-status-icon-Zindex;
    }

    &__message {
      font-size: $press-upload-message-font-size;
      color: $press-upload-message-color;
      margin-top: $press-upload-message-margin-top;
    }
  }

  &__button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: $press-upload-button-width;
    height: $press-upload-button-height;
    background-color: $press-upload-button-bgColor;
    border-radius: $press-upload-button-border-radius;
    margin: $press-upload-botton-margin;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */

    &__text {
      font-size: $press-upload-text-font-size;
      color: $press-upload-text-color;
      margin-top: $press-upload-text-margin-top;
    }

    &--hover {
      background-color: $press-upload-hover-bgColor;
    }

    &--disabled {
      opacity: $press-upload-disabled-opacity;
    }
  }
}
</style>
