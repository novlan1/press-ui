---
url: pages/press/uploader/uploader
---

## Uploader 


## Introduction

```ts
import PressUploader from 'press-ui/press-uploader/press-uploader.vue';

export default {
   components: {
     PressUploader,
   }
}
```

## Code Demo

### Basic usage

Display the preset pictures through the `fileList` parameter (object array). The `url` attribute of the element is the image path.

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
     //delete image
     deletePic(event) {
       this[`fileList${event.name}`].splice(event.index, 1)
     },
     //Add image
     async afterRead(event) {
       // When multiple is set to true, file is in array format, otherwise it is in object format
       let lists = [].concat(event.file)
       let fileListLen = this[`fileList${event.name}`].length
       lists.map((item) => {
         this[`fileList${event.name}`].push({
           ...item,
           status: 'uploading',
           message: 'Uploading'
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

### Upload video

Set `accept` to `video` to upload the video.

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

### Upload status

The upload status can be identified through the `status` attribute. `uploading` means uploading, `failed` means the upload failed, and done means the upload is completed.

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
           message: 'Uploading...',
         },
         {
           url: IMG_URL,
           status: 'failed',
           message: 'Upload failed',
         },
       ],
     }
   }
}
```


### File preview

Set `previewFullImage` to `true` to preview the file.

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

### Limit the number of uploads

Limit the number of uploads via `maxCount` and hide the upload button.

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

### Custom upload style

Through the default slot, the upload style can be customized.

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

## API

### Props

| Parameters         | Description                                                                                                                                   | Type              | Default value                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------------------- |
| accept             | Accepted file types, optional values ​​are `all`, `media`, `image`, `file`, `video`                                                           | _string_          | `image`                      |
| capture            | Image or video capture mode, set `capture` when `accept` is `image`, optional additional `camera` can be used to directly activate the camera | _string \| array_ | `['album', 'camera'] `       |
| compressed         | Valid when `accept` is `video`, whether to compress the video                                                                                 | _boolean_         | `true`                       |
| camera             | Valid when `accept` is `video`, optional values ​​are `back`, `front`                                                                         | _string_          | `back`                       |
| max-duration       | Effective when `accept` is `video`, the maximum shooting time for video recording, unit `s`                                                   | _number_          | `60`                         |
| upload-icon        | The icon of the upload area, only built-in icons                                                                                              | _string_          | `photograph`                 |
| upload-icon-color  | The color of the upload area icon                                                                                                             | _string_          | `#d3d4d6`                    |
| preview-full-image | Whether to display the image preview function that comes with the component                                                                   | _boolean_         | `true`                       |
| max-count          | Maximum number of uploads                                                                                                                     | _number_          | `52`                         |
| disabled           | Whether to disable                                                                                                                            | _string_          | `image`                      |
| image-mode         | Cropping mode when previewing uploaded images, consistent with the `mode` attribute of the `image` component                                  | _string_          | `aspectFill`                 |
| name               | Identifier, which can be obtained in the second parameter of the callback function                                                            | _string_          | `file`                       |
| size-type          | The size of the selected image, the optional values are `original`, `compressed`                                                              | _array_           | `['original', 'compressed']` |
| multiple           | Whether to enable image multiple selection, some Android models do not support it                                                             | _boolean_         | `false`                      |
| deletable          | Whether to display the delete button                                                                                                          | _boolean_         | `true`                       |
| max-size           | File size limit in `byte`                                                                                                                     | _number_          | `Number.MAX_VALUE`           |
| file-list          | Display the uploaded file list                                                                                                                | _array_           | -                            |
| upload-text        | Prompt text for upload area                                                                                                                   | _string_          | -                            |
| width              | The width of the internal preview image area and the image selection button                                                                   | _number_          | `80`                         |
| height             | The height of the internal preview image area and the image selection button                                                                  | _number_          | `80`                         |
| preview-image      | Whether to display the preview image after uploading                                                                                          | _boolean_         | `true`                       |
| use-before-read    | Whether to enable the event before file reading                                                                                               | _boolean_         | `false`                      |
| before-read        | Processing function before reading                                                                                                            | _function_        | -                            |
| after-read         | Processing function after reading                                                                                                             | _function_        | -                            |
| custom-style       | custom style                                                                                                                                  | _string_          | -                            |

### Methods

| Event name | Description                        |
| ---------- | ---------------------------------- |
| afterRead  | Processing function after reading  |
| beforeRead | Processing function before reading |


### Events

| Event name   | Description                                        | Parameters                         |
| ------------ | -------------------------------------------------- | ---------------------------------- |
| afterRead    | Processing function after reading                  | (file, lists, name), error message |
| beforeRead   | Processing function before reading                 | (file, lists, name), error message |
| oversize     | The image size exceeds the maximum allowed size    | (file, lists, name), error message |
| clickPreview | Triggered when previewing the image in full screen | (url, lists, name)                 |
| delete       | Delete pictures                                    | index, file, name                  |

### Slot

| Name    | Description         |
| ------- | ------------------- |
| default | Custom upload style |
