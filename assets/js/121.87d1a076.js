(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{598:function(s,a,t){"use strict";t.r(a);var e=t(34),_=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"贡献指南"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#贡献指南"}},[s._v("#")]),s._v(" 贡献指南")]),s._v(" "),a("h2",{attrs:{id:"_1-目录结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-目录结构"}},[s._v("#")]),s._v(" 1. 目录结构")]),s._v(" "),a("p",[s._v("项目结构如下：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("- docs            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 文档地址")]),s._v("\n- plugin          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [demo]工程用到的插件")]),s._v("\n- script          "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 脚本")]),s._v("\n- tests           "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 测试用例")]),s._v("\n- src\n  - common        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [demo]公共内容")]),s._v("\n  - packages      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 对外发布的包内容")]),s._v("\n  - pages         "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [demo]页面内容")]),s._v("\n  - static        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [demo]静态内容")]),s._v("\n  - App.vue       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# [demo]应用入口")]),s._v("\n  - main.js\n  - pages.json\n")])])]),a("p",[s._v("组件库除了组件外，还有文档、示例、工程化配置等部分。为了维护起来方便，将示例、文档、组件都放在一个文件夹里，所以一个标准的组件目录如下：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("- press-button\n  - demo-helper/        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 非必需，组件示例相关数据、方法")]),s._v("\n  - helper/             "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 非必需，业务层处理数据的相关方法，可能引入 t-comm 第三方模块")]),s._v("\n  - demo.vue            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组件示例")]),s._v("\n  - press-button.vue    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组件")]),s._v("\n  - README.md           "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组件中文文档")]),s._v("\n  - README.en-US.md     "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 组件英文文档")]),s._v("\n")])])]),a("p",[a("code",[s._v("src/packages")]),s._v("下就是由这些组件文件夹和一些公共文件构成。")]),s._v(" "),a("p",[s._v("上面的组织结构并不能直接用，还需要把"),a("code",[s._v("README.md")]),s._v("移动到"),a("code",[s._v("docs")]),s._v("中，把"),a("code",[s._v("demo.vue")]),s._v("移动到"),a("code",[s._v("src/pages")]),s._v("中。开发时会监听这些文件变动，发生变动后就把它们拷贝到需要的位置上。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_160511d777e5015f01.gif",width:"700"}})]),s._v(" "),a("h2",{attrs:{id:"_2-开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-开发"}},[s._v("#")]),s._v(" 2. 开发")]),s._v(" "),a("p",[s._v("首先要执行如下命令，进行组件的派发：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run init\n")])])]),a("h3",{attrs:{id:"_2-1-组件开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-组件开发"}},[s._v("#")]),s._v(" 2.1. 组件开发")]),s._v(" "),a("p",[s._v("对于H5、微信小程序、QQ小程序有不同的启动命令：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run dev\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# h5")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run dev:mp-weixin\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 微信小程序")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run dev:mp-qq\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# qq小程序")]),s._v("\n")])])]),a("h3",{attrs:{id:"_2-2-新增组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-新增组件"}},[s._v("#")]),s._v(" 2.2. 新增组件")]),s._v(" "),a("p",[s._v("执行以下命令：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run new:comp\n")])])]),a("p",[s._v("然后交互式的输入组件英文名、中文名等内容即可。")]),s._v(" "),a("h3",{attrs:{id:"_2-3-文档开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-文档开发"}},[s._v("#")]),s._v(" 2.3. 文档开发")]),s._v(" "),a("p",[s._v("文档开发命令：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run docs:dev\n")])])]),a("h3",{attrs:{id:"_2-4-文档、示例部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-文档、示例部署"}},[s._v("#")]),s._v(" 2.4. 文档、示例部署")]),s._v(" "),a("p",[a("code",[s._v("Press UI")]),s._v("接入了CI，代码推送后会自动构建，并部署H5、微信小程序、QQ小程序三端示例及文档。")]),s._v(" "),a("h3",{attrs:{id:"_2-5-辅助方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-辅助方法"}},[s._v("#")]),s._v(" 2.5. 辅助方法")]),s._v(" "),a("p",[s._v("Press UI 内部提供了一些提效工具，包括：")]),s._v(" "),a("ul",[a("li",[s._v("提取 "),a("code",[s._v("props")]),s._v("，可用于文档")]),s._v(" "),a("li",[s._v("提取 "),a("code",[s._v("event")]),s._v("，可用于文档")]),s._v(" "),a("li",[s._v("提取 "),a("code",[s._v("class")]),s._v("，可用于 BEM 改造中的映射表")]),s._v(" "),a("li",[s._v("CSS 单位转化，"),a("code",[s._v("rem")]),s._v(" => "),a("code",[s._v("px")])]),s._v(" "),a("li",[s._v("自动添加、修正组件的 "),a("code",[s._v("name")]),s._v(" 属性")]),s._v(" "),a("li",[s._v("自动添加组件的 "),a("code",[s._v("emits")]),s._v(" 属性，Vue3 需要")]),s._v(" "),a("li",[s._v("活动组件增加隐藏 @TIP_STYLE_NAME 样式")]),s._v(" "),a("li",[s._v("活动组件进行 CSS 替换")])]),s._v(" "),a("p",[s._v("使用方法如下：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提取 props")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# npm run extract:props [componentPath]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run extract:props src/packages/press-act-input-phone-dialog/press-act-input-phone-dialog.vue\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提取 event")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# npm run extract:event [componentPath]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run extract:event src/packages/press-act-input-phone-dialog/press-act-input-phone-dialog.vue\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提取 class")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# npm run extract:class [componentPath]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run extract:class src/packages/press-hor-owner-index/press-hor-owner-index.vue\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# rem 转 px")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# npm run rem:px [componentPath]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run rem:px src/packages/press-message-board/press-message-board-input.vue\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加、修正 name 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run add:name\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 添加 emits 属性")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run add:emits\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 活动组件增加隐藏 TIP_STYLE_NAME 样式")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run act:hide:tip\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 活动组件进行 CSS 替换")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run act:replace:class\n")])])]),a("h2",{attrs:{id:"_3-开发规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-开发规范"}},[s._v("#")]),s._v(" 3. 开发规范")]),s._v(" "),a("h3",{attrs:{id:"_3-1-代码规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-代码规范"}},[s._v("#")]),s._v(" 3.1. 代码规范")]),s._v(" "),a("p",[s._v("需符合公司代码规范。")]),s._v(" "),a("h3",{attrs:{id:"_3-2-提交规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-提交规范"}},[s._v("#")]),s._v(" 3.2. 提交规范")]),s._v(" "),a("p",[s._v("推荐"),a("a",{attrs:{href:"https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular",target:"_blank",rel:"noopener noreferrer"}},[s._v("Angular 规范"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"_3-3-命名规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-命名规范"}},[s._v("#")]),s._v(" 3.3. 命名规范")]),s._v(" "),a("ul",[a("li",[s._v("导出对象、类、组件，用大驼峰命名法，首字母大写")]),s._v(" "),a("li",[s._v("导出方法，用小驼峰命名法，首字母小写，如"),a("code",[s._v("loader")]),s._v("、"),a("code",[s._v("post")]),s._v("、"),a("code",[s._v("appBase")]),s._v("、"),a("code",[s._v("getAreaCode")]),s._v("等")]),s._v(" "),a("li",[s._v("文件名用小写+中划线，比如"),a("code",[s._v("message-dialog")]),s._v("，不能用"),a("code",[s._v("messageDialog")])])]),s._v(" "),a("h3",{attrs:{id:"_3-4-其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-其他"}},[s._v("#")]),s._v(" 3.4. 其他")]),s._v(" "),a("p",[s._v("对外API需简单、易记忆，比如"),a("code",[s._v("change")]),s._v("、"),a("code",[s._v("list")]),s._v("，最好一个单词组成，并且不能简写，与业界流行组件库对齐。")]),s._v(" "),a("p",[s._v("不能在组件内部"),a("code",[s._v("console.log")]),s._v("。")]),s._v(" "),a("p",[s._v("类名需符合"),a("a",{attrs:{href:"https://getbem.com/",target:"_blank",rel:"noopener noreferrer"}},[s._v("BEM"),a("OutboundLink")],1),s._v("规范，并以"),a("code",[s._v("press")]),s._v("为前缀。")]),s._v(" "),a("h2",{attrs:{id:"_4-细节"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-细节"}},[s._v("#")]),s._v(" 4. 细节")]),s._v(" "),a("h3",{attrs:{id:"_4-1-rem单位"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-rem单位"}},[s._v("#")]),s._v(" 4.1. rem单位")]),s._v(" "),a("p",[s._v("目前有的组件使用的单位是"),a("code",[s._v("rem")])]),s._v(" "),a("ul",[a("li",[s._v("优势：h5端适配更好，更合适")]),s._v(" "),a("li",[s._v("劣势：在小程序等其他端需要额外的插件来转换")])]),s._v(" "),a("p",[a("code",[s._v("Press UI")]),s._v("并不强制单位，只要组件内部统一即可。")]),s._v(" "),a("h3",{attrs:{id:"_4-2-准入条件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-准入条件"}},[s._v("#")]),s._v(" 4.2. 准入条件")]),s._v(" "),a("p",[a("code",[s._v("Press UI")]),s._v("内的组件、逻辑需要有一定的通用性或复杂性，比如"),a("code",[s._v("button")]),s._v("、"),a("code",[s._v("input")]),s._v("、"),a("code",[s._v("area")]),s._v("、"),a("code",[s._v("message-detail")]),s._v("等组件通用型强，"),a("code",[s._v("schedule-tree")]),s._v("组件复杂度高。")]),s._v(" "),a("p",[s._v("宁缺毋滥，沉入的组件必须完成 BEM 改造，必须与业务充分解耦。")]),s._v(" "),a("blockquote",[a("p",[s._v("取乎其上，得乎其中，取乎其中，得乎其下，取乎其下，其无所得也。")])]),s._v(" "),a("p",[s._v("一开始就尽量把组件设计好，坚持高标准，避免后面返工。")]),s._v(" "),a("h3",{attrs:{id:"_4-3-javascript-优先"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-javascript-优先"}},[s._v("#")]),s._v(" 4.3. Javascript 优先")]),s._v(" "),a("p",[a("code",[s._v("js")]),s._v("比"),a("code",[s._v("html")]),s._v("灵活，能写在"),a("code",[s._v("js")]),s._v("中的，就不要在组件中判断，灵活意味着通用性强，在跨平台、横竖屏、技术栈迁移时候，"),a("code",[s._v("js")]),s._v("都能够很方便的复用，但是组件就不行。")]),s._v(" "),a("h3",{attrs:{id:"_4-4-项目依赖关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-项目依赖关系"}},[s._v("#")]),s._v(" 4.4. 项目依赖关系")]),s._v(" "),a("p",[s._v("Press UI 底层依赖 "),a("code",[s._v("t-comm")]),s._v("、"),a("code",[s._v("plugin-light")]),s._v(" 等库。")]),s._v(" "),a("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_bbf5d09066a8980616.gif",width:"500"}}),s._v(" "),a("h3",{attrs:{id:"_4-5-适配多平台、多场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-5-适配多平台、多场景"}},[s._v("#")]),s._v(" 4.5. 适配多平台、多场景")]),s._v(" "),a("p",[s._v("Press UI 在兼容 Vue3 项目、非 "),a("code",[s._v("uni-app")]),s._v(" 环境、APP 环境时，采用的实现方式为，新建工程，并将 Press UI 组件库作为子仓库。")]),s._v(" "),a("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_ea7bcae60b32baedd8.gif",width:"500"}}),s._v(" "),a("h3",{attrs:{id:"_4-6-通用-灵活"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-6-通用-灵活"}},[s._v("#")]),s._v(" 4.6. 通用 & 灵活")]),s._v(" "),a("p",[s._v("下图是 H5、小程序、APP语法灵活度的对比。")]),s._v(" "),a("img",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2024/6/own_mike_fa30be46a942e03072.gif",width:"300"}}),s._v(" "),a("p",[s._v("Press UI 在编写跨端代码的时候，采用以下原则：")]),s._v(" "),a("ol",[a("li",[s._v("对齐短板，抹平差异，提供通用API")]),s._v(" "),a("li",[s._v("特殊场景下，条件编译，保持灵活性")])]),s._v(" "),a("p",[s._v("这里举一些 H5 环境下渐进式增强的例子：")]),s._v(" "),a("ol",[a("li",[s._v("函数式调用组件的时候，可以动态创建 Dom，无需预埋组件")]),s._v(" "),a("li",[a("code",[s._v("popover-plus")]),s._v(" 点击空白处会收起，即 "),a("code",[s._v("clickOutSide")])]),s._v(" "),a("li",[a("code",[s._v("list")]),s._v(" 支持自动检测外层 "),a("code",[s._v("scroller")]),s._v("，即支持任意父级的滚动")])])])}),[],!1,null,null,null);a.default=_.exports}}]);