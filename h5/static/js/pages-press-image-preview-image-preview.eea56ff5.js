(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-image-preview-image-preview"],{2511:function(e,t,n){"use strict";function o(e,t){var n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"setData";if(e){var i=(null===(n=e.$vm)||void 0===n?void 0:n[o])||e[o];return"function"===typeof i?i(t):void 0}}function i(e){for(var t=e.$vm||e,n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];"function"===typeof t.$set?t.$set.apply(t,[t].concat(o)):t[o[0]]=o[1]}function a(e){var t;if(e)return t=e,t}n("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.getVMInVue3=a,t.setData=o,t.vmSet=i,n("e087")},"3abf":function(e,t,n){"use strict";n("fcdb");var o=n("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("cfee")),a=o(n("8e5b")),s=n("805d"),r={IMAGE_PREVIEW:"press-image-preview"};t.default={i18n:{"zh-CN":{previewImage:"预览图片",customType:"传入配置",startPosition:"指定初始位置",showCloseIcon:"展示关闭按钮",watchCloseEvent:"监听关闭事件",asyncClose:"异步关闭",componentUse:"组件调用",closeTip:"关闭"},"en-US":{previewImage:"Preview Image",customType:"Custom Config",startPosition:"Set Start Position",showCloseIcon:"Show Close Icon",watchCloseEvent:"Watch Close Event",asyncClose:"Async Close",componentUse:"Component Use",closeTip:"Close"}},components:{ImagePreviewComp:i.default,PressCell:a.default},data:function(){var e="";return{show:!1,customStyle:e,images:["https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg","https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_8f25b9e2e75f6754ad.jpeg","https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_260c4142c7225b5f73.jpeg"],FUNCTIONAL_ID_MAP:r}},mounted:function(){},methods:{onShowImagePreview:function(){(0,s.imagePreview)({context:this,selector:"#".concat(r.IMAGE_PREVIEW),images:this.images,customStyle:this.customStyle}).then((function(){}))},onShowComponent:function(){this.show=!0},onShowCustomType:function(e){var t=this,n=void 0,o=void 0,i=void 0;"startPosition"===e?n=1:"showCloseIcon"===e?o=!0:"asyncClose"===e&&(i=!0),(0,s.imagePreview)({context:this,selector:"#".concat(r.IMAGE_PREVIEW),images:this.images,customStyle:this.customStyle,startPosition:n,closeable:o,asyncClose:i}).then((function(){"watchCloseEvent"===e&&t.onGTip(t.t("closeTip"))})).catch((function(e){var t=e.context;i&&setTimeout((function(){t.closeDialog()}),2e3)}))}}}},6383:function(e,t,n){var o=n("a8d8");t=o(!1),t.push([e.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* color */.press-image-preview[data-v-b8b09276]{position:fixed;bottom:0;left:0;width:100%;height:calc(100% - var(--window-top, 0px));z-index:2}.press-image-preview__swipe[data-v-b8b09276]{height:100%}.press-image-preview__cover[data-v-b8b09276]{position:absolute;top:0;left:0}.press-image-preview__image-wrap[data-v-b8b09276]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}.press-image-preview__image[data-v-b8b09276]{width:100%;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.press-image-preview__image--vertical[data-v-b8b09276]{width:auto;height:100%}.press-image-preview__image img[data-v-b8b09276]{-webkit-user-drag:none}.press-image-preview__image .press-image__error[data-v-b8b09276]{top:30%;height:40%}.press-image-preview__image .press-image__error-icon[data-v-b8b09276]{font-size:36px}.press-image-preview__image .press-image__loading[data-v-b8b09276]{background-color:initial}.press-image-preview__index[data-v-b8b09276]{position:absolute;top:16px;left:50%;color:#fff;font-size:14px;line-height:20px;text-shadow:0 1px 1px #323233;-webkit-transform:translate(-50%);transform:translate(-50%)}[data-v-b8b09276] .press-image-preview__overlay{background-color:rgba(0,0,0,.9)}.press-image-preview__close-icon[data-v-b8b09276]{position:absolute;z-index:1;color:#c8c9cc;font-size:22px;cursor:pointer}.press-image-preview__close-icon[data-v-b8b09276]:active{color:#969799}.press-image-preview__close-icon--top-left[data-v-b8b09276]{top:16px;left:16px}.press-image-preview__close-icon--top-right[data-v-b8b09276]{top:16px;right:16px}.press-image-preview__close-icon--bottom-left[data-v-b8b09276]{bottom:16px;left:16px}.press-image-preview__close-icon--bottom-right[data-v-b8b09276]{right:16px;bottom:16px}',""]),e.exports=t},"7b41":function(e,t,n){"use strict";n.r(t);var o=n("d574"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"805d":function(e,t,n){"use strict";n("fcdb");var o=n("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.imagePreview=l,t.imagePreviewHandler=void 0;var i=o(n("6d7c")),a=n("c091"),s=n("8eb5"),r=o(n("cfee")),c="pressImagePreview";function l(e){var t;return e.selector||(t=(0,s.initH5Instance)(r.default,c),t.mode="functional"),(0,a.showFunctionalComponent)((0,i.default)((0,i.default)({},e),{},{dialog:t,show:!0,showFunction:"showImagePreview"}))}t.imagePreviewHandler=l},"9ad6":function(e,t,n){"use strict";n.r(t);var o=n("3abf"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},b10f:function(e,t,n){"use strict";var o=n("b848"),i=n.n(o);i.a},b463:function(e,t,n){"use strict";n("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=a,n("745f"),n("9135"),n("14c4"),n("3849"),n("fd34"),n("8999"),n("45be"),n("15ea");var o=i(n("bba8"));function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=(0,o.default)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,a=function(){};return{s:a,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,s=e},f:function(){try{r||null==n["return"]||n["return"]()}finally{if(c)throw s}}}}},b848:function(e,t,n){var o=n("6383");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var i=n("5a15").default;i("7147768a",o,!0,{sourceMap:!1,shadowMode:!1})},c091:function(e,t,n){"use strict";n("fcdb");var o=n("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.selectComponent=f,t.showFunctionalComponent=d,n("250c"),n("8999"),n("0c4e"),n("8c11"),n("4498");var i=o(n("6d7c")),a=o(n("b463")),s=n("12ef"),r=n("2511"),c="showDialog";function l(){var e=getCurrentPages();return e[e.length-1]}function u(e,t,n){var o=e.$children;if(o){var i,s=(0,a.default)(o);try{for(s.s();!(i=s.n()).done;){var r=i.value;if(r.$attrs[t]===n)return r}}catch(p){s.e(p)}finally{s.f()}var c,l=(0,a.default)(o);try{for(l.s();!(c=l.n()).done;){var f=c.value,d=u(f,t,n);if(d)return d}}catch(p){l.e(p)}finally{l.f()}}}function f(e,t){var n,o;if(t&&e){if("function"===typeof t)return t(e);var i=t;if(i.match(/^[^\w]/)&&(i=i.slice(1)),null!==(n=e.$refs)&&void 0!==n&&n[i])return e.$refs[i];if((0,s.isNotInUni)()){var a=t.startsWith("#")?"id":"class",r=u(e,a,i);if(r)return r}if("function"===typeof(null===e||void 0===e?void 0:e.$selectComponent)){var c,l=null===e||void 0===e||null===(c=e.$selectComponent)||void 0===c?void 0:c.call(e,t);return l}return null===e||void 0===e||null===(o=e.selectComponent)||void 0===o?void 0:o.call(e,t)}}function d(e){return new Promise((function(t,n){var o=e.context||l(),a=e.dialog;a||(a=f(o,e.selector));var s=(0,i.default)({callback:function(e,o){"confirm"===e?t(o):n(o)}},e);delete s.dialog,delete s.context;var u=e.showFunction||c;(0,r.setData)(a,s,u)}))}},cfee:function(e,t,n){"use strict";n.r(t);var o=n("de06"),i=n("7b41");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("b10f");var s,r=n("921e"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"b8b09276",null,!1,o["a"],s);t["default"]=c.exports},d102:function(e,t,n){"use strict";n.r(t);var o=n("ec6d"),i=n("9ad6");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);var s,r=n("921e"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"82e6b1fe",null,!1,o["a"],s);t["default"]=c.exports},d574:function(e,t,n){"use strict";n("fcdb");var o=n("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("6d7c"));n("a88c");var a=o(n("6ec5")),s=o(n("4710")),r=n("0b5a"),c=n("5e91"),l=n("8d6b"),u={images:{type:Array,default:function(){return[]}},startPosition:{type:[Number,String],default:0},transition:{type:String,default:"press-fade"},showIndex:{type:Boolean,default:!0},asyncClose:{type:Boolean,default:!1},customStyle:{type:String,default:""},customClass:{type:String,default:""},closeable:{type:Boolean,default:!1},closeIcon:{type:String,default:"clear"},closeIconPosition:{type:String,default:"top-right"},zIndex:{type:Number,default:10}};t.default={name:"PressImagePreview",components:{PressOverlay:a.default,PressIconPlus:s.default},mixins:[(0,r.functionalMixin)(u),l.SwiperPureMixin],props:(0,i.default)({},u),emits:["close","change"],data:function(){return{active:0}},computed:{imagePreviewStyle:function(){return this.getPropOrData("customStyle")}},watch:{startPosition:"setActive",show:function(e){e?(this.setActive(+this.getPropOrData("startPosition")),(0,c.nextTick)((function(){}))):this.$emit("close",{index:this.active,url:this.getPropOrData("images")[this.active]})}},mounted:function(){},methods:{showImagePreview:function(e){this.showDialog(e),this.setActive(e.startPosition||0)},onClosed:function(){},onChange:function(e){var t=e.detail.current,n=void 0===t?0:t;this.setActive(n)},emitClose:function(){this.getPropOrData("asyncClose")?this.promiseCallback("cancel"):(this.$emit("close"),this.innerShow=!1,this.promiseCallback("confirm"))},onClose:function(){this.emitClose()},onClickOverlay:function(){this.onClose()},onClickSwiperItem:function(){this.onClose()},setActive:function(e){e!==this.active&&(this.active=e,this.$emit("change",e))}}}},de06:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("PressOverlay",{attrs:{show:e.innerShow,"custom-style":"background: rgba(0, 0, 0, 0.9);z-index: "+e.getPropOrData("zIndex")+";"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickOverlay.apply(void 0,arguments)}}},[n("div",{staticClass:"press-image-preview",class:[e.getPropOrData("customClass")],style:e.imagePreviewStyle},[e.getPropOrData("showIndex")?n("div",{staticClass:"press-image-preview__index"},[e._v(e._s(e.active+1)+"/"+e._s(e.getPropOrData("images").length))]):e._e(),n("div",{class:["press-image-preview__close-icon","press-image-preview__close-icon--"+e.getPropOrData("closeIconPosition")],on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.onClose.apply(void 0,arguments)}}},[e.getPropOrData("closeable")?n("PressIconPlus",{attrs:{name:e.getPropOrData("closeIcon")}}):e._e()],1),n("v-uni-swiper",{staticClass:"press-image-preview__swipe",attrs:{current:e.active},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onChange.apply(void 0,arguments)}}},e._l(e.getPropOrData("images"),(function(t,o){return n("v-uni-swiper-item",{key:o,staticClass:"press-image-preview__swipe-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickSwiperItem.apply(void 0,arguments)}}},[n("div",{staticClass:"press-image-preview__image-wrap"},[n("img",{staticClass:"press-image-preview__image",attrs:{src:t,fit:"contain"}})])])})),1),n("div")],1)])},a=[]},ec6d:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"demo-wrap"},[n("demo-block",{attrs:{title:e.t("basicUsage")}},[n("press-cell",{attrs:{title:e.t("previewImage"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowImagePreview.apply(void 0,arguments)}}})],1),n("demo-block",{attrs:{title:e.t("customType")}},[n("press-cell",{attrs:{title:e.t("startPosition"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowCustomType("startPosition")}}}),n("press-cell",{attrs:{title:e.t("showCloseIcon"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowCustomType("showCloseIcon")}}}),n("press-cell",{attrs:{title:e.t("watchCloseEvent"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowCustomType("watchCloseEvent")}}})],1),n("demo-block",{attrs:{title:e.t("asyncClose")}},[n("press-cell",{attrs:{title:e.t("asyncClose"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowCustomType("asyncClose")}}})],1),n("demo-block",{attrs:{title:e.t("componentUse")}},[n("press-cell",{attrs:{title:e.t("componentUse"),"is-link":!0},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onShowComponent.apply(void 0,arguments)}}})],1),n("ImagePreviewComp",{attrs:{show:e.show,closeable:!0,"start-position":1,images:e.images,"custom-style":e.customStyle},on:{close:function(t){arguments[0]=t=e.$handleEvent(t),e.show=!1}}}),n("ImagePreviewComp",{ref:e.FUNCTIONAL_ID_MAP.IMAGE_PREVIEW,attrs:{id:e.FUNCTIONAL_ID_MAP.IMAGE_PREVIEW,mode:"functional"}})],1)},a=[]}}]);