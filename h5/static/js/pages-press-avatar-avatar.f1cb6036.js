(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-press-avatar-avatar"],{"0273":function(A,t,e){var a=e("68ff");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[A.i,a,""]]),a.locals&&(A.exports=a.locals);var r=e("5a15").default;r("f9d93df4",a,!0,{sourceMap:!1,shadowMode:!1})},"06ec":function(A,t,e){"use strict";e.r(t);var a=e("b92a"),r=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return a[A]}))}(s);t["default"]=r.a},"10a7":function(A,t,e){"use strict";e("fcdb");var a=e("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(e("3eee"));e("250c");var s=a(e("4c8c")),o=e("09f0"),n=a(e("84ee")),i=a(e("b47f"));t.default={name:"PressAvatarGroup",options:{virtualHost:!0,styleIsolation:"shared"},components:{PressAvatar:n.default},mixins:[s.default],emits:["showMore"],data:function(){return{}},computed:{showUrl:function(){return this.urls.slice(0,this.maxCount)},extraText:function(){var A=this.extraValue,t=this.urls,e=this.showUrl;return A||t.length-e.length},textStyle:function(){return(0,i.default)({color:"#fff",fontSize:.4*this.size,textAlign:"center"})}},methods:{addUnit:o.addUnit,getAvatarUrl:function(A){return"object"===(0,r.default)(A)?A[this.keyName||"url"]:A},clickHandler:function(){this.$emit("showMore")},getItemStyle:function(A){var t=this.size,e=this.gap,a=(0,i.default)({marginLeft:0===A?0:(0,o.addUnit)(-t*e),width:(0,o.addUnit)(t),height:(0,o.addUnit)(t)});return a}}}},"16d4":function(A,t,e){"use strict";var a;e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return a}));var r=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"press-avatar",class:["press-avatar--"+A.shape],style:A.avatarStyle,on:{click:function(t){t.stopPropagation(),arguments[0]=t=A.$handleEvent(t),A.clickHandler.apply(void 0,arguments)}}},[A._t("default",[A.mpAvatar&&A.allowMp?void 0:A.icon?e("PressIconPlus",{attrs:{name:A.icon,size:A.fontSize,color:A.color}}):A.text?e("span",{style:A.textStyle},[A._v(A._s(A.text))]):e("PressImage",{staticClass:"press-avatar__image",class:["press-avatar__image--"+A.shape],attrs:{round:!!A.round,src:A.avatarUrl||A.defaultUrl,width:A.size,radius:4,height:A.size,mode:A.mode},on:{error:function(t){arguments[0]=t=A.$handleEvent(t),A.errorHandler.apply(void 0,arguments)}}})])],2)},s=[]},"35b8":function(A,t,e){"use strict";e("fcdb");var a=e("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(e("84ee")),s=a(e("8681")),o="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_0ab8e66284a3617ed9.jpeg";t.default={i18n:{"zh-CN":{shape:"头像形状",size:"头像尺寸",icon:"图标头像",text:"文字头像",error:"加载失败",avatarGroup:"头像组"},"en-US":{shape:"Shape",size:"Size",icon:"Icon",text:"Text",error:"Error",avatarGroup:"Avatar Group"}},components:{PressAvatar:r.default,PressAvatarGroup:s.default},data:function(){return{src:o,customStyle:"margin-right: 20px",urls:[o,"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_ef8e6956717db34745.jpg",o,"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_7157200e469d0468b3.jpg",o,"https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/10/own_mike_a17f94292a34e9f644.jpeg",o]}},methods:{showMore:function(){this.onGTip("[showMore]")}}}},3635:function(A,t,e){"use strict";var a=e("9901"),r=e.n(a);r.a},"36a5":function(A,t,e){var a=e("a8d8");t=a(!1),t.push([A.i,".press-avatar[data-v-17bc872e]{display:inline-flex;align-items:center;justify-content:center}.press-avatar--circle[data-v-17bc872e]{border-radius:100px}.press-avatar--square[data-v-17bc872e]{border-radius:4px}.press-avatar[data-v-17bc872e]  press-transition,.press-avatar[data-v-17bc872e]  press-image{height:100%}.press-avatar__image--circle[data-v-17bc872e]{border-radius:100px}.press-avatar__image--square[data-v-17bc872e]{border-radius:4px}",""]),A.exports=t},"4c8c":function(A,t,e){"use strict";e("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("a88c");t.default={props:{urls:{type:Array,default:function(){return[]}},maxCount:{type:[String,Number],default:5},round:{type:Boolean,default:!0},mode:{type:String,default:"scaleToFill"},showMore:{type:Boolean,default:!0},size:{type:[String,Number],default:40},keyName:{type:String,default:""},gap:{type:[String,Number],validator:function(A){return A>=0&&A<=1},default:"0.5"},extraValue:{type:[Number,String],default:""},customStyle:{type:String,default:""}}}},5047:function(A,t,e){"use strict";var a=e("0273"),r=e.n(a);r.a},6046:function(A,t,e){"use strict";e.r(t);var a=e("35b8"),r=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return a[A]}))}(s);t["default"]=r.a},"68ff":function(A,t,e){var a=e("a8d8");t=a(!1),t.push([A.i,".press-avatar-group[data-v-27b19a14]{display:flex}.press-avatar-group__item[data-v-27b19a14]{margin-left:-10px;position:relative}.press-avatar-group__item--no-indent[data-v-27b19a14]{margin-left:0}.press-avatar-group__item__show-more[data-v-27b19a14]{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;border-radius:100px}",""]),A.exports=t},"84ee":function(A,t,e){"use strict";e.r(t);var a=e("16d4"),r=e("06ec");for(var s in r)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return r[A]}))}(s);e("3635");var o,n=e("921e"),i=Object(n["a"])(r["default"],a["b"],a["c"],!1,null,"17bc872e",null,!1,a["a"],o);t["default"]=i.exports},8681:function(A,t,e){"use strict";e.r(t);var a=e("eacb"),r=e("9382");for(var s in r)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return r[A]}))}(s);e("5047");var o,n=e("921e"),i=Object(n["a"])(r["default"],a["b"],a["c"],!1,null,"27b19a14",null,!1,a["a"],o);t["default"]=i.exports},9382:function(A,t,e){"use strict";e.r(t);var a=e("10a7"),r=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return a[A]}))}(s);t["default"]=r.a},9901:function(A,t,e){var a=e("36a5");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[A.i,a,""]]),a.locals&&(A.exports=a.locals);var r=e("5a15").default;r("6794c112",a,!0,{sourceMap:!1,shadowMode:!1})},b07b:function(A,t,e){"use strict";e("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.RANDOM_COLOR_LIST=void 0;t.RANDOM_COLOR_LIST=["#ffb34b","#f2bba9","#f7a196","#f18080","#88a867","#bfbf39","#89c152","#94d554","#f19ec2","#afaae4","#e1b0df","#c38cc1","#72dcdc","#9acdcb","#77b1cc","#448aca","#86cefa","#98d1ee","#73d1f1","#80a7dc"]},b92a:function(A,t,e){"use strict";(function(A){e("fcdb");var a=e("de9e").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("659a");var r=a(e("fac0")),s=e("09f0"),o=e("12ef"),n=a(e("b47f")),i=e("b07b"),c=a(e("1512")),u=a(e("4710")),l="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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";t.default={name:"PressAvatar",options:{virtualHost:!0,styleIsolation:"shared"},components:{PressImage:c.default,PressIconPlus:u.default},mixins:[r.default],emits:["click"],data:function(){return{colors:i.RANDOM_COLOR_LIST,avatarUrl:this.src,allowMp:!1}},computed:{shape:function(){return this.round?"circle":"square"},imageStyle:function(){var A={};return A},avatarStyle:function(){var t=this.text,e=this.icon,a=this.colorIndex,r=this.backgroundColor,i=this.size,c=this.colors,u=this.randomBackgroundColor,l="transparent";(t||e)&&(u?(A.log("colorIndex",a),l=c[a>-1?a:(0,o.random)(0,19)]):l=r);var d=(0,n.default)([{width:(0,s.addUnit)(i),height:(0,s.addUnit)(i),background:l},this.customStyle]);return d},textStyle:function(){var A=this.fontSize,t=this.color;return(0,n.default)({fontSize:A,color:t,textAlign:"center"})}},watch:{src:{immediate:!0,handler:function(A){this.avatarUrl=A,A||this.errorHandler()}}},created:function(){this.init()},methods:{addUnit:s.addUnit,init:function(){},isImg:function(){return-1!==this.src.indexOf("/")},errorHandler:function(){this.avatarUrl=this.defaultUrl||l},clickHandler:function(){this.$emit("click",this.name)}}}}).call(this,e("44fd")["default"])},eacb:function(A,t,e){"use strict";var a;e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return a}));var r=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"press-avatar-group",style:A.customStyle},A._l(A.showUrl,(function(t,a){return e("div",{key:a,staticClass:"press-avatar-group__item",style:A.getItemStyle(a)},[e("PressAvatar",{attrs:{size:A.size,round:!0,mode:A.mode,src:A.getAvatarUrl(t)}}),A.showMore&&a===A.showUrl.length-1&&(A.urls.length>A.maxCount||A.extraValue>0)?e("div",{staticClass:"press-avatar-group__item__show-more",on:{click:function(t){arguments[0]=t=A.$handleEvent(t),A.clickHandler.apply(void 0,arguments)}}},[e("span",{style:A.textStyle},[A._v(A._s(A.extraText))])]):A._e()],1)})),0)},s=[]},f4b0:function(A,t,e){"use strict";var a;e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return a}));var r=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"demo-wrap"},[e("demo-block",{attrs:{title:A.t("basicUsage")}},[e("PressAvatar",{attrs:{src:A.src}})],1),e("demo-block",{attrs:{title:A.t("shape")}},[e("PressAvatar",{attrs:{src:A.src,round:!0,"custom-style":A.customStyle}}),e("PressAvatar",{attrs:{src:A.src,round:!1}})],1),e("demo-block",{attrs:{title:A.t("size")}},[e("PressAvatar",{attrs:{src:A.src,size:"30","custom-style":A.customStyle}}),e("PressAvatar",{attrs:{src:A.src,size:"40","custom-style":A.customStyle}}),e("PressAvatar",{attrs:{src:A.src,size:"50"}})],1),e("demo-block",{attrs:{title:A.t("icon")}},[e("PressAvatar",{attrs:{src:A.src,icon:"star-o","custom-style":A.customStyle}}),e("PressAvatar",{attrs:{src:A.src,icon:"like-o"}})],1),e("demo-block",{attrs:{title:A.t("text")}},[e("PressAvatar",{attrs:{text:"Y","custom-style":A.customStyle}}),e("PressAvatar",{attrs:{text:"G","random-background-color":!0,"custom-style":A.customStyle}}),e("PressAvatar",{attrs:{text:"杨","random-background-color":!0}})],1),e("demo-block",{attrs:{title:A.t("error")}},[e("PressAvatar")],1),e("demo-block",{attrs:{title:A.t("avatarGroup")}},[e("PressAvatarGroup",{attrs:{urls:A.urls,"custom-style":"margin-bottom: 16px"},on:{showMore:function(t){arguments[0]=t=A.$handleEvent(t),A.showMore.apply(void 0,arguments)}}}),e("PressAvatarGroup",{attrs:{urls:A.urls,gap:"0.6","custom-style":"margin-bottom: 16px"},on:{showMore:function(t){arguments[0]=t=A.$handleEvent(t),A.showMore.apply(void 0,arguments)}}}),e("PressAvatarGroup",{attrs:{urls:A.urls,size:"50","custom-style":"margin-bottom: 16px"},on:{showMore:function(t){arguments[0]=t=A.$handleEvent(t),A.showMore.apply(void 0,arguments)}}})],1)],1)},s=[]},f534:function(A,t,e){"use strict";e.r(t);var a=e("f4b0"),r=e("6046");for(var s in r)["default"].indexOf(s)<0&&function(A){e.d(t,A,(function(){return r[A]}))}(s);var o,n=e("921e"),i=Object(n["a"])(r["default"],a["b"],a["c"],!1,null,"22f73d81",null,!1,a["a"],o);t["default"]=i.exports},fac0:function(A,t,e){"use strict";e("fcdb"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("a88c");t.default={props:{src:{type:String,default:""},round:{type:Boolean,default:!0},size:{type:[String,Number],default:"40"},mode:{type:String,default:"scaleToFill"},text:{type:String,default:""},backgroundColor:{type:String,default:"#c0c4cc"},color:{type:String,default:"#fff"},fontSize:{type:[String,Number],default:18},icon:{type:String,default:""},mpAvatar:{type:Boolean,default:!1},randomBackgroundColor:{type:Boolean,default:!1},defaultUrl:{type:String,default:""},colorIndex:{type:[String,Number],validator:function(A){return A<=19},default:-1},name:{type:String,default:"level"},customStyle:{type:String,default:""}}}}}]);