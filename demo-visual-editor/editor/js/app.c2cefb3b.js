(function(e){function t(t){for(var o,u,c=t[0],l=t[1],i=t[2],d=0,f=[];d<c.length;d++)u=c[d],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&f.push(r[u][0]),r[u]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var l=n[c];0!==r[l]&&(o=!1)}o&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},r={app:0},a=[];function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"003d":function(e,t,n){},7502:function(e,t,n){},"896f":function(e){e.exports=JSON.parse('{"container":{"height":500,"width":800},"blocks":[{"componentKey":"select","top":143,"left":222.5,"adjustPosition":false,"focus":true,"zIndex":0,"width":193,"height":40,"hasResize":false,"props":{"options":[{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"}]}},{"componentKey":"button","top":13,"left":459,"adjustPosition":false,"focus":false,"zIndex":0,"width":70,"height":40,"hasResize":false,"props":{"text":"测试","type":"","size":"medium"}},{"componentKey":"text","top":262,"left":552,"adjustPosition":false,"focus":false,"zIndex":0,"width":64,"height":22,"hasResize":false},{"componentKey":"input","top":267,"left":215,"adjustPosition":false,"focus":false,"zIndex":0,"width":178,"height":40,"hasResize":false}]}')},"9eb1":function(e,t,n){"use strict";n("a9b7")},a9b7:function(e,t,n){},baf1:function(e,t,n){},be46:function(e,t,n){},c492:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e623"),n("e379"),n("5dc8"),n("37e1");var o=n("7a23"),r={class:"app"},a={style:{"text-align":"center"}};function u(e,t,n,u,c,l){var i=Object(o["M"])("visual-editor");return Object(o["D"])(),Object(o["i"])("div",r,[Object(o["m"])(i,{modelValue:e.jsonData,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.jsonData=t}),config:e.visualConfig,formData:e.formData},null,8,["modelValue","config","formData"]),Object(o["m"])("div",a,Object(o["Q"])(JSON.stringify(e.formData)),1)])}n("99af"),n("4de4"),n("4160"),n("d81d"),n("d3b7"),n("25f0"),n("159b");var c=n("2909"),l=n("5530"),i=n("53ca"),s=(n("96cf"),n("1da1"));n("c975"),n("fb6a");function d(){var e=[];return{on:function(t){e.push(t)},off:function(t){var n=e.indexOf(t);n>-1&&e.slice(n,1)},emit:function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];e.forEach((function(e){return e.apply(void 0,n)}))}}}var f,p=function(){var e={};return e.promise=new Promise((function(t,n){e.resolve=t,e.reject=n})),e},b=n("3fd4"),v=b["c"];(function(e){e["textarea"]="textarea",e["input"]="input"})(f||(f={}));var m=function(){var e=0;return function(){return"auto_key_".concat(e++)}}(),j=Object(o["n"])({props:{option:{type:Object,required:!0}},setup:function(e){var t=Object(o["o"])(),n=Object(o["H"])({option:e.option,editValue:null,showFlag:!1,key:m()}),r={service:function(e){n.option=e,n.editValue=e.editValue,n.key=m(),r.show()},show:function(){return n.showFlag=!0},hide:function(){return n.showFlag=!1}},a={onConfirm:function(){n.option.onConfirm(n.editValue),r.hide()},onCancel:function(){r.hide()}};return Object.assign(t.proxy,r),function(){return Object(o["m"])(v,{modelValue:n.showFlag,"onUpdate:modelValue":function(e){return n.showFlag=e},title:n.option.title,key:n.key},{default:function(){return Object(o["m"])("div",null,[n.option.editType===f.textarea?Object(o["m"])(b["f"],Object(o["t"])({type:"textarea"},{rows:10},{modelValue:n.editValue,"onUpdate:modelValue":function(e){return n.editValue=e}}),null):Object(o["m"])(b["f"],{modelValue:n.editValue,"onUpdate:modelValue":function(e){return n.editValue=e}},null)])},footer:function(){return Object(o["m"])("div",null,[Object(o["m"])(b["a"],{onClick:a.onCancel},{default:function(){return[Object(o["l"])("取消")]}}),Object(o["m"])(b["a"],{onClick:a.onConfirm},{default:function(){return[Object(o["l"])("确定")]}})])}})}}}),h=function(){var e;return function(t){if(!e){var n=document.createElement("div");document.body.append(n),e=Object(o["h"])(j,{option:t}).mount(n)}e.service(t)}}(),O=Object.assign(h,{input:function(e,t){var n=p(),o=Object(l["a"])(Object(l["a"])({},t),{},{editType:f.input,onConfirm:n.resolve,editValue:e});return h(o),n.promise},textarea:function(e,t){var n=p(),o=Object(l["a"])(Object(l["a"])({},t),{},{editType:f.textarea,onConfirm:n.resolve,editValue:e});return h(o),n.promise}});function g(e,t){var n=Object(o["I"])(e());return Object(o["Y"])(e,(function(e){e!==n.value&&(n.value=e)})),{get value(){return n.value},set value(e){n.value!==e&&(n.value=e,t(e))}}}Object(o["n"])({props:{modelValue:{type:String}},emits:{"update:modelValue":function(e){return!0}},setup:function(e,t){var n=g((function(){return e.modelValue}),(function(e){return t.emit("update:modelValue",e)}));return function(){return Object(o["m"])("div",null,[Object(o["l"])("自定义输入框"),Object(o["bb"])(Object(o["m"])("input",{type:"text","onUpdate:modelValue":function(e){return n.value=e}},null),[[o["W"],n.value]])])}}}),n("13d5"),n("a434"),n("caad6"),n("a15b"),n("b0c0"),n("2532");var y={16:"shift",17:"ctrl",18:"alt",8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down",46:"delete",189:"-",187:"=",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12"};function k(){var e=Object(o["H"])({current:-1,queue:[],commands:{},destroyList:[],commandArray:[]}),t=function(t){e.commandArray.push(t),e.commands[t.name]=function(){var n=t.execute.apply(t,arguments),o=n.undo,r=n.redo;if(r(),!1!==t.followQueue){var a=e.queue,u=e.current;a.length>0&&(a=a.slice(0,u+1),e.queue=a),a.push({undo:o,redo:r}),e.current=u+1}}},n=function(){var t=function(t){if(document.activeElement===document.body){var n=t.keyCode,o=t.shiftKey,r=t.altKey,a=t.ctrlKey,u=t.metaKey,c=[];(a||u)&&c.push("ctrl"),o&&c.push("shift"),r&&c.push("alt"),c.push(y[n]);var l=c.join("+");e.commandArray.forEach((function(n){var o=n.keyboard,r=n.name;if(o){var a=Array.isArray(o)?o:[o];a.includes(l)&&(e.commands[r](),t.stopPropagation(),t.preventDefault())}}))}},n=function(){return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}};return n}(),r=function(){e.commandArray.forEach((function(t){return!!t.init&&e.destroyList.push(t.init())})),e.destroyList.push(n())};return t({name:"undo",keyboard:"ctrl+z",followQueue:!1,execute:function(){return{redo:function(){var t=e.current;if(-1!==t){var n=e.queue[t];n&&(n.undo&&n.undo(),e.current--)}},undo:function(){}}}}),t({name:"redo",keyboard:["ctrl+y","ctrl+shift+z"],followQueue:!1,execute:function(){return{redo:function(){var t=e.queue[e.current+1];t&&(t.redo(),e.current++)},undo:function(){console.log("undo")}}}}),{state:e,registry:t,init:r}}var w=n("4979"),x=n.n(w);function z(e){var t=e.focusData,n=e.updateBlocks,o=e.dataModel,r=e.dragstart,a=e.dragend,u=k();return u.registry({name:"delete",keyboard:["backspace","delete","ctrl+d"],execute:function(){var e;console.log("执行删除命令");var r={before:(null===(e=o.value)||void 0===e?void 0:e.blocks)||[],after:t.value.unfocus};return{redo:function(){console.log("重做删除命令"),n(r.after)},undo:function(){console.log("撤回删除命令"),n(r.before)}}}}),u.registry({name:"updateBlocks",execute:function(e){var r;console.log("执行删除命令");var a={before:(null===(r=o.value)||void 0===r?void 0:r.blocks)||[],after:t.value.unfocus};return{redo:function(){console.log("重做删除命令"),n(a.after)},undo:function(){console.log("撤回删除命令"),n(a.before)}}}}),u.registry({name:"drag",init:function(){var e=this;this.data={before:null};var t={dragstart:function(){var t;e.data.before=x()((null===(t=o.value)||void 0===t?void 0:t.blocks)||[])},dragend:function(){u.state.commands.drag()}};return r.on(t.dragstart),a.on(t.dragend),function(){r.off(t.dragstart),a.off(t.dragend)}},execute:function(){var e,t=this.data.before,r=x()((null===(e=o.value)||void 0===e?void 0:e.blocks)||[]);return{redo:function(){n(x()(r))},undo:function(){n(x()(t))}}}}),u.registry({name:"clear",execute:function(){var e,t={before:x()(null===(e=o.value)||void 0===e?void 0:e.blocks),after:x()([])};return{redo:function(){n(x()(t.after))},undo:function(){n(x()(t.before||[]))}}}}),u.registry({name:"placeTop",keyboard:"ctrl+up",execute:function(){var e,r={before:x()(null===(e=o.value)||void 0===e?void 0:e.blocks),after:x()(function(){var e,n=t.value,r=n.focus,a=n.unfocus,u=a.reduce((function(e,t){return Math.max(e,t.zIndex)}),-1/0);return r.forEach((function(e){return e.zIndex=u+1})),x()(null===(e=o.value)||void 0===e?void 0:e.blocks)}())};return{redo:function(){n(x()(r.after||[]))},undo:function(){n(x()(r.before||[]))}}}}),u.registry({name:"placeBottom",keyboard:"ctrl+down",execute:function(){var e,r={before:x()(null===(e=o.value)||void 0===e?void 0:e.blocks),after:x()(function(){var e,n=t.value,r=n.focus,a=n.unfocus,u=a.reduce((function(e,t){return Math.min(e,t.zIndex)}),1/0);return u<=0&&(a.forEach((function(e){return e.zIndex=1+e.zIndex+Math.abs(u)})),u=1),r.forEach((function(e){return e.zIndex=u-1})),x()(null===(e=o.value)||void 0===e?void 0:e.blocks)}())};return{redo:function(){n(x()(r.after||[]))},undo:function(){n(x()(r.before||[]))}}}}),u.registry({name:"updateBlock",execute:function(e,t){var r,a,u=x()((null===(r=o.value)||void 0===r?void 0:r.blocks)||[]),l={before:x()(null===(a=o.value)||void 0===a?void 0:a.blocks),after:function(){u=Object(c["a"])(u);var n=o.value.blocks.indexOf(t);return n>-1&&u.splice(n,1,e),x()(u)}()};return{redo:function(){n(x()(l.after||[]))},undo:function(){n(x()(l.before||[]))}}}}),u.registry({name:"updateModelValue",execute:function(e){var t={before:x()(o.value),after:x()(e)};return{redo:function(){o.value=t.after},undo:function(){o.value=t.before}}}}),u.init(),{undo:function(){return u.state.commands.undo()},redo:function(){return u.state.commands.redo()},delete:function(){return u.state.commands.delete()},clear:function(){return u.state.commands.clear()},placeTop:function(){return u.state.commands.placeTop()},placeBottom:function(){return u.state.commands.placeBottom()},updateBlock:function(e,t){return u.state.commands.updateBlock(e,t)},updateModelValue:function(e){return u.state.commands.updateModelValue(e)}}}n("b64b");var V,D=n("ade3");n("003d");(function(e){e["start"]="start",e["center"]="center",e["end"]="end"})(V||(V={}));var C=Object(o["n"])({props:{block:{type:Object,required:!0},component:{type:Object,required:!0}},setup:function(e){var t=e.component.resize||{},n=t.width,r=t.height,a=function(){var t={startX:0,startY:0,startWidth:0,startHeight:0,startLeft:0,startTop:0,direction:{}},n=function(n){var o=t,r=o.startX,a=o.startY,u=o.startWidth,c=o.startHeight,l=o.direction,i=o.startLeft,s=o.startTop,d=n.clientX,f=n.clientY;l.horizontal===V.center&&(d=r),l.vertical===V.center&&(f=a);var p=d-r,b=f-a,v=e.block;l.vertical===V.start&&(b=-b,v.top=s-b),l.horizontal===V.start&&(p=-p,v.left=i-p);var m=u+p,j=c+b;v.width=m,v.height=j,v.hasResize=!0},o=function e(t){console.log(t),document.body.removeEventListener("mousemove",n),document.body.removeEventListener("mouseup",e)},r=function(r,a){r.stopPropagation(),document.body.addEventListener("mousemove",n),document.body.addEventListener("mouseup",o),t={startX:r.clientX,startY:r.clientY,direction:a,startWidth:e.block.width,startHeight:e.block.height,startLeft:e.block.left,startTop:e.block.top}};return r}();return function(){return Object(o["m"])(o["b"],null,[r&&Object(o["m"])(o["b"],null,[Object(o["m"])("div",{class:"block-resize block-resize-top",onMousedown:function(e){return a(e,{horizontal:V.center,vertical:V.start})}},null),Object(o["m"])("div",{class:"block-resize block-resize-bottom",onMousedown:function(e){return a(e,{horizontal:V.center,vertical:V.end})}},null)]),n&&Object(o["m"])(o["b"],null,[Object(o["m"])("div",{class:"block-resize block-resize-left",onMousedown:function(e){return a(e,{horizontal:V.start,vertical:V.center})}},null),Object(o["m"])("div",{class:"block-resize block-resize-right",onMousedown:function(e){return a(e,{horizontal:V.end,vertical:V.center})}},null)]),n&&r&&Object(o["m"])(o["b"],null,[Object(o["m"])("div",{class:"block-resize block-resize-top-left",onMousedown:function(e){return a(e,{horizontal:V.start,vertical:V.start})}},null),Object(o["m"])("div",{class:"block-resize block-resize-top-right",onMousedown:function(e){return a(e,{horizontal:V.end,vertical:V.start})}},null),Object(o["m"])("div",{class:"block-resize block-resize-bottom-left",onMousedown:function(e){return a(e,{horizontal:V.start,vertical:V.end})}},null),Object(o["m"])("div",{class:"block-resize block-resize-bottom-right",onMousedown:function(e){return a(e,{horizontal:V.end,vertical:V.end})}},null)])])}}}),L=Object(o["n"])({props:{block:{type:Object},config:{type:Object},formData:{type:Object,required:!0},slots:{type:Object,required:!0}},setup:function(e){var t=Object(o["I"])({}),n=Object(o["g"])((function(){var t,n,o;return{top:"".concat(null===(t=e.block)||void 0===t?void 0:t.top,"px"),left:"".concat(null===(n=e.block)||void 0===n?void 0:n.left,"px"),zIndex:null===(o=e.block)||void 0===o?void 0:o.zIndex}})),r=Object(o["g"])((function(){var t;return["visual-editor-block",{"visual-editor-block-focus":null===(t=e.block)||void 0===t?void 0:t.focus}]}));return Object(o["A"])((function(){var n=e.block;if(null!==n&&void 0!==n&&n.adjustPosition){var o=t.value,r=o.offsetWidth,a=o.offsetHeight;n.left-=r/2,n.top-=a/2,n.height=a,n.width=r,n.adjustPosition=!1}})),function(){var a,u,c,l,i,s,d=null===(a=e.config)||void 0===a?void 0:a.componentMap[e.block.componentKey],f=e.formData;null!==(u=e.block)&&void 0!==u&&u.slotName&&e.slots[e.block.slotName]?l=e.slots[e.block.slotName]():l=null===d||void 0===d?void 0:d.render({size:null!==(i=e.block)&&void 0!==i&&i.hasResize?{width:e.block.width,height:e.block.height}:{},props:(null===(s=e.block)||void 0===s?void 0:s.props)||{},model:Object.keys(d.model||{}).reduce((function(t,n){var o,r,a,u=null!==(o=e.block)&&void 0!==o&&o.model?null===(r=e.block)||void 0===r?void 0:r.model[n]:null;return t[n]=(a={},Object(D["a"])(a,"default"===n?"modelValue":n,e.formData[u]),Object(D["a"])(a,"default"===u?"onUpdate:modelValue":"onChange",(function(e){return u&&(f[u]=e)})),a),t}),{})});var p=(null===d||void 0===d?void 0:d.resize)||{},b=p.width,v=p.height;return Object(o["m"])("div",{class:r.value,style:n.value,ref:t},[l,(null===(c=e.block)||void 0===c?void 0:c.focus)&&(b||v)&&Object(o["m"])(C,{block:e.block,component:d},null)])}}});n("c492");function E(e){return{componentKey:e.component.key,top:e.top,left:e.left,adjustPosition:!0,focus:!1,zIndex:0,width:0,height:0,hasResize:!1}}function M(){var e=[],t={};return{componentList:e,componentMap:t,registry:function(n,o){var r=Object(l["a"])(Object(l["a"])({},o),{},{key:n});e.push(r),t[n]=r}}}n("be46");var F=function(){var e="@@DROPDOWN_SERVICE_PROVIDER";return{provide:function(t){Object(o["F"])(e,t)},inject:function(){return Object(o["q"])(e)}}}(),B=Object(o["n"])({props:{option:{type:Object}},setup:function(e){var t=Object(o["o"])(),n=Object(o["I"])({}),r=Object(o["H"])({option:e.option,showFlag:!1,top:0,left:0,mounted:function(){var e=p();return Object(o["A"])(e.resolve),e.promise}()}),a={show:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.mounted;case 2:r.showFlag=!0;case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),hide:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r.showFlag=!1;case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},u=function(e){if(r.option=e,r.showFlag=!0,"addEventListener"in e.reference){console.log(e.reference);var t=e.reference.getBoundingClientRect(),n=t.top,o=t.left,u=t.height;r.top=n+u,r.left=o}else{var c=e.reference,l=c.clientX,i=c.clientY;r.left=l,r.top=i}a.show()},c=Object(o["g"])((function(){return["dropdown-service",{"dropdown-service-show":r.showFlag}]})),l=Object(o["g"])((function(){return{top:"".concat(r.top,"px"),left:"".concat(r.left,"px")}}));Object.assign(t.proxy,{service:u});var i=function(e){n.value.contains(e.target)||a.hide()};return Object(o["A"])((function(){return document.body.addEventListener("mousedown",i,!0)})),Object(o["x"])((function(){return document.body.removeEventListener("mousedown",i,!0)})),F.provide({onClick:a.hide}),function(){var e;return Object(o["m"])("div",{class:c.value,style:l.value,ref:n},[null===(e=r.option)||void 0===e?void 0:e.content()])}}}),R=Object(o["n"])({props:{label:{type:String},icon:{type:String}},emits:{click:function(e){return!0}},setup:function(e,t){var n=F.inject(),r=n.onClick,a={onClick:function(e){t.emit("click",e),r()}};return function(){return Object(o["m"])("div",{class:"dropdown-option",onClick:a.onClick},[Object(o["m"])("i",{class:"iconfont ".concat(e.icon)},null),Object(o["m"])("span",null,[e.label])])}}}),T=function(){var e;return function(t){if(!e){var n=document.createElement("div");document.body.appendChild(n);var r=Object(o["h"])(B,{option:t});e=r.mount(n)}e.service(t)}}(),P=(n("4fad"),n("3835"));n("baf1");function I(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!Object(o["s"])(e)}var S,q=b["c"],U=b["k"],X=b["l"],Y=b["a"],K=Object(o["n"])({props:{option:{type:Object,required:!0}},setup:function(e){var t=Object(o["o"])(),n=Object(o["H"])({option:e.option,showFlag:!1,mounted:function(){var e=p();return Object(o["A"])(e.resolve),e.promise}(),editorData:[]}),r={service:function(e){n.option=e,n.editorData=x()(e.data||[]),r.show()},show:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.mounted;case 2:n.showFlag=!0;case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),hide:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.showFlag=!1;case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}(),add:function(){n.editorData.push({})},reset:function(){n.editorData=x()(n.option.data)}},a={onConfirm:function(){n.option.onConfirm(n.editorData),r.hide()},onCancel:function(){r.hide()},onDelete:function(){}};return Object.assign(t.proxy,r),function(){return Object(o["m"])(q,{modelValue:n.showFlag,"onUpdate:modelValue":function(e){return n.showFlag=e}},{default:function(){var e,t;return Object(o["m"])("div",null,[Object(o["m"])("div",null,[Object(o["m"])(Y,{onClick:r.add},{default:function(){return[Object(o["l"])("添加")]}}),Object(o["m"])(Y,{onClick:r.reset},{default:function(){return[Object(o["l"])("重置")]}})]),Object(o["m"])(U,{data:n.editorData},{default:function(){return[Object(o["m"])(X,{type:"index"},null),null===(t=n.option.config.table)||void 0===t?void 0:t.options.map((function(e,t){return Object(o["m"])(X,{label:e.label},{default:function(t){var n=t.row;return Object(o["m"])(b["f"],{modelValue:n[e.field],"onUpdate:modelValue":function(t){return n[e.field]=t}},null)}})})),Object(o["m"])(X,{label:"操作栏"},I(e=Object(o["m"])(Y,{type:"text",onClick:a.onDelete},{default:function(){return[Object(o["l"])("删除")]}}))?e:{default:function(){return[e]}})]}})])},footer:function(){return Object(o["m"])(o["b"],null,[Object(o["m"])(Y,{onClick:a.onCancel},{default:function(){return[Object(o["l"])(" 取消")]}}),Object(o["m"])(Y,{onClick:a.onConfirm,type:"primary"},{default:function(){return[Object(o["l"])("确定")]}})])}})}}}),A=function(){var e;return function(t){if(!e){var n=document.createElement("div");document.body.appendChild(n);var r=Object(o["h"])(K,{option:t});e=r.mount(n)}var a=p();return e.service(Object(l["a"])(Object(l["a"])({},t),{},{onConfirm:a.resolve})),a.promise}}(),H=b["a"],J=Object(o["n"])({props:{modelValue:{type:Array},propConfig:{type:Object,required:!0}},emits:{"update:modelValue":function(e){return!0}},setup:function(e,t){var n=g((function(){return e.modelValue}),(function(e){return t.emit("update:modelValue",e)})),r=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,A({config:e.propConfig,data:e.modelValue||[]});case 2:o=t.sent,console.log(o),n.value=o;case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return function(){return Object(o["m"])("div",null,[(!n.value||0===n.value.length)&&Object(o["m"])(H,{onClick:r,type:"primary"},{default:function(){return[Object(o["l"])("添加")]}}),(n.value||[]).map((function(t){var n;return Object(o["m"])(b["m"],null,{default:function(){return[t[(null===(n=e.propConfig.table)||void 0===n?void 0:n.showKey)||""]]}})}))])}}});function N(e){return{type:S.input,label:e}}function _(e){return{type:S.color,label:e}}function W(e,t){return{type:S.select,label:e,options:t}}function Q(e,t){return{type:S.table,label:e,table:t}}function G(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!Object(o["s"])(e)}(function(e){e["input"]="input",e["color"]="color",e["select"]="select",e["table"]="table"})(S||(S={}));var Z=Object(o["n"])({props:{block:{type:Object},config:{type:Object},dataModel:{type:Object,required:!0},updateBlock:{type:Function,required:!0},updateModelValue:{type:Function,required:!0}},setup:function(e){var t,n=Object(o["H"])({editData:{}}),r={apply:function(){e.block?e.updateBlock(Object(l["a"])(Object(l["a"])({},e.block),{},{props:n.editData}),e.block):e.updateModelValue(Object(l["a"])(Object(l["a"])({},e.dataModel.value),{},{container:n.editData}))},reset:function(){e.block?n.editData=x()(e.block.props||{}):n.editData=x()(e.dataModel.value.container)}};return Object(o["Y"])((function(){return e.block}),(function(){r.reset()}),{immediate:!0}),function(){if(e.block){var a,u=e.block.componentKey,c=null===(a=e.config)||void 0===a?void 0:a.componentMap[u];c&&c.props&&(t=Object(o["m"])(o["b"],null,[Object.entries(c.props).map((function(e){var t,r,a=Object(P["a"])(e,2),u=a[0],c=a[1];switch(c.type){case S.input:r=Object(o["m"])(b["f"],{modelValue:n.editData[u],"onUpdate:modelValue":function(e){return n.editData[u]=e}},null);break;case S.color:r=Object(o["m"])(b["b"],{modelValue:n.editData[u],"onUpdate:modelValue":function(e){return n.editData[u]=e}},null);break;case S.select:r=Object(o["m"])(b["j"],{placeholder:"请选择",modelValue:n.editData[u],"onUpdate:modelValue":function(e){return n.editData[u]=e}},{default:function(){return[null===(t=c.options)||void 0===t?void 0:t.map((function(e,t){return Object(o["m"])(b["i"],{key:t,label:e.label,value:e.val},{default:function(){return[e.label]}})}))]}});break;case S.table:r=Object(o["m"])(J,{modelValue:n.editData[u],"onUpdate:modelValue":function(e){return n.editData[u]=e},propConfig:c},null);break;default:r=Object(o["m"])(o["b"],null,null);break}return Object(o["m"])(b["e"],Object(o["t"])({labelPosition:"top"},{label:c.label,key:u}),G(r)?r:{default:function(){return[r]}})}))]))}else{var l,i;t=Object(o["m"])(o["b"],null,[Object(o["m"])(b["e"],{label:"容器宽度"},G(l=Object(o["m"])(b["g"],Object(o["t"])({modelValue:n.editData.width,"onUpdate:modelValue":function(e){return n.editData.width=e}},{step:100}),null))?l:{default:function(){return[l]}}),Object(o["m"])(b["e"],{label:"容器高度"},G(i=Object(o["m"])(b["g"],Object(o["t"])({modelValue:n.editData.height,"onUpdate:modelValue":function(e){return n.editData.height=e}},{step:100}),null))?i:{default:function(){return[i]}})])}return Object(o["m"])("div",{class:"operator"},[Object(o["m"])(b["d"],null,{default:function(){return[t,Object(o["m"])(b["e"],null,{default:function(){return[Object(o["m"])(b["a"],{onClick:r.apply},{default:function(){return[Object(o["l"])("应用")]}}),Object(o["m"])(b["a"],{onClick:r.reset},{default:function(){return[Object(o["l"])("重置")]}})]}})]}})])}}});function $(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!Object(o["s"])(e)}var ee=R,te=Object(o["n"])({props:{modelValue:{type:Object,require:!0},config:{type:Object,require:!0},formData:{type:Object,required:!0}},emits:{"update:modelValue":function(e){return!0}},setup:function(e,t){var n,r=g((function(){return e.modelValue}),(function(e){return t.emit("update:modelValue",e)})),a=Object(o["g"])((function(){var t,n;return{width:"".concat(null===(t=e.modelValue)||void 0===t?void 0:t.container.width,"px"),height:"".concat(null===(n=e.modelValue)||void 0===n?void 0:n.container.height,"px")}})),u=Object(o["I"])({}),f=Object(o["g"])((function(){var e,t,n=(null===(e=r.value)||void 0===e?void 0:e.blocks.filter((function(e){return e.focus})))||[],o=(null===(t=r.value)||void 0===t?void 0:t.blocks.filter((function(e){return!e.focus})))||[];return{focus:n,unfocus:o}})),p=Object(o["I"])(-1),v=Object(o["H"])({selectBlock:Object(o["g"])((function(){var e;return((null===(e=r.value)||void 0===e?void 0:e.blocks)||[])[p.value]})),preview:!1,editing:!0}),m=Object(o["g"])((function(){return["visual-editor",{editing:!v.preview}]})),j=d(),h=d(),y={clearFocus:function(e){var t,n=(null===(t=r.value)||void 0===t?void 0:t.blocks)||[];0!==n.length&&(e&&(n=n.filter((function(t){return t!==e}))),n.forEach((function(e){return e.focus=!1})))},updateBlocks:function(e){r.value.blocks=e},importBlockData:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var o,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O.textarea("",{title:"请输入节点Json字符串"});case 2:if(o=e.sent,e.prev=3,r=JSON.parse(o||""),"object"===Object(i["a"])(r)){e.next=7;break}throw new Error;case 7:n.updateBlock(r,t),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),b["h"].alert("解析json字符串出错");case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));function t(t){return e.apply(this,arguments)}return t}(),showBlockData:function(e){O.textarea(JSON.stringify(e),{title:"节点数据"})},openEdit:function(){v.editing=!0}},k=function(){var e=null,t={dragenter:function(e){e.dataTransfer.dropEffect="move"},dragover:function(e){e.preventDefault()},dragleave:function(e){e.dataTransfer.dropEffect="none"},drop:function(t){var n;console.log("drop",e);var o=(null===(n=r.value)||void 0===n?void 0:n.blocks)||[];o.push(E({component:e,top:t.offsetY,left:t.offsetX})),console.log("x",t.offsetX),console.log("y",t.offsetY),r.value=Object(l["a"])(Object(l["a"])({},r.value),{},{blocks:o}),h.emit()}},n={dragstart:function(n,o){u.value.addEventListener("dragenter",t.dragenter),u.value.addEventListener("dragover",t.dragover),u.value.addEventListener("dragleave",t.dragleave),u.value.addEventListener("drop",t.drop),e=o,j.emit()},dragend:function(n){u.value.removeEventListener("dragenter",t.dragenter),u.value.removeEventListener("dragover",t.dragover),u.value.removeEventListener("dragleave",t.dragleave),u.value.removeEventListener("drop",t.drop),e=null}};return n}(),w=function(){var e=Object(o["H"])({x:null,y:null}),t={startX:0,startY:0,startLeft:0,startTop:0,startPos:[],dragging:!1,markLines:{}},n=function(n){t.dragging||(t.dragging=!0,j.emit());var o=n.clientX,r=n.clientY,a=t,u=a.startX,c=a.startY;n.shiftKey&&(Math.abs(n.clientX-u)>Math.abs(n.clientY-c)?r=c:o=u);for(var l=t.startLeft+o-u,i=t.startTop+r-c,s={x:null,y:null},d=0;d<t.markLines.y.length;d++){var p=t.markLines.y[d],b=p.top,v=p.showTop;if(Math.abs(b-i)<5){r=b+c-t.startTop,s.y=v;break}}for(var m=0;m<t.markLines.x.length;m++){var h=t.markLines.x[m],O=h.left,g=h.showLeft;if(Math.abs(O-l)<5){o=O+u-t.startLeft,s.x=g;break}}var y=r-c,k=o-u;f.value.focus.forEach((function(e,n){e.top=t.startPos[n].top+y,e.left=t.startPos[n].left+k})),e.x=s.x,e.y=s.y},a=function o(r){document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o),e.x=null,e.y=null,t.dragging&&h.emit()},u=function(e){t={startX:e.clientX,startY:e.clientY,startTop:v.selectBlock.top,startLeft:v.selectBlock.left,startPos:f.value.focus.map((function(e){var t=e.top,n=e.left;return{top:t,left:n}})),dragging:!1,markLines:function(){var e=f.value,t=(e.focus,e.unfocus),n=v.selectBlock,o=(n.top,n.left,n.width),a=n.height,u={x:[],y:[]};return[].concat(Object(c["a"])(t),[{top:0,left:0,width:r.value.container.width,height:r.value.container.height}]).forEach((function(e){var t=e.top,n=e.left,r=e.width,c=e.height;u.y.push({top:t,showTop:t}),u.y.push({top:t+c,showTop:t+c}),u.y.push({top:t+c/2-a/2,showTop:t+c/2}),u.y.push({top:t-a,showTop:t}),u.y.push({top:t+c-a,showTop:t+c}),u.x.push({left:n,showLeft:n}),u.x.push({left:n+r,showLeft:n+r}),u.x.push({left:n+r/2-o/2,showLeft:n+r/2}),u.x.push({left:n-o,showLeft:n}),u.x.push({left:n+r-o,showLeft:n+r})})),u}()},document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)};return{mousedown:u,mark:e}}(),x={onContextmenuBlock:function(e,t){v.preview||(e.preventDefault(),e.stopPropagation(),T({reference:e,content:function(){return Object(o["m"])(o["b"],null,[Object(o["m"])(ee,{label:"置顶节点",icon:"icon-place-top",onClick:n.placeTop},null),Object(o["m"])(ee,{label:"置底节点",icon:"icon-place-bottom",onClick:n.placeBottom},null),Object(o["m"])(ee,{label:"删除节点",icon:"icon-delete",onClick:n.delete},null),Object(o["m"])(ee,{label:"查看数据",icon:"icon-browse",onClick:function(){return y.showBlockData(t)}},null),Object(o["m"])(ee,{label:"导入节点",icon:"icon-import",onClick:function(){return y.importBlockData(t)}},null)])}}))}},V=function(){return{container:{onMousedown:function(e){e.preventDefault(),e.currentTarget===e.target&&(y.clearFocus(),p.value=-1)}},block:{onMousedown:function(e,t,n){v.preview||(e&&e.preventDefault(),t.focus||(e.shiftKey?t.focus=!0:(t.focus=!t.focus,y.clearFocus(t))),p.value=n,w.mousedown(e))}}}}();n=z({focusData:f,updateBlocks:y.updateBlocks,dataModel:r,dragstart:j,dragend:h});var D=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("handleImport"),e.next=3,O.textarea("",{title:"请输入要导入的Json字符串"});case 3:if(t=e.sent,console.log("text",t),e.prev=5,n=JSON.parse(t||""),"object"===Object(i["a"])(n)){e.next=9;break}throw new Error;case 9:r.value=n,e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](5),b["h"].alert("解析json字符串出错");case 15:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("handleImport"),e.next=3,O.textarea(JSON.stringify(r.value),{title:"导出内容"});case 3:t=e.sent,console.log("text",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=[{label:"撤销",icon:"icon-back",handler:n.undo,tip:"ctrl+z"},{label:"重做",icon:"icon-forward",handler:n.redo,tip:"ctrl+y, ctrl+shift+z"},{label:function(){return v.preview?"编辑":"预览"},icon:function(){return v.preview?"icon-edit":"icon-browse"},handler:function(){v.preview=!v.preview,v.preview&&y.clearFocus()}},{label:"导入",icon:"icon-import",handler:D},{label:"导出",icon:"icon-export",handler:C},{label:"置顶",icon:"icon-place-top",handler:function(){return n.placeTop()}},{label:"置低",icon:"icon-place-bottom",handler:function(){return n.placeBottom()}},{label:"删除",icon:"icon-delete",handler:function(){return n.delete()},tip:"ctrl+d, backspance, delete,"},{label:"清空",icon:"icon-reset",handler:function(){return n.clear()}},{label:"关闭",icon:"icon-close",handler:function(){y.clearFocus(),v.editing=!1}}],F=function(e){return"function"===typeof e?e():e};return function(){var c,l,i;return console.log("selectBlock",v.selectBlock),Object(o["m"])(o["b"],null,[Object(o["bb"])(Object(o["m"])("div",Object(o["t"])({class:"visual-editor-container",ref:u,style:a.value},V.container),[((null===(c=r.value)||void 0===c?void 0:c.blocks)||[]).map((function(n,r){return Object(o["m"])(L,Object(o["t"])({block:n,key:r,config:e.config,formData:e.formData,slots:t.slots},{onMousedown:function(e){return V.block.onMousedown(e,n,r)},onContextmenu:function(e){return x.onContextmenuBlock(e,n)}}),null)})),Object(o["m"])("div",{class:"container-edit-button",onClick:y.openEdit},[Object(o["m"])("i",{class:"iconfont icon-edit"},null),Object(o["m"])("span",null,[Object(o["l"])("编辑组件")])])]),[[o["X"],!v.editing]]),Object(o["bb"])(Object(o["m"])("div",{class:m.value},[Object(o["m"])("div",{class:"menu"},[null===(l=e.config)||void 0===l?void 0:l.componentList.map((function(e){return Object(o["m"])("div",{class:"menu-item",draggable:!0,onDragend:k.dragend,onDragstart:function(t){return k.dragstart(t,e)}},[Object(o["m"])("span",{class:"menu-item-label"},[e.label]),e.preview()])}))]),Object(o["m"])("div",{class:"head"},[M.map((function(e,t){var n=Object(o["m"])("div",{key:t,class:"head-btn",onClick:e.handler},[Object(o["m"])("i",{class:"iconfont ".concat(F(e.icon))},null),Object(o["m"])("span",null,[F(e.label)])]);return e.tip?Object(o["m"])(Object(o["M"])("el-tooltip"),{effect:"dark",content:e.tip,placement:"bottom"},$(n)?n:{default:function(){return[n]}}):n}))]),Object(o["m"])("div",{class:"body"},[Object(o["m"])("div",{class:"content"},[Object(o["m"])("div",Object(o["t"])({class:"visual-editor-container",ref:u,style:a.value},V.container),[((null===(i=r.value)||void 0===i?void 0:i.blocks)||[]).map((function(n,r){return Object(o["m"])(L,Object(o["t"])({block:n,key:r,config:e.config,formData:e.formData,slots:t.slots},{onMousedown:function(e){return V.block.onMousedown(e,n,r)},onContextmenu:function(e){return x.onContextmenuBlock(e,n)}}),null)})),w.mark.x&&Object(o["m"])("div",{class:"mark-line-x",style:{left:"".concat(w.mark.x,"px")}},null),w.mark.y&&Object(o["m"])("div",{class:"mark-line-y",style:{top:"".concat(w.mark.y,"px")}},null)])])]),Object(o["m"])(Z,{block:v.selectBlock,config:e.config,dataModel:r,updateBlock:n.updateBlock,updateModelValue:n.updateModelValue},null)]),[[o["X"],v.editing]])])}}}),ne=(n("7502"),Object(o["n"])({props:{start:{type:String},end:{type:String}},emits:{"update:start":function(e){return!0},"update:end":function(e){return!0}},setup:function(e,t){var n=g((function(){return e.start}),(function(e){return t.emit("update:start",e)})),r=g((function(){return e.start}),(function(e){return t.emit("update:end",e)}));return function(){return Object(o["m"])("div",{class:"number-range"},[Object(o["bb"])(Object(o["m"])("input",{type:"text","onUpdate:modelValue":function(e){return n.value=e}},null),[[o["W"],n.value]]),Object(o["m"])("span",null,[Object(o["l"])("~")]),Object(o["bb"])(Object(o["m"])("input",{type:"text","onUpdate:modelValue":function(e){return r.value=e}},null),[[o["W"],r.value]])])}}}));n("f125");function oe(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!Object(o["s"])(e)}var re=b["f"],ae=M();ae.registry("text",{label:"文本",preview:function(){return"预览文本"},render:function(e){var t=e.props;return Object(o["m"])("span",{style:{color:t.color,fontSize:t.size}},[t.text||"默认文本"])},props:{text:N("显示文本"),color:_("字体颜色"),size:W("字体大小",[{label:"14px",val:"14px"},{label:"18px",val:"18px"},{label:"24px",val:"24px"}])}}),ae.registry("button",{label:"按钮",preview:function(){return Object(o["m"])(b["a"],null,{default:function(){return[Object(o["l"])("按钮")]}})},render:function(e){var t=e.props,n=e.size;return Object(o["m"])(b["a"],{type:t.type,size:t.size,style:{width:"".concat(n.width,"px"),height:"".concat(n.height,"px")}},{default:function(){return[t.text||"按钮"]}})},resize:{width:!0,height:!0},props:{text:N("显示文本"),type:W("按钮类型",[{label:"基础",val:"primary"},{label:"成功",val:"success"},{label:"警告",val:"warning"},{label:"危险",val:"danger"},{label:"提示",val:"info"},{label:"文本",val:"text"}]),size:W("按钮大小",[{label:"默认",val:""},{label:"中等",val:"medium"},{label:"小",val:"small"},{label:"极小",val:"mini"}])}}),ae.registry("input",{label:"输入框",preview:function(){return Object(o["m"])(re,null,null)},render:function(e){var t=e.model,n=e.size;return Object(o["m"])(re,Object(o["t"])(t.default,{style:{width:"".concat(n.width,"px")}}),null)},resize:{width:!0},model:{default:"绑定字段"},props:{size:W("输入框大小",[{label:"默认",val:""},{label:"中等",val:"medium"},{label:"小",val:"small"},{label:"极小",val:"mini"}])}}),ae.registry("select",{label:"下拉框",preview:function(){return Object(o["m"])(b["j"],null,null)},render:function(e){var t,n=e.props;return Object(o["m"])(b["j"],{key:Math.random()},oe(t=(n.options||[]).map((function(e,t){return Object(o["m"])(b["i"],{label:e.label,value:e.value,key:t},null)})))?t:{default:function(){return[t]}})},props:{options:Q("下拉选项",{options:[{label:"显示值",field:"label"},{label:"绑定值",field:"value"}],showKey:"label"})}}),ae.registry("number-range",{label:"数字范围输入框",resize:{width:!0},preview:function(){return Object(o["m"])(ne,{style:{width:"100%"}},null)},render:function(e){var t=e.model,n=e.size;return Object(o["m"])(ne,Object(o["t"])({style:{width:"".concat(n.width,"px")}},{start:t.start.value,"onUpdate:start":t.start.onChange,end:t.end.value,"onUpdate:end":t.end.onChange}),null)},model:{start:"起始绑定字段",end:"结束绑定字段"}});var ue=ae,ce=n("896f"),le=Object(o["n"])({name:"App",components:{VisualEditor:te},data:function(){return{visualConfig:ue,jsonData:ce,formData:{username:"admin"}}}});n("9eb1");le.render=u;var ie=le,se=(n("7dd6"),Object(o["h"])(ie));se.use(b["n"]),se.mount("#app")},f125:function(e,t,n){}});
//# sourceMappingURL=app.c2cefb3b.js.map