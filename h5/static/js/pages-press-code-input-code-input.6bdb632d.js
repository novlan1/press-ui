(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-code-input-code-input"],{"025d":function(t,e,n){"use strict";var a=n("b225"),r=n.n(a);r.a},"0b4e":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"press-code-input"},[t._l(t.codeLength,(function(e,a){return n("div",{key:a,staticClass:"press-code-input__item",style:[t.itemStyle(a)]},[t.dot&&t.codeArray.length>a?n("div",{staticClass:"press-code-input__item__dot"}):n("span",{style:{fontSize:t.addUnit(t.fontSize),fontWeight:t.bold?"bold":"normal",color:t.color}},[t._v(t._s(t.codeArray[a]||""))]),"line"===t.mode?n("div",{staticClass:"press-code-input__item__line",style:[t.lineStyle]}):t._e(),t.isFocus&&t.codeArray.length===a?n("div",{staticClass:"press-code-input__item__cursor",style:{backgroundColor:t.color}}):t._e()])})),n("v-uni-input",{staticClass:"press-code-input__input",style:{height:t.addUnit(t.size)},attrs:{disabled:t.disabledKeyboard,type:"number",focus:t.focus,value:t.inputValue,maxlength:t.maxLength,adjustPosition:t.adjustPosition},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputHandler.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.isFocus=!0},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.isFocus=!1}}})],2)},i=[]},"0cc9":function(t,e,n){"use strict";n.r(e);var a=n("72d8"),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},"1e63":function(t,e,n){"use strict";n("03f5");var a=n("b499").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("2aaa"),n("948b"),n("e8e7"),n("e6c9");var r=n("09f0"),i=a(n("471b"));e.default={name:"PressCodeInput",mixins:[i.default],emits:["change","finish","input"],data:function(){return{inputValue:"",isFocus:this.focus}},computed:{codeLength:function(){var t=new Array(Number(this.maxLength));return t},itemStyle:function(){var t=this;return function(e){var n={width:(0,r.addUnit)(t.size),height:(0,r.addUnit)(t.size)};return"box"===t.mode&&(n.border="".concat(t.hairline?.5:1,"px solid ").concat(t.borderColor),0===(0,i.getPx)(t.space)&&(0===e&&(n.borderTopLeftRadius="3px",n.borderBottomLeftRadius="3px"),e===t.codeLength.length-1&&(n.borderTopRightRadius="3px",n.borderBottomRightRadius="3px"),e!==t.codeLength.length-1&&(n.borderRight="none"))),e!==t.codeLength.length-1?n.marginRight=(0,r.addUnit)(t.space):n.marginRight=0,n}},codeArray:function(){return String(this.inputValue).split("")},lineStyle:function(){var t={};return t.height=this.hairline?"2px":"4px",t.width=(0,r.addUnit)(this.size),t.backgroundColor=this.borderColor,t}},watch:{value:{immediate:!0,handler:function(t){this.inputValue=String(t).substring(0,this.maxLength)||""}}},methods:{addUnit:r.addUnit,inputHandler:function(t){var e=this,n=t.detail||t.target,a=n.value;this.inputValue=a,this.disabledDot&&this.$nextTick((function(){e.inputValue=a.replace(".","")})),this.$emit("change",a),this.$emit("input",a),String(a).length>=Number(this.maxLength)&&this.$emit("finish",a)}}}},"471b":function(t,e,n){"use strict";n("03f5");var a=n("b499").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,e.getPx=i,n("948b"),n("c683"),n("e8e7"),n("745e");var r=a(n("a570"));e.default={props:{adjustPosition:{type:Boolean,default:!0},maxLength:{type:[String,Number],default:6},dot:{type:Boolean,default:!1},mode:{type:String,default:"box"},hairline:{type:Boolean,default:!1},space:{type:[String,Number],default:10},value:{type:[String,Number],default:""},focus:{type:Boolean,default:!1},bold:{type:Boolean,default:!1},color:{type:String,default:"#606266"},fontSize:{type:[String,Number],default:18},size:{type:[String,Number],default:35},disabledKeyboard:{type:Boolean,default:!1},borderColor:{type:String,default:"#c9cacc"},disabledDot:{type:Boolean,default:!0}}};function i(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r.number("".concat(t))?e?"".concat(t,"px"):Number(t):/(rpx|upx)$/.test("".concat(t))?e?"".concat(uni.upx2px(parseInt("".concat(t))),"px"):Number(uni.upx2px(parseInt("".concat(t)))):e?"".concat(parseInt("".concat(t)),"px"):parseInt("".concat(t))}},"475a":function(t,e,n){var a=n("a8d8");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.demo-wrap[data-v-2b2e5b30]{padding-bottom:30px}',""]),t.exports=e},"597b":function(t,e,n){"use strict";n.r(e);var a=n("0b4e"),r=n("9ece");for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("025d");var o,u=n("87d0"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"bf0e4574",null,!1,a["a"],o);e["default"]=s.exports},"61ee":function(t,e,n){"use strict";n.r(e);var a=n("900a"),r=n("0cc9");for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("bf24");var o,u=n("87d0"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"2b2e5b30",null,!1,a["a"],o);e["default"]=s.exports},"72d8":function(t,e,n){"use strict";(function(t){n("03f5");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("597b"));e.default={i18n:{"zh-CN":{mode:"模式",maxLength:"自定义长度",space:"自定义间距",hairline:"细边框",style:"自定义样式",dot:"隐藏输入内容",autoFocus:"自动获取焦点"},"en-US":{mode:"Mode",maxLength:"Max Length",space:"Space",hairline:"Hairline",style:"Custom Style",dot:"Dot",autoFocus:"Auto Focus"}},components:{PressCodeInput:r.default},data:function(){return{value:"",valueMode:"",valueSpace:"",valueMaxLength:"",valueHairline:"",valueHairline2:"",valueStyle:"",valueDot:"",valueFocus:""}},methods:{change:function(e){t.log("内容改变，当前值为：".concat(e))},finish:function(e){t.log("输入结束，当前值为：".concat(e))}}}}).call(this,n("44fd")["default"])},"900a":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-wrap"},[n("demo-block",{attrs:{title:t.t("basicUsage")}},[n("PressCodeInput",{on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)},finish:function(e){arguments[0]=e=t.$handleEvent(e),t.finish.apply(void 0,arguments)}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),n("demo-block",{attrs:{title:t.t("mode")}},[n("PressCodeInput",{attrs:{mode:"line"},model:{value:t.valueMode,callback:function(e){t.valueMode=e},expression:"valueMode"}})],1),n("demo-block",{attrs:{title:t.t("maxLength")}},[n("PressCodeInput",{attrs:{"max-length":4},model:{value:t.valueMaxLength,callback:function(e){t.valueMaxLength=e},expression:"valueMaxLength"}})],1),n("demo-block",{attrs:{title:t.t("space")}},[n("PressCodeInput",{attrs:{space:0,"max-length":4},model:{value:t.valueSpace,callback:function(e){t.valueSpace=e},expression:"valueSpace"}})],1),n("demo-block",{attrs:{title:t.t("hairline")}},[n("PressCodeInput",{attrs:{hairline:!0,"max-length":4},model:{value:t.valueHairline,callback:function(e){t.valueHairline=e},expression:"valueHairline"}})],1),n("demo-block",{attrs:{title:t.t("style")}},[n("PressCodeInput",{attrs:{color:"#f56c6c","border-color":"#f56c6c","max-length":4},model:{value:t.valueStyle,callback:function(e){t.valueStyle=e},expression:"valueStyle"}})],1),n("demo-block",{attrs:{title:t.t("dot")}},[n("PressCodeInput",{attrs:{dot:!0,"max-length":4},model:{value:t.valueDot,callback:function(e){t.valueDot=e},expression:"valueDot"}})],1),n("demo-block",{attrs:{title:t.t("autoFocus")}},[n("PressCodeInput",{attrs:{focus:!0,"max-length":4},model:{value:t.valueFocus,callback:function(e){t.valueFocus=e},expression:"valueFocus"}})],1)],1)},i=[]},"9b2c":function(t,e,n){var a=n("a8d8");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.press-code-input[data-v-bf0e4574]{display:flex;position:relative;overflow:hidden}.press-code-input__item[data-v-bf0e4574]{display:flex;justify-content:center;align-items:center;position:relative}.press-code-input__item__text[data-v-bf0e4574]{font-size:15px;color:#606266}.press-code-input__item__dot[data-v-bf0e4574]{width:7px;height:7px;border-radius:100px;background-color:#606266}.press-code-input__item__line[data-v-bf0e4574]{position:absolute;bottom:0;height:4px;border-radius:100px;width:40px;background-color:#606266}.press-code-input__item__cursor[data-v-bf0e4574]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:1px;height:40%;-webkit-animation:1s press-cursor-flicker-data-v-bf0e4574 infinite;animation:1s press-cursor-flicker-data-v-bf0e4574 infinite}.press-code-input__input[data-v-bf0e4574]{position:absolute;left:-750px;width:1500px;top:0;background-color:initial;text-align:left;border:0;outline:none}@-webkit-keyframes press-cursor-flicker-data-v-bf0e4574{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes press-cursor-flicker-data-v-bf0e4574{0%{opacity:0}50%{opacity:1}100%{opacity:0}}',""]),t.exports=e},"9ece":function(t,e,n){"use strict";n.r(e);var a=n("1e63"),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},a570:function(t,e,n){"use strict";n("03f5");var a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.amount=b,e.array=$,e.carNo=v,e.chinese=h,e.code=C,e.contains=x,e.date=s,e.dateISO=c,e.digits=f,e.email=i,e.empty=S,e.enOrNum=g,e.func=j,e.idCard=p,e.image=P,e.jsonString=A,e.landline=k,e.letter=m,e.mobile=o,e.number=l,e.object=w,e.promise=z,e.range=y,e.rangeLength=_,e.regExp=M,e.string=d,e.url=u,e.video=L;var r=a(n("3eee"));function i(t){return/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)}function o(t){return/^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(t)}function u(t){return/^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(t)}function s(t){return!!t&&(l(t)&&(t=+t),!/Invalid|NaN/.test(new Date(t).toString()))}function c(t){return/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/.test(t)}function l(t){return/^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(t)}function d(t){return"string"===typeof t}function f(t){return/^\d+$/.test(t)}function p(t){return/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(t)}function v(t){var e=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/,n=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;return 7===t.length?n.test(t):8===t.length&&e.test(t)}function b(t){return/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(t)}function h(t){var e=/^[\u4e00-\u9fa5]+$/gi;return e.test(t)}function m(t){return/^[a-zA-Z]*$/.test(t)}function g(t){var e=/^[0-9a-zA-Z]*$/g;return e.test(t)}function x(t,e){return t.indexOf(e)>=0}function y(t,e){return t>=e[0]&&t<=e[1]}function _(t,e){return t.length>=e[0]&&t.length<=e[1]}function k(t){var e=/^\d{3,4}-\d{7,8}(-\d{3,4})?$/;return e.test(t)}function S(t){switch((0,r.default)(t)){case"undefined":return!0;case"string":if(0==t.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,"").length)return!0;break;case"boolean":if(!t)return!0;break;case"number":if(0===t||isNaN(t))return!0;break;case"object":if(null===t||0===t.length)return!0;for(var e in t)return!1;return!0}return!1}function A(t){if("string"===typeof t)try{var e=JSON.parse(t);return!("object"!==(0,r.default)(e)||!e)}catch(n){return!1}return!1}function $(t){return"function"===typeof Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)}function w(t){return"[object Object]"===Object.prototype.toString.call(t)}function C(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return new RegExp("^\\d{".concat(e,"}$")).test(t)}function j(t){return"function"===typeof t}function z(t){return w(t)&&j(t.then)&&j(t.catch)}function P(t){var e=t.split("?")[0],n=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;return n.test(e)}function L(t){var e=/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;return e.test(t)}function M(t){return t&&"[object RegExp]"===Object.prototype.toString.call(t)}n("9bd3"),n("144c"),n("f1f0"),n("414c"),n("291e"),n("5654"),n("e8e7"),n("5fb0"),n("745e"),n("6905"),n("e6c9")},b225:function(t,e,n){var a=n("9b2c");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("7f6e").default;r("7b247742",a,!0,{sourceMap:!1,shadowMode:!1})},bf24:function(t,e,n){"use strict";var a=n("dbb7"),r=n.n(a);r.a},dbb7:function(t,e,n){var a=n("475a");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("7f6e").default;r("66ceda6e",a,!0,{sourceMap:!1,shadowMode:!1})}}]);