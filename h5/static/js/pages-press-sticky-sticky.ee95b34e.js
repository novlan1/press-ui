(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-sticky-sticky"],{"0088":function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,"uni-page-body[data-v-495ac76b]{height:100%;overflow:auto}",""]),t.exports=e},"0a5a":function(t,e,n){"use strict";n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("b47f");function a(t){return(0,i.style)({color:t.color,"background-color":t.backgroundColor,background:t.background})}e.default={rootStyle:a}},"13d4":function(t,e,n){"use strict";var i=n("6c10"),a=n.n(i);a.a},"15f9":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"press-notice-bar-index"},[t.show?n("div",{class:t.noticeBarClass,style:t.noticeBarStyle,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.leftIcon?n("PressIconPlus",{class:[t.leftIconClass],attrs:{name:t.leftIcon,"custom-class":t.leftIconCustomClass}}):t._t("left-icon"),n("div",{staticClass:"press-notice-bar__wrap"},[n("div",{class:"press-notice-bar__content "+(!1!==t.scrollable||t.wrapable?"":"press-ellipsis"),style:t.animationStyle},[t._v(t._s(t.text)),t.text?t._e():t._t("default")],2)]),"closeable"===t.mode?n("PressIconPlus",{class:[t.rightIconClass],attrs:{"custom-class":t.rightIconCustomClass,name:"cross"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon.apply(void 0,arguments)}}}):"link"===t.mode?[t.isNotInUni?n("PressIconPlus",{class:[t.rightIconClass],attrs:{"custom-class":t.rightIconCustomClass,name:"arrow"}}):n("v-uni-navigator",{attrs:{url:t.url,"open-type":t.openType}},[n("PressIconPlus",{class:[t.rightIconClass],attrs:{"custom-class":t.rightIconCustomClass,name:"arrow"}})],1)]:t._t("right-icon")],2):t._e()])},r=[]},"18e7":function(t,e,n){"use strict";n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("b47f"),a=n("09f0");function r(t){return(0,i.style)({height:t.fixed?(0,a.addUnit)(t.height):"","z-index":t.zIndex})}function o(t){return(0,i.style)({transform:t.transform?"translate3d(0, ".concat(t.transform,"px, 0)"):"",top:t.fixed?(0,a.addUnit)(t.offsetTop):"","z-index":t.zIndex})}e.default={containerStyle:r,wrapStyle:o}},"2bb4":function(t,e,n){"use strict";function i(){var t=getCurrentPages();return t[t.length-1]}n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.getCurrentPage=i},"33de":function(t,e,n){"use strict";n.r(e);var i=n("9c27"),a=n("3bf7");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("13d4");var o,s=n("921e"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"41c68a38",null,!1,i["a"],o);e["default"]=c.exports},"397f":function(t,e,n){"use strict";(function(t){n("fcdb");var i=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a7f5"),n("a88c"),n("06e6"),n("8999"),n("45be"),n("b41b"),n("6058"),n("44d4"),n("093a"),n("15ea");var a=i(n("2c6b")),r=(i(n("786b")),i(n("6d7c"))),o=i(n("12ef")),s=i(n("18e7")),c=n("dc16"),l=n("5e91"),d=n("d4e4"),u=n("6a32"),f=n("c5c5"),p=n("e8b6"),h=n("9466"),b=".press-sticky";(0,u.pageScrollMixin)((function(t){null===this.scrollTop&&this.onScroll(t)})),e.default={name:"PressSticky",options:(0,r.default)({},h.defaultOptions),mixins:[(0,f.BindEventMixin)((function(t){this.scroller||(this.scroller=(0,p.getScroller)(this.$el)),t(this.scroller,"scroll",this.onScroll,!0),t(this.scroller,"touchmove",this.onScroll,!0),this.onScroll()}))],props:(0,r.default)((0,r.default)({},h.defaultProps),{},{zIndex:{type:Number,default:99},offsetTop:{type:Number,default:0},disabled:{type:Boolean},container:{type:[Function,null],default:null},scrollTop:{type:[Number,null],default:null}}),emits:["scroll"],data:function(){return{height:0,fixed:!1,transform:0,scrollTopData:this.scrollTop}},computed:{containerStyle:function(){var t=this.fixed,e=this.height,n=this.zIndex,i=s.default.containerStyle({fixed:t,height:e,zIndex:n});return i},wrapStyle:function(){var t=this.fixed,e=this.offsetTop,n=this.transform,i=this.zIndex,a=s.default.wrapStyle({fixed:t,offsetTop:e,transform:n,zIndex:i});return a},wrapClass:function(){var t=this.fixed;return o.default.bem2("sticky-wrap",{fixed:t})}},watch:{offsetTop:{handler:function(){this.onScroll()}},disabled:{handler:function(){this.onScroll()}},container:{handler:function(){this.onScroll()}},scrollTop:{handler:function(t){this.onScroll({scrollTop:t}),this.scrollTopData=t}}},created:function(){},mounted:function(){this.scrollTopData=this.scrollTop,this.onScroll()},methods:{setData:function(t){var e=this;Object.keys(t).forEach((function(n){e[n]=t[n]}))},onScroll:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.scrollTop,r=this.container,o=this.offsetTop,s=this.disabled;s?this.setDataAfterDiff({fixed:!1,transform:0}):(this.scrollTopData=i||this.scrollTopData,"function"===typeof r&&r()?Promise.all([(0,c.getRect)(this,b),this.getContainerRect()]).then((function(t){var n=(0,a.default)(t,2),i=n[0],r=n[1];i&&r&&o+i.height>r.height+r.top?e.setDataAfterDiff({fixed:!1,transform:r.height-i.height}):i&&o>=i.top?e.setDataAfterDiff({fixed:!0,height:i.height,transform:0}):e.setDataAfterDiff({fixed:!1,transform:0})})).catch((function(e){t.warn("error",e)})):(0,c.getRect)(this,b).then((function(t){(0,d.isDef)(t)&&(o>=t.top?(e.setDataAfterDiff({fixed:!0,height:t.height}),e.transform=0):e.setDataAfterDiff({fixed:!1}))})))},setDataAfterDiff:function(t){var e=this;(0,l.nextTick)((function(){var n=Object.keys(t).reduce((function(n,i){return t[i]!==e[i]&&(n[i]=t[i]),n}),{});Object.keys(n).length>0&&e.setData(n),e.$emit("scroll",{scrollTop:e.scrollTopData,isFixed:t.fixed||e.fixed})}))},getContainerRect:function(){var t,e=this.container(),n=e.getBoundingClientRect();return t=Promise.resolve(n),t}}}}).call(this,n("44fd")["default"])},"3bf7":function(t,e,n){"use strict";n.r(e);var i=n("397f"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"411e":function(t,e,n){"use strict";n.r(e);var i=n("15f9"),a=n("63c3");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("b66c");var o,s=n("921e"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"ed1543be",null,!1,i["a"],o);e["default"]=c.exports},"63c3":function(t,e,n){"use strict";n.r(e);var i=n("ed84"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"63e1":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-wrap"},[n("demo-block",{attrs:{title:t.t("basicUsage"),"section-style":"margin: 0;"}},[n("press-sticky",[n("div",{staticClass:"btn1"},[t._v(t._s(t.t("basicUsage")))])])],1),n("demo-block",{attrs:{title:t.t("offsetTop"),"section-style":"margin: 0;"}},[n("press-sticky",{attrs:{"offset-top":50}},[n("div",{staticClass:"btn2"},[t._v(t._s(t.t("offsetTop")))])])],1),n("demo-block",{attrs:{title:t.t("setContainer"),"section-style":"margin: 0;"}},[n("div",{ref:"container",staticStyle:{height:"150px",background:"#eee"},attrs:{id:"container"}},[n("press-sticky",{attrs:{container:t.container}},[n("div",{staticClass:"btn3"},[t._v(t._s(t.t("setContainer")))])])],1)]),n("press-button",{attrs:{type:"e-sport-primary","custom-style":"position:relative;margin: 10px;padding: 0;"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onToggleShowHeader.apply(void 0,arguments)}}},[t._v(t._s(t.showHeader?t.t("hide"):t.t("show")))])],1)},r=[]},"64b8":function(t,e,n){var i=n("94c9");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("5a15").default;a("71c11e20",i,!0,{sourceMap:!1,shadowMode:!1})},"6a32":function(t,e,n){"use strict";n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.pageScrollMixin=void 0,n("0cda"),n("cfff"),n("8999"),n("b41b"),n("0c65"),n("6058"),n("093a");var i=n("2bb4"),a=n("d4e4");function r(t){var e=(0,i.getCurrentPage)(),n=e.pressPageScroller,a=void 0===n?[]:n;a.forEach((function(e){"function"===typeof e&&e(t)}))}e.pageScrollMixin=function(t){return{created:function(){var e=(0,i.getCurrentPage)();(0,a.isDef)(e)&&(Array.isArray(e.pressPageScroller)?e.pressPageScroller.push(t.bind(this)):e.pressPageScroller="function"===typeof e.onPageScroll?[e.onPageScroll.bind(e),t.bind(this)]:[t.bind(this)],e.onPageScroll=r)},destroy:function(){var e,n=(0,i.getCurrentPage)();(0,a.isDef)(n)&&(n.pressPageScroller=(null===(e=n.pressPageScroller)||void 0===e?void 0:e.filter((function(e){return e!==t})))||[])}}}},"6b9e":function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,".press-sticky[data-v-41c68a38]{position:relative}.press-sticky-wrap--fixed[data-v-41c68a38]{position:fixed;right:0;left:0}",""]),t.exports=e},"6c10":function(t,e,n){var i=n("6b9e");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("5a15").default;a("11638f27",i,!0,{sourceMap:!1,shadowMode:!1})},"786b":function(t,e,n){"use strict";function i(t){throw new TypeError('"'+t+'" is read-only')}n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i,n("3849"),n("fd34")},"7d06":function(t,e,n){"use strict";var i=n("64b8"),a=n.n(i);a.a},"94c9":function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,".demo-wrap[data-v-495ac76b]{height:200vh}.demo-wrap .btn1[data-v-495ac76b]{margin-left:10px}.demo-wrap .btn2[data-v-495ac76b]{margin-left:80px}.demo-wrap .btn3[data-v-495ac76b]{margin-left:160px}",""]),t.exports=e},"9c27":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{ref:"sticky",staticClass:"press-sticky",class:t.customClass,style:t.containerStyle},[n("div",{class:t.wrapClass,style:t.wrapStyle},[t._t("default")],2)])])},r=[]},b66c:function(t,e,n){"use strict";var i=n("e951"),a=n.n(i);a.a},be03:function(t,e,n){var i=n("a8d8");e=i(!1),e.push([t.i,".press-ellipsis[data-v-ed1543be]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.press-multi-ellipsis--l2[data-v-ed1543be],.press-multi-ellipsis--l3[data-v-ed1543be]{-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;text-overflow:ellipsis}.press-multi-ellipsis--l2[data-v-ed1543be]{-webkit-line-clamp:2}.press-multi-ellipsis--l3[data-v-ed1543be]{-webkit-line-clamp:3}.press-notice-bar[data-v-ed1543be]{display:flex;align-items:center;height:var(--notice-bar-height,40px);padding:var(--notice-bar-padding,0 16px);font-size:var(--notice-bar-font-size,14px);color:var(--notice-bar-text-color,#ed6a0c);line-height:var(--notice-bar-line-height,24px);background-color:var(--notice-bar-background-color,#fffbe8)}.press-notice-bar--withicon[data-v-ed1543be]{position:relative;padding-right:40px}.press-notice-bar--wrapable[data-v-ed1543be]{height:auto;padding:var(--notice-bar-wrapable-padding,8px 16px)}.press-notice-bar--wrapable .press-notice-bar__wrap[data-v-ed1543be]{height:auto}.press-notice-bar--wrapable .press-notice-bar__content[data-v-ed1543be]{position:relative;white-space:normal}.press-notice-bar__left-icon[data-v-ed1543be]{display:flex;align-items:center;margin-right:4px;vertical-align:middle;font-size:var(--notice-bar-icon-size,16px);min-width:var(--notice-bar-icon-min-width,22px)}.press-notice-bar__right-icon[data-v-ed1543be]{position:absolute;top:10px;right:15px;font-size:var(--notice-bar-icon-size,16px);min-width:var(--notice-bar-icon-min-width,22px)}.press-notice-bar__wrap[data-v-ed1543be]{position:relative;flex:1;overflow:hidden;height:var(--notice-bar-line-height,24px);display:flex;align-items:center}.press-notice-bar__content[data-v-ed1543be]{position:absolute;white-space:nowrap}.press-notice-bar__content.press-ellipsis[data-v-ed1543be]{max-width:100%}",""]),t.exports=e},c1be:function(t,e,n){"use strict";var i=n("fb64"),a=n.n(i);a.a},c5c5:function(t,e,n){"use strict";n("fcdb"),Object.defineProperty(e,"__esModule",{value:!0}),e.BindEventMixin=r;var i=n("459b"),a=0;function r(t){var e="binded_".concat(a);function n(){var n=this;n[e]||(t.call(n,i.on,!0),n[e]=!0)}function r(){var n=this;n[e]&&(t.call(n,i.off,!1),n[e]=!1)}return a+=1,{mounted:n,activated:n,deactivated:r,beforeDestroy:r}}},e078:function(t,e,n){"use strict";n("fcdb");var i=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("33de")),r=i(n("5246")),o=i(n("411e")),s=n("5e91"),c=n("b3e1");e.default={i18n:{"zh-CN":{offsetTop:"吸顶距离",setContainer:"指定容器",hide:"隐藏头部",show:"显示头部"},"en-US":{offsetTop:"Offset Top",setContainer:"Set Container",hide:"Hide Head",show:"Show Head"}},components:{PressSticky:a.default,PressButton:r.default,PressNoticeBar:o.default},mixins:[(0,c.getHideHeaderMixin)()],data:function(){var t=this;return{container:function(){var e,n=null===(e=t.$refs)||void 0===e?void 0:e.container;return n}}},mounted:function(){var t=this;(0,s.requestAnimationFrame)((function(){t.container=function(){return t.$refs.container}}))},methods:{}}},e8d3:function(t,e,n){"use strict";n.r(e);var i=n("63e1"),a=n("f675");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("7d06"),n("c1be");var o,s=n("921e"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"495ac76b",null,!1,i["a"],o);e["default"]=c.exports},e951:function(t,e,n){var i=n("be03");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("5a15").default;a("7773fcd9",i,!0,{sourceMap:!1,shadowMode:!1})},ed84:function(t,e,n){"use strict";n("fcdb");var i=n("b499").default,a=n("de9e").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("e087"),n("a88c"),n("8999"),n("45be"),n("15ea");var r=a(n("2c6b")),o=a(n("6d7c")),s=a(n("4710")),c=n("5e91"),l=n("dc16"),d=i(n("12ef")),u=a(n("0a5a")),f=n("9466"),p=n("459b");e.default={name:"PressNoticeBar",options:(0,o.default)((0,o.default)({},f.defaultOptions),{},{styleIsolation:"shared"}),components:{PressIconPlus:s.default},props:(0,o.default)({text:{type:String,default:""},mode:{type:String,default:""},url:{type:String,default:""},openType:{type:String,default:"navigate"},delay:{type:Number,default:1},speed:{type:Number,default:60},scrollable:{type:Boolean,default:!1},leftIcon:{type:String,default:""},color:{type:String,default:""},backgroundColor:{type:String,default:""},background:{type:String,default:""},wrapable:Boolean},f.defaultProps),emits:["close","click"],data:function(){return{show:!0,duration:0,animationDuration:0,contentWidth:0,translateX:0,isNotInUni:(0,d.isNotInUni)()}},computed:{noticeBarClass:function(){var t=this.mode,e=this.wrapable,n=this.customClass;return"".concat(n," ").concat(d.default.bem2("notice-bar",{withicon:t,wrapable:e}))},noticeBarStyle:function(){var t=this.color,e=this.backgroundColor,n=this.background;return u.default.rootStyle({color:t,backgroundColor:e,background:n})},animationStyle:function(){var t=this.animationDuration,e=this.delay,n=this.translateX,i=["transform: translateX(".concat(n,"px);"),"transition: -webkit-transform ".concat(t,"ms linear ").concat(e,"ms, transform ").concat(t,"ms linear ").concat(e,"ms;"),"transform-origin: 50% 50% 0px;"].join(" ");return i},leftIconClass:function(){return"press-notice-bar__left-icon"},leftIconCustomClass:function(){var t="";return t},rightIconClass:function(){return"press-notice-bar__right-icon"},rightIconCustomClass:function(){var t="";return t}},watch:{text:{handler:function(){this.init()}},speed:{handler:function(){this.init()}}},created:function(){},mounted:function(){this.init()},destroyed:function(){this.onDestroyed()},unmounted:function(){this.onDestroyed()},methods:{onDestroyed:function(){this.timer&&clearTimeout(this.timer)},init:function(){var t=this;(0,c.requestAnimationFrame)((function(){Promise.all([(0,l.getRect)(t,".press-notice-bar__content"),(0,l.getRect)(t,".press-notice-bar__wrap")]).then((function(e){var n=(0,r.default)(e,2),i=n[0],a=n[1],o=t.speed,s=t.scrollable;if(null!=i&&null!=a&&i.width&&a.width&&!1!==s&&(s||a.width<i.width)){var c=(a.width+i.width)/o*1e3;t.wrapWidth=a.width,t.contentWidth=i.width,t.duration=c,t.scroll(!0)}}))}))},scroll:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.timer&&clearTimeout(this.timer),this.timer=null,this.translateX=e?0:this.wrapWidth,this.animationDuration=0,(0,c.requestAnimationFrame)((function(){t.translateX=-t.contentWidth,t.animationDuration=t.duration})),this.timer=setTimeout((function(){t.scroll()}),this.duration)},onClickIcon:function(t){"closeable"===this.mode&&(this.timer&&clearTimeout(this.timer),this.timer=null,this.show=!1,this.$emit("close",(0,p.getEventDetail)(t)))},onClick:function(t){this.$emit("click",t)}}}},f675:function(t,e,n){"use strict";n.r(e);var i=n("e078"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},fb64:function(t,e,n){var i=n("0088");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("5a15").default;a("0917e3cf",i,!0,{sourceMap:!1,shadowMode:!1})}}]);