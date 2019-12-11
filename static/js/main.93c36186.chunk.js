(this["webpackJsonpalgebraic-graph-theory"]=this["webpackJsonpalgebraic-graph-theory"]||[]).push([[0],{142:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(31),i=n.n(c),o=n(23),l=n(28),u=n(66),s=n(34),d=n(14),h={vertices:[],edges:[],selectedVertex:null},f=Object(l.c)({graphReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_VERTEX":var n=t.x,r=t.y;return Object(d.a)({},e,{vertices:[].concat(Object(s.a)(e.vertices),[[n,r]])});case"SELECT_VERTEX":var a=t.index;return Object(d.a)({},e,{selectedVertex:a});case"DELETE_VERTEX":var c=t.index,i=e.vertices,o=e.edges,l=e.selectedVertex;return Object(d.a)({},e,{vertices:i.filter((function(e,t){return t!==c})),edges:o.filter((function(e){return e[0]!==c&&e[1]!==c})).map((function(e){return[e[0]>c?e[0]-1:e[0],e[1]>c?e[1]-1:e[1]]})),selectedVertex:l===c?null:l>c?l-1:l});case"UPDATE_VERTEX":var u=t.index,f=t.x,p=t.y,m=Object(s.a)(e.vertices);return m[u][0]=f,m[u][1]=p,Object(d.a)({},e,{vertices:m});case"ADD_EDGE":var v=t.v1,b=t.v2;return e.edges.some((function(e){return e[0]===v&&e[1]===b}))?e:Object(d.a)({},e,{edges:[].concat(Object(s.a)(e.edges),[[v,b]])});case"DELETE_EDGE":var g=t.index,E=e.edges;return Object(d.a)({},e,{edges:E.filter((function(e,t){return t!==g}))});case"INITIALIZE_GRAPH":return Object(d.a)({},e,{vertices:t.vertices,edges:t.edges,selectedVertex:null});default:return e}}});n(84);var p=n(15),m=n(16),v=n(18),b=n(17),g=n(19),E=n(144),y=n(145),j=n(146),x=(n(85),n(86),n(13)),O=n(24),k=n(67),w=function(e){function t(){var e,n;Object(p.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(a)))).handleClick=n.handleClick.bind(Object(x.a)(n)),n.onDrag=n.onDrag.bind(Object(x.a)(n)),n.leftClick=n.leftClick.bind(Object(x.a)(n)),n.delayedUpdateVertex=Object(k.throttle)((function(e,t,r){return n.props.updateVertex(e,t,r)}),50),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"leftClick",value:function(){var e=this.props,t=e.index,n=e.selectedVertex,r=e.selectVertex,a=e.addEdge;t===n?r(null):null!==n?a(n,t):r(t)}},{key:"handleClick",value:function(e){e.cancelBubble=!0;var t=this.props,n=t.index,r=t.deleteVertex;0===e.evt.button?this.leftClick(e):2===e.evt.button&&r(n)}},{key:"onDrag",value:function(e){this.delayedUpdateVertex(this.props.index,e.target.x(),e.target.y())}},{key:"render",value:function(){var e=this.props,t=e.x,n=e.y,r=e.index,c=r===e.selectedVertex;return a.a.createElement(O.Group,null,a.a.createElement(O.Text,{x:t+8,y:n+8,text:r+1,fill:"black",fontFamily:"ArialBlack",fontStyle:"bold"}),a.a.createElement(O.Circle,{x:t,y:n,radius:c?8:6,fill:"blue",stroke:c?"LimeGreen":"black",strokeWidth:c?4:1,onClick:this.handleClick,onTouchStart:this.leftClick,draggable:!0,shadowColor:"black",shadowBlur:c?4:2,shadowOffset:c?{x:2,y:2}:{x:1,y:1},shadowOpacity:.5,onDragMove:this.onDrag,hitStrokeWidth:20}))}}]),t}(r.Component),C=function(e){function t(){var e,n;Object(p.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(a)))).handleClick=n.handleClick.bind(Object(x.a)(n)),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleClick",value:function(e){var t=this.props,n=t.index,r=t.deleteEdge;2===e.evt.button&&r(n)}},{key:"render",value:function(){var e=this.props,t=e.v1,n=e.v2;return a.a.createElement(O.Line,{points:[t[0],t[1],n[0],n[1]],stroke:"black",strokeWidth:5,onClick:this.handleClick,shadowColor:"black",shadowBlur:2,shadowOffset:{x:1,y:1},shadowOpacity:.5,hitStrokeWidth:20})}}]),t}(r.Component),V=function(e){function t(){var e,n;Object(p.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(a)))).handleClick=n.handleClick.bind(Object(x.a)(n)),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleClick",value:function(e){var t=this.refs.stage.getPointerPosition(),n=t.x,r=t.y;this.props.selectVertex(null),0===e.evt.button&&this.props.addVertex(n,r)}},{key:"render",value:function(){var e=this.props,t=e.vertices,n=e.edges,r=e.selectedVertex,c=e.deleteVertex,i=e.selectVertex,o=e.addEdge,l=e.deleteEdge,u=e.updateVertex;return a.a.createElement(O.Stage,{width:window.innerWidth,height:window.innerHeight,onClick:this.handleClick,ref:"stage",onContextMenu:function(e){return e.evt.preventDefault()}},a.a.createElement(O.Layer,null,n.map((function(e,n){return a.a.createElement(C,{key:n,index:n,v1:t[e[0]],v2:t[e[1]],deleteEdge:l})}))),a.a.createElement(O.Layer,null,t.map((function(e,t){return a.a.createElement(w,{key:t,x:e[0],y:e[1],index:t,selectedVertex:r,selectVertex:i,addEdge:o,updateVertex:u,deleteVertex:c})}))))}}]),t}(r.Component),G=Object(o.b)((function(e){return Object(d.a)({},e.graphReducer)}),(function(e){return{addVertex:function(t,n){return e(function(e,t){return function(n){n({type:"ADD_VERTEX",x:e,y:t})}}(t,n))},deleteVertex:function(t){return e(function(e){return function(t){t({type:"DELETE_VERTEX",index:e})}}(t))},selectVertex:function(t){return e(function(e){return function(t){t({type:"SELECT_VERTEX",index:e})}}(t))},addEdge:function(t,n){return e(function(e,t){return function(n){n({type:"ADD_EDGE",v1:e,v2:t})}}(t,n))},deleteEdge:function(t){return e(function(e){return function(t){t({type:"DELETE_EDGE",index:e})}}(t))},updateVertex:function(t,n,r){return e(function(e,t,n){return function(r){r({type:"UPDATE_VERTEX",index:e,x:t,y:n})}}(t,n,r))}}}))(V),A=n(25),I=(n(49),n(20)),S=n(149),M=n(148);function T(e){var t=e.vertices,n=e.edges,c=Object(r.useState)(!0),i=Object(A.a)(c,2),o=i[0],l=i[1];return a.a.createElement(S.a,null,a.a.createElement(S.a.Header,{onClick:function(){return l(!o)},"aria-controls":"VAndESets","aria-expanded":o},"Vertex and Edge sets"),a.a.createElement(M.a,{in:o},a.a.createElement(S.a.Body,{id:"VAndESets"},a.a.createElement(I.InlineMath,{math:"V\\Gamma=\\{"}),t.map((function(e,n){return a.a.createElement(I.InlineMath,{key:n,math:"v_{".concat(n+1,"}").concat(n<t.length-1?",":"")})})),a.a.createElement(I.InlineMath,{math:"\\}"}),a.a.createElement("br",null),a.a.createElement(I.InlineMath,{math:"E\\Gamma=\\{"}),n.map((function(e,t){return a.a.createElement(I.InlineMath,{key:t,math:"\\{v_{".concat(e[0]+1,"}, v_{").concat(e[1]+1,"}\\}").concat(t<n.length-1?",":"")})})),a.a.createElement(I.InlineMath,{math:"\\}"}))))}var D=n(35),P=n.n(D),R=n(139),W=function(e){return"A(\\Gamma)=\\begin{bmatrix}".concat(e.map((function(e){return e.join("&")})).join("\\\\"),"\\end{bmatrix}")},_=function(e,t){for(var n,r=(n=e,Array(e).fill().map((function(){return Array(n).fill(0)}))),a=0;a<t.length;a++)r[t[a][0]][t[a][1]]=1,r[t[a][1]][t[a][0]]=1;return r},L=function(e,t,n){return e.filter((function(e,n){return n!==t})).map((function(e){return e.filter((function(e,t){return t!==n}))}))},N=function e(t){if(1===t.length)return t[0][0];if(2===t.length)return t[0][0].multiply(t[1][1]).subtract(t[0][1].multiply(t[1][0]));for(var n=new P.a.Expression(0),r=0;r<t.length;r++)if("0"!==t[0][r].toString()){var a=new P.a.Expression(Math.pow(-1,r));a=(a=a.multiply(t[0][r])).multiply(e(L(t,0,r))),n=n.add(a)}return n},B=function(e){return R.run("nroots(".concat(e.toString(),")")).toString().replace(/(\[|\]|\.\.\.)/g,"").split(",").map((function(e){return function(e){var t=function(e){return Math.round(100*e)/100};if(e.includes("i")){var n=e.match(/[+-]*\d*\.?\d+/g).map((function(e){return t(e)})),r=Object(A.a)(n,2),a=r[0],c=r[1];return void 0===c?"".concat(a,"i"):0===c?a:0===a?"".concat(c,"i"):"".concat(a).concat(c>0?"+":"").concat(c,"i")}return t(e)}(e)})).sort()},H=function(e){for(var t=function(e){for(var t=[],n=0;n<e.length;n++){t[n]=[];for(var r=0;r<e.length;r++)t[n][r]=new P.a.Expression(e[n][r])}return t}(e),n=0;n<t.length;n++)t[n][n]=t[n][n].subtract("t");return N(t)},U=function(e){var t=B(e),n=Object(s.a)(new Set(t)).map((function(e){return[e,t.filter((function(t){return t===e})).length]}));return"Spec\\ \\Gamma=\\begin{pmatrix}".concat(n.map((function(e){return e[0]})).join("&"),"\\\\").concat(n.map((function(e){return e[1]})).join("&"),"\\end{pmatrix}")},X=function(e){if(0===e.length)return{characteristicPolynomial:"\\chi(\\Gamma ; \\lambda)=0",spectrum:"Spec\\ \\Gamma=\\begin{pmatrix}\\\\\\end{pmatrix}"};var t=H(e);return{characteristicPolynomial:"\\chi(\\Gamma ; \\lambda)=".concat(P.a.toTex(t).replace(/t/g,"\\lambda")),spectrum:U(t)}};function z(e){var t=e.vertices,n=e.edges,c=Object(r.useState)(!0),i=Object(A.a)(c,2),o=i[0],l=i[1],u=W(_(t.length,n));return a.a.createElement(S.a,null,a.a.createElement(S.a.Header,{onClick:function(){return l(!o)},"aria-controls":"AdjMatrix","aria-expanded":o},"Adjacency Matrix"),a.a.createElement(M.a,{in:o},a.a.createElement(S.a.Body,{id:"AdjMatrix"},a.a.createElement(I.InlineMath,{math:u}))))}function J(e){var t=e.vertices,n=e.edges,c=Object(r.useState)(!0),i=Object(A.a)(c,2),o=i[0],l=i[1],u=_(t.length,n),s=X(u),d=s.characteristicPolynomial,h=s.spectrum;return a.a.createElement(S.a,null,a.a.createElement(S.a.Header,{onClick:function(){return l(!o)},"aria-controls":"CPASC","aria-expanded":o},"Characteristic polynomial and spectrum"),a.a.createElement(M.a,{in:o},a.a.createElement(S.a.Body,{id:"CPASC"},a.a.createElement(I.InlineMath,{math:d}),a.a.createElement("br",null),a.a.createElement(I.InlineMath,{math:h}))))}var Z=n(147),F=function(e){function t(){var e,n;Object(p.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(a)))).deleteGraph=n.deleteGraph.bind(Object(x.a)(n)),n.cycleGraph=n.cycleGraph.bind(Object(x.a)(n)),n.completeGraph=n.completeGraph.bind(Object(x.a)(n)),n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"deleteGraph",value:function(){this.props.initializeGraph([],[])}},{key:"cycleGraph",value:function(){var e=[window.innerWidth/4,window.innerHeight/3],t=window.innerWidth/9,n=Number.parseInt(prompt("Please enter the number of vertices",5));Number.isInteger(n)||(n=5);for(var r=[],a=[],c=0;c<n;c++)r[c]=[e[0]+t*Math.cos(2*Math.PI*c/n),e[1]+t*Math.sin(2*Math.PI*c/n)],a[c]=[c,(c+1)%n];this.props.initializeGraph(r,a)}},{key:"completeGraph",value:function(){var e=[window.innerWidth/4,window.innerHeight/3],t=window.innerWidth/9,n=Number.parseInt(prompt("Please enter the number of vertices",5));Number.isInteger(n)||(n=5);for(var r=[],a=[],c=0;c<n;c++)r[c]=[e[0]+t*Math.cos(2*Math.PI*c/n),e[1]+t*Math.sin(2*Math.PI*c/n)];for(var i=0;i<n;i++)for(var o=0;o<n;o++)i!==o&&a.push([i,o]);this.props.initializeGraph(r,a)}},{key:"render",value:function(){return a.a.createElement(Z.a,null,a.a.createElement(Z.a.Toggle,{variant:"success",id:"dropdown-basic"},"Create"),a.a.createElement(Z.a.Menu,null,a.a.createElement(Z.a.Item,{onSelect:this.deleteGraph},"New"),a.a.createElement(Z.a.Item,{onSelect:this.cycleGraph},"Cycle Graph"),a.a.createElement(Z.a.Item,{onSelect:this.completeGraph},"Complete Graph")))}}]),t}(r.Component),$=Object(o.b)((function(e){return Object(d.a)({},e.graphReducer)}),(function(e){return{initializeGraph:function(t,n){return e(function(e,t){return function(n){n({type:"INITIALIZE_GRAPH",vertices:e,edges:t})}}(t,n))}}}))(F),q=function(e){function t(){return Object(p.a)(this,t),Object(v.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"shouldComponentUpdate",value:function(e){return e.vertices.length!==this.props.vertices.length||e.edges.length!==this.props.edges.length}},{key:"render",value:function(){var e=this.props,t=e.vertices,n=e.edges;return a.a.createElement("div",null,a.a.createElement($,null),a.a.createElement(T,{vertices:t,edges:n}),a.a.createElement(z,{vertices:t,edges:n}),a.a.createElement(J,{vertices:t,edges:n}))}}]),t}(r.Component),K=Object(o.b)((function(e){return Object(d.a)({},e.graphReducer)}),null)(q),Q=function(e){function t(){return Object(p.a)(this,t),Object(v.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(E.a,{fluid:!0},a.a.createElement("h1",null,"Algebraic Graph Theory"),a.a.createElement(y.a,null,a.a.createElement(j.a,{md:7},a.a.createElement(G,null)),a.a.createElement(j.a,{md:5},a.a.createElement(K,null)))))}}]),t}(r.Component),Y=Object(o.b)()(Q),ee=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function te(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(a.a.createElement(o.a,{store:Object(l.d)(f,Object(l.a)(u.a))},a.a.createElement(Y,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/algebraic-graph-theory",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/algebraic-graph-theory","/service-worker.js");ee?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):te(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):te(t,e)}))}}()},75:function(e,t,n){e.exports=n(142)},84:function(e,t,n){},85:function(e,t,n){}},[[75,1,2]]]);
//# sourceMappingURL=main.93c36186.chunk.js.map