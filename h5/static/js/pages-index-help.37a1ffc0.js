(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-help"],{"0d55":function(t,e,n){var a=n("a8d8");e=a(!1),e.push([t.i,"uni-page-body[data-v-22276de1]{background:#f7f8fa}body.?%PAGE?%[data-v-22276de1]{background:#f7f8fa}",""]),t.exports=e},"0fab":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("PressAbout",{attrs:{"help-config":t.helpConfig}})],1)},i=[]},1764:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.dataShow?n("div",{staticClass:"press-dialog",style:{zIndex:""+t.dataZIndex},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.touchRemove.apply(void 0,arguments)},touchmove:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.preventTouchMove.apply(void 0,arguments)}}},[n("div",{staticClass:"press-dialog__content-wrap"},[n("p",{staticClass:"press-dialog__title"},[t._v(t._s(t.dataTitle))]),t.dataUseScrollView&&t.dataHtmlContent?n("v-uni-scroll-view",{staticClass:"press-dialog__content",attrs:{"scroll-y":"true"},domProps:{innerHTML:t._s(t.dataHtmlContent)}}):t.dataHtmlContent?n("p",{staticClass:"press-dialog__content",domProps:{innerHTML:t._s(t.dataHtmlContent)}}):t._e(),t.dataHtmlContent?t._e():n("p",{staticClass:"press-dialog__content"},[t._v(t._s(t.dataContent))]),t.dataShowField?n("PressField",{attrs:{"custom-class":"press-dialog__field","title-width":"0",placeholder:t.dataFieldPlaceHolder,value:t.dataFieldValue,"model-value":t.dataFieldValue},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChangeField.apply(void 0,arguments)}}}):t._e(),t.dataSrc?n("div",{staticClass:"press-dialog__img-wrap"},[t.dataSrc?n("img",{staticClass:"press-dialog__img",attrs:{"show-menu-by-longpress":!0,src:t.dataSrc},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.handleClickImage.apply(void 0,arguments)},longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.handleLongPressImage.apply(void 0,arguments)}}}):t._e()]):t._e(),n("div",{staticClass:"press-dialog__btn--wrap"},[t.dataCancelText&&t.dataCancelText.length>0?[n("div",{staticClass:"press-dialog__btn--spacing"},[n("PressButton",{attrs:{type:"e-sport-secondary","custom-style":"width: 100px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.dataCancelText))])],1),n("PressButton",{attrs:{type:"e-sport-primary-bg",loading:t.mShowButtonLoading,"custom-style":"width: 100px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v(t._s(t.mShowButtonLoading?"":t.dataConfirmText))])]:t.dataConfirmText||t.mShowButtonLoading?[n("PressButton",{attrs:{type:"e-sport-primary-bg",loading:t.mShowButtonLoading,"custom-style":"width: 148px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v(t._s(t.mShowButtonLoading?"":t.dataConfirmText))])]:t._e()],2)],1)]):t._e()},i=[]},"1bab":function(t,e,n){"use strict";function a(t){var e=t.Dialog,n=t.queue,a=t.currentOptions,o=t.defaultOptions,i=t.updateQueue,s=t.updateCurrentOptions;return e.alert=function(t){return e(t)},e.confirm=function(t){return e(Object.assign({showCancelButton:!0},t))},e.close=function(){n.forEach((function(t){t.close()})),null===i||void 0===i||i([])},e.stopLoading=function(){n.forEach((function(t){t.stopLoading()}))},e.currentOptions=a,e.defaultOptions=o,e.setDefaultOptions=function(t){var n=Object.assign(Object.assign({},a),t);null===s||void 0===s||s(n),e.currentOptions=n},e.resetDefaultOptions=function(){var t=Object.assign({},o);null===s||void 0===s||s(t),e.currentOptions=t},e.resetDefaultOptions(),e}n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.addFunctionForDialog=a,n("27ff"),n("f7aa")},"2c03":function(t,e,n){"use strict";n.r(e);var a=n("6147"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"3f4a":function(t,e,n){"use strict";n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("7076")),i=a(n("e36d")),s=n("0cd0");e.default={name:"PressAbout",components:{PressDialogComp:i.default},props:{helpConfig:{type:Object,default:function(){return{}}}},data:function(){return{}},mounted:function(){},methods:{jumpToIntroduce:function(){var t="/pages/index/introduce";s.routerPush.call(this,t)},showGroupQrCode:function(){o.default.show({context:this,title:"Press UI 交流群",content:"QQ扫码加入",confirmText:"",src:this.helpConfig.groupQRCode})},clickCell:function(t){"INTRODUCE"===t.callback?this.jumpToIntroduce():"GROUP_QRCODE"===t.callback&&this.showGroupQrCode()}}}},"4f98":function(t,e,n){"use strict";n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.HELP_DATA_URL=e.DEFAULT_HELPER_CONFIG=void 0;e.DEFAULT_HELPER_CONFIG={banner:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/12/own_mike_b13775d107c0b0a6b5.jpg",title:"Press UI",description:"灵活、易用、丰富的跨端组件库",cellList:[{img:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_f7ed201e31e34255d0.png",title:"关于 Press UI",desc:"一套灵活、易用的跨端组件库",callback:"INTRODUCE"},{img:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_2f0015528742ab3f15.png",title:"开发交流",desc:"欢迎提供意见、建议、想法",callback:"GROUP_QRCODE"}],groupQRCode:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_16e1b3ddcfd83bdb58.png"},e.HELP_DATA_URL="https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__press_ui_helpe_config.json"},5144:function(t,e,n){"use strict";var a=n("88ba"),o=n.n(a);o.a},5662:function(t,e,n){"use strict";var a=n("c251"),o=n.n(a);o.a},6147:function(t,e,n){"use strict";n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("27ff");var o=a(n("6d7c")),i=a(n("5246")),s=a(n("7d30")),r=n("6df2"),l=n("b9df"),c=n("d068"),d=n("78b2");e.default={name:"PressDialog",components:{PressButton:i.default,PressField:s.default},mixins:[(0,c.getDialogMixin)(r.dialogProps),d.ScrollViewPureMixin],props:(0,o.default)({},r.dialogProps),options:{virtualHost:!0,styleIsolation:"shared"},emits:["confirm","cancel","onLongPressImage","onClickImage"],data:function(){return{resolve:"",reject:"",promise:"",mShowButtonLoading:!1,inputValue:""}},watch:{dataFieldValue:{handler:function(t){this.inputValue=t},immediate:!0}},mounted:function(){},methods:{preventTouchMove:function(){},confirm:function(){var t=this;if(2===this.dataDialogType){if(this.mShowButtonLoading)return;this.mShowButtonLoading=!0}"function"===typeof this.dataOnConfirmClick?(0,l.toPromise)(this.dataOnConfirmClick(this)).then((function(e){e&&t.resolveConfirm()})).catch((function(){})):this.resolveConfirm()},resolveConfirm:function(){this.resolve&&this.resolve("confirm"),this.$emit("confirm"),this.remove()},cancel:function(){"function"===typeof this.dataOnClickCancel&&this.dataOnClickCancel(this),"function"===typeof this.reject&&this.reject("cancel"),this.$emit("cancel"),this.remove()},showDialog:function(){var t=this;return this.dataShow=!0,this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n})),this.promise},touchRemove:function(){this.dataCanTouchRemove&&this.remove(),this.$emit("cancel")},remove:function(){this.dataShow=!1,this.mShowButtonLoading=!1},destroy:function(){},handleLongPressImage:function(){"function"===typeof this.dataOnLongPressImage&&this.dataOnLongPressImage(),this.$emit("onLongPressImage")},handleClickImage:function(){"function"===typeof this.dataOnClickImage&&this.dataOnClickImage(),this.$emit("onClickImage")},onChangeField:function(t){this.inputValue=t}}}},"6df2":function(t,e,n){"use strict";n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.dialogProps=void 0,n("29c8");var a=n("db02");e.dialogProps={show:{type:Boolean,default:!1},src:{type:String,default:""},dialogType:{type:[Number,String],default:1},title:{type:String,default:(0,a.t)("dialog.title")},content:{type:String,default:""},canTouchRemove:{type:Boolean,default:!0},confirmText:{type:String,default:(0,a.t)("confirm")},cancelText:{type:String,default:""},onClickCancel:{type:[Function,null],default:null},onConfirmClick:{type:[Function,null],default:null},htmlContent:{type:String,default:""},zIndex:{type:[Number,String],default:"99"},useScrollView:{type:Boolean,default:!1},onClickImage:{type:[Function,null],default:null},onLongPressImage:{type:[Function,null],default:null},showField:{type:Boolean,default:!1},fieldPlaceHolder:{type:String,default:""},fieldValue:{type:String,default:""}}},7076:function(t,e,n){"use strict";n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return o.default}});var o=a(n("863a"))},"75b1":function(t,e,n){"use strict";var a=n("e89a"),o=n.n(a);o.a},"863a":function(t,e,n){"use strict";n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a27b"),n("b488"),n("27ff");var o=n("6df2"),i=n("1bab"),s=n("f09e"),r=a(n("e36d")),l=[],c=Object.keys(o.dialogProps).reduce((function(t,e){return t[e]=o.dialogProps[e].default,t}),{selector:"#tip-match-comm-tips-dialog"}),d=Object.assign({},c),u=function(t){return(0,s.initFunctionalDialog)({options:t,currentOptions:d,id:"tip-dialog-showCommTipsDialog",dialogComponent:r.default})};function f(t){l=t}function p(t){d=t}u.show=function(t){return u(t)},(0,i.addFunctionForDialog)({Dialog:u,queue:l,currentOptions:d,defaultOptions:c,updateQueue:f,updateCurrentOptions:p});e.default=u},"88ba":function(t,e,n){var a=n("f682");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("7f6e").default;o("8b35dce0",a,!0,{sourceMap:!1,shadowMode:!1})},"8a5c":function(t,e,n){var a=n("a8d8");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.press-about__header[data-v-661a7b12]{height:%?500?%;position:relative}.press-about__banner[data-v-661a7b12]{display:block;width:100%;height:%?500?%}.press-about__slogan[data-v-661a7b12]{position:absolute;left:0;width:100%;bottom:%?40?%;color:#fff;padding:0 %?50?%;text-align:center;box-sizing:border-box}.press-about__title[data-v-661a7b12]{font-size:%?42?%;font-weight:700;margin-bottom:%?10?%}.press-about__subtitle[data-v-661a7b12]{font-size:%?30?%}.press-about__main[data-v-661a7b12]{padding:%?36?% 0;border-top-left-radius:%?32?%;border-top-right-radius:%?32?%;box-sizing:border-box}.press-about__cell[data-v-661a7b12]{display:flex;align-items:center;background:#fff;padding:12px 20px;margin:0 12px 12px;box-sizing:border-box}.press-about__cell-left[data-v-661a7b12]{width:50px;height:50px;display:flex;align-items:center;justify-content:center;margin-right:25px}.press-about__cell-img[data-v-661a7b12]{width:100%;height:100%}.press-about__cell-title[data-v-661a7b12]{font-size:16px;color:#09134e;height:20px;line-height:20px}.press-about__cell-desc[data-v-661a7b12]{font-size:12px;margin-top:6px;color:#9299c6}',""]),t.exports=e},a5c9:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"press-about"},[n("div",{staticClass:"press-about__header"},[n("v-uni-image",{staticClass:"press-about__banner",attrs:{src:t.helpConfig.banner,mode:"aspectFill"}}),n("div",{staticClass:"press-about__slogan"},[n("div",{staticClass:"press-about__title"},[t._v(t._s(t.helpConfig.title))]),n("div",{staticClass:"press-about__subtitle"},[t._v(t._s(t.helpConfig.description))])])],1),n("div",{staticClass:"press-about__main"},[n("div",{staticClass:"press-about__help"},t._l(t.helpConfig.cellList,(function(e,a){return n("div",{key:a,staticClass:"press-about__cell",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clickCell(e)}}},[n("div",{staticClass:"press-about__cell-left"},[n("img",{staticClass:"press-about__cell-img",attrs:{src:e.img}})]),n("div",{staticClass:"press-about__cell-right"},[n("div",{staticClass:"press-about__cell-title"},[t._v(t._s(e.title))]),n("div",{staticClass:"press-about__cell-desc"},[t._v(t._s(e.desc))])])])})),0)]),n("PressDialogComp",{ref:"tip-match-comm-tips-dialog",attrs:{id:"tip-match-comm-tips-dialog"}})],1)},i=[]},a636:function(t,e,n){"use strict";n.r(e);var a=n("f21f"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},c08c:function(t,e,n){"use strict";n.r(e);var a=n("3f4a"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},c251:function(t,e,n){var a=n("0d55");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("7f6e").default;o("0b30f29e",a,!0,{sourceMap:!1,shadowMode:!1})},cf7c:function(t,e,n){"use strict";n.r(e);var a=n("0fab"),o=n("a636");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("5662");var s,r=n("87d0"),l=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"22276de1",null,!1,a["a"],s);e["default"]=l.exports},e36d:function(t,e,n){"use strict";n.r(e);var a=n("1764"),o=n("2c03");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("5144");var s,r=n("87d0"),l=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"f54bc040",null,!1,a["a"],s);e["default"]=l.exports},e4e5:function(t,e,n){"use strict";n.r(e);var a=n("a5c9"),o=n("c08c");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("75b1");var s,r=n("87d0"),l=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"661a7b12",null,!1,a["a"],s);e["default"]=l.exports},e89a:function(t,e,n){var a=n("8a5c");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("7f6e").default;o("6f1cd7b4",a,!0,{sourceMap:!1,shadowMode:!1})},f09e:function(t,e,n){"use strict";(function(t){n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.initFunctionalDialog=c,n("27ff");var o=a(n("6d7c")),i=n("c091"),s=n("2511"),r=n("8eb5");function l(){var t=getCurrentPages();return t[t.length-1]}function c(e){var n=e.options,a=e.currentOptions,c=e.dialogComponent,d=e.id;n=Object.assign(Object.assign({},a),n);var u=n.context||l(),f=(0,i.selectComponent)(u,n.selector);if(delete n.context,delete n.selector,!f&&c&&(f=(0,r.initH5Instance)(c,d)),f){var p=(0,o.default)({},n);(0,s.setData)(f,p);var g=(0,s.setData)(f,p,"showDialog");return g.then((function(t){return Promise.resolve(t)})).catch((function(t){return Promise.reject(t)}))}t.warn("The press-dialog node is not found, please confirm whether the selector and context are correct")}}).call(this,n("44fd")["default"])},f21f:function(t,e,n){"use strict";n("13a4");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("e4e5")),i=n("4f98");e.default={components:{PressAbout:o.default},data:function(){return{helpConfig:i.DEFAULT_HELPER_CONFIG}},mounted:function(){},methods:{}}},f682:function(t,e,n){var a=n("a8d8");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 字号 */\n/* color */.press-dialog[data-v-f54bc040]{position:fixed;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5);z-index:99}.press-dialog__content-wrap[data-v-f54bc040]{position:relative;display:flex;flex-direction:column;align-items:center;width:5.6rem;padding:.48rem;border-radius:.16rem;background-color:#fff;box-sizing:border-box}.press-dialog__title[data-v-f54bc040]{font-size:.32rem;font-weight:600;color:#09134e;text-align:center}.press-dialog__content[data-v-f54bc040]{max-height:5.4rem;font-size:.28rem;color:#596297;line-height:.44rem;margin-top:.24rem;word-break:break-word;overflow:scroll}.press-dialog__img-wrap[data-v-f54bc040]{width:4rem;height:3.6rem;margin:.24rem auto 0;border:.02rem solid #eef0f6;display:flex;align-items:center;justify-content:center}.press-dialog__img[data-v-f54bc040]{width:2.8rem;height:2.8rem}.press-dialog__btn--wrap[data-v-f54bc040]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:.48rem}.press-dialog__btn--spacing[data-v-f54bc040]{margin-right:.32rem;line-height:0}[data-v-f54bc040] .press-dialog__field{margin-top:12px}[data-v-f54bc040] .press-dialog__field .press-field{background:#f3f3f3;border-radius:4px}[data-v-f54bc040] .press-dialog__field .press-field__control{font-size:14px}[data-v-f54bc040] .press-dialog__field .press-cell__title{display:none}',""]),t.exports=e}}]);