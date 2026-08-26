# 贡献指南
<!-- 复制到 docs 时，去掉 [TOC] 即可 -->

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
  - press-button.vue    # 组件
  - README.md           # 组件中文文档
  - README.en-US.md     # 组件英文文档
  - demo.vue            # 组件示例
```

`src/packages` 下就是由这些组件文件夹和一些公共文件构成。

上面的组织结构并不能直接用，还需要把 `README.md` 移动到 `docs` 中，把 `demo.vue` 移动到 `src/pages` 中。开发时会监听这些文件变动，发生变动后就把它们拷贝到需要的位置上。

<img 
  src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press/img/inner-architecture.png" width="700"
/>

> 根目录的 `README.md` 与 `CONTRIBUTING.md` 是唯一数据源，`docs/README.md` 与 `docs/contributing.md` 由 `npm run docs:sync` 自动生成，请勿直接编辑后者。

## 2. 开发

首先要执行如下命令，进行组件的派发：

```bash
npm run init
```

### 2.1. 组件开发

对于 H5、微信小程序、QQ 小程序有不同的启动命令：

```bash
# H5，建议 node 20 下运行
npm run dev

# 微信小程序，建议 node 16 下运行
npm run dev:mp-weixin

# QQ 小程序，建议 node 16 下运行
npm run dev:mp-qq
```

### 2.2. 新增组件

执行以下命令，然后交互式输入组件英文名、中文名等内容即可：

```bash
npm run new:comp
```

### 2.3. 文档开发

```bash
npm run docs:dev
```

### 2.4. 文档、示例部署

`Press UI` 接入了 CI，代码推送后会自动构建，并部署 H5、微信小程序、QQ 小程序三端示例及文档。

## 3. 发版

发版拆成三步，因为 npm 账号开启了 2FA（两步验证）后，`npm publish` 需要一次性验证码（OTP），而它在 `standard-version` 钩子里是以子进程执行的，无法交互式输入。

```bash
# Step 1：升版本号 + 生成 CHANGELOG + 生成产物 + 本地 commit 打 tag（不发布）
pnpm release:step1

# Step 2：手动带 OTP 发布到 npm，OTP 为验证器 App 里的 6 位动态码
pnpm release:step2 -- 123456

# Step 3：推送 commit 与 tag + 发送企业微信通知
pnpm release:step3
```

各步骤的产物与作用：

| 步骤 | 命令 | 作用 | 需要 OTP |
| :- | :- | :- | :- |
| Step 1 | `pnpm release:step1` | 升版本号、生成 `CHANGELOG.md`、生成纯净产物到 `log/press-ui/components`、`git commit` 并打 tag | 否 |
| Step 2 | `pnpm release:step2 -- <OTP>` | 在产物目录执行 `npm publish` | **是** |
| Step 3 | `pnpm release:step3` | `git push` 分支与 tag、发送版本通知 | 否 |

其他版本类型：

```bash
pnpm release:step1:minor   # 次版本号，如 5.0.29 -> 5.1.0
pnpm release:step1:beta    # 预发布版本，如 5.0.29 -> 5.0.30-beta.0
```

预发布版本在 Step 2 会自动带上 `--tag beta`，不会污染 `latest`。

### 3.1. 免 OTP 发布

若不想每次手动输入验证码，可在 [npmjs 官网](https://www.npmjs.com/settings/~/tokens) 生成 **Automation** 类型的 Access Token（该类型可绕过 2FA），写入 `~/.npmrc`：

```bash
//registry.npmjs.org/:_authToken=<your-automation-token>
```

此时 Step 2 无需传 OTP，一步到位的 `pnpm release` 也能正常工作。

### 3.2. 常见问题

**报错 `404 Not Found - PUT https://registry.npmjs.org/press-ui`**

不是包不存在，而是登录态失效。npm 对无发布权限的 `PUT` 请求会返回 404 而非 401，以避免泄露私有包是否存在。用 `npm whoami` 确认，若报 `E401` 则重新登录：

```bash
npm login   # 项目根目录的 .npmrc 已把 registry 指向 npmjs，无需额外传参
npm whoami  # 应输出你的用户名
```

> 注意：不要用 `sudo` 执行发版命令。`sudo` 会把 `HOME` 切到 `/var/root`，导致读不到 `~/.npmrc` 里的登录凭证。

