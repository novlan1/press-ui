# 贡献指南

## 1. 目录结构

项目结构如下：

```bash
- docs            # 文档地址
- plugin          # [demo]工程用到的插件
- script          # 脚本
- tests           # 测试用例
- src
  - common        # [demo]公共内容
  - packages      # 对外发布的包内容
  - pages         # [demo]页面内容
  - static        # [demo]静态内容
  - App.vue       # [demo]应用入口
  - main.js
  - pages.json
```

组件库除了组件外，还有文档、示例、工程化配置等部分。为了维护起来方便，将示例、文档、组件都放在一个文件夹里，所以一个标准的组件目录如下：

```bash
- press-button
  - demo-helper/        # 非必需，组件示例相关数据、方法
  - helper/             # 非必需，业务层处理数据的相关方法，可能引入 t-comm 第三方模块
  - demo.vue            # 组件示例
  - press-button.vue    # 组件
  - README.md           # 组件中文文档
  - README.en-US.md     # 组件英文文档
```

`src/packages`下就是由这些组件文件夹和一些公共文件构成。

上面的组织结构并不能直接用，还需要把`README.md`移动到`docs`中，把`demo.vue`移动到`src/pages`中。开发时会监听这些文件变动，发生变动后就把它们拷贝到需要的位置上。

<img 
  src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_2de0d5cb1567b66aa7.png" width="700"
/>

## 2. 开发


首先要执行如下命令，进行组件的派发：

```bash
npm run init
```

### 2.1. 组件开发

对于H5、微信小程序、QQ小程序有不同的启动命令：

```bash
npm run dev
# h5

npm run dev:mp-weixin
# 微信小程序

npm run dev:mp-qq
# qq小程序
```

### 2.2. 新增组件

执行以下命令：

```bash
npm run new:comp
```

然后交互式的输入组件英文名、中文名等内容即可。



### 2.3. 文档开发

文档开发命令：

```bash
npm run docs:dev
```

### 2.4. 文档、示例部署

`Press UI`接入了CI，代码推送后会自动构建，并部署H5、微信小程序、QQ小程序三端示例及文档。


### 2.5. 辅助方法

Press UI 内部提供了一些提效工具，包括：

- 提取 `props`，可用于文档
- 提取 `event`，可用于文档
- 提取 `class`，可用于 BEM 改造中的映射表
- CSS 单位转化，`rem` => `px`
- 自动添加、修正组件的 `name` 属性
- 自动添加组件的 `emits` 属性，Vue3 需要
- 活动组件增加隐藏 @TIP_STYLE_NAME 样式
- 活动组件进行 CSS 替换

使用方法如下：

```bash
# 提取 props
# npm run extract:props [componentPath]
npm run extract:props src/packages/press-act-input-phone-dialog/press-act-input-phone-dialog.vue

# 提取 event
# npm run extract:event [componentPath]
npm run extract:event src/packages/press-act-input-phone-dialog/press-act-input-phone-dialog.vue

# 提取 class
# npm run extract:class [componentPath]
npm run extract:class src/packages/press-hor-owner-index/press-hor-owner-index.vue

# rem 转 px
# npm run rem:px [componentPath]
npm run rem:px src/packages/press-message-board/press-message-board-input.vue

# 添加、修正 name 属性
npm run add:name

# 添加 emits 属性
npm run add:emits

# 活动组件增加隐藏 TIP_STYLE_NAME 样式
npm run act:hide:tip

# 活动组件进行 CSS 替换
npm run act:replace:class
```

## 3. 开发规范

### 3.1. 代码规范

需符合公司代码规范。

### 3.2. 提交规范

推荐[Angular 规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)


### 3.3. 命名规范

- 导出对象、类、组件，用大驼峰命名法，首字母大写
- 导出方法，用小驼峰命名法，首字母小写，如`loader`、`post`、`appBase`、`getAreaCode`等
- 文件名用小写+中划线，比如`message-dialog`，不能用`messageDialog`

### 3.4. 其他

对外API需简单、易记忆，比如`change`、`list`，最好一个单词组成，并且不能简写，与业界流行组件库对齐。

不能在组件内部`console.log`。

类名需符合[BEM](https://getbem.com/)规范，并以`press`为前缀。

## 4. 细节

### 4.1. rem单位

目前有的组件使用的单位是`rem`

- 优势：h5端适配更好，更合适
- 劣势：在小程序等其他端需要额外的插件来转换

`Press UI`并不强制单位，只要组件内部统一即可。

### 4.2. 准入条件

`Press UI`内的组件、逻辑需要有一定的通用性或复杂性，比如`button`、`input`、`area`、`message-detail`等组件通用型强，`schedule-tree`组件复杂度高。

宁缺毋滥，沉入的组件必须完成 BEM 改造，必须与业务充分解耦。

>取乎其上，得乎其中，取乎其中，得乎其下，取乎其下，其无所得也。

一开始就尽量把组件设计好，坚持高标准，避免后面返工。

### 4.3. Javascript 优先

`js`比`html`灵活，能写在`js`中的，就不要在组件中判断，灵活意味着通用性强，在跨平台、横竖屏、技术栈迁移时候，`js`都能够很方便的复用，但是组件就不行。

### 4.4. 项目依赖关系

Press UI 底层依赖 `t-comm`、`uni-plugin-light` 等库。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/11/own_mike_531f563c0322f19dc1.png" width="500" />


### 4.5. 适配多平台、多场景

Press UI 在兼容 Vue3 项目、非 `uni-app` 环境、APP 环境时，采用的实现方式为，新建工程，并将 Press UI 组件库作为子仓库。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_889e9d727ea8d8b63e.png" width="500" />

### 4.6. 通用 & 灵活

下图是 H5、小程序、APP语法灵活度的对比。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_76f35297c8da15ecea.png" width="300" />

Press UI 在编写跨端代码的时候，采用以下原则：

1. 对齐短板，抹平差异，提供通用API
2. 特殊场景下，条件编译，保持灵活性

这里举一些 H5 环境下渐进式增强的例子：

1. 函数式调用组件的时候，可以动态创建 Dom，无需预埋组件
2. Popover Plus 点击空白处会收起，即 clickOutSide
3. List 支持自动检测外层 scroller，即支持任意父级的滚动
