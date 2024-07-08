---
url : pages/press/uploader/uploader
---

## Uploader 文件上传


## 引入

```ts
import PressUploader from 'press-ui/press-uploader/press-uploader';

export default {
  components: {
    PressUploader,
  }
}
```

## 代码演示

### 基础用法

通过 `fileList`参数（对象数组），显示预置的图片。其中元素的`url`属性为图片路径。

```html
 <PressUploader
  :file-list="fileList1"
  name="1"
  multiple
  :max-count="10"
  @afterRead="afterRead"
  @delete="deletePic"
/>
```

```ts
export default {
  data() {
    return {
      fileList1: [],
    }
  },
  methods:{
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen += 1
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'https://xxxx/upload',
          filePath: url,
          name: 'file',
          formData: {
            user: 'test'
          },
          success: (res) => {
            setTimeout(() => {
              resolve(res.data.data)
            }, 1000)
          }
        });
      })
    },
  }
}
```

### 上传视频

设置`accept`为`video`，即为上传视频。

```html
<PressUploader
  :file-list="fileList2"
  name="2"
  multiple
  :max-count="10"
  accept="video"
  @afterRead="afterRead"
  @delete="deletePic"
/>
```

### 上传状态

通过 `status` 属性可以标识上传状态，`uploading` 表示上传中，`failed` 表示上传失败，done 表示上传完成。

```html
<PressUploader
  :file-list="fileListStatus"
  name="2"
  multiple
  :max-count="10"
  accept="video"
  @afterRead="afterRead"
  @delete="deletePic"
/>
```

```ts
export default {
  data() {
    return {
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
    }
  }
}
```


### 文件预览

设置 `previewFullImage` 为 `true`，即可预览文件。

```html
<PressUploader
  :file-list="fileList3"
  name="3"
  multiple
  :max-count="10"
  :preview-full-image="true"
  @afterRead="afterRead"
  @delete="deletePic"
/>
```

### 限制上传数量

通过 `maxCount` 限制上传数量，并隐藏上传按钮。

```html
<PressUploader
  :file-list="fileList4"
  name="4"
  multiple
  :max-count="2"
  @afterRead="afterRead"
  @delete="deletePic"
/>
```


### 限制上传大小

通过 `max-size` 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 `oversize` 事件获取。


```html
<PressUploader multiple :max-size="500 * 1024" @oversize="onOversize" />
```

```ts
export default {
  methods: {
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
  },
};
```

### 自定义上传样式

通过默认插槽，可以自定义上传样式。

```html
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
```

### 上传前置处理

通过传入 `beforeRead` 函数可以在上传前进行校验和处理，返回 `true` 表示校验通过，返回 `false` 表示校验失败。支持返回 `Promise` 对 `file` 对象进行自定义处理，例如压缩图片。

```html
<PressUploader :before-read="beforeRead" />
```

```ts
export default {
  methods: {
    // 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
    },
  },
};
```

### 禁用文件上传

通过 `disabled` 属性禁用文件上传。

```html
<PressUploader disabled />
```


## API

### Props

| 参数               | 说明                                                                                       | 类型              | 默认值                       |
| ------------------ | ------------------------------------------------------------------------------------------ | ----------------- | ---------------------------- |
| accept             | 接受的文件类型, 可选值为 `all`, `media`, `image`, `file`, `video`                          | _string_          | `image`                      |
| capture            | 图片或视频拾取模式，当`accept`为`image`时设置`capture`，可选额外`camera`可以直接调起摄像头 | _string \| array_ | `['album', 'camera']`        |
| compressed         | 当`accept`为`video`时生效，是否压缩视频                                                    | _boolean_         | `true`                       |
| camera             | 当`accept`为`video`时生效，可选值为`back`, `front`                                         | _string_          | `back`                       |
| max-duration       | 当`accept`为`video`时生效，拍摄视频最长拍摄时间，单位`s`                                   | _number_          | `60`                         |
| upload-icon        | 上传区域的图标，只能内置图标                                                               | _string_          | `photograph`                 |
| upload-icon-color  | 上传区域的图标的颜色                                                                       | _string_          | `#d3d4d6`                    |
| preview-full-image | 是否显示组件自带的图片预览功能                                                             | _boolean_         | `true`                       |
| max-count          | 最大上传数量                                                                               | _number_          | `52`                         |
| disabled           | 是否禁用用                                                                                 | _string_          | `image`                      |
| image-mode         | 预览上传的图片时的裁剪模式，和`image`组件`mode`属性一致                                    | _string_          | `aspectFill`                 |
| name               | 标识符，可以在回调函数的第二项参数中获取                                                   | _string_          | `file`                       |
| size-type          | 所选的图片的尺寸, 可选值为 `original`, `compressed`                                        | _array_           | `['original', 'compressed']` |
| multiple           | 是否开启图片多选，部分安卓机型不支持                                                       | _boolean_         | `false`                      |
| deletable          | 是否展示删除按钮                                                                           | _boolean_         | `true`                       |
| max-size           | 文件大小限制，单位为`byte`                                                                 | _number_          | `Number.MAX_VALUE`           |
| file-list          | 显示已上传的文件列表                                                                       | _array_           | -                            |
| upload-text        | 上传区域的提示文字                                                                         | _string_          | -                            |
| width              | 内部预览图片区域和选择图片按钮的区域宽度                                                   | _number_          | `80`                         |
| height             | 内部预览图片区域和选择图片按钮的区域高度                                                   | _number_          | `80`                         |
| preview-image      | 是否在上传完成后展示预览图                                                                 | _boolean_         | `true`                       |
| use-before-read    | 是否开启文件读取前事件                                                                     | _boolean_         | `false`                      |
| before-read        | 读取前的处理函数                                                                           | _function_        | -                            |
| after-read         | 读取后的处理函数                                                                           | _function_        | -                            |
| custom-style       | 自定义样式                                                                                 | _string_          | -                            |

### Methods

| 事件名     | 说明             |
| ---------- | ---------------- |
| afterRead  | 读取后的处理函数 |
| beforeRead | 读取前的处理函数 |


### Events

| 事件名       | 说明                     | 参数                  |
| ------------ | ------------------------ | --------------------- |
| afterRead    | 读取后的处理函数         | `{file, lists, name}` |
| beforeRead   | 读取前的处理函数         | `{file, lists, name}` |
| oversize     | 图片大小超出最大允许大小 | `{file, lists, name}` |
| clickPreview | 全屏预览图片时触发       | `{url, lists, name}`  |
| delete       | 删除图片                 | `{file，index, name}` |
| error        | 选择文件出错             | `error`               |

### Slot

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义上传样式 |

## 在线调试

<debug-online />

## 常见问题

### H5 上传

uni-app 在 H5 端，实现了 `chooseImage`、`chooseVideo` 等方法，核心是动态创建 `input` 标签，监听其 `change` 事件，并主动触发其点击事件。

Press UI 在非 uni-app 环境也按照这个方法实现了一遍，从而兼容普通 Vue 项目。

### 文件对象

一个文件对象的属性包括：

- lastModified
- lastModifiedDate
- name
- size
- type
- webkitRelativePath (in chrome)

