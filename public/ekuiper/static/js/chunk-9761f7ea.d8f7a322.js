(window["webpackJsonp_eKuiper"]=window["webpackJsonp_eKuiper"]||[]).push([["chunk-9761f7ea"],{4041:function(t,n,e){"use strict";var a=e("c9d9");n["a"]={computed:{lang:function(){return this.$store.state.lang},i18nLabel:function(){var t=this;return function(n){if(!n)return"";var e=a["b"].get(t.lang);if(!e)return n[t.lang];var r=n[e[0]]||n[e[1]]||"";return r}}}}},"78b2":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"language"},[e("div",{staticClass:"page-header"},[e("h1",[t._v(t._s(t.$t("common.language")))])]),e("Card",{attrs:{shadow:""}},[e("RadioGroup",{model:{value:t.currentLang,callback:function(n){t.currentLang=n},expression:"currentLang"}},t._l(t.LANG_LIST,(function(n){return e("Radio",{key:n.value,attrs:{label:n.value}},[e("span",[t._v(t._s(n.label))])])})),1),e("div",{staticClass:"oper-col"},[e("Button",{attrs:{type:"primary"},on:{click:t.submitLang}},[t._v(t._s(t.$t("common.submit")))])],1)],1)],1)},r=[],u=e("c9d9"),i=e("4041"),s={name:"Language",mixins:[i["a"]],data:function(){return{LANG_LIST:u["a"],currentLang:u["a"][0].value}},created:function(){this.currentLang=this.lang,this.setHtmlLangAttr(this.currentLang)},methods:{setHtmlLangAttr:function(t){document.querySelector("html").setAttribute("lang",t)},submitLang:function(){this.currentLang!==this.lang&&(this.setHtmlLangAttr(this.currentLang),this.$store.dispatch("SET_LANGUAGE",this.currentLang))}}},c=s,l=(e("f47c"),e("2877")),o=Object(l["a"])(c,a,r,!1,null,null,null);n["default"]=o.exports},"877c":function(t,n,e){},c9d9:function(t,n,e){"use strict";e.d(n,"a",(function(){return a})),e.d(n,"b",(function(){return r}));var a=[{value:"en",label:"English"},{value:"zh",label:"简体中文"}],r=new Map([["en",["en","en_US"]],["zh",["zh","zh_CN"]]])},f47c:function(t,n,e){"use strict";e("877c")}}]);