(window["webpackJsonp_eKuiper"]=window["webpackJsonp_eKuiper"]||[]).push([["chunk-60c61580"],{a8fa:function(s,o,r){"use strict";r("e9be")},e9be:function(s,o,r){},f2df:function(s,o,r){"use strict";r.r(o);var a=function(){var s=this,o=s.$createElement,r=s._self._c||o;return r("div",{staticClass:"change-password"},[r("div",{staticClass:"page-header"},[r("h1",[s._v(s._s(s.$t("common.changePassword")))])]),r("Card",{attrs:{shadow:""}},[r("Form",{ref:"passwordForm",attrs:{model:s.passwordForm,rules:s.rules}},[r("Row",[r("i-col",{attrs:{span:"14"}},[r("FormItem",{attrs:{label:s.$t("common.oldPassword"),prop:"oldPassword"}},[r("i-input",{attrs:{size:"large",type:"password"},model:{value:s.passwordForm.oldPassword,callback:function(o){s.$set(s.passwordForm,"oldPassword",o)},expression:"passwordForm.oldPassword"}})],1)],1),r("i-col",{attrs:{span:"14"}},[r("FormItem",{attrs:{label:s.$t("common.newPassword"),prop:"newPassword"}},[r("i-input",{attrs:{type:"password",size:"large"},model:{value:s.passwordForm.newPassword,callback:function(o){s.$set(s.passwordForm,"newPassword",o)},expression:"passwordForm.newPassword"}})],1)],1),r("i-col",{attrs:{span:"14"}},[r("FormItem",{attrs:{label:s.$t("common.confirmPassword"),type:"password",prop:"confirmPassword"}},[r("i-input",{attrs:{type:"password",size:"large"},model:{value:s.passwordForm.confirmPassword,callback:function(o){s.$set(s.passwordForm,"confirmPassword",o)},expression:"passwordForm.confirmPassword"}})],1)],1),r("i-col",{staticClass:"oper-col",attrs:{span:"14"}},[r("Button",{attrs:{type:"primary"},on:{click:s.submitPassword}},[s._v(s._s(s.$t("common.submit")))])],1)],1)],1)],1)],1)},e=[],t=r("3786"),n={name:"ChangePassword",data:function(){var s=this,o=function(o,r,a){""===r?a(new Error(s.$t("common.pleaseEnterYourPasswordAgain"))):r!==s.passwordForm.newPassword?a(new Error(s.$t("common.confirmNotMatch"))):a()};return{passwordForm:{},rules:{oldPassword:[{required:!0,message:this.$t("common.fillContent")}],newPassword:[{required:!0,message:this.$t("common.fillContent")}],confirmPassword:[{required:!0,message:this.$t("common.pleaseEnterYourPasswordAgain")},{validator:o,trigger:"blur"}]}}},computed:{user:function(){return this.$store.state.user}},methods:{submitPassword:function(){var s=this;this.$refs.passwordForm.validate((function(o){if(o){var r=s.user,a=r.username,e=r.userId,n=r.roleId;Object(t["a"])({username:a,password:s.passwordForm.oldPassword}).then((function(){Object(t["c"])(e,{username:a,password:s.passwordForm.newPassword,roleId:n}).then((function(){s.$Message.success(s.$t("common.changePasswordSuccess")),setTimeout((function(){s.$router.push({name:"login"})}),500)})).catch((function(){}))})).catch((function(){}))}}))}}},d=n,i=(r("a8fa"),r("2877")),c=Object(i["a"])(d,a,e,!1,null,null,null);o["default"]=c.exports}}]);