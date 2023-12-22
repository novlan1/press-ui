<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressUploader
        :file-list="fileList1"
        name="1"
        multiple
        :max-count="10"
        @afterRead="afterRead"
        @delete="deletePic"
      />
    </demo-block>

    <demo-block :title="t('uploadVideo')">
      <PressUploader
        :file-list="fileList2"
        name="2"
        multiple
        :max-count="10"
        accept="video"
        @afterRead="afterRead"
        @delete="deletePic"
      />
    </demo-block>

    <demo-block :title="t('uploadStatus')">
      <PressUploader
        :file-list="fileListStatus"
        name="Status"
        multiple
        :max-count="10"
        accept="video"
        @afterRead="afterRead"
        @delete="deletePic"
      />
    </demo-block>

    <demo-block :title="t('preview')">
      <PressUploader
        :file-list="fileList3"
        name="3"
        multiple
        :max-count="10"
        :preview-full-image="true"
        @afterRead="afterRead"
        @delete="deletePic"
      />
    </demo-block>

    <demo-block :title="t('maxCount')">
      <PressUploader
        :file-list="fileList4"
        name="4"
        multiple
        :max-count="2"
        @afterRead="afterRead"
        @delete="deletePic"
      />
    </demo-block>

    <demo-block :title="t('maxSize')">
      <PressUploader
        :file-list="fileListMaxSize"
        name="MaxSize"
        multiple
        :max-size="500 * 1024"
        @afterRead="afterRead"
        @oversize="onOversize"
      />
    </demo-block>

    <demo-block :title="t('customStyle')">
      <PressUploader
        :file-list="fileList6"
        name="6"
        multiple
        :max-count="1"
        width="250"
        height="150"
        @afterRead="afterRead"
        @delete="deletePic"
      >
        <image
          src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_799718017ac81b11c0.png"
          mode="widthFix"
          style="width: 250px;height: 150px;"
        />
      </PressUploader>
    </demo-block>

    <demo-block :title="t('beforeRead')">
      <PressUploader :before-read="beforeRead" />
    </demo-block>

    <demo-block :title="t('disabled')">
      <PressUploader disabled />
    </demo-block>
  </div>
</template>
<script>
import PressUploader from 'src/packages/press-uploader/press-uploader.vue';
const IMG_URL = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_a17f94292a34e9f644.jpeg';

let that;
export default {
  i18n: {
    'zh-CN': {
      uploadVideo: '上传视频',
      uploadStatus: '上传状态',
      preview: '文件预览',
      maxCount: '限制上传数量',
      maxSize: '限制上传大小',
      customStyle: '自定义上传样式',
      beforeRead: '上传前置处理',
    },
    'en-US': {
      uploadVideo: 'Upload Video',
      uploadStatus: 'Upload Status',
      preview: 'Preview',
      maxCount: 'Max Count',
      maxSize: 'Max Size',
      customStyle: 'Custom Style',
      beforeRead: 'Before Read',
    },
  },
  components: {
    PressUploader,
  },
  data() {
    return {
      fileList1: [],
      fileListMaxSize: [],
      fileList2: [],
      fileList3: [{
        url: IMG_URL,
      }],
      fileList4: [{
        url: IMG_URL,
      },
      {
        url: IMG_URL,
      }],
      fileList6: [],
      fileListStatus: [
        {
          url: IMG_URL,
          status: 'uploading',
          message: '上传中...',
        },
        {
          url: IMG_URL,
          status: 'failed',
          message: '上传失败',
        },
      ],
    };
  },
  mounted() {
    that = this;
  },
  methods: {
    // 删除图片
    deletePic(event) {
      console.log('[deletePic] event', event);
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      console.log('[afterRead] event', event);
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      const lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        });
      });

      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        const item = this[`fileList${event.name}`][fileListLen];

        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          // status: result.status, // 'success',
          message: '',
          // url: result.url,
          ...result,
        }));

        fileListLen += 1;
      }
    },
    uploadFilePromise(url) {
      console.log('[uploadFilePromise] url', url);
      return new Promise((resolve) => {
        setTimeout(() => resolve({
          url,
          status: 'success',
          // status: 'failed',
          message: '上传失败',
        }), 1000);
      });
      // return new Promise((resolve, reject) => {
      //   const a = uni.uploadFile({
      //     url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
      //     filePath: url,
      //     name: 'file',
      //     formData: {
      //       user: 'test',
      //     },
      //     success: (res) => {
      //       setTimeout(() => {
      //         resolve(res.data.data);
      //       }, 1000);
      //     },
      //   });
      // });
    },
    onOversize(file) {
      console.log('[onOversize] file', file);
      that.onGTip('文件大小不能超过 500kb');
    },
    beforeRead(file) {
      console.log('[beforeRead] file', file);
      if (file.type !== 'image/jpeg') {
        that.onGTip('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      console.log('[asyncBeforeRead] file', file);
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          that.onGTip('请上传 jpg 格式图片');
          reject();
        } else {
          const img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
</style>
