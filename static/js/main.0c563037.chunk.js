(this["webpackJsonpworld-map-three"]=this["webpackJsonpworld-map-three"]||[]).push([[0],{30:function(e,t,n){e.exports=n(38)},34:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(15),c=n.n(o),i=(n(34),n(6)),u=n(13),l=n(2),s=n(24),f=n(20),m={"-":189,"+":187,q:81,w:87,e:69,1:49,2:50,3:51};var v=n(5),p=n(9),d=n(7),b=n(8),h=function(e){function t(e){return Object(v.a)(this,t),Object(p.a)(this,Object(d.a)(t).call(this,{vertexShader:"\n            varying vec2 vUv;\n            void main() {\n                vUv = uv;\n                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n        ",fragmentShader:"\n                uniform vec3 color;\n                varying vec2 vUv;\n\n                vec2 stroke(vec2 p, float w) {\n                    return step(vec2(w), p) * step(vec2(w), 1.0 - p);\n                }\n\n                void main() {\n                    float c = 1.0;\n                    vec2 s = stroke(vUv, 0.05);\n                    c *= s.x * s.y;\n                    gl_FragColor = vec4(color * c, 1.0);\n                }\n              ",uniforms:{color:{type:"vec3",value:e.color||[0,0,0]}},side:l.DoubleSide}))}return Object(b.a)(t,e),t}(l.ShaderMaterial);function y(e){return Math.round(2*e)/2}var w={0:"#FFFFFF",1:"#b71234",2:"#ffd500",3:"#ff5800",4:"#009b48",5:"#0046ad"};Symbol("prev-position"),Symbol("next-position");Object(u.d)({OrbitControls:s.a});var E=Object(r.forwardRef)((function(e,t){var n=Object.assign({},e);return a.a.createElement(f.a.group,Object.assign({},n,{ref:t}),new Array(6).fill().map((function(e,t){var r=new l.Vector3,o=new l.Vector3;0===t?(r.setX(-Math.PI/2),o.setY(.25)):1===t?(r.setY(Math.PI/2),o.setX(.25)):2===t?(r.setX(Math.PI/2),o.setY(-.25)):3===t?(r.setY(-Math.PI/2),o.setX(-.25)):4===t?(r.setZ(Math.PI/2),o.setZ(.25)):5===t&&(r.setZ(-Math.PI/2),o.setZ(-.25));var c=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:null}(w[t]),i=new h({color:c});return a.a.createElement(f.a.mesh,{key:n.index+"-"+t,rotation:r.toArray(),position:o.toArray()},a.a.createElement("planeBufferGeometry",{attach:"geometry",args:[.5,.5,1]}),a.a.createElement("shaderMaterial",{attach:"material",args:[i],side:l.DoubleSide}))})))}));function g(){var e=3*Math.pow(3,2),t=Object(r.useRef)(new Array(e).fill(void 0)),n=Object(r.useRef)(-.5),o=Object(r.useRef)(1),c=Object(r.useRef)([]),s=Object(r.useRef)(0),v=Object(r.useState)(250),p=Object(i.a)(v,2),d=p[0],b=(p[1],Object(f.b)(e,(function(e){return{position:function(e){return[e%3*.5-.5,.5*Math.floor(e/3%3)-.5,.5*Math.floor(e/Math.pow(3,2))-.5]}(e),rotation:[0,0,0],config:{duration:d}}}))),h=Object(i.a)(b,2),w=h[0],g=h[1];var O=function(e){var r,a=(r={keyCode:e},function(e){var t="string"===typeof e?m[e]:e;return"number"===typeof r?r===t:r.keyCode===t});if(function(e){switch(e){case m[1]:n.current=-.5;break;case m[2]:n.current=0;break;case m[3]:n.current=.5;break;case m["-"]:o.current=-1;break;case m["+"]:o.current=1}}(e),a(m.q)||a(m.w)||a(m.e)){var c=[];t.current.forEach((function(e){a(m.q)&&e.position.z===n.current?c.push(e.uuid):a(m.w)&&e.position.y===n.current?c.push(e.uuid):a(m.e)&&e.position.x===n.current&&c.push(e.uuid)})),g((function(e){var n=t.current[e];if(!(c.indexOf(n.uuid)<0)){var r=n.position.clone(),i=n.rotation.clone(),u=new l.Matrix4,s=Math.PI/2*o.current;return a(m.q)?u.makeRotationZ(s):a(m.w)?u.makeRotationY(s):a(m.e)&&u.makeRotationX(s),r.applyMatrix4(u),u.multiply(n.matrix),i.setFromRotationMatrix(u),{position:r.toArray().map(y),rotation:i.toArray()}}}))}};function j(e){var t=e.keyCode;c.current.push(t)}return Object(r.useEffect)((function(){return window.addEventListener("keydown",j),function(){window.removeEventListener("keydown",j)}}),[]),Object(u.f)((function(){if(c.current.length){var e=Date.now();if(e-s.current>1.25*d){s.current=e;var t=c.current.shift();O(t)}}})),w.map((function(e,n){var r="cube-".concat(n);return a.a.createElement(E,Object.assign({},e,{key:r,index:r,ref:function(e){void 0===t.current[n]&&(t.current[n]=e)}}))}))}function O(){var e=Object(u.g)(),t=e.camera,n=e.gl.domElement;return a.a.createElement(a.a.Fragment,null,a.a.createElement("orbitControls",{args:[t,n]}),a.a.createElement("ambientLight",null),a.a.createElement(g,null))}var j=function(){return a.a.createElement(u.a,null,a.a.createElement(O,null))},k=n(29),M=n(23);var x=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(M.b)(n,null,{from:{transform:"translate3d(0,0px,0)",opacity:0,height:0,position:"absolute"},enter:{transform:"translate3d(0,25px,0)",opacity:1},leave:{transform:"translate3d(0,0px,0)",opacity:0,height:0}});return a.a.createElement("div",{style:{position:"absolute",top:25,left:25}},a.a.createElement("button",{onClick:function(){return o(!n)}},"Show controls"),c.map((function(e){var t=e.item,n=e.key,r=e.props;return t&&a.a.createElement(M.a.div,{style:Object(k.a)({},r),key:n},a.a.createElement("div",{style:{height:"100%"}},a.a.createElement("h3",null,"Controls"),a.a.createElement("div",{className:"instruction"},a.a.createElement("b",null,"Q:")," Rotate front/back"),a.a.createElement("div",{className:"instruction"},a.a.createElement("b",null,"W:")," Rotate bottom/top"),a.a.createElement("div",{className:"instruction"},a.a.createElement("b",null,"E:")," Rotate left/right"),a.a.createElement("div",{className:"instruction"},a.a.createElement("b",null,"1~3:")," Change group being rotated")))})))};var R=function(){return a.a.createElement("div",{className:"App",style:{position:"relative"}},a.a.createElement(j,null),a.a.createElement(x,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.0c563037.chunk.js.map