(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-image-image"],{"24d8":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"demo-wrap"},[i("demo-block",{attrs:{title:e.t("basicUsage")}},[i("PressImage",{attrs:{"show-loading":!0,src:e.src,width:"100",height:"100"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.click.apply(void 0,arguments)}}})],1),i("demo-block",{attrs:{title:e.t("mode")}},e._l(e.MODE_LIST,(function(t,a){return i("PressRow",{key:e.getIndex(a,"row")},e._l(t,(function(t,a){return i("PressCol",{key:e.getIndex(a,"col"),attrs:{span:t.span}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,width:"100",height:"100",src:e.src,mode:t.mode},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.click.apply(void 0,arguments)}}}),i("span",{staticClass:"image-title",class:t.titleClass},[e._v(e._s(t.mode))])],1)])})),1)})),1),i("demo-block",{attrs:{title:e.t("round")}},e._l(e.MODE_LIST,(function(t,a){return i("PressRow",{key:e.getIndex(a,"row")},e._l(t,(function(t,a){return i("PressCol",{key:e.getIndex(a,"col"),attrs:{span:t.span}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,width:"100",height:"100",src:e.src,round:!0,mode:t.mode},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.click.apply(void 0,arguments)}}}),i("span",{staticClass:"image-title",class:t.titleClass},[e._v(e._s(t.mode))])],1)])})),1)})),1),i("demo-block",{attrs:{title:e.t("loading")}},[i("PressRow",[i("PressCol",{attrs:{span:8}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,width:"100",height:"100"}}),i("span",{staticClass:"image-title"},[e._v(e._s(e.t("defaultTip")))])],1)]),i("PressCol",{attrs:{span:8}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,width:"100",height:"100"},scopedSlots:e._u([{key:"loading",fn:function(){return[i("PressLoadingPlus",{attrs:{type:"spinner",size:"20"}})]},proxy:!0}])}),i("span",{staticClass:"image-title"},[e._v(e._s(e.t("customTip")))])],1)])],1)],1),i("demo-block",{attrs:{title:e.t("error")}},[i("PressRow",[i("PressCol",{attrs:{span:8}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,src:"src",width:"100px",height:"100px"}}),i("span",{staticClass:"image-title"},[e._v(e._s(e.t("defaultTip")))])],1)]),i("PressCol",{attrs:{span:8}},[i("div",{staticClass:"demo-grid"},[i("PressImage",{attrs:{"show-loading":!0,src:"src",width:"100px",height:"100px"},scopedSlots:e._u([{key:"error",fn:function(){return[i("span",{staticStyle:{"font-size":"14px"}},[e._v("加载失败")])]},proxy:!0}])}),i("span",{staticClass:"image-title"},[e._v(e._s(e.t("customTip")))])],1)])],1)],1),i("ImagePreview",{ref:"imagePreviewRef",attrs:{mode:"functional"}})],1)},n=[]},2966:function(e,t,i){var a=i("a8d8");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.demo-grid[data-v-3d556e1c]{display:flex;flex-direction:column;justify-content:center}.image-title[data-v-3d556e1c]{text-align:center;width:100px;margin-top:16px;color:#646566;margin-bottom:10px}.image-title--long[data-v-3d556e1c]{width:132px}.image-title--gap[data-v-3d556e1c]{margin-bottom:32px}',""]),e.exports=t},"2b6a":function(e,t,i){"use strict";(function(e){i("13a4");var a=i("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("dafa");var s=a(i("1512")),n=a(i("fcb1")),o=a(i("f42f")),r=a(i("e844")),c=a(i("cfee")),l=i("805d"),d=[[{mode:"aspectFit",titleClass:"image-title--gap",span:8},{mode:"aspectFill",titleClass:"image-title--gap",span:8},{mode:"center",titleClass:"",span:8}],[{mode:"widthFix",titleClass:"image-title--gap",span:8},{mode:"heightFix",titleClass:"image-title--long",span:16}]];t.default={i18n:{"zh-CN":{error:"加载失败提示",loading:"加载中提示",defaultTip:"默认提示",customTip:"自定义提示",mode:"模式",round:"圆形"},"en-US":{error:"Error",loading:"Loading",defaultTip:"Default",customTip:"Custom",mode:"Mode",round:"Round"}},components:{PressCol:n.default,PressRow:r.default,PressImage:s.default,PressLoadingPlus:o.default,ImagePreview:c.default},data:function(){return{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_a17f94292a34e9f644.jpeg",MODE_LIST:d}},methods:{click:function(){e.log("[click]"),(0,l.imagePreviewHandler)({selector:"#imagePreviewRef",images:[this.src]}).then((function(){}))},getIndex:function(e,t){return"".concat(e,"-").concat(t)}}}}).call(this,i("44fd")["default"])},4591:function(e,t,i){"use strict";i.r(t);var a=i("24d8"),s=i("cdf6");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("f26f");var o,r=i("87d0"),c=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"3d556e1c",null,!1,a["a"],o);t["default"]=c.exports},"7b41":function(e,t,i){"use strict";i.r(t);var a=i("860c"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},"805d":function(e,t,i){"use strict";i("13a4");var a=i("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.imagePreview=l,t.imagePreviewHandler=void 0;var s=a(i("6d7c")),n=i("c091"),o=i("8eb5"),r=a(i("cfee")),c="pressImagePreview";function l(e){var t;return e.selector||(t=(0,o.initH5Instance)(r.default,c),t.mode="functional"),(0,n.showFunctionalComponent)((0,s.default)((0,s.default)({},e),{},{dialog:t,show:!0,showFunction:"showImagePreview"}))}t.imagePreviewHandler=l},"85d0":function(e,t,i){var a=i("f791");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("7f6e").default;s("2d19708a",a,!0,{sourceMap:!1,shadowMode:!1})},"860c":function(e,t,i){"use strict";i("13a4");var a=i("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(i("6d7c"));i("29c8");var n=a(i("6ec5")),o=a(i("4710")),r=i("0b5a"),c=i("5e91"),l=i("8d6b"),d={images:{type:Array,default:function(){return[]}},startPosition:{type:[Number,String],default:0},transition:{type:String,default:"press-fade"},showIndex:{type:Boolean,default:!0},asyncClose:{type:Boolean,default:!1},customStyle:{type:String,default:""},customClass:{type:String,default:""},closeable:{type:Boolean,default:!1},closeIcon:{type:String,default:"clear"},closeIconPosition:{type:String,default:"top-right"},zIndex:{type:Number,default:10}};t.default={name:"PressImagePreview",components:{PressOverlay:n.default,PressIconPlus:o.default},mixins:[(0,r.functionalMixin)(d),l.SwiperPureMixin],props:(0,s.default)({},d),emits:["close","change"],data:function(){return{active:0}},computed:{imagePreviewStyle:function(){return this.getPropOrData("customStyle")}},watch:{startPosition:"setActive",show:function(e){e?(this.setActive(+this.getPropOrData("startPosition")),(0,c.nextTick)((function(){}))):this.$emit("close",{index:this.active,url:this.getPropOrData("images")[this.active]})}},mounted:function(){},methods:{showImagePreview:function(e){this.showDialog(e),this.setActive(e.startPosition||0)},onClosed:function(){},onChange:function(e){var t=e.detail.current,i=void 0===t?0:t;this.setActive(i)},emitClose:function(){this.getPropOrData("asyncClose")?this.promiseCallback("cancel"):(this.$emit("close"),this.innerShow=!1,this.promiseCallback("confirm"))},onClose:function(){this.emitClose()},onClickOverlay:function(){this.onClose()},onClickSwiperItem:function(){this.onClose()},setActive:function(e){e!==this.active&&(this.active=e,this.$emit("change",e))}}}},b10f:function(e,t,i){"use strict";var a=i("85d0"),s=i.n(a);s.a},cdf6:function(e,t,i){"use strict";i.r(t);var a=i("2b6a"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},cfee:function(e,t,i){"use strict";i.r(t);var a=i("de06"),s=i("7b41");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("b10f");var o,r=i("87d0"),c=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"b8b09276",null,!1,a["a"],o);t["default"]=c.exports},d5af:function(e,t,i){var a=i("2966");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("7f6e").default;s("e203275c",a,!0,{sourceMap:!1,shadowMode:!1})},de06:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("PressOverlay",{attrs:{show:e.innerShow,"custom-style":"background: rgba(0, 0, 0, 0.9);z-index: "+e.getPropOrData("zIndex")+";"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickOverlay.apply(void 0,arguments)}}},[i("div",{staticClass:"press-image-preview",class:[e.getPropOrData("customClass")],style:e.imagePreviewStyle},[e.getPropOrData("showIndex")?i("div",{staticClass:"press-image-preview__index"},[e._v(e._s(e.active+1)+"/"+e._s(e.getPropOrData("images").length))]):e._e(),i("div",{class:["press-image-preview__close-icon","press-image-preview__close-icon--"+e.getPropOrData("closeIconPosition")],on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.onClose.apply(void 0,arguments)}}},[e.getPropOrData("closeable")?i("PressIconPlus",{attrs:{name:e.getPropOrData("closeIcon")}}):e._e()],1),i("v-uni-swiper",{staticClass:"press-image-preview__swipe",attrs:{current:e.active},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onChange.apply(void 0,arguments)}}},e._l(e.getPropOrData("images"),(function(t,a){return i("v-uni-swiper-item",{key:a,staticClass:"press-image-preview__swipe-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickSwiperItem.apply(void 0,arguments)}}},[i("div",{staticClass:"press-image-preview__image-wrap"},[i("img",{staticClass:"press-image-preview__image",attrs:{src:t,fit:"contain"}})])])})),1),i("div")],1)])},n=[]},f26f:function(e,t,i){"use strict";var a=i("d5af"),s=i.n(a);s.a},f791:function(e,t,i){var a=i("a8d8");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* color */.press-image-preview[data-v-b8b09276]{position:fixed;bottom:0;left:0;width:100%;height:calc(100% - var(--window-top, 0px));z-index:2}.press-image-preview__swipe[data-v-b8b09276]{height:100%}.press-image-preview__cover[data-v-b8b09276]{position:absolute;top:0;left:0}.press-image-preview__image-wrap[data-v-b8b09276]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}.press-image-preview__image[data-v-b8b09276]{width:100%;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.press-image-preview__image--vertical[data-v-b8b09276]{width:auto;height:100%}.press-image-preview__image img[data-v-b8b09276]{-webkit-user-drag:none}.press-image-preview__image .press-image__error[data-v-b8b09276]{top:30%;height:40%}.press-image-preview__image .press-image__error-icon[data-v-b8b09276]{font-size:36px}.press-image-preview__image .press-image__loading[data-v-b8b09276]{background-color:initial}.press-image-preview__index[data-v-b8b09276]{position:absolute;top:16px;left:50%;color:#fff;font-size:14px;line-height:20px;text-shadow:0 1px 1px #323233;-webkit-transform:translate(-50%);transform:translate(-50%)}[data-v-b8b09276] .press-image-preview__overlay{background-color:rgba(0,0,0,.9)}.press-image-preview__close-icon[data-v-b8b09276]{position:absolute;z-index:1;color:#c8c9cc;font-size:22px;cursor:pointer}.press-image-preview__close-icon[data-v-b8b09276]:active{color:#969799}.press-image-preview__close-icon--top-left[data-v-b8b09276]{top:16px;left:16px}.press-image-preview__close-icon--top-right[data-v-b8b09276]{top:16px;right:16px}.press-image-preview__close-icon--bottom-left[data-v-b8b09276]{bottom:16px;left:16px}.press-image-preview__close-icon--bottom-right[data-v-b8b09276]{right:16px;bottom:16px}',""]),e.exports=t}}]);