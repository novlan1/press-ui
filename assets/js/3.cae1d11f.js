(window.webpackJsonp=window.webpackJsonp||[]).push([[3,25,35],{408:function(t,e,n){},409:function(t,e){t.exports=function(t){return null==t}},411:function(t,e,n){},412:function(t,e,n){},413:function(t,e,n){},414:function(t,e,n){},420:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return r}));var a={CHANGE_IFRAME_STYLE_TYPE:"CHANGE_IFRAME_STYLE_TYPE",CHANGE_DEMO_PAGE_DIRECTION:"CHANGE_DEMO_PAGE_DIRECTION",CHANGE_EXTERNAL_STYLE_LINK:"CHANGE_EXTERNAL_STYLE_LINK",CHANGE_EXTERNAL_STYLE_CONTENT:"CHANGE_EXTERNAL_STYLE_CONTENT"},i={HOR:"HOR",VERT:"VERT"};function s(t){var e=t.type,n=t.data,a=t.iframe;a||(a=document.getElementsByTagName("iframe")[0]),a.contentWindow.postMessage({type:e,data:n},"*")}function r(t){window.addEventListener("message",t,!1)}},421:function(t,e,n){"use strict";var a=n(0),i=n(75).find,s=n(143),r=!0;"find"in[]&&Array(1).find((function(){r=!1})),a({target:"Array",proto:!0,forced:r},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),s("find")},422:function(t,e,n){"use strict";n(423)},423:function(t,e,n){"use strict";var a=n(0),i=n(54),s=n(14),r=n(7),o=n(55);a({target:"Iterator",proto:!0,real:!0},{find:function(t){r(this),s(t);var e=o(this),n=0;return i(e,(function(e,a){if(t(e,n++))return a(e)}),{IS_RECORD:!0,INTERRUPTED:!0}).result}})},424:function(t,e,n){"use strict";n(408)},425:function(t,e,n){"use strict";n.r(e);n(12),n(20),n(141);var a=n(441),i=n(426),s=n(403);function r(t,e){return"group"===e.type&&e.children.some((function(e){return"group"===e.type?r(t,e):"page"===e.type&&Object(s.e)(t,e.path)}))}var o={name:"SidebarLinks",components:{SidebarGroup:a.default,SidebarLink:i.default},props:["items","depth","sidebarDepth"],data:function(){return{openGroupIndex:0}},watch:{$route:function(){this.refreshIndex()}},created:function(){this.refreshIndex()},methods:{refreshIndex:function(){var t=function(t,e){for(var n=0;n<e.length;n++){var a=e[n];if(r(t,a))return n}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup:function(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive:function(t){return Object(s.e)(this.$route,t.regularPath)}}},c=n(37),l=Object(c.a)(o,(function(){var t=this,e=t._self._c;return t.items.length?e("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(n,a){return e("li",{key:a},["group"===n.type?e("SidebarGroup",{attrs:{item:n,open:a===t.openGroupIndex,collapsable:n.collapsable||n.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(a)}}}):e("SidebarLink",{attrs:{"sidebar-depth":t.sidebarDepth,item:n}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=l.exports},426:function(t,e,n){"use strict";n.r(e);n(102),n(421),n(105),n(12),n(27),n(104),n(20),n(422),n(106),n(141);var a=n(403);function i(t,e,n,a,i){var s={props:{to:e.path,activeClass:"",exactActiveClass:""},class:{active:a,"sidebar-link":!0}};return i>2&&(s.style={"padding-left":"".concat(i,"rem")}),t("RouterLink",s,[n,t("span",{class:["sub-title"]},e.subTitle)])}function s(t,e,n,r,o){var c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1;return!e||c>o?null:t("ul",{class:"sidebar-sub-headers"},e.map((function(e){var l=Object(a.e)(r,"".concat(n,"#").concat(e.slug));return t("li",{class:"sidebar-sub-header"},[i(t,"".concat(n,"#").concat(e.slug),e.title,l,e.level-1),s(t,e.children,n,r,o,c+1)])})))}var r={functional:!0,props:["item","sidebarDepth"],render:function(t,e){var n=e.parent,r=n.$page,o=n.$route,c=n.$themeConfig,l=n.$themeLocaleConfig,u=e.props,d=u.item,h=u.sidebarDepth,p=Object(a.e)(o,d.path),f="auto"===d.type?p||d.children.some((function(t){return Object(a.e)(o,"".concat(d.basePath,"#").concat(t.slug))})):p,g="external"===d.type?function(t,e,n){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[n,t("OutboundLink")])}(t,d.path,d.title||d.path):i(t,d,d.title||d.path,f),v=[r.frontmatter.sidebarDepth,h,l.sidebarDepth,c.sidebarDepth,1].find((function(t){return void 0!==t})),m=l.displayAllHeaders||c.displayAllHeaders;return"auto"===d.type?[g,s(t,d.children,d.basePath,o,v)]:(f||m)&&d.headers&&!a.d.test(d.path)?[g,s(t,Object(a.c)(d.headers),d.path,o,v)]:g}},o=(n(424),n(37)),c=Object(o.a)(r,void 0,void 0,!1,null,null,null);e.default=c.exports},428:function(t,e,n){},429:function(t,e,n){"use strict";n(411)},430:function(t,e,n){},431:function(t,e,n){"use strict";n(412)},432:function(t,e,n){var a=n(56),i=n(25),s=n(40);t.exports=function(t){return"string"==typeof t||!i(t)&&s(t)&&"[object String]"==a(t)}},433:function(t,e,n){"use strict";n(413)},434:function(t,e,n){},435:function(t,e,n){"use strict";n(414)},436:function(t,e,n){},441:function(t,e,n){"use strict";n.r(e);var a=n(403),i={name:"SidebarGroup",components:{DropdownTransition:n(418).default},props:["item","open","collapsable","depth"],beforeCreate:function(){this.$options.components.SidebarLinks=n(425).default},methods:{isActive:a.e}},s=(n(435),n(37)),r=Object(s.a)(i,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-".concat(t.depth)]},[t.item.path?e("RouterLink",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):e("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),e("DropdownTransition",[t.open||!t.collapsable?e("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,"sidebar-depth":t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null);e.default=r.exports},446:function(t,e,n){"use strict";n.r(e);n(102),n(27),n(104),n(107);var a=n(409),i=n.n(a),s=n(403),r={name:"PageEdit",computed:{lastUpdated:function(){return this.$page.lastUpdated},lastUpdatedText:function(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink:function(){var t=i()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,e=this.$site.themeConfig,n=e.repo,a=e.docsDir,s=void 0===a?"":a,r=e.docsBranch,o=void 0===r?"master":r,c=e.docsRepo,l=void 0===c?n:c;return t&&l&&this.$page.relativePath?this.createEditLink(n,l,s,o,this.$page.relativePath):null},editLinkText:function(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink:function(t,e,n,a,i){if(/bitbucket.org/.test(t)){var r=s.i.test(e)?e:t;return"".concat(r.replace(s.a,""),"/src")+"/".concat(a,"/").concat(n?"".concat(n.replace(s.a,""),"/"):"").concat(i,"?mode=edit&spa=0&at=").concat(a,"&fileviewer=file-view-default")}var o=s.i.test(e)?e:"https://github.com/".concat(e);return"".concat(o.replace(s.a,""),"/edit")+"/".concat(a,"/").concat(n?"".concat(n.replace(s.a,""),"/"):"").concat(i)}}},o=(n(431),n(37)),c=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("footer",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null);e.default=c.exports},447:function(t,e,n){"use strict";n.r(e);n(103);var a=n(403),i=n(432),s=n.n(i),r=n(409),o=n.n(r),c={name:"PageNav",props:["sidebarItems"],computed:{prev:function(){return u(l.PREV,this)},next:function(){return u(l.NEXT,this)}}};var l={NEXT:{resolveLink:function(t,e){return d(t,e,1)},getThemeLinkConfig:function(t){return t.nextLinks},getPageLinkConfig:function(t){return t.frontmatter.next}},PREV:{resolveLink:function(t,e){return d(t,e,-1)},getThemeLinkConfig:function(t){return t.prevLinks},getPageLinkConfig:function(t){return t.frontmatter.prev}}};function u(t,e){var n=e.$themeConfig,i=e.$page,r=e.$route,c=e.$site,l=e.sidebarItems,u=t.resolveLink,d=t.getThemeLinkConfig,h=t.getPageLinkConfig,p=d(n),f=h(i),g=o()(f)?p:f;if(!1!==g)return s()(g)?Object(a.k)(c.pages,g,r.path):u(i,l)}function d(t,e,n){var a=[];!function t(e,n){for(var a=0,i=e.length;a<i;a++)"group"===e[a].type?t(e[a].children||[],n):n.push(e[a])}(e,a);for(var i=0;i<a.length;i++){var s=a[i];if("page"===s.type&&s.path===decodeURIComponent(t.path))return a[i+n]}}var h=c,p=(n(433),n(37)),f=Object(p.a)(h,(function(){var t=this,e=t._self._c;return t.prev||t.next?e("div",{staticClass:"page-nav"},[e("p",{staticClass:"inner"},[t.prev?e("span",{staticClass:"prev"},[t._v("\n      ←\n      "),"external"===t.prev.type?e("a",{staticClass:"prev",attrs:{href:t.prev.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v(t._s(t.prev.title||t.prev.path))])],1):t._e(),t._v(" "),t.next?e("span",{staticClass:"next"},["external"===t.next.type?e("a",{attrs:{href:t.next.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{attrs:{to:t.next.path}},[t._v(t._s(t.next.title||t.next.path))]),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null);e.default=f.exports},450:function(t,e,n){"use strict";n.r(e);n(429);var a=n(37),i=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[e("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[e("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null);e.default=i.exports},452:function(t,e,n){"use strict";n(428)},453:function(t,e,n){"use strict";n(430)},454:function(t,e,n){"use strict";n(434)},455:function(t,e,n){"use strict";n(436)},477:function(t,e,n){"use strict";n.r(e);n(27),n(463),n(103),n(235);var a=n(478),i=n(450),s=n(445);function r(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var o={name:"Navbar",components:{SidebarButton:i.default,NavLinks:s.default,SearchBox:a.a,AlgoliaSearchBox:{}},data:function(){return{linksWrapMaxWidth:null}},computed:{algolia:function(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch:function(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}},mounted:function(){var t=this,e=parseInt(r(this.$el,"paddingLeft"))+parseInt(r(this.$el,"paddingRight")),n=function(){document.documentElement.clientWidth<719?t.linksWrapMaxWidth=null:t.linksWrapMaxWidth=t.$el.offsetWidth-e-(t.$refs.siteName&&t.$refs.siteName.offsetWidth||0)};n(),window.addEventListener("resize",n,!1)},methods:{goHome:function(){"/"!==this.$route.path&&this.$router.push("/")}}},c=(n(453),n(37)),l=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("header",{staticClass:"navbar"},[e("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),t.$site.themeConfig.subLogo.img?e("a",{staticClass:"home-link home-link-line",attrs:{href:t.$site.themeConfig.subLogo.link,target:"_blank"}},[e("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.subLogo.img),alt:t.$siteTitle}})]):t._e(),t._v(" "),e("a",{staticClass:"home-link",attrs:{href:t.$site.themeConfig.logo.link,target:"_blank"}},[t.$site.themeConfig.logo.img?e("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo.img),alt:t.$siteTitle},on:{click:function(e){return e.stopPropagation(),t.goHome.apply(null,arguments)}}}):t._e(),t._v(" "),t.$siteTitle?e("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo.img}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),e("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?e("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?e("SearchBox"):t._e(),t._v(" "),e("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null);e.default=l.exports},480:function(t,e,n){"use strict";n.r(e);var a={name:"Home",components:{NavLink:n(417).default},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}}}},i=(n(452),n(37)),s=Object(i.a)(a,(function(){var t=this,e=t._self._c;return e("main",{staticClass:"home",attrs:{"aria-labelledby":"main-title"}},[e("header",{staticClass:"hero"},[t.data.heroImage?e("img",{attrs:{src:t.$withBase(t.data.heroImage),alt:t.data.heroAlt||"hero"}}):t._e(),t._v(" "),null!==t.data.heroText?e("h1",{attrs:{id:"main-title"}},[t._v("\n      "+t._s(t.data.heroText||t.$title||"Hello")+"\n    ")]):t._e(),t._v(" "),null!==t.data.tagline?e("p",{staticClass:"description"},[t._v("\n      "+t._s(t.data.tagline||t.$description||"Welcome to your VuePress site")+"\n    ")]):t._e(),t._v(" "),t.data.actionText&&t.data.actionLink?e("p",{staticClass:"action"},[e("NavLink",{staticClass:"action-button",attrs:{item:t.actionLink}})],1):t._e()]),t._v(" "),t.data.features&&t.data.features.length?e("div",{staticClass:"features"},t._l(t.data.features,(function(n,a){return e("div",{key:a,staticClass:"feature"},[e("h2",[t._v(t._s(n.title))]),t._v(" "),e("p",[t._v(t._s(n.details))])])})),0):t._e(),t._v(" "),e("Content",{staticClass:"theme-default-content custom"}),t._v(" "),t.data.footer?e("div",{staticClass:"footer"},[t._v("\n    "+t._s(t.data.footer)+"\n  ")]):t._e()],1)}),[],!1,null,null,null);e.default=s.exports},481:function(t,e,n){"use strict";n.r(e);n(102),n(103),n(109),n(227);var a=n(446),i=n(447),s=n(420),r={en:"en-US"},o={components:{PageEdit:a.default,PageNav:i.default},props:["sidebarItems"],data:function(){return{url:"",lang:"zh-CN",isHor:!1}},computed:{path:function(){return"".concat("https://novlan1.github.io/press-ui/h5/#/"+this.url,"?v=").concat((new Date).getTime(),"&lang=").concat(this.lang)},simulatorBoxStyle:function(){var t=this.$page.frontmatter,e=t.horWidth,n=t.horHeight,a=t.marginRight;if(!this.isHor)return"";var i=[];return e&&i.push("width: ".concat(e,"px;")),n&&i.push("height: ".concat(n,"px;")),a&&i.push("margin-right: ".concat(a,"px;")),i.join(" ")}},watch:{$route:{handler:function(){this.getLang()}},$page:{handler:function(t){var e=t.frontmatter;this.url=e.url?e.url:"pages/index/index",this.isHor="horizontal"===e.type},immediate:!0}},created:function(){this.getLang()},mounted:function(){var t=this;this.getLang(),Object(s.d)((function(e){var n=e.data,a=n.type,i=n.data;a===s.b.CHANGE_DEMO_PAGE_DIRECTION&&(t.isHor=i===s.a.HOR)}))},methods:{onChangeHor:function(){this.isHor=!this.isHor},onload:function(){},getLang:function(){for(var t=this.$route.fullPath,e=0,n=Object.keys(r);e<n.length;e++){var a=n[e];if(t.startsWith("/".concat(a,"/")))return void(this.lang=r[a])}this.lang="zh-CN"}}},c=(n(454),n(37)),l=Object(c.a)(o,(function(){var t=this,e=t._self._c;return e("main",{staticClass:"page",class:t.isHor?"page--hor":""},[t._t("top"),t._v(" "),e("div",{staticClass:"wrap"},[e("Content",{staticClass:"theme-default-content"}),t._v(" "),e("div",{staticClass:"simulator-wrap"},[e("div",{ref:"simulator",staticClass:"simulator-box",style:t.simulatorBoxStyle},[e("div",{staticClass:"simulator-content"},[e("iframe",{staticClass:"simulator-iframe",attrs:{src:t.path}})])]),t._v(" "),e("div",{staticClass:"button-wrap"},[e("div",{staticClass:"press-button press-button--primary",on:{click:function(e){return e.stopPropagation(),t.onChangeHor.apply(null,arguments)}}},[t._v("\n          "+t._s(t.isHor?"竖屏":"横屏")+"\n        ")])])])],1),t._v(" "),e("PageEdit"),t._v(" "),e("PageNav",t._b({staticClass:"page-nav"},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom")],2)}),[],!1,null,"78de904e",null);e.default=l.exports},482:function(t,e,n){"use strict";n.r(e);var a=n(425),i=n(445),s={name:"Sidebar",components:{SidebarLinks:a.default,NavLinks:i.default},props:["items"]},r=(n(455),n(37)),o=Object(r.a)(s,(function(){var t=this._self._c;return t("aside",{staticClass:"sidebar"},[t("NavLinks"),this._v(" "),this._t("top"),this._v(" "),t("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},526:function(t,e,n){"use strict";n.r(e);var a=n(480),i=n(477),s=n(481),r=n(482),o=n(403),c={name:"Layout",components:{Home:a.default,Page:s.default,Sidebar:r.default,Navbar:i.default},data:function(){return{isSidebarOpen:!1}},computed:{shouldShowNavbar:function(){var t=this.$site.themeConfig;return!1!==this.$page.frontmatter.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav||this.$themeLocaleConfig.nav)},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems:function(){return Object(o.l)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted:function(){var t=this;this.$router.afterEach((function(){t.isSidebarOpen=!1}))},methods:{toggleSidebar:function(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart:function(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd:function(t){var e=t.changedTouches[0].clientX-this.touchStart.x,n=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(n)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},l=n(37),u=Object(l.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?e("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),e("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),e("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),t.$page.frontmatter.home?e("Home"):e("Page",{attrs:{"sidebar-items":t.sidebarItems},scopedSlots:t._u([{key:"top",fn:function(){return[t._t("page-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("page-bottom")]},proxy:!0}],null,!0)})],1)}),[],!1,null,null,null);e.default=u.exports}}]);