/**
 * @description 静态资源迁移配置：把历史公共桶上的资源搬到自有 CDN
 *
 * 迁移原则：**key 保持不变**，只换域名。
 *   迁移前 https://image-1251917893.file.myqcloud.com/Esports/new/user/large-btn-bg-r.png
 *   迁移后 https://cdn.uwayfly.com/Esports/new/user/large-btn-bg-r.png
 * 这样源码里只需要做域名字符串替换，不用逐个改路径。
 */
const path = require('path');


/** 源站域名（腾讯云公共桶，历史遗留，非自有资产） */
const SOURCE_HOST = 'https://image-1251917893.file.myqcloud.com';

/** 目标域名（自有 CDN，回源 COS 桶 mike-1255355338 / ap-guangzhou） */
const TARGET_HOST = 'https://cdn.uwayfly.com';

/** 仓库根目录 */
const ROOT = path.resolve(__dirname, '../..');

/**
 * 需要迁移的资源 key 列表（= 源站 URL 去掉域名后的路径，不含 query / hash）
 *
 * 两类特殊 key 说明：
 * 1. `Esports/user/img/page-loading.gif` / `btn-loading.gif`
 *    press-loading-plus 里是模板字符串 `${loadingScenes}-loading.gif` 拼出来的，
 *    loadingScenes 取值只有 page / btn（见组件 props 注释），所以这里手动列全两个。
 *    纯靠 grep 抓 URL 会漏掉它们。
 * 2. `igame/npm/vconsole@3.15.1/vconsole.min.js`
 *    源站 URL 里 @ 是被 encode 成 %40 的，但 COS 上的对象 key 是未编码的 @，
 *    所以这里写解码后的形式，上传后 %40 的旧链接同样能命中。
 */
const RESOURCE_KEYS = [
  // ---- 横屏赛程相关图 ----
  'Esports/hor/empty.png',
  'Esports/hor/sche/popover-bg.png',
  'Esports/hor/sche/red-dot.png',
  'Esports/hor/sche/tab-act.png',

  // ---- iconfont 字体（press-icon-plus / iconfont-mp）----
  'Esports/iconfont/iconfont.eot',
  'Esports/iconfont/iconfont.svg',
  'Esports/iconfont/iconfont.ttf',
  'Esports/iconfont/iconfont.woff',

  // ---- 电竞风格按钮 / 弹窗 / 评分图 ----
  'Esports/new/user/agent-btn-bg-l.png',
  'Esports/new/user/agent-btn-bg-r.png',
  'Esports/new/user/btn-bg-r.png',
  'Esports/new/user/fullpage-light-bg.png',
  'Esports/new/user/large-btn-bg-l.png',
  'Esports/new/user/large-btn-bg-r.png',
  'Esports/new/user/popup-line.png',
  'Esports/new/user/sel-star.png',
  'Esports/new/user/select-new.png',
  'Esports/new/user/selected-new.png',
  'Esports/new/user/star.png',
  'Esports/new/user/union.png',

  // ---- loading / 弹窗操作图标 ----
  'Esports/user/img/back-arrow.png',
  'Esports/user/img/btn-loading.gif',
  'Esports/user/img/page-loading.gif',
  'Esports/user/img/close-handle.png',
  'Esports/user/img/close-popup.png',

  // ---- DINCondensedBold 数字字体（reset-h5）----
  'TIP_GameSystem_2020/toC/v2.0/font/DINCondensedBold.eot',
  'TIP_GameSystem_2020/toC/v2.0/font/DINCondensedBold.svg',
  'TIP_GameSystem_2020/toC/v2.0/font/DINCondensedBold.ttf',
  'TIP_GameSystem_2020/toC/v2.0/font/DINCondensedBold.woff',

  // ---- zzgf 字体（font-peace）----
  'tip-project/apex/font/zzgf.eot',
  'tip-project/apex/font/zzgf.ttf',

  // ---- post-message 注入的 js / css ----
  'igame/common/js/adapter.js',
  'igame/component/style-reset/reset.css',
  '2022/a20220408wwkhActivity/css/comm.css',

  // ---- t-comm 内置 vConsole（源码无引用，构建产物会加载，一并备份一份）----
  'igame/npm/vconsole@3.15.1/vconsole.min.js',
];

/**
 * 扩展名 -> Content-Type
 *
 * 必须显式传给 COS：不传时 COS 存成 application/octet-stream，
 * 浏览器对 css/js 会因 nosniff 拒绝执行，对字体会直接加载失败。
 * 这里的取值与源站 HEAD 返回的 Content-Type 逐个对齐过。
 */
const CONTENT_TYPE_MAP = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

/**
 * 替换阶段要跳过的路径（相对仓库根目录，支持目录前缀）
 *
 * 1. script/migrate-cdn
 *    迁移脚本自身就存着源站域名常量，不排除会被自己替换掉（SOURCE_HOST 变成 TARGET_HOST），
 *    脚本直接失效且不可重跑。
 * 2. script/deploy/build-igame.js
 *    里面的地址是 iGame 构建产物的 h5 publicPath，
 *    指向「构建产物要被发布到哪个桶」，不是本项目引用的静态资源。
 *    改它等于把发布目标也换掉，属于部署侧决策，不在本次迁移范围内。
 */
const REPLACE_EXCLUDE = [
  'script/migrate-cdn',
  'script/deploy/build-igame.js',
];

/** 遍历源码时跳过的目录 */
const WALK_IGNORE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'unpackage',
  '.cache',
  '.vscode',
];

/** 参与替换的文本文件扩展名（避免读到二进制） */
const TEXT_EXTENSIONS = [
  '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue',
  '.scss', '.css', '.less',
  '.json', '.md', '.html', '.txt', '.snap',
  '.yml', '.yaml',
];


module.exports = {
  SOURCE_HOST,
  TARGET_HOST,
  ROOT,
  RESOURCE_KEYS,
  CONTENT_TYPE_MAP,
  REPLACE_EXCLUDE,
  WALK_IGNORE_DIRS,
  TEXT_EXTENSIONS,
};
