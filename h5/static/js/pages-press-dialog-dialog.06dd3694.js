(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-dialog-dialog"],{"0745":function(t,e,n){"use strict";n.r(e);var o=n("78a5"),i=n("fd2e");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);var s,l=n("87d0"),r=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,"a3343f06",null,!1,o["a"],s);e["default"]=r.exports},"0951":function(t,e,n){"use strict";(function(t){n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.saveMpImage=f;var i=o(n("6d7c"));n("144c"),n("414c");var a="scope.writePhotosAlbum",s={saveImage:"保存到相册",saveImageSuccess:"已保存到相册",saveImageFail:"保存相册失败",saveImageFailOfAuth:"保存相册失败，请检查权限",authConfirmContent:"检测到您没打开保存图片权限，是否去设置打开？",authConfirmFailToast:"您没有授权，无法保存到相册"};function l(t){return new Promise((function(e,n){wx.showModal({content:t.authConfirmContent,confirmText:"确认",cancelText:"取消",success:function(o){o.confirm?wx.openSetting({success:function(o){o.authSetting[a]?e(!0):(wx.showToast({title:t.authConfirmFailToast,icon:"none"}),n())}}):(wx.showToast({title:t.authConfirmFailToast,icon:"none"}),n())}})}))}function r(t){var e=t.url,n=t.options;return new Promise((function(t,o){wx.showActionSheet({itemList:[n.saveImage],success:function(){t({url:e,options:n})},fail:function(t){o(t)}})}))}function c(t){var e=t.url,n=t.options;return new Promise((function(t,o){wx.getSetting({success:function(i){i.authSetting[a]?t({url:e,options:n}):wx.authorize({scope:a,success:function(){t({url:e,options:n})},fail:function(){l(n).then((function(){t({url:e,options:n})})).catch(o)}})}})}))}function u(t){var e=t.url,n=t.options;return new Promise((function(t,o){wx.getImageInfo({src:e,success:function(e){t({path:e.path,options:n})},fail:function(t){o(t)}})}))}function d(e){var n=e.path,o=e.options,i=new Promise((function(e,i){wx.saveImageToPhotosAlbum({filePath:n,success:function(){wx.showToast({title:o.saveImageSuccess}),e(!0)},fail:function(e){var n=o.saveImageFail,a=e||{},s=a.errMsg,l=void 0===s?"":s;(l.indexOf("fail system deny")>-1||l.indexOf("fail save error")>-1)&&(n=o.saveImageFailOfAuth),wx.showToast({title:n,icon:"none"}),t.log(e),i(e)}})}));return i}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,n=(0,i.default)((0,i.default)({},s),e);r({url:t,options:n}).then(c).then(u).then(d)}}).call(this,n("44fd")["default"])},"13b9":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.dataShow?n("div",{staticClass:"press-dialog",style:{zIndex:""+t.dataZIndex},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.touchRemove.apply(void 0,arguments)},touchmove:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.preventTouchMove.apply(void 0,arguments)}}},[n("div",{staticClass:"press-dialog__content-wrap"},[n("p",{staticClass:"press-dialog__title"},[t._v(t._s(t.dataTitle))]),t.dataUseScrollView&&t.dataHtmlContent?n("v-uni-scroll-view",{staticClass:"press-dialog__content",attrs:{"scroll-y":"true"},domProps:{innerHTML:t._s(t.dataHtmlContent)}}):t.dataHtmlContent?n("p",{staticClass:"press-dialog__content",domProps:{innerHTML:t._s(t.dataHtmlContent)}}):t._e(),t.dataHtmlContent?t._e():n("p",{staticClass:"press-dialog__content"},[t._v(t._s(t.dataContent))]),t.dataShowField?n("PressField",{attrs:{"custom-class":"press-dialog__field","title-width":"0",placeholder:t.dataFieldPlaceHolder,value:t.dataFieldValue,"model-value":t.dataFieldValue},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChangeField.apply(void 0,arguments)}}}):t._e(),t.dataSrc?n("div",{staticClass:"press-dialog__img-wrap"},[t.dataSrc?n("img",{staticClass:"press-dialog__img",attrs:{"show-menu-by-longpress":!0,src:t.dataSrc},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.handleClickImage.apply(void 0,arguments)},longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.handleLongPressImage.apply(void 0,arguments)}}}):t._e()]):t._e(),n("div",{staticClass:"press-dialog__btn--wrap"},[t.dataCancelText&&t.dataCancelText.length>0?[n("div",{staticClass:"press-dialog__btn--spacing"},[n("PressButton",{attrs:{type:"e-sport-secondary","custom-style":"width: 100px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)}}},[t._v(t._s(t.dataCancelText))])],1),n("PressButton",{attrs:{type:"e-sport-primary-bg",loading:t.mShowButtonLoading,"custom-style":"width: 100px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v(t._s(t.mShowButtonLoading?"":t.dataConfirmText))])]:t.dataConfirmText||t.mShowButtonLoading?[n("PressButton",{attrs:{type:"e-sport-primary-bg",loading:t.mShowButtonLoading,"custom-style":"width: 148px;height: 36px;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v(t._s(t.mShowButtonLoading?"":t.dataConfirmText))])]:t._e()],2)],1)]):t._e()},a=[]},"1bab":function(t,e,n){"use strict";function o(t){var e=t.Dialog,n=t.queue,o=t.currentOptions,i=t.defaultOptions,a=t.updateQueue,s=t.updateCurrentOptions;return e.alert=function(t){return e(t)},e.confirm=function(t){return e(Object.assign({showCancelButton:!0},t))},e.close=function(){n.forEach((function(t){t.close()})),null===a||void 0===a||a([])},e.stopLoading=function(){n.forEach((function(t){t.stopLoading()}))},e.currentOptions=o,e.defaultOptions=i,e.setDefaultOptions=function(t){var n=Object.assign(Object.assign({},o),t);null===s||void 0===s||s(n),e.currentOptions=n},e.resetDefaultOptions=function(){var t=Object.assign({},i);null===s||void 0===s||s(t),e.currentOptions=t},e.resetDefaultOptions(),e}n("03f5"),Object.defineProperty(e,"__esModule",{value:!0}),e.addFunctionForDialog=o,n("414c"),n("79cc")},2591:function(t,e,n){"use strict";n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("414c");var i=o(n("6d7c")),a=o(n("5246")),s=o(n("7d30")),l=n("6df2"),r=n("b9df"),c=n("d068");e.default={name:"PressDialog",components:{PressButton:a.default,PressField:s.default},mixins:[(0,c.getDialogMixin)(l.dialogProps)],props:(0,i.default)({},l.dialogProps),options:{virtualHost:!0,styleIsolation:"shared"},emits:["confirm","cancel","onLongPressImage","onClickImage"],data:function(){return{resolve:"",reject:"",promise:"",mShowButtonLoading:!1,inputValue:""}},watch:{dataFieldValue:{handler:function(t){this.inputValue=t},immediate:!0}},mounted:function(){},methods:{preventTouchMove:function(){},confirm:function(){var t=this;if(2===this.dataDialogType){if(this.mShowButtonLoading)return;this.mShowButtonLoading=!0}"function"===typeof this.dataOnConfirmClick?(0,r.toPromise)(this.dataOnConfirmClick(this)).then((function(e){e&&t.resolveConfirm()})).catch((function(){})):this.resolveConfirm()},resolveConfirm:function(){this.resolve&&this.resolve("confirm"),this.$emit("confirm"),this.remove()},cancel:function(){"function"===typeof this.dataOnClickCancel&&this.dataOnClickCancel(this),"function"===typeof this.reject&&this.reject("cancel"),this.$emit("cancel"),this.remove()},showDialog:function(){var t=this;return this.dataShow=!0,this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n})),this.promise},touchRemove:function(){this.dataCanTouchRemove&&this.remove(),this.$emit("cancel")},remove:function(){this.dataShow=!1,this.mShowButtonLoading=!1},destroy:function(){},handleLongPressImage:function(){"function"===typeof this.dataOnLongPressImage&&this.dataOnLongPressImage(),this.$emit("onLongPressImage")},handleClickImage:function(){"function"===typeof this.dataOnClickImage&&this.dataOnClickImage(),this.$emit("onClickImage")},onChangeField:function(t){this.inputValue=t}}}},"2c03":function(t,e,n){"use strict";n.r(e);var o=n("2591"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"31cd":function(t,e,n){var o=n("9b4f");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("7f6e").default;i("3f84e5f7",o,!0,{sourceMap:!1,shadowMode:!1})},"6df2":function(t,e,n){"use strict";n("03f5"),Object.defineProperty(e,"__esModule",{value:!0}),e.dialogProps=void 0,n("948b");var o=n("db02");e.dialogProps={show:{type:Boolean,default:!1},src:{type:String,default:""},dialogType:{type:[Number,String],default:1},title:{type:String,default:(0,o.t)("dialog.title")},content:{type:String,default:""},canTouchRemove:{type:Boolean,default:!0},confirmText:{type:String,default:(0,o.t)("confirm")},cancelText:{type:String,default:""},onClickCancel:{type:[Function,null],default:null},onConfirmClick:{type:[Function,null],default:null},htmlContent:{type:String,default:""},zIndex:{type:[Number,String],default:"99"},useScrollView:{type:Boolean,default:!1},onClickImage:{type:[Function,null],default:null},onLongPressImage:{type:[Function,null],default:null},showField:{type:Boolean,default:!1},fieldPlaceHolder:{type:String,default:""},fieldValue:{type:String,default:""}}},7076:function(t,e,n){"use strict";n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return i.default}});var i=o(n("863a"))},"78a5":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-wrap"},[t._l(t.dialogTypeList,(function(e,o){return n("demo-block",{key:o,attrs:{title:e.title,"section-style":t.sectionStyle}},t._l(e.list,(function(e){return n("press-cell",{key:e.name,attrs:{title:e.title,"is-link":!0},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onShowDialog(e.name)}}})})),1)})),n("PressDialogComp",{ref:"tip-match-comm-tips-dialog",attrs:{id:"tip-match-comm-tips-dialog"}}),n("PressDialogComp",{attrs:{title:t.t("title"),show:t.show,content:"Some fake news"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm("show")},cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.onCancel("show")}}}),n("PressDialogComp",{attrs:{title:t.t("title"),show:t.show2,content:"Some fake news 2"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm("show2")},cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.onCancel("show2")}}})],2)},a=[]},"7b5e":function(t,e,n){"use strict";n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("2aaa"),n("414c");var i=o(n("7076")),a=o(n("e36d")),s=o(n("8e5b")),l=(n("0951"),function(){return new Promise((function(t){setTimeout((function(){t(!0)}),3e3)}))});e.default={i18n:{"zh-CN":{customButton:"自定义按钮",customContent:"自定义内容",noCancel:"没有取消按钮",noCancelLoading:"没有取消+加载中",image:"图片",html:"HTML内容",field:"输入框",noMask:"点击蒙层不可关闭",longText:"长文本",onlyCaption:"仅限队长报名，发给队长来报名吧！",custom:"自定义",componentCall:"组件调用",multiple:"多例",longContent:function(){return["念奴娇·赤壁怀古","大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。","遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。","<br/>","沁园春·雪","北国风光，千里冰封，万里雪飘。望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。须晴日，看红装素裹，分外妖娆。","江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。","<br/>","沁园春·长沙","独立寒秋，湘江北去，橘子洲头。看万山红遍，层林尽染；漫江碧透，百舸争流。鹰击长空，鱼翔浅底，万类霜天竞自由。怅寥廓，问苍茫大地，谁主沉浮？","携来百侣曾游，忆往昔峥嵘岁月稠。恰同学少年，风华正茂；书生意气，挥斥方遒。指点江山，激扬文字，粪土当年万户侯。曾记否，到中流击水，浪遏飞舟？"].join("<br/>")}},"en-US":{customButton:"Custom Button",customContent:"Custom Content",noCancel:"No Cancel",noCancelLoading:"No Cancel and Loading",image:"Image",html:"HTML Content",field:"Input",noMask:"No Close By Mask",longText:"Long Text",onlyCaption:"Only the captain can sign up, send it to the captain to sign up!",custom:"Custom ",componentCall:"Component Call",multiple:"Multiple",longContent:function(){return["Reflections on the Ancient Red Cliff--To the tune of Niannujiao","","The Great River flows,","Eastward waves sweeping away,","For thousands of years, gallant heroes.","West of the ancient fort, they say, stands","The Red Cliff of the Three-Kingdoms' Duke Zhou.","Rocks pierce the sky, shore-tearing","Waves swirl into piles of snow.","What a glorious sweep of land,","Once a stage for so many a hero!","","My thoughts drift to those years when Zhou","Had newly married the beautiful Qiao,","Vigour and valour aglow.","A feather fan and a silken hat,","He masterminded the fire-attack on the foe--","Over a casual chat","To see their fleet perish, blow by blow.","Back from my mental vagrancy in that bygone age,","I must laugh at myself: letting sentiments grow","Into grey hairs, too soon.","But isn't life a dream, after all？","Let me pledge this cup to the River,","To the Moon."].join("<br/>")}}},components:{PressDialogComp:a.default,PressCell:s.default},data:function(){return{sectionStyle:"",show:!1,show2:!1,curType:"",dialogTypeList:[{title:this.t("basicUsage"),list:[{name:"normal",title:this.t("basicUsage")},{name:"noTouchMove",title:this.t("noMask")}]},{title:this.t("customContent"),list:[{name:"img",title:this.t("image")},{name:"html",title:this.t("html")},{name:"longText",title:this.t("longText")},{name:"field",title:this.t("field")}]},{title:this.t("customButton"),list:[{name:"noCancel",title:this.t("noCancel")},{name:"loading",title:this.t("loadingStatus")},{name:"noCancelLoading",title:this.t("noCancelLoading")}]},{title:this.t("componentCall"),list:[{name:"componentCall",title:this.t("componentCall")},{name:"multiple",title:this.t("multiple")}]}]}},methods:{onShowDialog:function(t){var e=this;if(this.curType=t,"componentCall"!==t){if("multiple"===t)return this.show=!0,void(this.show2=!0);var n=this.t("cancel"),o=1,a=null,s=this.t("onlyCaption"),r="",c="",u=null,d=!0,f=!1,p=!1,h="",m="";"noCancel"===t?n="":"loading"===t?(o=2,a=l):"noCancelLoading"===t?(o=2,n="",a=l):"html"===t?(s="",r="<div>".concat(this.t("custom"),'<span style="color: red;">').concat(this.t("content"),"</span></div>")):"img"===t?c="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_19f9b1ecdd9332c7c0.jpg":"noTouchMove"===t?d=!1:"longText"===t?(s="",r='<div style="max-height:100%;overflow:scroll;">'.concat(this.t("longContent"),"</div>"),f=!0):"field"===t&&(p=!0,h="随便输点什么吧",s="",m="Press UI",d=!1,a=function(t){return t.inputValue?(e.onGTip("内容: ".concat(t.inputValue)),!0):(e.onGTip("请输入内容"),!1)}),i.default.show({context:this,title:this.t("title"),content:s,htmlContent:r,src:c,onLongPressImage:u,confirmText:this.t("confirm"),cancelText:n,dialogType:o,onConfirmClick:a,canTouchRemove:d,useScrollView:f,showField:p,fieldPlaceHolder:h,fieldValue:m}).then((function(){"field"!==t&&e.onGTip("confirm")})).catch((function(){e.onGTip("cancel")}))}else this.show=!0},onConfirm:function(t){this[t]=!1,"field"!==this.curType&&this.onGTip("confirm")},onCancel:function(t){this[t]=!1,this.onGTip("cancel")}}}},"863a":function(t,e,n){"use strict";n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("e681"),n("f1f0"),n("414c");var i=n("6df2"),a=n("1bab"),s=n("f09e"),l=o(n("e36d")),r=[],c=Object.keys(i.dialogProps).reduce((function(t,e){return t[e]=i.dialogProps[e].default,t}),{selector:"#tip-match-comm-tips-dialog"}),u=Object.assign({},c),d=function(t){return(0,s.initFunctionalDialog)({options:t,currentOptions:u,id:"tip-dialog-showCommTipsDialog",dialogComponent:l.default})};function f(t){r=t}function p(t){u=t}d.show=function(t){return d(t)},(0,a.addFunctionForDialog)({Dialog:d,queue:r,currentOptions:u,defaultOptions:c,updateQueue:f,updateCurrentOptions:p});e.default=d},"9b4f":function(t,e,n){var o=n("a8d8");e=o(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 字号 */\n/* color */.press-dialog[data-v-07a324d6]{position:fixed;left:0;right:0;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(0,0,0,.5);z-index:99}.press-dialog__content-wrap[data-v-07a324d6]{position:relative;display:flex;flex-direction:column;align-items:center;width:5.6rem;padding:.48rem;border-radius:.16rem;background-color:#fff;box-sizing:border-box}.press-dialog__title[data-v-07a324d6]{font-size:.32rem;font-weight:600;color:#09134e;text-align:center}.press-dialog__content[data-v-07a324d6]{max-height:5.4rem;font-size:.28rem;color:#596297;line-height:.44rem;margin-top:.24rem;word-break:break-word;overflow:scroll}.press-dialog__img-wrap[data-v-07a324d6]{width:4rem;height:3.6rem;margin:.24rem auto 0;border:.02rem solid #eef0f6;display:flex;align-items:center;justify-content:center}.press-dialog__img[data-v-07a324d6]{width:2.8rem;height:2.8rem}.press-dialog__btn--wrap[data-v-07a324d6]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:.48rem}.press-dialog__btn--spacing[data-v-07a324d6]{margin-right:.32rem;line-height:0}[data-v-07a324d6] .press-dialog__field{margin-top:12px}[data-v-07a324d6] .press-dialog__field .press-field{background:#f3f3f3;border-radius:4px}[data-v-07a324d6] .press-dialog__field .press-field__control{font-size:14px}[data-v-07a324d6] .press-dialog__field .press-cell__title{display:none}',""]),t.exports=e},b290:function(t,e,n){"use strict";var o=n("31cd"),i=n.n(o);i.a},e36d:function(t,e,n){"use strict";n.r(e);var o=n("13b9"),i=n("2c03");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("b290");var s,l=n("87d0"),r=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,"07a324d6",null,!1,o["a"],s);e["default"]=r.exports},f09e:function(t,e,n){"use strict";(function(t){n("03f5");var o=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.initFunctionalDialog=c,n("414c");var i=o(n("6d7c")),a=n("c091"),s=n("8eb5"),l=n("2511");function r(){var t=getCurrentPages();return t[t.length-1]}function c(e){var n=e.options,o=e.currentOptions,c=e.dialogComponent,u=e.id;n=Object.assign(Object.assign({},o),n);var d=n.context||r(),f=(0,a.selectComponent)(d,n.selector);if(delete n.context,delete n.selector,!f&&c&&(f=(0,s.initH5Instance)(c,u)),f){var p=(0,i.default)({},n);(0,l.setData)(f,p);var h=(0,l.setData)(f,p,"showDialog");return h.then((function(t){return Promise.resolve(t)})).catch((function(t){return Promise.reject(t)}))}t.warn("The press-dialog node is not found, please confirm whether the selector and context are correct")}}).call(this,n("44fd")["default"])},fd2e:function(t,e,n){"use strict";n.r(e);var o=n("7b5e"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a}}]);