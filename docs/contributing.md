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
  - demo.vue            # 组件示例
  - press-button.vue    # 组件
  - README.md           # 组件中文文档
  - README.en-US.md     # 组件英文文档
```

`src/packages`下就是由这些组件文件夹和一些公共文件构成。

上面的组织结构并不能直接用，还需要把`README.md`移动到`docs`中，把`demo.vue`移动到`src/pages`中。开发时会监听这些文件变动，发生变动后就把它们拷贝到需要的位置上。


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

`press-ui`接入了CI，代码推送后会自动构建，并部署H5、微信小程序、QQ小程序三端示例及文档。


## 3. 开发规范

### 3.1. 代码规范

需符合公司代码规范。

### 3.2. 提交规范

推荐[Angular 规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)


### 3.3. 命名规范

- 组件`props`、`event`应该简单，易记忆，与业界流行组件库对齐
- 类名需符合[BEM](https://getbem.com/)规范，可参考这篇[文章](https://juejin.cn/post/7102980936232337445/)
- 导出对象、类、组件，用大驼峰命名法，首字母大写
- 导出方法，用小驼峰命名法，首字母小写，如`loader`、`post`、`appBase`、`getAreaCode`等;
- 文件名用小写+中划线，比如`message-dialog`，不能用`messageDialog`；

## 4. 细节

### 4.1. rem单位

目前有的组件使用的单位是`rem`

- 优势：h5端适配更好，更合适
- 劣势：在小程序等其他端需要额外的插件来转换

`press-ui`并不强制单位，只要组件内部统一即可。

### 4.2. 准入条件

`press-ui`内的组件、逻辑需要有一定的通用性或复杂性，比如`button`、`input`、`area`、`message-detail`等组件通用型强，`schedule-tree`组件复杂度高。


### 4.3. 与业务隔离

首先，并不是从业务中沉淀的就一定是业务组件，业务组件的含义一般是通用性差，但可以解决特定场景问题，变化形式不多，灵活性差，参数没有基础组件多。

`press-ui`的组件、逻辑都应该减少与业务的耦合，保持稳定。基础组件很容易做到，也很容易判断是否耦合，对于业务中沉淀下来的，如何做到呢？

- 不能存在业务状态码，多重判断逻辑应该前置完成
- 关注点分离，关注组件自身，而非业务
- 最少知识原则，只传入必要的参数
  
举个例子，赛程树组件中点击轮次Tab的事件，不能命名为`jumpToSetPage`，需改为与业务无关的`clickRoundTab`，因为跳转轮次设置页面是业务设定，并不一定稳定，有可能过几天需求就改了，而点击Tab事件却是实实在在的，永久的。

另外，赛程树的文案不能由是业务状态驱动，而应该UI驱动。下面是改之前的代码，与业务过度耦合，业务如果增加比赛状态，必然会改动组件。

```html
<!-- 预览状态 -->
<div
  v-if="isPreview"
  class="tip-match-current-pk-tip"
>
  <!-- 编号 -->
  <p
    v-if="battleDetail.bracketIdDesc"
    class="tip-match-num"
  >
    {{ battleDetail.bracketIdDesc }}
  </p>
  <p>&nbsp;</p>
  <p v-if="isAdmin">
    {{ isSchEnd ? '已结束' : startBattleTypeDesc }}
  </p>
</div>

<!-- 已结束 -->
<div
  v-else-if="isSchEnd"
  class="tip-match-current-pk-tip"
>
  <p
    v-if="battleDetail.bracketIdDesc"
    class="tip-match-num"
  >
    {{ battleDetail.bracketIdDesc }}
  </p>
  <p>{{ battleEndTime }}</p>
  <p>
    已结束
  </p>
</div>

<!-- 未开始 -->
<div
  v-else-if="isScheNotStart"
  class="tip-match-current-pk-tip"
>
  <p
    v-if="battleDetail.bracketIdDesc"
    class="tip-match-num"
  >
    {{ battleDetail.bracketIdDesc }}
  </p>
  <p>
    {{ readyInfoDesc }}
  </p>
</div>

<!-- 比赛中 -->
<div
  v-else-if="isSchPlaying"
  class="tip-match-current-pk-tip"
>
  <p
    v-if="battleDetail.bracketIdDesc"
    class="tip-match-num"
  >
    {{ battleDetail.bracketIdDesc }}
  </p>
  <p>当前{{ battleDetail.curBo }}/{{ battleDetail.boType }}局</p>
  <p class="tip-match-match-status">
    比赛中
  </p>
  <div
    class="tip-match-match-zhibo-icon iconfont icon-live"
    @click.stop="onWatchBattle"
  />
  <div
    v-if="battleDetail.isWeChatLiving"
    class="iconfont icon-video-number"
  />
</div>
```

可以改成业务无关的UI状态，在JS中前置判断业务状态码，得出UI状态。核心就是什么位置显示什么样式的什么内容：

- 是否显示带背景的文案，`bracketIdDesc`
- 是否显示不带背景的标签，`timeDesc`
- 是否显示另一个不带背景的标签，及它是否可以文字高亮，`statusDesc`、`isStatusHighList`
- 是否展示直播图标，`showLiveIcon`
- 是否展示视频号图标，`showChannelsIcon`


```html
 <div
  class="press-schedule-team-tips"
>
  <p
    v-if="scheGroupInfo.bracketIdDesc"
    class="press-schedule-team-tip press-schedule-team-tip--bg"
  >
    {{ scheGroupInfo.bracketIdDesc }}
  </p>
  <p
    v-if="scheGroupInfo.timeDesc"
    class="press-schedule-team-tip"
  >
    {{ scheGroupInfo.timeDesc }}
  </p>
  <p
    v-if="scheGroupInfo.statusDesc"
    class="press-schedule-team-tip"
    :class="{
      'press-schedule-team-tip--light': scheGroupInfo.isStatusHighList
    }"
  >
    {{ scheGroupInfo.statusDesc }}
  </p>
  <div
    v-if="scheGroupInfo.showLiveIcon"
    class="press-schedule-team-tip-icon press-schedule-team-tip-icon--green iconfont icon-live"
    @click.stop="onWatchBattle"
  />
  <div
    v-if="scheGroupInfo.showChannelsIcon"
    class="press-schedule-team-tip-icon iconfont icon-video-number"
  />
</div>
```

上面的改动并不是最佳的，还可以继续优化。比如，直播图标和视频号图标，可以由参数传入，以此支持更多图标类型。命名可以更脱离业务，不命名为`timeDesc`、`statusDesc`。

`js`比`html`灵活，能写在`js`中的，就不要在组件中判断，灵活意味着通用性强，在跨平台、横竖屏、技术栈迁移时候，`js`都能够很方便的复用，但是组件就不行。

