(this["webpackJsonpalgebraic-graph-theory"]=this["webpackJsonpalgebraic-graph-theory"]||[]).push([[0],{123:function(e,t,a){e.exports=a(191)},132:function(e,t,a){},133:function(e,t,a){},191:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(14),c=a.n(i),o=a(40),l=a(46),s=a(101),u=a(25),d=a(19),p=a(22),h={vertices:[],edges:[],selectedVertex:null,canvasPosition:[0,0]},m=Object(l.c)({graphReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_VERTEX":var a=t.x,n=t.y;return Object(p.a)({},e,{vertices:[].concat(Object(d.a)(e.vertices),[[a,n]])});case"SELECT_VERTEX":var r=t.index;return Object(p.a)({},e,{selectedVertex:r});case"DELETE_VERTEX":var i=t.index,c=e.vertices,o=e.edges,l=e.selectedVertex;return Object(p.a)({},e,{vertices:c.filter((function(e,t){return t!==i})),edges:o.filter((function(e){return e[0]!==i&&e[1]!==i})).map((function(e){return[e[0]>i?e[0]-1:e[0],e[1]>i?e[1]-1:e[1]]})),selectedVertex:l===i?null:l>i?l-1:l});case"UPDATE_VERTEX":var s=t.index,m=t.x,f=t.y,g=Object(d.a)(e.vertices);return g[s][0]=m,g[s][1]=f,Object(p.a)({},e,{vertices:g});case"ADD_EDGE":var v=t.v1,b=t.v2;return e.edges.some((function(e){return e[0]===v&&e[1]===b}))?e:Object(p.a)({},e,{edges:[].concat(Object(d.a)(e.edges),[[v,b]])});case"DELETE_EDGE":var E=t.index,x=e.edges;return Object(p.a)({},e,{edges:x.filter((function(e,t){return t!==E}))});case"INITIALIZE_GRAPH":return Object(p.a)({},e,{vertices:t.vertices,edges:t.edges,selectedVertex:null,canvasPosition:[0,0]});case"MOVE_CANVAS":var y=t.dx,w=t.dy,k=Object(u.a)(e.canvasPosition,2),j=k[0],O=k[1];return Object(p.a)({},e,{canvasPosition:[j+y,O+w]});case"ZOOM_CANVAS":var C=t.x,S=t.y,D=t.zoom,L=Object(d.a)(e.vertices),I=Object(u.a)(e.canvasPosition,2),V=I[0],A=I[1];return Object(p.a)({},e,{vertices:L.map((function(e){return[(e[0]-C+V)*D+C-V,(e[1]-S+A)*D+S-A]}))});default:return e}}});a(132);var f=a(242),g=a(192),v=a(111),b=a(239),E=a(247),x=a(244),y=a(245),w=(a(133),a(134),a(27)),k=a(21),j=a(30),O=a(31),C=a(12),S=a(33),D=a(34),L=a(61),I=function(e){function t(){var e,a;Object(w.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(j.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).handleClick=a.handleClick.bind(Object(C.a)(a)),a.onDrag=a.onDrag.bind(Object(C.a)(a)),a.leftClick=a.leftClick.bind(Object(C.a)(a)),a.delayedUpdateVertex=Object(L.throttle)((function(e,t,n){return a.props.updateVertex(e,t,n)}),50),a.dragEnd=function(e){return e.cancelBubble=!0},a}return Object(S.a)(t,e),Object(k.a)(t,[{key:"leftClick",value:function(){var e=this.props,t=e.index,a=e.selectedVertex,n=e.selectVertex,r=e.addEdge;t===a?n(null):null!==a?r(a,t):n(t)}},{key:"handleClick",value:function(e){e.cancelBubble=!0;var t=this.props,a=t.index,n=t.deleteVertex;0===e.evt.button?this.leftClick(e):2===e.evt.button&&n(a)}},{key:"onDrag",value:function(e){this.delayedUpdateVertex(this.props.index,e.target.x(),e.target.y())}},{key:"render",value:function(){var e=this.props,t=e.x,a=e.y,n=e.index,i=n===e.selectedVertex;return r.a.createElement(D.Group,null,r.a.createElement(D.Text,{x:t+8,y:a+8,text:n+1,fill:"black",fontFamily:"ArialBlack",fontStyle:"bold"}),r.a.createElement(D.Circle,{x:t,y:a,radius:i?8:6,fill:"blue",stroke:i?"LimeGreen":"black",strokeWidth:i?4:1,onClick:this.handleClick,onTouchStart:this.leftClick,draggable:!0,shadowColor:"black",shadowBlur:i?4:2,shadowOffset:i?{x:2,y:2}:{x:1,y:1},shadowOpacity:.5,onDragMove:this.onDrag,onDragEnd:this.dragEnd,hitStrokeWidth:20}))}}]),t}(n.Component),V=function(e){function t(){var e,a;Object(w.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(j.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).handleClick=a.handleClick.bind(Object(C.a)(a)),a}return Object(S.a)(t,e),Object(k.a)(t,[{key:"handleClick",value:function(e){var t=this.props,a=t.index,n=t.deleteEdge;2===e.evt.button&&n(a)}},{key:"render",value:function(){var e=this.props,t=e.v1,a=e.v2;return r.a.createElement(D.Line,{points:[t[0],t[1],a[0],a[1]],stroke:"black",strokeWidth:5,onClick:this.handleClick,shadowColor:"black",shadowBlur:2,shadowOffset:{x:1,y:1},shadowOpacity:.5,hitStrokeWidth:20})}}]),t}(n.Component),A=a(230),G=function(e){function t(e){var a;return Object(w.a)(this,t),(a=Object(j.a)(this,Object(O.a)(t).call(this,e))).state={dragStartX:0,dragStartY:0,width:0,height:0},a.handleClick=a.handleClick.bind(Object(C.a)(a)),a.startDrag=a.startDrag.bind(Object(C.a)(a)),a.endDrag=a.endDrag.bind(Object(C.a)(a)),a.wheelListener=a.wheelListener.bind(Object(C.a)(a)),a.delayedZoomCanvas=Object(L.throttle)((function(e,t,n){return a.props.zoomCanvas(e,t,n)}),100),a.zoomIn=function(){return a.props.zoomCanvas(a.state.width/2,a.state.height/2,1.5)},a.zoomOut=function(){return a.props.zoomCanvas(a.state.width/2,a.state.height/2,.75)},a.updateSize=a.updateSize.bind(Object(C.a)(a)),a.delayedUpdateSize=Object(L.throttle)(a.updateSize,500),a}return Object(S.a)(t,e),Object(k.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.delayedUpdateSize),this.updateSize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.delayedUpdateSize)}},{key:"updateSize",value:function(){var e=this.refs.container.getBoundingClientRect(),t=e.width,a=e.height;this.setState({width:t,height:a})}},{key:"handleClick",value:function(e){var t=this.refs.stage.getPointerPosition(),a=t.x,n=t.y,r=Object(u.a)(this.props.canvasPosition,2),i=r[0],c=r[1];this.props.selectVertex(null),0===e.evt.button&&this.props.addVertex(a-i,n-c)}},{key:"startDrag",value:function(){var e=this.refs.stage.getPointerPosition(),t=e.x,a=e.y;this.setState({dragStartX:t,dragStartY:a})}},{key:"endDrag",value:function(){var e=this.state,t=e.dragStartX,a=e.dragStartY,n=this.refs.stage.getPointerPosition(),r=n.x-t,i=n.y-a;this.props.moveCanvas(r,i)}},{key:"wheelListener",value:function(e){var t=this.refs.stage.getPointerPosition(),a=t.x,n=t.y;e.evt.preventDefault(),e.evt.deltaY>0?this.delayedZoomCanvas(a,n,1.1):e.evt.deltaY<0&&this.delayedZoomCanvas(a,n,.9)}},{key:"render",value:function(){var e=this.props,t=e.vertices,a=e.edges,n=e.selectedVertex,i=e.deleteVertex,c=e.selectVertex,o=e.addEdge,l=e.deleteEdge,s=e.updateVertex,u=e.canvasPosition;return r.a.createElement("div",{ref:"container",style:{height:"100%",position:"relative"}},r.a.createElement("span",{style:{position:"absolute",bottom:0,right:0,cursor:"pointer",zIndex:100}},r.a.createElement(A.a,{onClick:this.zoomIn},"zoom_in"),r.a.createElement(A.a,{onClick:this.zoomOut},"zoom_out")),r.a.createElement(D.Stage,{style:{border:"solid 1px"},width:this.state.width-2,height:this.state.height,onClick:this.handleClick,draggable:!0,onDragStart:this.startDrag,onDragEnd:this.endDrag,onWheel:this.wheelListener,x:u[0],y:u[1],ref:"stage",onContextMenu:function(e){return e.evt.preventDefault()}},r.a.createElement(D.Layer,null,a.map((function(e,a){return r.a.createElement(V,{key:a,index:a,v1:t[e[0]],v2:t[e[1]],deleteEdge:l})}))),r.a.createElement(D.Layer,null,t.map((function(e,t){return r.a.createElement(I,{key:t,x:e[0],y:e[1],index:t,selectedVertex:n,selectVertex:c,addEdge:o,updateVertex:s,deleteVertex:i})})))))}}]),t}(n.Component),N=Object(o.b)((function(e){return Object(p.a)({},e.graphReducer)}),(function(e){return{addVertex:function(t,a){return e(function(e,t){return function(a){a({type:"ADD_VERTEX",x:e,y:t})}}(t,a))},deleteVertex:function(t){return e(function(e){return function(t){t({type:"DELETE_VERTEX",index:e})}}(t))},selectVertex:function(t){return e(function(e){return function(t){t({type:"SELECT_VERTEX",index:e})}}(t))},addEdge:function(t,a){return e(function(e,t){return function(a){a({type:"ADD_EDGE",v1:e,v2:t})}}(t,a))},deleteEdge:function(t){return e(function(e){return function(t){t({type:"DELETE_EDGE",index:e})}}(t))},updateVertex:function(t,a,n){return e(function(e,t,a){return function(n){n({type:"UPDATE_VERTEX",index:e,x:t,y:a})}}(t,a,n))},moveCanvas:function(t,a){return e(function(e,t){return function(a){a({type:"MOVE_CANVAS",dx:e,dy:t})}}(t,a))},zoomCanvas:function(t,a,n){return e(function(e,t,a){return function(n){n({type:"ZOOM_CANVAS",x:e,y:t,zoom:a})}}(t,a,n))}}}))(G),P=(a(96),a(62)),z=a(57),T=a.n(z),M=a(187),R=function(e){return B(e,"\\begin{bmatrix}","\\end{bmatrix}","&","\\\\")},B=function(e,t,a,n,r){return"".concat(t).concat(e.map((function(e){return e.join(n)})).join(r)).concat(a)},W=function(e,t){return Array(e).fill().map((function(){return Array(t).fill(0)}))},_=function(e,t){for(var a=W(e,e),n=0;n<t.length;n++)a[t[n][0]][t[n][1]]=1,a[t[n][1]][t[n][0]]=1;return a},U=function(e,t){for(var a=W(e,e),n=0;n<t.length;n++)a[t[n][0]][t[n][0]]+=1,a[t[n][1]][t[n][1]]+=1;return a},X=function(e,t,a,n){var r;switch(a){case"Degree":r=U(e,t);break;case"Laplacian":r=function(e,t){for(var a=_(e,t),n=U(e,t),r=[],i=0;i<e;i++){r[i]=[];for(var c=0;c<e;c++)r[i][c]=n[i][c]-a[i][c]}return r}(e,t);break;case"SNLaplacian":r=function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"approximate",n=_(e,t),r=U(e,t),i=function(e){for(var t=Math.floor(Math.sqrt(e));t>=2;t--){var a=e/(t*t);if(Number.isInteger(a))return"".concat(t).concat(1!==a?"\\sqrt{".concat(e/(t*t),"}"):"")}return"\\sqrt{".concat(e,"}")},c=[],o=0;o<e;o++){c[o]=[];for(var l=0;l<e;l++)if(o===l)c[o][l]=1;else switch(a){case"latex":c[o][l]=0!==n[o][l]?"\\frac{".concat(-n[o][l],"}{").concat(i(r[o][o]*r[l][l]),"}"):0;break;case"approximate":default:c[o][l]=Math.round(-n[o][l]/Math.sqrt(r[o][o]*r[l][l])*100)/100}}return c}(e,t,n);break;case"Adjacency":default:r=_(e,t)}return r},H=function(e,t,a){return e.filter((function(e,a){return a!==t})).map((function(e){return e.filter((function(e,t){return t!==a}))}))},Z=function e(t){if(1===t.length)return t[0][0];if(2===t.length)return t[0][0].multiply(t[1][1]).subtract(t[0][1].multiply(t[1][0]));for(var a=new T.a.Expression(0),n=0;n<t.length;n++)if("0"!==t[0][n].toString()){var r=new T.a.Expression(Math.pow(-1,n));r=(r=r.multiply(t[0][n])).multiply(e(H(t,0,n))),a=a.add(r)}return a},F=function(e){return M.run("nroots(".concat(e.toString(),")")).toString().replace(/(\[|\]|\.\.\.)/g,"").split(",").map((function(e){return function(e){var t=function(e){return Math.round(100*e)/100};if(e.includes("i")){var a=e.match(/[+-]*\d*\.?\d+/g).map((function(e){return t(e)})),n=Object(u.a)(a,2),r=n[0],i=n[1];return void 0===i?"".concat(r,"i"):0===i?r:0===r?"".concat(i,"i"):"".concat(r).concat(i>0?"+":"").concat(i,"i")}return t(e)}(e)})).sort()},q=function(e){for(var t=function(e){for(var t,a=[],n=0;n<e.length;n++){a[n]=[];for(var r=0;r<e.length;r++){var i=(t=e[n][r],Math.floor(t)===t?0:t.toString().split(".")[1].length||0);a[n][r]=new T.a.Expression(e[n][r]*Math.pow(10,i)).divide(Math.pow(10,i))}}return a}(e),a=0;a<t.length;a++)t[a][a]=t[a][a].subtract("t");return Z(t)},Y=function(e){var t=F(e),a=Object(d.a)(new Set(t)).map((function(e){return[e,t.filter((function(t){return t===e})).length]}));return"Spec\\ \\Gamma=\\begin{pmatrix}".concat(a.map((function(e){return e[0]})).join("&"),"\\\\").concat(a.map((function(e){return e[1]})).join("&"),"\\end{pmatrix}")},J=function(e){if(0===e.length)return{characteristicPolynomial:"\\chi(\\Gamma ; \\lambda)=0",spectrum:"Spec\\ \\Gamma=\\begin{pmatrix}\\\\\\end{pmatrix}"};var t=q(e);return{characteristicPolynomial:"\\chi(\\Gamma ; \\lambda)=".concat(T.a.toTex(t).replace(/t/g,"\\lambda")),spectrum:Y(t)}},$=a(248),K=a(253),Q=a(2),ee=a(5),te=a(238),ae=a(251),ne=a(234),re=a(236),ie=a(237),ce=a(235),oe=a(102),le=a.n(oe),se=a(103),ue=a.n(se),de=a(241),pe=a(240),he=a(254),me=a(249),fe=Object(ee.a)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,a=e.classes,n=e.onClose,i=Object(Q.a)(e,["children","classes","onClose"]);return r.a.createElement(ne.a,Object.assign({disableTypography:!0,className:a.root},i),r.a.createElement(v.a,{variant:"h6"},t),n?r.a.createElement(ce.a,{"aria-label":"close",className:a.closeButton,onClick:n},r.a.createElement(le.a,null)):null)})),ge=Object(ee.a)((function(e){return{root:{padding:e.spacing(2),overflow:"hidden"}}}))(re.a),ve=Object(ee.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(ie.a);function be(e){var t,a=e.verticesLength,n=e.edges,i=e.representation,c=e.setRepresentation,o=r.a.useState(!1),l=Object(u.a)(o,2),s=l[0],d=l[1],p=r.a.useState("space"),h=Object(u.a)(p,2),m=h[0],f=h[1],g=r.a.useState("approx"),v=Object(u.a)(g,2),E=v[0],x=v[1],y=r.a.useState(!0),w=Object(u.a)(y,2),k=w[0],j=w[1],O=function(){d(!1)},C=X(a,n,i,E);switch(m){case"cBraces":t=B(C,"{{","}}",", ","},".concat(k?"\n":"","{"));break;case"sBrackets":t=B(C,"[[","]]",", ","],".concat(k?"\n":"","["));break;case"matlab":t=B(C,"[","]",", ",";".concat(k?"\n":" "));break;case"latex":t=B(C,"\\begin{bmatrix}","\\end{bmatrix}","&","\\\\".concat(k?"\n":" "));break;case"space":default:t=B(C,"",""," ",k?"\n":" ")}return r.a.createElement("div",null,r.a.createElement(te.a,{variant:"contained",color:"primary",size:"small",onClick:function(){d(!0)},startIcon:r.a.createElement(ue.a,null)},"Download matrix"),r.a.createElement(ae.a,{fullScreen:!0,onClose:O,"aria-labelledby":"customized-dialog-title",open:s},r.a.createElement(fe,{id:"customized-dialog-title",onClose:O},"Download matrix"),r.a.createElement(ge,{dividers:!0},r.a.createElement(b.a,{container:!0,justify:"space-around",style:{maxWidth:600}},r.a.createElement(pe.a,null,r.a.createElement(he.a,{htmlFor:"matrix-representation-label"},"Representation"),r.a.createElement($.a,{value:i,onChange:function(e){return c(e.target.value)},labelId:"matrix-representation-label"},r.a.createElement(K.a,{value:"Adjacency"},"Adjacency"),r.a.createElement(K.a,{value:"Degree"},"Degree"),r.a.createElement(K.a,{value:"Laplacian"},"Laplacian"),r.a.createElement(K.a,{value:"SNLaplacian"},"Symmetric Normalized Laplacian"))),r.a.createElement(pe.a,null,r.a.createElement(he.a,{htmlFor:"matrix-format-label"},"Format"),r.a.createElement($.a,{value:m,onChange:function(e){return f(e.target.value)},labelId:"matrix-format-label"},r.a.createElement(K.a,{value:"space"},"Space separated"),r.a.createElement(K.a,{value:"cBraces"},"Curly braces ","{,}"),r.a.createElement(K.a,{value:"sBrackets"},"Square brackets ","[,]"),r.a.createElement(K.a,{value:"matlab"},"Matlab"),r.a.createElement(K.a,{value:"latex"},"LaTeX"))),r.a.createElement(pe.a,null,r.a.createElement(he.a,{htmlFor:"expression-label"},"Expressions"),r.a.createElement($.a,{value:E,onChange:function(e){return x(e.target.value)},labelId:"expression-label"},r.a.createElement(K.a,{value:"approx"},"Approximate"),r.a.createElement(K.a,{value:"latex"},"LaTeX"))),r.a.createElement(pe.a,null,r.a.createElement(de.a,{value:k,control:r.a.createElement(me.a,{checked:k,color:"primary",onChange:function(e){return j(e.target.checked)}}),label:"New lines",labelPlacement:"start"}))),r.a.createElement("textarea",{readOnly:!0,style:{width:"100%",height:"100%",whiteSpace:"prewrap"},value:t,id:"matrixTextarea"})),r.a.createElement(ve,null,r.a.createElement(te.a,{onClick:function(){document.getElementById("matrixTextarea").select(),document.execCommand("copy")},color:"primary"},"Copy text to clipboard"),r.a.createElement(te.a,{autoFocus:!0,onClick:function(){var e=document.getElementById("matrixTextarea"),t=new Blob([e.value],{type:"text/plain"}),a=document.createElement("a"),n=URL.createObjectURL(t);a.href=n,a.download="matrix.txt",document.body.appendChild(a),a.click(),setTimeout((function(){document.body.removeChild(a),window.URL.revokeObjectURL(n)}),0)},color:"primary"},"Save matrix to .txt file"))))}var Ee=Object(f.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},matrixContainer:{margin:"16px",width:"100%",maxHeight:"250px",overflow:"auto","&::-webkit-scrollbar":{width:"0.4em",height:"0.4em"},"&::-webkit-scrollbar-track":{"-webkit-box-shadow":"inset 0 0 6px rgba(0,0,0,0.00)"},"&::-webkit-scrollbar-thumb":{backgroundColor:"rgba(0,0,0,.1)",outline:"1px solid slategrey"}}}}));function xe(e){var t=e.verticesLength,a=e.edges,n=e.representation,i=e.setRepresentation,c=Ee(),o=X(t,a,n,"latex");return r.a.createElement("div",{className:c.root},r.a.createElement(b.a,{container:!0,alignItems:"center",direction:"column"},r.a.createElement(b.a,{item:!0},r.a.createElement(b.a,{container:!0,direction:"row"},r.a.createElement(b.a,{item:!0},r.a.createElement($.a,{value:n,onChange:function(e){return i(e.target.value)},labelId:"matrix-representation-label"},r.a.createElement(K.a,{value:"Adjacency"},"Adjacency"),r.a.createElement(K.a,{value:"Degree"},"Degree"),r.a.createElement(K.a,{value:"Laplacian"},"Laplacian"),r.a.createElement(K.a,{value:"SNLaplacian"},"Symmetric Normalized Laplacian"))),r.a.createElement(b.a,{item:!0},r.a.createElement(v.a,{variant:"h6"},"matrix")))),r.a.createElement(b.a,{item:!0,className:c.matrixContainer},r.a.createElement(P.InlineMath,{math:R(o)})),r.a.createElement(b.a,{item:!0},r.a.createElement(be,{verticesLength:t,edges:a,representation:n,setRepresentation:i}))))}var ye=Object(f.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},latexContainer:{margin:"16px",width:"100%",maxHeight:"250px",overflow:"auto"}}}));function we(e){var t=e.verticesLength,a=e.edges,n=e.representation,i=ye(),c=X(t,a,n,"approx"),o=c.length<20?J(c):{characteristicPolynomial:"\\text{I will not try to compute the characteristic polynomial.}",spectrum:"\\text{The computation would take long time in your browser.}"},l=o.characteristicPolynomial,s=o.spectrum;return r.a.createElement("div",{className:i.root},r.a.createElement(b.a,{container:!0,alignItems:"center",direction:"column"},r.a.createElement(b.a,{item:!0,xs:!0},r.a.createElement(v.a,{gutterBottom:!0,variant:"h6"},"Characteristic polynomial and spectrum")),r.a.createElement(b.a,{item:!0,className:i.latexContainer},r.a.createElement(P.InlineMath,{math:l}),r.a.createElement("br",null),r.a.createElement(P.InlineMath,{math:s}))))}var ke=a(243),je=function(e){function t(e){var a;return Object(w.a)(this,t),(a=Object(j.a)(this,Object(O.a)(t).call(this,e))).state={representation:"Adjacency"},a.setRepresentation=a.setRepresentation.bind(Object(C.a)(a)),a}return Object(S.a)(t,e),Object(k.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.vertices.length!==this.props.vertices.length||e.edges.length!==this.props.edges.length||t.representation!==this.state.representation}},{key:"setRepresentation",value:function(e){this.setState({representation:e})}},{key:"render",value:function(){var e=this.props,t=e.vertices,a=e.edges,n=this.state.representation;return r.a.createElement("div",null,r.a.createElement(v.a,{gutterBottom:!0,variant:"h5"},"Graph representation"),r.a.createElement(ke.a,{variant:"middle",style:{margin:"16px"}}),r.a.createElement(xe,{verticesLength:t.length,edges:a,representation:n,setRepresentation:this.setRepresentation}),r.a.createElement(ke.a,{variant:"middle",style:{margin:"16px"}}),r.a.createElement(we,{verticesLength:t.length,edges:a,representation:n}))}}]),t}(n.Component),Oe=Object(o.b)((function(e){return Object(p.a)({},e.graphReducer)}),null)(je),Ce=a(246),Se=function(e){function t(){var e,a;Object(w.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(j.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).deleteGraph=a.deleteGraph.bind(Object(C.a)(a)),a.cycleGraph=a.cycleGraph.bind(Object(C.a)(a)),a.completeGraph=a.completeGraph.bind(Object(C.a)(a)),a.margulisExpander=a.margulisExpander.bind(Object(C.a)(a)),a}return Object(S.a)(t,e),Object(k.a)(t,[{key:"deleteGraph",value:function(){this.props.initializeGraph([],[])}},{key:"cycleGraph",value:function(){var e=[window.innerWidth/4,window.innerHeight/3],t=window.innerWidth/9,a=Number.parseInt(prompt("Please enter the number of vertices",5));Number.isInteger(a)||(a=5);for(var n=[],r=[],i=0;i<a;i++)n[i]=[e[0]+t*Math.cos(2*Math.PI*i/a),e[1]+t*Math.sin(2*Math.PI*i/a)],r[i]=[i,(i+1)%a];this.props.initializeGraph(n,r)}},{key:"completeGraph",value:function(){var e=[window.innerWidth/4,window.innerHeight/3],t=window.innerWidth/9,a=Number.parseInt(prompt("Please enter the number of vertices",5));if(Number.isInteger(a)){for(var n=[],r=[],i=0;i<a;i++)n[i]=[e[0]+t*Math.cos(2*Math.PI*i/a),e[1]+t*Math.sin(2*Math.PI*i/a)];for(var c=0;c<a;c++)for(var o=c+1;o<a;o++)r.push([c,o]);this.props.initializeGraph(n,r)}}},{key:"margulisExpander",value:function(){var e=[window.innerWidth/10,window.innerHeight/10],t=Number.parseInt(prompt("Please enter a positive number m",3)),a=window.innerWidth/(3.5*t);if(Number.isInteger(t)||!(t>1)){for(var n=[],r=[],i=function(e,a){return e*t+a},c=0;c<t;c++)for(var o=0;o<t;o++)n.push([e[0]+a*c+30*(Math.pow(o-t/2,2)+o)/t,e[1]+a*o+30*(Math.pow(c-t/2,2)+c)/t]),r.push([i(c,o),i(c,(o+1)%t)]),r.push([i(c,o),i((c+1)%t,o)]),r.push([i(c,o),i(c,(c+o)%t)]),r.push([i(c,o),i(t-o-1,c)]);var l=[];r.forEach((function(e){l.some((function(t){return t[0]===e[0]&&t[1]===e[1]||t[0]===e[1]&&t[1]===e[0]||e[0]===e[1]}))||l.push(e)})),this.props.initializeGraph(n,l)}}},{key:"render",value:function(){return r.a.createElement(Ce.a,null,r.a.createElement(Ce.a.Toggle,{variant:"success",id:"dropdown-basic"},"Create"),r.a.createElement(Ce.a.Menu,null,r.a.createElement(Ce.a.Item,{onSelect:this.deleteGraph},"New"),r.a.createElement(Ce.a.Item,{onSelect:this.cycleGraph},"Cycle Graph"),r.a.createElement(Ce.a.Item,{onSelect:this.completeGraph},"Complete Graph"),r.a.createElement(Ce.a.Item,{onSelect:this.margulisExpander},"Margulis expander")))}}]),t}(n.Component),De=Object(o.b)((function(e){return Object(p.a)({},e.graphReducer)}),(function(e){return{initializeGraph:function(t,a){return e(function(e,t){return function(a){a({type:"INITIALIZE_GRAPH",vertices:e,edges:t})}}(t,a))}}}))(Se),Le=Object(f.a)((function(e){return{root:{flexGrow:1,backgroundColor:"#cfe8fc",padding:"16px",position:"fixed",top:0,bottom:0,left:0,right:0},appBar:{flexGrow:1},title:{flexGrow:1},gridContainer:{height:"100%",paddingTop:"66px"},gridColumn:{height:"100%"},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary,height:"100%",overflow:"auto"}}}));var Ie=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ve(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(o.a,{store:Object(l.d)(m,Object(l.a)(s.a))},r.a.createElement((function(){var e=Le();return r.a.createElement(E.a,{className:e.root},r.a.createElement(x.a,{className:e.appBar},r.a.createElement(y.a,null,r.a.createElement(v.a,{variant:"h6",className:e.title},"Graph Playground"),r.a.createElement(De,null))),r.a.createElement(b.a,{container:!0,className:e.gridContainer,spacing:3,justify:"space-around",alignItems:"stretch"},r.a.createElement(b.a,{className:e.gridColumn,item:!0,xs:7},r.a.createElement(g.a,{className:e.paper},r.a.createElement(N,null))),r.a.createElement(b.a,{className:e.gridColumn,item:!0,xs:5},r.a.createElement(g.a,{className:e.paper},r.a.createElement(Oe,null)))))}),null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/algebraic-graph-theory",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/algebraic-graph-theory","/service-worker.js");Ie?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Ve(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Ve(t,e)}))}}()}},[[123,1,2]]]);
//# sourceMappingURL=main.36df2aa7.chunk.js.map