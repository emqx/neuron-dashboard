(window["webpackJsonp_eKuiper"]=window["webpackJsonp_eKuiper"]||[]).push([["chunk-75d3090c"],{"101e":function(t,e,n){"use strict";var r=n("510b");e["a"]={computed:{isSingleNode:function(){return this.$route.params.id===r["a"]},isSubApp:function(){return this.$store.state.isSubApp},hideTabBar:function(){return this.isSingleNode&&this.isSubApp&&this.$store.state.hideTabBarInNodePage}}}},"5d4f":function(t,e,n){"use strict";n("f62d")},"724c":function(t,e,n){"use strict";e["a"]={computed:{nodeID:function(){return this.$route.params.id||this.$store.state.currentNode.id}}}},7766:function(t,e,n){"use strict";n("ed50")},"8d2f":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tabs-head"},[t.isFabric||t.isSingleNode?t._e():n("Breadcrumb",[n("BreadcrumbItem",{attrs:{to:"/nodes"}},[t._v(t._s(this.$t("nodes.nodes")))]),n("BreadcrumbItem",[n("Select",{staticClass:"node-select",attrs:{"label-in-value":"",placeholder:t.$t("nodes.currentNode")},on:{"on-change":t.handleNodeChange},model:{value:t.selectNode,callback:function(e){t.selectNode=e},expression:"selectNode"}},t._l(t.nodes,(function(t){return n("Option",{key:t.value,attrs:{value:t.value,label:t.label}})})),1)],1)],1),n("div",[t._l(t.tabsData,(function(e){return[t.hiddenTabs.includes(e.id)?t._e():n("a",{key:e.id,staticClass:"crud-title",class:{active:t.activeTab===e.id},attrs:{href:"javascript:;"},on:{click:function(n){return t.goToTab(e)}}},[t._v(" "+t._s(e.name)+" ")]),t._t("custom-tab")]}))],2)],1)},s=[],a=n("2f62"),i=n("510b");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d={name:"TabsCardHead",props:{activeTab:{required:!0,type:String}},data:function(){return{selectNode:""}},computed:c(c({},Object(a["c"])(["isFabric","nodeMenuHiddenSettingMap"])),{},{hiddenTabs:function(){var t=this;return Object.keys(this.nodeMenuHiddenSettingMap).filter((function(e){return!0===t.nodeMenuHiddenSettingMap[e]}))},currentNode:function(){return this.$store.state.currentNode},isSingleNode:function(){return this.$route.params.id===i["a"]},nodes:function(){return this.$store.state.nodes},nodeID:function(){var t=this.$route.params.id||this.$store.state.currentNode.id;return t},tabsData:function(){return[{id:"source",name:this.$t("streams.source")},{id:"rules",name:this.$t("rules.rules")},{id:"extension",name:this.$t("extension.extension")},{id:"configuration",name:this.$t("configuration.configuration")},{id:"system",name:this.$t("system.system")}]}}),created:function(){this.selectNode=this.currentNode.id},methods:c(c({},Object(a["b"])(["SET_CURRENTNODE"])),{},{handleNodeChange:function(t){if(t){var e=t.value,n=t.label;this.SET_CURRENTNODE({id:e,name:n,refresh:!0}),this.$router.replace({name:this.activeTab,params:{id:e}})}},goToTab:function(t){this.$router.push({name:t.id,params:{id:this.nodeID}})}})},l=d,f=(n("7766"),n("2877")),p=Object(f["a"])(l,r,s,!1,null,null,null);e["a"]=p.exports},9826:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"system"},[t.hideTabBar?t._e():n("TabsHead",{attrs:{"active-tab":"system"}}),n("Card",{staticClass:"system-card",attrs:{shadow:""}},[n("Row",{attrs:{gutter:20}},[n("i-col",{attrs:{span:"6"}},[n("div",{staticClass:"info-card version"},[n("p",{staticClass:"card-title"},[t._v(t._s(t.$t("common.version")))]),n("p",{staticClass:"card-content"},[t._v(t._s(t.systemInfo.version))])])]),n("i-col",{attrs:{span:"6"}},[n("div",{staticClass:"info-card os"},[n("p",{staticClass:"card-title"},[t._v(t._s(t.$t("system.os")))]),n("p",{staticClass:"card-content"},[t._v(t._s(t.systemInfo.os))])])]),n("i-col",{attrs:{span:"6"}},[n("div",{staticClass:"info-card arch"},[n("p",{staticClass:"card-title"},[t._v(t._s(t.$t("system.arch")))]),n("p",{staticClass:"card-content"},[t._v(t._s(t.systemInfo.arch))])])]),n("i-col",{attrs:{span:"6"}},[n("div",{staticClass:"info-card time"},[n("p",{staticClass:"card-title"},[t._v(t._s(t.$t("system.uptime")))]),n("p",{staticClass:"card-content"},[t._v(t._s(t.systemInfo.upTimeSeconds))])])])],1)],1)],1)},s=[],a=n("8d2f"),i=n("724c"),o=n("751a"),c=n("510b"),u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o["a"].get(Object(c["c"])(t,""),{params:e})},d=function(t){var e=t,n=e%60;e=parseInt(e/60,10);var r=e%60;e=parseInt(e/60,10);var s=e%24;e=parseInt(e/24,10);var a=e;return[a,s,r,n]},l=n("101e");function f(t,e){return v(t)||b(t,e)||m(t,e)||p()}function p(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(t,e){if(t){if("string"===typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function b(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,s,a=[],i=!0,o=!1;try{for(n=n.call(t);!(i=(r=n.next()).done);i=!0)if(a.push(r.value),e&&a.length===e)break}catch(c){o=!0,s=c}finally{try{i||null==n["return"]||n["return"]()}finally{if(o)throw s}}return a}}function v(t){if(Array.isArray(t))return t}var y={name:"System",components:{TabsHead:a["a"],forSubApp:l["a"]},mixins:[i["a"]],data:function(){return{systemInfo:{},timer:null}},created:function(){this.loadData()},beforeDestroy:function(){clearTimeout(this.timer)},beforeRouteLeave:function(t,e,n){clearTimeout(this.timer),n()},methods:{setLoadInfoInterval:function(){var t=this;this.timer=setTimeout((function(){t.loadData()}),1e3)},loadData:function(){var t=this;u(this.nodeID).then((function(e){t.systemInfo=e.data;var n=t.systemInfo,r=n.upTimeSeconds,s=n.os;t.systemInfo.os=t.fistLetterUpper(s),t.systemInfo.upTimeSeconds=t.parseUpTime(r),t.setLoadInfoInterval()}))},parseUpTime:function(t){if(t){var e=d(t),n=f(e,4),r=n[0],s=n[1],a=n[2],i=n[3],o="".concat(a," ").concat(this.$t("common.min",a),", ").concat(i," ").concat(this.$t("common.seconds",i));return 0!==s&&(o="".concat(s," ").concat(this.$t("common.hour",s),", ").concat(o)),0!==r&&(o="".concat(r," ").concat(this.$t("common.day",r),", ").concat(o)),o}return t},fistLetterUpper:function(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}}},g=y,_=(n("5d4f"),n("2877")),$=Object(_["a"])(g,r,s,!1,null,null,null);e["default"]=$.exports},ed50:function(t,e,n){},f62d:function(t,e,n){}}]);