(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-link-link"],{"0d4b":function(t,e,n){"use strict";n.r(e);var i=n("1471"),o=n("2d7c");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("c043");var a,c=n("87d0"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"282ee616",null,!1,i["a"],a);e["default"]=u.exports},1471:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"press-link",style:t.linkStyle,on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.openLink.apply(void 0,arguments)}}},[t._v(t._s(t.text))])},r=[]},"17c4":function(t,e,n){"use strict";n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("29c8");e.default={props:{customStyle:{type:String,default:""},color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:15},underline:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""},text:{type:String,default:""}}}},2885:function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.press-link[data-v-282ee616]{line-height:1;display:flex;flex-direction:row;flex-wrap:wrap;flex:1}',""]),t.exports=e},"2d7c":function(t,e,n){"use strict";n.r(e);var i=n("942f"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"306d":function(t,e,n){var i=n("2885");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("7f6e").default;o("cb697e72",i,!0,{sourceMap:!1,shadowMode:!1})},"8d0e":function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.demo-wrap[data-v-62caa8be]  .section-content{margin:0 20px}',""]),t.exports=e},"942f":function(t,e,n){"use strict";n("13a4");var i=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("17c4")),r=n("09f0"),a=n("b47f");n("5e91"),e.default={name:"PressLink",mixins:[o.default],emits:["click"],computed:{linkStyle:function(){var t={color:this.color,fontSize:(0,r.addUnit)(this.fontSize),lineHeight:(0,r.addUnit)((0,r.getPx)(this.fontSize)+2),textDecoration:this.underline?"underline":"none"};return(0,a.style)([t,this.customStyle])}},methods:{openLink:function(){window.open(this.href),this.$emit("click")}}}},"9a5e":function(t,e,n){"use strict";var i=n("c41e"),o=n.n(i);o.a},a509:function(t,e,n){"use strict";(function(t){n("13a4");var i=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("0d4b"));e.default={i18n:{"zh-CN":{openDocs:"打开 Press UI 文档",underline:"下划线",customColor:"自定义颜色"},"en-US":{openDocs:"Go to Press UI docs",underline:"Underline",customColor:"Custom Color"}},components:{PressLink:o.default},data:function(){return{}},methods:{click:function(){t.log("[click]")}}}}).call(this,n("44fd")["default"])},adc1:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-wrap"},[n("demo-block",{attrs:{title:t.t("basicUsage")}},[n("PressLink",{attrs:{text:t.t("openDocs"),href:"https://novlan1.github.io/press-ui/"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}})],1),n("demo-block",{attrs:{title:t.t("underline")}},[n("PressLink",{attrs:{underline:!0,text:t.t("openDocs"),href:"https://novlan1.github.io/press-ui/"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}})],1),n("demo-block",{attrs:{title:t.t("customColor")}},[n("PressLink",{attrs:{text:t.t("openDocs"),color:"#19be6b",href:"https://novlan1.github.io/press-ui/"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}})],1)],1)},r=[]},c043:function(t,e,n){"use strict";var i=n("306d"),o=n.n(i);o.a},c2a8:function(t,e,n){"use strict";n.r(e);var i=n("adc1"),o=n("f5b9");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("9a5e");var a,c=n("87d0"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"62caa8be",null,!1,i["a"],a);e["default"]=u.exports},c41e:function(t,e,n){var i=n("8d0e");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("7f6e").default;o("44eb566a",i,!0,{sourceMap:!1,shadowMode:!1})},f5b9:function(t,e,n){"use strict";n.r(e);var i=n("a509"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a}}]);