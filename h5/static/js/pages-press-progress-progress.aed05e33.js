(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-progress-progress"],{"0f19":function(e,t,r){"use strict";var a;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{class:["press-progress",e.customClass],style:e.computed.rootStyle({strokeWidth:e.strokeWidth,trackColor:e.trackColor})},[r("div",{staticClass:"press-progress__portion",style:e.computed.portionStyle({percentage:e.percentage,inactive:e.inactive,color:e.color})},[e.showPivot&&e.computed.pivotText(e.pivotText,e.percentage)?r("div",{staticClass:"press-progress__pivot",style:e.computed.pivotStyle({textColor:e.textColor,pivotColor:e.pivotColor,inactive:e.inactive,color:e.color,right:e.right})},[e._v(e._s(e.computed.pivotText(e.pivotText,e.percentage)))]):e._e()])])},i=[]},"124d":function(e,t,r){var a=r("a8d8");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.van-ellipsis[data-v-37a5672e]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.van-multi-ellipsis--l2[data-v-37a5672e]{-webkit-line-clamp:2}.van-multi-ellipsis--l2[data-v-37a5672e],\n.van-multi-ellipsis--l3[data-v-37a5672e]{-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;text-overflow:ellipsis}.van-multi-ellipsis--l3[data-v-37a5672e]{-webkit-line-clamp:3}.van-clearfix[data-v-37a5672e]:after{clear:both;content:"";display:table}.van-hairline[data-v-37a5672e],\n.van-hairline--bottom[data-v-37a5672e],\n.van-hairline--left[data-v-37a5672e],\n.van-hairline--right[data-v-37a5672e],\n.van-hairline--surround[data-v-37a5672e],\n.van-hairline--top[data-v-37a5672e],\n.van-hairline--top-bottom[data-v-37a5672e]{position:relative}.van-hairline--bottom[data-v-37a5672e]:after,\n.van-hairline--left[data-v-37a5672e]:after,\n.van-hairline--right[data-v-37a5672e]:after,\n.van-hairline--surround[data-v-37a5672e]:after,\n.van-hairline--top-bottom[data-v-37a5672e]:after,\n.van-hairline--top[data-v-37a5672e]:after,\n.van-hairline[data-v-37a5672e]:after{border:0 solid #ebedf0;bottom:-50%;box-sizing:border-box;content:" ";left:-50%;pointer-events:none;position:absolute;right:-50%;top:-50%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:center;transform-origin:center}.van-hairline--top[data-v-37a5672e]:after{border-top-width:1px}.van-hairline--left[data-v-37a5672e]:after{border-left-width:1px}.van-hairline--right[data-v-37a5672e]:after{border-right-width:1px}.van-hairline--bottom[data-v-37a5672e]::after{border-bottom-width:1px}.van-hairline--top-bottom[data-v-37a5672e]::after{border-width:1px 0}.van-hairline--surround[data-v-37a5672e]::after{border-width:1px}.press-ellipsis[data-v-37a5672e]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.press-multi-ellipsis--l2[data-v-37a5672e]{-webkit-line-clamp:2}.press-multi-ellipsis--l2[data-v-37a5672e],\n.press-multi-ellipsis--l3[data-v-37a5672e]{-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;text-overflow:ellipsis}.press-multi-ellipsis--l3[data-v-37a5672e]{-webkit-line-clamp:3}.press-clearfix[data-v-37a5672e]:after{clear:both;content:"";display:table}.press-hairline[data-v-37a5672e],\n.press-hairline--bottom[data-v-37a5672e],\n.press-hairline--left[data-v-37a5672e],\n.press-hairline--right[data-v-37a5672e],\n.press-hairline--surround[data-v-37a5672e],\n.press-hairline--top[data-v-37a5672e],\n.press-hairline--top-bottom[data-v-37a5672e]{position:relative}.press-hairline--bottom[data-v-37a5672e]:after,\n.press-hairline--left[data-v-37a5672e]:after,\n.press-hairline--right[data-v-37a5672e]:after,\n.press-hairline--surround[data-v-37a5672e]:after,\n.press-hairline--top-bottom[data-v-37a5672e]:after,\n.press-hairline--top[data-v-37a5672e]:after,\n.press-hairline[data-v-37a5672e]:after{border:0 solid #ebedf0;bottom:-50%;box-sizing:border-box;content:" ";left:-50%;pointer-events:none;position:absolute;right:-50%;top:-50%;-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:center;transform-origin:center}.press-hairline--top[data-v-37a5672e]:after{border-top-width:1px}.press-hairline--left[data-v-37a5672e]:after{border-left-width:1px}.press-hairline--right[data-v-37a5672e]:after{border-right-width:1px}.press-hairline--bottom[data-v-37a5672e]::after{border-bottom-width:1px}.press-hairline--top-bottom[data-v-37a5672e]::after{border-width:1px 0}.press-hairline--surround[data-v-37a5672e]::after{border-width:1px}.press-progress[data-v-37a5672e]{background:var(--progress-background-color,#ebedf0);border-radius:var(--progress-height,4px);height:var(--progress-height,4px);position:relative}.press-progress__portion[data-v-37a5672e]{background:var(--progress-color,#1989fa);border-radius:inherit;height:100%;left:0;position:absolute}.press-progress__pivot[data-v-37a5672e]{background-color:var(--progress-pivot-background-color,#1989fa);border-radius:1em;box-sizing:border-box;color:var(--progress-pivot-text-color,#fff);font-size:var(--progress-pivot-font-size,10px);line-height:var(--progress-pivot-line-height,1.6);min-width:3.6em;padding:var(--progress-pivot-padding,0 5px);position:absolute;text-align:center;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);word-break:keep-all}',""]),e.exports=t},"31eb":function(e,t,r){"use strict";r.r(t);var a=r("79c5"),o=r.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},"5e81":function(e,t,r){"use strict";r.r(t);var a=r("0f19"),o=r("795c");for(var i in o)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return o[e]}))}(i);r("d1f7");var n,s=r("87d0"),l=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"37a5672e",null,!1,a["a"],n);t["default"]=l.exports},"5f33":function(e,t,r){var a=r("124d");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var o=r("7f6e").default;o("1f76511e",a,!0,{sourceMap:!1,shadowMode:!1})},7229:function(e,t,r){"use strict";r("03f5");var a=r("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r("b47f"),i=a(r("12ef"));function n(e,t){return e||"".concat(t,"%")}function s(e){return(0,o.style)({height:e.strokeWidth?i.default.addUnit(e.strokeWidth):"",background:e.trackColor})}function l(e){return(0,o.style)({background:e.inactive?"#cacaca":e.color,width:e.percentage?"".concat(e.percentage,"%"):""})}function d(e){return(0,o.style)({color:e.textColor,right:"".concat(e.right,"px"),background:e.pivotColor?e.pivotColor:e.inactive?"#cacaca":e.color})}t.default={pivotText:n,rootStyle:s,portionStyle:l,pivotStyle:d}},"795c":function(e,t,r){"use strict";r.r(t);var a=r("9168"),o=r.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(i);t["default"]=o.a},"79c5":function(e,t,r){"use strict";r("03f5");var a=r("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r("5e81"));t.default={i18n:{"zh-CN":{title2:"置灰",title3:"样式定制",strokeWidth:"线条粗细"},"en-US":{title2:"Inactive",title3:"Custom Style",strokeWidth:"Stroke Width"}},components:{PressProgress:o.default},data:function(){return{progressStyle:"margin: 20px 0;"}},methods:{}}},9168:function(e,t,r){"use strict";r("03f5");var a=r("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(r("2c6b"));r("948b"),r("414c"),r("faa0"),r("7475");var i=r("d33c"),n=r("dc16"),s=a(r("7229"));t.default={name:"PressProgress",props:{inactive:Boolean,percentage:{type:Number,default:0,observer:"setLeft"},pivotText:{type:String,default:""},pivotColor:{type:String,default:""},trackColor:{type:String,default:""},showPivot:{type:Boolean,default:!0},color:{type:String,default:i.BLUE},textColor:{type:String,default:"#fff"},strokeWidth:{type:[Number,String],default:4},customClass:{type:String,default:""}},emits:[],data:function(){return{right:0,computed:s.default}},mounted:function(){this.setLeft()},methods:{setLeft:function(){var e=this;Promise.all([(0,n.getRect)(this,".press-progress"),(0,n.getRect)(this,".press-progress__pivot")]).then((function(t){var r=(0,o.default)(t,2),a=r[0],i=r[1];a&&i&&(e.right=i.width*(e.percentage-100)/100)}))}}}},"9c83":function(e,t,r){"use strict";r.r(t);var a=r("f616"),o=r("31eb");for(var i in o)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return o[e]}))}(i);var n,s=r("87d0"),l=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"b9d326fa",null,!1,a["a"],n);t["default"]=l.exports},d1f7:function(e,t,r){"use strict";var a=r("5f33"),o=r.n(a);o.a},d33c:function(e,t,r){"use strict";r("03f5"),Object.defineProperty(t,"__esModule",{value:!0}),t.WHITE=t.RED=t.ORANGE=t.GREEN=t.GRAY_DARK=t.GRAY=t.COLOR_MAP=t.BLUE=void 0;var a=t.RED="#ee0a24",o=t.BLUE="#1989fa",i=t.WHITE="#fff",n=t.GREEN="#07c160",s=t.ORANGE="#ff976a",l=t.GRAY="#323233",d=t.GRAY_DARK="#969799";t.COLOR_MAP={RED:a,BLUE:o,WHITE:i,GREEN:n,ORANGE:s,GRAY:l,GRAY_DARK:d}},f616:function(e,t,r){"use strict";var a;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return a}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"demo-wrap"},[r("demo-block",{attrs:{title:e.t("basicUsage")}},[r("div",{style:e.progressStyle},[r("press-progress",{attrs:{percentage:50}})],1)]),r("demo-block",{attrs:{title:e.t("strokeWidth")}},[r("div",{style:e.progressStyle},[r("press-progress",{attrs:{percentage:50,"stroke-width":8}})],1)]),r("demo-block",{attrs:{title:e.t("title2")}},[r("div",{style:e.progressStyle},[r("press-progress",{attrs:{percentage:50,inactive:!0}})],1)]),r("demo-block",{attrs:{title:e.t("title3")}},[r("div",{style:e.progressStyle},[r("press-progress",{attrs:{"pivot-text":e.t("orange"),color:"#f2826a",percentage:25}})],1),r("div",{style:e.progressStyle},[r("press-progress",{attrs:{"pivot-text":e.t("red"),color:"#ee0a24",percentage:50}})],1),r("div",{style:e.progressStyle},[r("press-progress",{attrs:{percentage:75,"pivot-text":e.t("purple"),"pivot-color":"#7232dd",color:"linear-gradient(to right, #be99ff, #7232dd)"}})],1)])],1)},i=[]}}]);