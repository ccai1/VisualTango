webpackJsonp([1],{BFIk:function(n,e){},NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("7+uW"),o={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var a=t("VU/8")({name:"App"},o,!1,function(n){t("gsu9")},null,null).exports,r=t("/ocq"),s=t("Ml+6"),c={name:"VisualTango",data:function(){return{}},mounted:function(){var n=new s.e,e=new s.d(75,window.innerWidth/window.innerHeight,1,1e3);e.position.set(10,10,15),e.lookAt(n.position);var t=new s.f({antialias:!0});t.setSize(.9*window.innerWidth,.9*window.innerHeight),this.$el.appendChild(t.domElement),(new s.a).load("static/model/stickman.json",function(e){var t=new s.b(e,new s.c({color:33023})),i=new s.b(e,new s.c({color:16711808}));n.add(t),n.add(i),t.position.set(5,0,0),i.position.set(-5,0,0)});!function i(){requestAnimationFrame(i),t.render(n,e)}()}},d={render:function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"index"})},staticRenderFns:[]};var u=t("VU/8")(c,d,!1,function(n){t("BFIk")},"data-v-d469728c",null).exports;i.a.use(r.a);var l=new r.a({routes:[{path:"/",name:"VisualTango",component:u}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:l,components:{App:a},template:"<App/>"})},gsu9:function(n,e){}},["NHnr"]);
//# sourceMappingURL=app.024e956e7ef1867812bc.js.map