**报错 `EOTP This operation requires a one-time password`**

Step 2 没带 OTP，或验证码已过期（有效期约 30 秒）。重新看验证器再执行一次 Step 2 即可，无需重跑 Step 1。

## 4. 开发规范

### 4.1. 代码与提交

- 代码需符合公司代码规范，提交前请执行 `npm run lint:fix` 与 `npm run lint:css:fix`
- 提交信息推荐 [Angular 规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)，因为 `CHANGELOG.md` 由 `standard-version` 依据提交类型自动生成

### 4.2. 命名规范

- 对象、类、组件：大驼峰，首字母大写
- 变量、方法：小驼峰，首字母小写，如 `loader`、`post`、`appBase`、`getAreaCode`
- 文件名：小写 + 中划线，如 `message-dialog`，不能用 `messageDialog`
- 类名：符合 [BEM](https://getbem.com/) 规范，并以 `press` 为前缀

### 4.3. 其他

对外 API 需简单、易记忆，比如 `change`、`list`，最好由一个单词组成，不能简写，与业界流行组件库对齐。

不能在组件内部 `console.log`。

## 5. 细节

### 5.1. rem单位

目前有的组件使用的单位是`rem`

- 优势：h5端适配更好，更合适
- 劣势：在小程序等其他端需要额外的插件来转换

`Press UI`并不强制单位，只要组件内部统一即可。

### 5.2. 准入条件

`Press UI`内的组件、逻辑需要有一定的通用性或复杂性，比如`button`、`input`、`area`、`message-detail`等组件通用型强，`schedule-tree`组件复杂度高。

宁缺毋滥，沉入的组件必须完成 BEM 改造，必须与业务充分解耦。

>取乎其上，得乎其中，取乎其中，得乎其下，取乎其下，其无所得也。

一开始就尽量把组件设计好，坚持高标准，避免后面返工。

### 5.3. 脚本优先

`js/ts`比`html`灵活，能写在`js/ts`中的，就不要在组件中判断，灵活意味着通用性强，在跨平台、横竖屏、技术栈迁移时候，`js/ts`都能够很方便的复用，但是组件就不行。

### 5.4. 项目依赖关系

Press UI 底层依赖 `t-comm`、`plugin-light` 等库。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_bbf5d09066a8980616.gif" width="500" />

### 5.5. 适配多平台、多场景

Press UI 在兼容 Vue3 项目、非 `uni-app` 环境、APP 环境时，采用的实现方式为，新建工程，并将 Press UI 组件库作为子仓库。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_ea7bcae60b32baedd8.gif" width="500" />

### 5.6. 通用 & 灵活

下图是 H5、小程序、APP语法灵活度的对比。

<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_fa30be46a942e03072.gif" width="300" />

Press UI 在编写跨端代码的时候，采用以下原则：

1. 对齐短板，抹平差异，提供通用API
2. 特殊场景下，条件编译，保持灵活性

这里举一些 H5 环境下渐进式增强的例子：

1. 函数式调用组件的时候，可以动态创建 Dom，无需预埋组件
2. `popover-plus` 点击空白处会收起，即 `clickOutSide`
3. `list` 支持自动检测外层 `scroller`，即支持任意父级的滚动

### 5.7. i18n 实现

有几个核心函数：

- `setLang`，设置语言，包括初次设置和切换语言。如果携带了额外的语言包，则会调用 `local.use` 或者 `local.add` 进行注入
- `initDemoI18n`，示例工程混入。包括 `onReady` 时，根据当前组件名称设置 `navigationBarTitle`，以及提供 `t` 方法，`t` 方法会优先从 `this.$options.i18n` 中取词汇表，否则调用 `locale/index` 中的 `t` 方法
- `getLocale`，获取当前语言。如果是 `iframe` 内，则从 `location.href` 中获取，否则从 `storage` 中获取
- `toggleI18n`，切换语言。会先通过 `storage` 注入新的语言标识。H5下会执行 `location.reload`，非 H5 下，会调用 `setLang` 和 `uni.reLaunch`

`App.vue` 中会执行 `setLang`，进行示例工程所有语言包的注入，并进行缓存。切换语言时，也会调用 `setLang` 无需传入语言包。
