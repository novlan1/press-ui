(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-tab-tab"],{"0245":function(t,e,a){var n=a("a8d8");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-77518512]{height:100%;overflow:auto}',""]),t.exports=e},"2e27":function(t,e,a){"use strict";a.r(e);var n=a("ef85"),s=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a},"3e50":function(t,e,a){var n=a("a8d8");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.demo-wrap[data-v-77518512]{height:auto}.demo-wrap .content[data-v-77518512]{padding:20px}',""]),t.exports=e},"437c":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"demo-wrap"},[a("demo-block",{attrs:{title:t.t("basicUsage"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{active:t.active},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChange.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("matchByName"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{active:t.activeName}},t._l(t.tabsWithName,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1),name:e.name}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title6"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{sticky:!0}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title2"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.onScroll.apply(void 0,arguments)}}},t._l(t.tabs7,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title3"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{on:{disabled:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickDisabled.apply(void 0,arguments)}}},t._l(t.tabsDisabled,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1),dot:e.dot,disabled:!!e.disabled}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title4"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{type:"card"}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title5"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},t._l(t.tabs2,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title8"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{animated:!0}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("title9"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{swipeable:!0}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:t.t("lazyTab"),"header-style":"background: #f7f8fa;"}},[a("press-tabs",{attrs:{swipeable:!0}},[t.showLazyTab?a("press-tab",{key:"tabA",attrs:{"sort-index":0,title:t.t("tab")+" A"}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" A")])]):t._e(),a("press-tab",{key:"tabB",attrs:{"sort-index":1,title:t.t("tab")+" B"}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" B")])]),a("press-tab",{key:"tabC",attrs:{title:t.t("tab")+" C","sort-index":2}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" C")])])],1)],1),a("demo-block",{attrs:{title:t.t("horTitle"),"header-style":"background: #f7f8fa;","section-style":"background: #192841;color: #fff;margin: 0;padding: 10px 0;"}},[a("press-tabs",{attrs:{active:t.active,mode:"hor"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChange.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{dot:!0,title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1),a("demo-block",{attrs:{title:"E-SPORT"}},[a("press-tabs",{attrs:{active:t.active,mode:"e-sport"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChange.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)}}},t._l(t.tabs4,(function(e,n){return a("press-tab",{key:n,attrs:{title:t.t("tab")+" "+(n+1)}},[a("div",{staticClass:"content"},[t._v(t._s(t.t("content"))+" "+t._s(n+1))])])})),1)],1)],1)},i=[]},9527:function(t,e,a){"use strict";a.r(e);var n=a("437c"),s=a("2e27");for(var i in s)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return s[t]}))}(i);a("f92e"),a("d1a9");var o,l=a("87d0"),c=Object(l["a"])(s["default"],n["b"],n["c"],!1,null,"77518512",null,!1,n["a"],o);e["default"]=c.exports},"9aad0":function(t,e,a){var n=a("0245");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=a("7f6e").default;s("9674e1aa",n,!0,{sourceMap:!1,shadowMode:!1})},a3d2:function(t,e,a){var n=a("3e50");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=a("7f6e").default;s("837c6de8",n,!0,{sourceMap:!1,shadowMode:!1})},d1a9:function(t,e,a){"use strict";var n=a("9aad0"),s=a.n(n);s.a},ef85:function(t,e,a){"use strict";(function(t){a("03f5");var n=a("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(a("aa94")),i=n(a("e1e1"));e.default={i18n:{"zh-CN":{tab:"标签 ",title2:"标签栏滚动",title3:"禁用标签",title4:"样式风格",title5:"点击事件",title6:"粘性布局",title7:"自定义标签",title8:"切换动画",title9:"滑动切换",title10:"滚动导航",horTitle:"HOR",disabled:" 已被禁用",matchByName:"通过名称匹配",beforeChange:"异步切换",lazyTab:"延迟加载"},"en-US":{tab:"Tab ",content:"content of tab",title2:"Swipe Tabs",title3:"Disabled Tab",title4:"Card Style",title5:"Click Event",title6:"Sticky",title7:"Custom Tab",title8:"Switch Animation",title9:"Swipeable",title10:"Scrollspy",horTitle:"HOR",disabled:" is disabled",matchByName:"Match By Name",beforeChange:"Before Change",lazyTab:"LAZY TAB"}},components:{PressTabs:s.default,PressTab:i.default},data:function(){return{showLazyTab:!1,active:3,activeName:"c",tabs2:[1,2],tabs4:[1,2,3,4],tabs7:[1,2,3,4,5,6,7],tabsDisabled:[{dot:!0},{},{disabled:!0},{}],tabsWithName:[{name:"a"},{name:"b"},{name:"c"}]}},mounted:function(){var t=this;this.$nextTick((function(){})),setTimeout((function(){t.tabs4=[1,2,3],t.active=2,setTimeout((function(){t.showLazyTab=!0}),1e3)}),2e3)},methods:{onChange:function(e){t.log("[onChange] val: ",e)},onInput:function(e){t.log("[onInput] val: ",e)},onClickDisabled:function(e){t.log("[onClickDisabled] val: ",e)},onClick:function(e){t.log("[onClick] val: ",e)},onScroll:function(e){t.log("[onScroll] val: ",e)}}}}).call(this,a("44fd")["default"])},f92e:function(t,e,a){"use strict";var n=a("a3d2"),s=a.n(n);s.a}}]);