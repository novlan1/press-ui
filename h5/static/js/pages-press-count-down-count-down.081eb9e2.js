(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-count-down-count-down"],{"19f8":function(t,e,n){"use strict";var i=n("5d4f"),o=n.n(i);o.a},"20e5":function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* color */.press-count-down[data-v-6cacb330]{color:var(--count-down-text-color,#323233);font-size:var(--count-down-font-size,14px);line-height:var(--count-down-line-height,20px)}',""]),t.exports=e},"42cb":function(t,e,n){"use strict";n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("29c8");var i=n("7212");function o(t){return setTimeout(t,30)}e.default={name:"PressCountDown",props:{useSlot:Boolean,millisecond:Boolean,time:{type:Number,default:0},format:{type:String,default:"HH:mm:ss"},autoStart:{type:Boolean,default:!0}},emits:["change","finish"],data:function(){return{formattedTime:"0",remain:0}},computed:{timeData:function(){var t=(0,i.parseTimeData)(this.remain);return t}},watch:{time:{handler:function(t){var e=this.remain,n=this.millisecond;(n||Math.floor(t/1e3)!==Math.floor(e/1e3)&&Math.round(t/1e3)!==Math.round(e/1e3))&&this.reset()},immediate:!0}},destroyed:function(){this.onDestroyed()},unmounted:function(){this.onDestroyed()},methods:{onDestroyed:function(){clearTimeout(this.tid),this.tid=null},start:function(){this.counting||(this.counting=!0,this.endTime=Date.now()+this.remain,this.tick())},pause:function(){this.counting=!1,clearTimeout(this.tid)},reset:function(){this.pause(),this.remain=this.time,this.setRemain(this.remain),this.autoStart&&this.start()},tick:function(){this.millisecond?this.microTick():this.macroTick()},microTick:function(){var t=this;this.tid=o((function(){t.setRemain(t.getRemain()),0!==t.remain&&t.microTick()}))},macroTick:function(){var t=this;this.tid=o((function(){var e=t.getRemain();(0,i.isSameSecond)(e,t.remain)&&0!==e||t.setRemain(e),0!==t.remain&&t.macroTick()}))},getRemain:function(){return Math.max(this.endTime-Date.now(),0)},setRemain:function(t){this.remain=t;var e=(0,i.parseTimeData)(t);this.useSlot&&this.$emit("change",e),this.formattedTime=(0,i.parseFormat)(this.format,e),0===t&&(this.pause(),this.$emit("finish"))}}}},"5d4f":function(t,e,n){var i=n("20e5");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("7f6e").default;o("2fe7dce2",i,!0,{sourceMap:!1,shadowMode:!1})},"67bf":function(t,e,n){var i=n("f2cb");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("7f6e").default;o("04b9adb6",i,!0,{sourceMap:!1,shadowMode:!1})},7212:function(t,e,n){"use strict";function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n="".concat(t);while(n.length<e)n="0".concat(n);return n}n("13a4"),Object.defineProperty(e,"__esModule",{value:!0}),e.isSameSecond=l,e.parseFormat=u,e.parseTimeData=c,n("6ccc"),n("3a78"),n("0527");var o=1e3,a=60*o,s=60*a,r=24*s;function c(t){var e=Math.floor(t/r),n=Math.floor(t%r/s),i=Math.floor(t%s/a),c=Math.floor(t%a/o),u=Math.floor(t%o);return{days:e,hours:n,minutes:i,seconds:c,milliseconds:u}}function u(t,e){var n=e.days,o=e.hours,a=e.minutes,s=e.seconds,r=e.milliseconds;return-1===t.indexOf("DD")?o+=24*n:t=t.replace("DD",i(n)),-1===t.indexOf("HH")?a+=60*o:t=t.replace("HH",i(o)),-1===t.indexOf("mm")?s+=60*a:t=t.replace("mm",i(a)),-1===t.indexOf("ss")?r+=1e3*s:t=t.replace("ss",i(s)),t.replace("SSS",i(r,3))}function l(t,e){return Math.floor(t/1e3)===Math.floor(e/1e3)}},7906:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-wrap"},[n("demo-block",{attrs:{title:t.t("basicUsage"),"section-style":t.sectionStyle}},[n("press-count-down",{attrs:{time:t.time}})],1),n("demo-block",{attrs:{title:t.t("customFormat"),"section-style":t.sectionStyle}},[n("press-count-down",{attrs:{time:t.time,format:t.t("formatWithDay")}})],1),n("demo-block",{attrs:{title:t.t("millisecond"),"section-style":t.sectionStyle}},[n("press-count-down",{attrs:{time:t.time,millisecond:!0,format:"HH:mm:ss:SSS"}})],1),n("demo-block",{attrs:{title:t.t("customStyle"),"section-style":t.sectionStyle}},[n("press-count-down",{attrs:{"use-slot":!0,time:t.time},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onChange.apply(void 0,arguments)}},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.timeData;return[n("span",{staticClass:"item"},[t._v(t._s(i.hours))]),n("span",{staticClass:"item"},[t._v(t._s(i.minutes))]),n("span",{staticClass:"item"},[t._v(t._s(i.seconds))])]}}])})],1),n("demo-block",{attrs:{title:t.t("manualControl"),"section-style":t.sectionStyle}},[n("press-count-down",{ref:"controlCountDown",attrs:{id:"controlCountDown",millisecond:!0,time:3e3,"auto-start":!1,format:"ss:SSS"},on:{finish:function(e){arguments[0]=e=t.$handleEvent(e),t.finished.apply(void 0,arguments)}}})],1),n("press-grid",{attrs:{clickable:!0,"column-num":3}},[n("press-grid-item",{attrs:{text:t.t("start"),icon:"play-circle-o"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.start.apply(void 0,arguments)}}}),n("press-grid-item",{attrs:{text:t.t("pause"),icon:"pause-circle-o"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.pause.apply(void 0,arguments)}}}),n("press-grid-item",{attrs:{text:t.t("reset"),icon:"replay"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.reset.apply(void 0,arguments)}}})],1)],1)},a=[]},"8a42":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"press-count-down"},[t.useSlot?t._t("default",[n("span",[t._v(t._s(t.formattedTime))])],{timeData:t.timeData}):[t._v(t._s(t.formattedTime))]],2)},a=[]},"8c16":function(t,e,n){"use strict";n.r(e);var i=n("7906"),o=n("dcfd");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("d23f");var s,r=n("87d0"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"aa4c4ce6",null,!1,i["a"],s);e["default"]=c.exports},b619:function(t,e,n){"use strict";n("13a4");var i=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("fcae")),a=i(n("49d6")),s=i(n("7534")),r=n("c091"),c=n("2511");e.default={i18n:{"zh-CN":{millisecond:"毫秒级渲染",customStyle:"自定义样式",customFormat:"自定义格式",manualControl:"手动控制",formatWithDay:"DD 天 HH 时 mm 分 ss 秒",reset:"重置",pause:"暂停",start:"开始",finished:"倒计时结束"},"en-US":{millisecond:"Millisecond",customStyle:"Custom Style",customFormat:"Custom Format",manualControl:"Manual Control",formatWithDay:"DD Day, HH:mm:ss",reset:"Reset",pause:"Pause",start:"Start",finished:"Finished"}},components:{PressCountDown:o.default,PressGrid:a.default,PressGridItem:s.default},data:function(){return{time:108e6,sectionStyle:"margin: 0 12px 20px;"}},methods:{onChange:function(){},start:function(){var t=(0,r.selectComponent)(this,"#controlCountDown");(0,c.setData)(t,null,"start")},pause:function(){var t=(0,r.selectComponent)(this,"#controlCountDown");(0,c.setData)(t,null,"pause")},reset:function(){var t=(0,r.selectComponent)(this,"#controlCountDown");(0,c.setData)(t,null,"reset")},finished:function(){}}}},d23f:function(t,e,n){"use strict";var i=n("67bf"),o=n.n(i);o.a},dcfd:function(t,e,n){"use strict";n.r(e);var i=n("b619"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},e655:function(t,e,n){"use strict";n.r(e);var i=n("42cb"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},f2cb:function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.item[data-v-aa4c4ce6]{display:inline-block;width:22px;margin-right:5px;color:#fff;font-size:12px;text-align:center;background-color:#1989fa;border-radius:2px}',""]),t.exports=e},fcae:function(t,e,n){"use strict";n.r(e);var i=n("8a42"),o=n("e655");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("19f8");var s,r=n("87d0"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6cacb330",null,!1,i["a"],s);e["default"]=c.exports}}]);