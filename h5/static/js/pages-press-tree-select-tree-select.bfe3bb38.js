(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-tree-select-tree-select"],{"238a":function(e,t,i){"use strict";function a(e,t){return Array.isArray(e)?e.indexOf(t)>-1:e===t}i("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.isActive=a,i("659a")},"3acc":function(e,t,i){"use strict";i.r(t);var a=i("6bfb"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},"5d22":function(e,t,i){"use strict";i.r(t);var a=i("7acd"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},6816:function(e,t,i){var a=i("c58b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("5a15").default;s("3165b0fe",a,!0,{sourceMap:!1,shadowMode:!1})},"6bfb":function(e,t,i){"use strict";(function(e){i("fcdb");var a=i("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(i("6d7c"));i("659a"),i("25f7"),i("cfff"),i("250c"),i("0913"),i("080f");var n=a(i("b511")),c=a(i("1512")),l=[{text:"浙江",children:[{text:"杭州",id:1},{text:"温州",id:2},{text:"宁波",id:3,disabled:!0},{text:"义乌",id:4}]},{text:"江苏",children:[{text:"南京",id:5},{text:"无锡",id:6},{text:"徐州",id:7},{text:"苏州",id:8}]},{text:"福建",disabled:!0,children:[{text:"泉州",id:9},{text:"厦门",id:10}]}],d=[{text:"Group 1",children:[{text:"Delaware",id:1},{text:"Florida",id:2},{text:"Georqia",id:3,disabled:!0},{text:"Indiana",id:4}]},{text:"Group 2",children:[{text:"Alabama",id:5},{text:"Kansas",id:6},{text:"Louisiana",id:7},{text:"Texas",id:8}]},{text:"Group 3",disabled:!0,children:[{text:"Alabama",id:9},{text:"Kansas",id:10}]}];t.default={i18n:{"zh-CN":{showBadge:"徽标提示",radioMode:"单选模式",multipleMode:"多选模式",customContent:"自定义内容",data:l,dataSimple:[{text:"分组 1"},{text:"分组 2"}]},"en-US":{showBadge:"Show Badge",radioMode:"Radio Mode",multipleMode:"Multiple Mode",customContent:"Custom Content",data:d,dataSimple:[{text:"Group 1"},{text:"Group 2"}]}},components:{PressTreeSelect:n.default,PressImage:c.default},data:function(){return{mainActiveIndex:1,mainActiveIndexMulti:0,activeId:null,activeIdMulti:[],sectionStyle:"margin: 0;"}},computed:{items:function(){return this.t("data")},badgeItems:function(){return this.items.slice(0,2).map((function(e,t){return 0===t?(0,s.default)((0,s.default)({},e),{},{dot:!0}):1===t?(0,s.default)((0,s.default)({},e),{},{badge:5}):e}))}},methods:{onClickNav:function(e){this.mainActiveIndex=e||0},onClickItem:function(t){e.log("[detail]",t);var i=this.activeId===t.id?null:t.id;this.activeId=i},onClickItemMulti:function(e){var t=this.activeIdMulti,i=t.indexOf(e.id);i>-1?t.splice(i,1):t.push(e.id),this.activeIdMulti=t},onClickNavMulti:function(e){this.mainActiveIndexMulti=e||0}}}}).call(this,i("44fd")["default"])},"7acd":function(e,t,i){"use strict";i("fcdb");var a=i("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("e087"),i("659a"),i("a88c");var s=a(i("6d7c")),n=a(i("4710")),c=a(i("0f04")),l=a(i("b7f1")),d=i("9466"),r=a(i("12ef")),o=i("238a"),u=i("78b2");t.default={name:"PressTreeSelect",options:(0,s.default)((0,s.default)({},d.defaultOptions),{},{styleIsolation:"shared"}),components:{PressIconPlus:n.default,PressSidebar:c.default,PressSidebarItem:l.default},mixins:[u.ScrollViewPureMixin],props:(0,s.default)({items:{type:Array,default:function(){return[]}},activeId:{type:[Number,String,Array],default:""},mainActiveIndex:{type:[Number,String,Array],default:0},height:{type:[Number,String],default:300},max:{type:[Number,String],default:1/0},selectedIcon:{type:String,default:"success"},mainItemClass:{type:String,default:""},mainActiveClass:{type:String,default:""},mainDisabledClass:{type:String,default:""},contentItemClass:{type:String,default:""},contentActiveClass:{type:String,default:""},contentDisabledClass:{type:String,default:""}},d.defaultProps),emits:["click-item","click-nav"],data:function(){return{subItems:[],utils:r.default,isActive:o.isActive}},computed:{selectedIconClass:function(){return"press-tree-select__selected"},selectedIconCustomClass:function(){var e="";return e}},watch:{items:{handler:function(){this.updateSubItems()}},mainActiveIndex:{handler:function(){this.updateSubItems()}}},mounted:function(){this.updateSubItems()},methods:{treeSelectItemClass:function(e){var t=this.activeId,i=this.contentItemClass,a=this.contentActiveClass,s=this.contentDisabledClass;return"press-ellipsis ".concat(i," ").concat(r.default.bem2("tree-select__item",{active:(0,o.isActive)(t,e.id),disabled:e.disabled})," ").concat((0,o.isActive)(t,e.id)?a:""," ").concat(e.disabled?s:"")},onSelectItem:function(e){var t=Array.isArray(this.activeId),i=t&&this.activeId.length>=this.max,a=t?this.activeId.indexOf(e.id)>-1:this.activeId===e.id;e.disabled||i&&!a||this.$emit("click-item",e)},onClickNav:function(e){var t=this.items[e];t.disabled||this.$emit("click-nav",+e)},updateSubItems:function(){var e=this.items,t=this.mainActiveIndex,i=e[t]||{},a=i.children,s=void 0===a?[]:a;this.subItems=s}}}},"7c1e":function(e,t,i){"use strict";var a=i("6816"),s=i.n(a);s.a},b511:function(e,t,i){"use strict";i.r(t);var a=i("fdc0"),s=i("5d22");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("7c1e");var c,l=i("921e"),d=Object(l["a"])(s["default"],a["b"],a["c"],!1,null,"02e712ca",null,!1,a["a"],c);t["default"]=d.exports},c58b:function(e,t,i){var a=i("a8d8");t=a(!1),t.push([e.i,".press-ellipsis[data-v-02e712ca]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.press-multi-ellipsis--l2[data-v-02e712ca],.press-multi-ellipsis--l3[data-v-02e712ca]{-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;text-overflow:ellipsis}.press-multi-ellipsis--l2[data-v-02e712ca]{-webkit-line-clamp:2}.press-multi-ellipsis--l3[data-v-02e712ca]{-webkit-line-clamp:3}.press-tree-select[data-v-02e712ca]{--sidebar-padding:12px 8px 12px 12px;position:relative;display:flex;-webkit-user-select:none;user-select:none;font-size:var(--tree-select-font-size,14px)}[data-v-02e712ca] .press-tree-select__nav{flex:1;background-color:var(--tree-select-nav-background-color,#f7f8fa)}[data-v-02e712ca] .press-tree-select__nav__inner{width:100%!important;height:100%}[data-v-02e712ca] .press-tree-select__content{flex:2;background-color:var(--tree-select-content-background-color,#fff)}[data-v-02e712ca] .press-tree-select__item{position:relative;font-weight:400;padding:0 32px 0 var(--padding-md,16px);line-height:var(--tree-select-item-height,44px)}[data-v-02e712ca] .press-tree-select__item--active{color:var(--tree-select-item-active-color,#ee0a24)}[data-v-02e712ca] .press-tree-select__item--disabled{color:var(--tree-select-item-disabled-color,#c8c9cc)}[data-v-02e712ca] .press-tree-select__selected{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:var(--padding-md,16px)}",""]),e.exports=t},ed0a:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"demo-wrap"},[i("demo-block",{attrs:{title:e.t("radioMode"),"section-style":e.sectionStyle}},[i("press-tree-select",{attrs:{items:e.items,"main-active-index":e.mainActiveIndex,"active-id":e.activeId},on:{"click-nav":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickNav.apply(void 0,arguments)},"click-item":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickItem.apply(void 0,arguments)}}})],1),i("demo-block",{attrs:{title:e.t("multipleMode"),"section-style":e.sectionStyle}},[i("press-tree-select",{attrs:{max:2,items:e.items,"main-active-index":e.mainActiveIndexMulti,"active-id":e.activeIdMulti},on:{"click-nav":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickNavMulti.apply(void 0,arguments)},"click-item":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickItemMulti.apply(void 0,arguments)}}})],1),i("demo-block",{attrs:{title:e.t("customContent"),"section-style":e.sectionStyle}},[i("press-tree-select",{attrs:{items:e.t("dataSimple"),"main-active-index":e.mainActiveIndex,height:"55vw","active-id":e.activeId},on:{"click-nav":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickNav.apply(void 0,arguments)},"click-item":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickItem.apply(void 0,arguments)}}},[i("div",{staticStyle:{width:"100%",height:"100%"},attrs:{slot:"content"},slot:"content"},[0==e.mainActiveIndex?i("press-image",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg",width:"100%",height:"100%","transition-style":"width: 100%;height: 100%;"}}):1==e.mainActiveIndex?i("press-image",{attrs:{src:"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_8f25b9e2e75f6754ad.jpeg",width:"100%",height:"100%","transition-style":"width: 100%;height: 100%;"}}):e._e()],1)])],1),i("demo-block",{attrs:{title:e.t("showBadge"),"section-style":e.sectionStyle}},[i("press-tree-select",{attrs:{items:e.badgeItems,"main-active-index":e.mainActiveIndex,"active-id":e.activeId},on:{"click-nav":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickNav.apply(void 0,arguments)},"click-item":function(t){arguments[0]=t=e.$handleEvent(t),e.onClickItem.apply(void 0,arguments)}}})],1)],1)},n=[]},fb3f:function(e,t,i){"use strict";i.r(t);var a=i("ed0a"),s=i("3acc");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);var c,l=i("921e"),d=Object(l["a"])(s["default"],a["b"],a["c"],!1,null,"4602806c",null,!1,a["a"],c);t["default"]=d.exports},fdc0:function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"press-tree-select",style:"height: "+e.utils.addUnit(e.height)},[i("v-uni-scroll-view",{staticClass:"press-tree-select__nav",attrs:{"scroll-y":!0}},[i("press-sidebar",{attrs:{"active-key":e.mainActiveIndex,"custom-class":"press-tree-select__nav__inner"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onClickNav.apply(void 0,arguments)}}},e._l(e.items,(function(t,a){return i("press-sidebar-item",{key:a,attrs:{"custom-class":e.mainItemClass,"active-class":e.mainActiveClass,"disabled-class":e.mainDisabledClass,badge:t.badge,dot:t.dot,title:t.text,disabled:t.disabled}})})),1)],1),i("v-uni-scroll-view",{staticClass:"press-tree-select__content",attrs:{"scroll-y":!0}},[e._t("content"),e._l(e.subItems,(function(t){return i("div",{key:t.id,class:[e.treeSelectItemClass(t)],on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.onSelectItem(t)}}},[e._v(e._s(t.text)),e.isActive(e.activeId,t.id)?i("press-icon-plus",{class:[e.selectedIconClass],attrs:{name:e.selectedIcon,size:"16px","custom-class":e.selectedIconCustomClass}}):e._e()],1)}))],2)],1)},n=[]}}]);