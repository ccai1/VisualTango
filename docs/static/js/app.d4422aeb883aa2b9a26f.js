webpackJsonp([1],{"65bV":function(e,t){},K0DA:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=n("VU/8")({name:"App"},r,!1,function(e){n("K0DA")},null,null).exports,d=n("/ocq"),o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return"card"===e.type&&e.initialized&&e.expended?n("div",{staticClass:"card"},[n("strong",[e._v(e._s(this.title))]),n("br"),e._v(" "),n("div",{staticStyle:{"text-align":"left","padding-left":"5px"}},[n("strong",[e._v("direction:")]),e._v(" dfsaf"),n("br"),e._v(" "),n("strong",[e._v("height:")]),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("weighted:")]),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("unweighted:")]),e._v(" wrapped around front leg"),n("br"),e._v(" "),n("strong",[e._v("learning:")]),n("br"),e._v(" "),n("button",{staticStyle:{border:"0px","background-color":"#DC143C"},on:{click:function(t){e.removeCard(e.index)}}},[e._v("remove")]),e._v(" "),n("br"),n("br")])]):"card"===e.type&&e.initialized&&!e.expended?n("div",{staticClass:"card",on:{click:function(t){e.expendCard(e.index)}}},[e._v("\n  "+e._s(this.title)+"\n")]):"card"!==e.type||e.initialized?n("div",{staticClass:"card",staticStyle:{color:"gray"}},[e._v("\n  + add new\n")]):n("div",{staticClass:"card"},[n("div",{staticStyle:{"text-align":"left","padding-left":"5px"}},[n("strong",[e._v("title:")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),e._v(" "),n("strong",[e._v("direction:")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.direction,expression:"selected.direction"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.selected,"direction",t.target.multiple?n:n[0])}}},e._l(e.selectOptions.direction,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("height:")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.height,expression:"selected.height"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.selected,"height",t.target.multiple?n:n[0])}}},e._l(e.selectOptions.height,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("weighted:")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.weighted,expression:"selected.weighted"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.selected,"weighted",t.target.multiple?n:n[0])}}},e._l(e.selectOptions.weighted,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("unweighted:")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.unweighted,expression:"selected.unweighted"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.selected,"unweighted",t.target.multiple?n:n[0])}}},e._l(e.selectOptions.unweighted,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})),e._v(" "),n("br"),e._v(" "),n("strong",[e._v("learning:")]),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.learning,expression:"selected.learning"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.selected,"learning",t.target.multiple?n:n[0])}}},e._l(e.selectOptions.learning,function(t){return n("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})),e._v(" "),n("br"),e._v(" "),n("button",{staticStyle:{border:"0px","background-color":"#228B22"},on:{click:function(t){e.onAddingNewSubmit(e.name,e.selected.direction,e.selected.heighted,e.selected.weighted,e.selected.unweighted,e.selected.learning)}}},[e._v("submit")]),e._v(" "),n("button",{staticStyle:{border:"0px","background-color":"#FFD700"},on:{click:function(t){e.onAddingNewCancel()}}},[e._v("cancel")]),e._v(" "),n("br"),n("br")])])},staticRenderFns:[]};var s=n("VU/8")({data:function(){return{name:"",selected:{direction:"north",height:"high",weighted:"left",unweighted:"collected",learning:"neutral"},selectOptions:{direction:["north","northwest","northeast"],height:["high","low"],weighted:["left","right"],unweighted:["collected","crossed-forward","forward","backward","in-air-forward","in-air-backward","slide-out-side","wrapped-around-front"],learning:["neutral","forward","backward","toward-weighted","toward-unweighted"]}}},props:["index","title","type","initialized","expended","direction","height","weighted","unweighted","learning","onAddingNewSubmit","onAddingNewCancel","expendCard","removeCard"]},o,!1,function(e){n("ry9t")},"data-v-596f8c5c",null).exports,l=n("DAYN"),c={props:["cards","addCard","removeCard","inserting","onClickAddNew","onClickAddNewCancel","expendCard"],components:{Card:s,Dragglable:n.n(l).a}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"side-panel"},[n("Dragglable",{attrs:{list:this.cards},model:{value:this.cards,callback:function(t){e.$set(this,"cards",t)},expression:"this.cards"}},e._l(this.cards,function(t,i){return n("Card",{key:t.title,attrs:{index:i,id:"card-"+i,title:t.title,type:t.type,initialized:t.initialized,expended:t.expended,direction:t.direction,height:t.height,weighted:t.weighted,unweighted:t.unweighted,learning:t.learning,removeCard:e.removeCard,expendCard:e.expendCard}})})),e._v(" "),this.inserting?n("Card",{attrs:{type:"card",initialized:!1,onAddingNewSubmit:this.addCard,onAddingNewCancel:this.onClickAddNewCancel}}):n("Card",{nativeOn:{click:function(t){e.onClickAddNew()}}}),e._v(" "),n("br"),n("br")],1)},staticRenderFns:[]};var v=n("VU/8")(c,u,!1,function(e){n("65bV")},"data-v-dc772a00",null).exports,p=n("Ml+6"),h=n("qKrd"),g=n.n(h),m={data:function(){return{}},mounted:function(){var e=new p.Scene,t=g()(p),n=new p.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,50);n.position.set(0,10,25),n.lookAt(e.position);var i=new p.WebGLRenderer({antialias:!0});i.setSize(this.$el.clientWidth,this.$el.clientHeight),i.shadowMap.enabled=!0,i.shadowMap.type=p.PCFSoftShadowMap,this.$el.appendChild(i.domElement);var r=new t(n,i.domElement);r.update();var a=void 0,d=(new p.Clock,new p.PointLight(16777215,.5,100)),o=new p.PointLight(16777215,.5,100),s=new p.PointLight(16777215,.5,100),l=new p.PointLight(16777215,.5,100),c=new p.PointLight(16777215,.5,100);d.position.set(20,20,20),o.position.set(-20,20,20),s.position.set(20,20,-20),l.position.set(-20,20,-20),c.position.set(0,-20,0),e.add(d),e.add(o),e.add(s),e.add(l),e.add(c);var u=new p.PlaneGeometry(20,20,8,8),v=new p.MeshStandardMaterial({color:6266528,side:p.DoubleSide,metalness:0}),h=new p.Mesh(u,v);h.rotateX(-Math.PI/2),e.add(h),(new p.JSONLoader).load("static/model/stickman.json",function(t){var n=new p.SkinnedMesh(t,new p.MeshStandardMaterial({color:16711808,skinning:!0,metalness:0}));e.add(n),a=new p.AnimationMixer(n);var i=t.animations[0];a.clipAction(i).play(),a.update(1)});!function t(){requestAnimationFrame(t),r.update(),i.render(e,n)}()}},w={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"main-frame"})},staticRenderFns:[]};var _={data:function(){return{cards:[],inserting:!1,currentExpended:-1}},components:{SidePanel:v,MainFrame:n("VU/8")(m,w,!1,function(e){n("PF1Z")},"data-v-58e07484",null).exports},methods:{addCard:function(e,t,n,i,r,a){this.cards.push({type:"card",title:e,initialized:!0,expended:!1,direction:t,height:n,weighted:i,unweighted:r,learning:a}),this.inserting=!1},removeCard:function(e){e>=0&&e<=this.cards.length-1&&(this.cards[this.currentExpended].expended=!1,this.currentExpended=-1,this.cards.splice(e,1))},insertCardAfter:function(e,t){if(e!==t&&e>=0&&e<=this.cards.length-1&&t>=0&&t<=this.cards.length-1){var n=this.cards[e];this.cards.splice(e,1);var i=t;e<t&&(i-=1),this.cards.splice(i+1,0,n)}},onClickAddNew:function(){this.inserting=!0},onClickAddNewCancel:function(){this.inserting=!1},expendCard:function(e){-1!==this.currentExpended&&(this.cards[this.currentExpended].expended=!1),this.cards[e].expended=!0,this.currentExpended=e}}},f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"index"},[t("MainFrame"),this._v(" "),t("SidePanel",{attrs:{cards:this.cards,addCard:this.addCard,removeCard:this.removeCard,inserting:this.inserting,onClickAddNewCancel:this.onClickAddNewCancel,onClickAddNew:this.onClickAddNew,expendCard:this.expendCard}})],1)},staticRenderFns:[]};var C=n("VU/8")(_,f,!1,function(e){n("uIa3")},"data-v-cca346f8",null).exports;i.a.use(d.a);var x=new d.a({routes:[{path:"/",name:"VisualTango",component:C}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:x,components:{App:a},template:"<App/>"})},PF1Z:function(e,t){},ry9t:function(e,t){},uIa3:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d4422aeb883aa2b9a26f.js.map