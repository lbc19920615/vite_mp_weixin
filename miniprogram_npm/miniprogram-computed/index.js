var _=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var S=_((le,M)=>{"use strict";M.exports=N;function y(t){return t instanceof Buffer?Buffer.from(t):new t.constructor(t.buffer.slice(),t.byteOffset,t.length)}function N(t){if(t=t||{},t.circles)return Q(t);return t.proto?s:a;function e(f,i){for(var r=Object.keys(f),n=new Array(r.length),u=0;u<r.length;u++){var o=r[u],p=f[o];typeof p!="object"||p===null?n[o]=p:p instanceof Date?n[o]=new Date(p):ArrayBuffer.isView(p)?n[o]=y(p):n[o]=i(p)}return n}function a(f){if(typeof f!="object"||f===null)return f;if(f instanceof Date)return new Date(f);if(Array.isArray(f))return e(f,a);if(f instanceof Map)return new Map(e(Array.from(f),a));if(f instanceof Set)return new Set(e(Array.from(f),a));var i={};for(var r in f)if(Object.hasOwnProperty.call(f,r)!==!1){var n=f[r];typeof n!="object"||n===null?i[r]=n:n instanceof Date?i[r]=new Date(n):n instanceof Map?i[r]=new Map(e(Array.from(n),a)):n instanceof Set?i[r]=new Set(e(Array.from(n),a)):ArrayBuffer.isView(n)?i[r]=y(n):i[r]=a(n)}return i}function s(f){if(typeof f!="object"||f===null)return f;if(f instanceof Date)return new Date(f);if(Array.isArray(f))return e(f,s);if(f instanceof Map)return new Map(e(Array.from(f),s));if(f instanceof Set)return new Set(e(Array.from(f),s));var i={};for(var r in f){var n=f[r];typeof n!="object"||n===null?i[r]=n:n instanceof Date?i[r]=new Date(n):n instanceof Map?i[r]=new Map(e(Array.from(n),s)):n instanceof Set?i[r]=new Set(e(Array.from(n),s)):ArrayBuffer.isView(n)?i[r]=y(n):i[r]=s(n)}return i}}function Q(t){var e=[],a=[];return t.proto?i:f;function s(r,n){for(var u=Object.keys(r),o=new Array(u.length),p=0;p<u.length;p++){var c=u[p],l=r[c];if(typeof l!="object"||l===null)o[c]=l;else if(l instanceof Date)o[c]=new Date(l);else if(ArrayBuffer.isView(l))o[c]=y(l);else{var h=e.indexOf(l);h!==-1?o[c]=a[h]:o[c]=n(l)}}return o}function f(r){if(typeof r!="object"||r===null)return r;if(r instanceof Date)return new Date(r);if(Array.isArray(r))return s(r,f);if(r instanceof Map)return new Map(s(Array.from(r),f));if(r instanceof Set)return new Set(s(Array.from(r),f));var n={};e.push(r),a.push(n);for(var u in r)if(Object.hasOwnProperty.call(r,u)!==!1){var o=r[u];if(typeof o!="object"||o===null)n[u]=o;else if(o instanceof Date)n[u]=new Date(o);else if(o instanceof Map)n[u]=new Map(s(Array.from(o),f));else if(o instanceof Set)n[u]=new Set(s(Array.from(o),f));else if(ArrayBuffer.isView(o))n[u]=y(o);else{var p=e.indexOf(o);p!==-1?n[u]=a[p]:n[u]=f(o)}}return e.pop(),a.pop(),n}function i(r){if(typeof r!="object"||r===null)return r;if(r instanceof Date)return new Date(r);if(Array.isArray(r))return s(r,i);if(r instanceof Map)return new Map(s(Array.from(r),i));if(r instanceof Set)return new Set(s(Array.from(r),i));var n={};e.push(r),a.push(n);for(var u in r){var o=r[u];if(typeof o!="object"||o===null)n[u]=o;else if(o instanceof Date)n[u]=new Date(o);else if(o instanceof Map)n[u]=new Map(s(Array.from(o),i));else if(o instanceof Set)n[u]=new Set(s(Array.from(o),i));else if(ArrayBuffer.isView(o))n[u]=y(o);else{var p=e.indexOf(o);p!==-1?n[u]=a[p]:n[u]=i(o)}}return e.pop(),a.pop(),n}}});var V=_((ce,I)=>{"use strict";var C=Array.isArray,W=Object.keys,Z=Object.prototype.hasOwnProperty;I.exports=function t(e,a){if(e===a)return!0;if(e&&a&&typeof e=="object"&&typeof a=="object"){var s=C(e),f=C(a),i,r,n;if(s&&f){if(r=e.length,r!=a.length)return!1;for(i=r;i--!=0;)if(!t(e[i],a[i]))return!1;return!0}if(s!=f)return!1;var u=e instanceof Date,o=a instanceof Date;if(u!=o)return!1;if(u&&o)return e.getTime()==a.getTime();var p=e instanceof RegExp,c=a instanceof RegExp;if(p!=c)return!1;if(p&&c)return e.toString()==a.toString();var l=W(e);if(r=l.length,r!==W(a).length)return!1;for(i=r;i--!=0;)if(!Z.call(a,l[i]))return!1;for(i=r;i--!=0;)if(n=l[i],!t(e[n],a[n]))return!1;return!0}return e!==e&&a!==a}});var q=_(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0}),A.parseMultiDataPaths=ee,A.getDataOnPath=void 0;var E=/^\s/,b=function(t,e){throw new Error('Parsing data path "'+t+'" failed at char "'+t[e]+'" (index '+e+")")},L=function(t,e){for(var a=e.index;e.index<e.length;){var s=t[e.index];if(/^[0-9]/.test(s)){e.index++;continue}break}return a===e.index&&b(t,e.index),parseInt(t.slice(a,e.index),10)},R=function(t,e){var a=e.index,s=t[a];if(/^[_a-zA-Z$]/.test(s))for(e.index++;e.index<e.length;){var f=t[e.index];if(/^[_a-zA-Z0-9$]/.test(f)){e.index++;continue}break}else b(t,e.index);return t.slice(a,e.index)},B=function(t,e){for(var a=[R(t,e)],s={deepCmp:!1};e.index<e.length;){var f=t[e.index];if(f==="[")e.index++,a.push(L(t,e)),t[e.index]!=="]"&&b(t,e.index),e.index++;else if(f==="."){if(e.index++,t[e.index]==="*"){if(e.index++,t[e.index]==="*"){e.index++,s.deepCmp=!0;break}b(t,e.index)}a.push(R(t,e))}else break}return{path:a,options:s}},X=function(t,e){for(;E.test(t[e.index]);)e.index++;for(var a=[B(t,e)],s=!1;e.index<e.length;){var f=t[e.index];E.test(f)?e.index++:f===","?(s=!0,e.index++):s?(s=!1,a.push(B(t,e))):b(t,e.index)}return a},k=function(t,e){e.index<e.length&&b(t,e.index)};function ee(t){var e={length:t.length,index:0},a=X(t,e);return k(t,e),a}var te=function(t,e){var a=t;return e.forEach(function(s){a=typeof a!="object"||a===null?void 0:a[s]}),a};A.getDataOnPath=te});var H=_(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0}),m.create=re,m.unwrap=ne;var z=function(t,e,a){if(typeof t!="object"||t===null)return t;var s={get:function(f,i){if(i==="__rawObject__")return t;var r=a.concat(i),n=t[i];return e.push({path:r,value:n}),z(n,e,r)}};return new Proxy(t,s)};function re(t,e){return z(t,e,[])}function ne(t){return typeof t!="object"||t===null||typeof t.__rawObject__!="object"?t:t.__rawObject__}});var K=_(x=>{"use strict";Object.defineProperty(x,"__esModule",{value:!0}),x.behavior=void 0;var $,ae=G(S()),ie=G(V()),w=U(q()),j=U(H());function F(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function G(t){return t&&t.__esModule?t:{default:t}}function U(t){if(t&&t.__esModule)return t;var e={};if(t!=null){for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a)){var s=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(t,a):{};s.get||s.set?Object.defineProperty(e,a,s):e[a]=t[a]}}return e.default=t,e}var T=ae.default({proto:!0}),fe=0,oe=Behavior({lifetimes:{attached:function(){this.setData({_computedWatchInit:"attached"})},created:function(){this.setData({_computedWatchInit:"created"})}},definitionFilter:function(t){var e=t.computed,a=t.watch,s=[],f=fe++;s.push({fields:"_computedWatchInit",observer:function(){var i=this.data._computedWatchInit;if(i==="created"){var r={computedUpdaters:[],computedRelatedPathValues:{},watchCurVal:{}};this._computedWatchInfo||(this._computedWatchInfo={}),this._computedWatchInfo[f]=r,a&&Object.keys(a).forEach(function(u){var o=w.parseMultiDataPaths(u).map(function(p){var c=p.path,l=p.options,h=w.getDataOnPath(this.data,c);return l.deepCmp?T(h):h}.bind(this));r.watchCurVal[u]=o}.bind(this))}else if(i==="attached"){var n=this._computedWatchInfo[f];e&&Object.keys(e).forEach(function(u){var o=e[u],p=[],c=o(j.create(this.data,p)),l=p.map(function(d){var v=d.path;return{path:v,value:w.getDataOnPath(this.data,v)}}.bind(this));this.setData(F({},u,j.unwrap(c))),n.computedRelatedPathValues[u]=l;var h=function(){for(var d=n.computedRelatedPathValues[u],v=!1,D=0;D<d.length;D++){var P=d[D],Y=P.path;if(P.value!==w.getDataOnPath(this.data,Y)){v=!0;break}}if(!v)return!1;var g=[],J=o(j.create(this.data,g));return this.setData(F({},u,j.unwrap(J))),n.computedRelatedPathValues[u]=g,!0}.bind(this);n.computedUpdaters.push(h)}.bind(this))}}}),e&&s.push({fields:"**",observer:function(){if(this._computedWatchInfo){var i,r=this._computedWatchInfo[f];if(r)do i=r.computedUpdaters.some(function(n){return n.call(this)}.bind(this));while(i)}}}),a&&Object.keys(a).forEach(function(i){var r=w.parseMultiDataPaths(i);s.push({fields:i,observer:function(){if(this._computedWatchInfo){var n=this._computedWatchInfo[f];if(n){var u=n.watchCurVal[i],o=r.map(function(h){var d=h.path,v=h.options;return{val:w.getDataOnPath(this.data,d),options:v}}.bind(this)),p=o.map(function(h){var d=h.val;return h.options.deepCmp?T(d):d});n.watchCurVal[i]=p;for(var c=!1,l=0;l<p.length;l++)if(r[l].options.deepCmp?!ie.default(u[l],p[l]):u[l]!==p[l]){c=!0;break}c&&a[i].apply(this,o.map(function(h){return h.val}))}}}})}),typeof t.observers!="object"&&(t.observers={}),Array.isArray(t.observers)?($=t.observers).push.apply($,s):s.forEach(function(i){var r=t.observers[i.fields];r?t.observers[i.fields]=function(){i.observer.call(this),r.call(this)}:t.observers[i.fields]=i.observer})}});x.behavior=oe});"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"behavior",{enumerable:!0,get:function(){return O.behavior}}),exports.ComponentWithComputed=se,exports.BehaviorWithComputed=ue;var O=K();function se(t){return Array.isArray(t.behaviors)||(t.behaviors=[]),t.behaviors.unshift(O.behavior),Component(t)}function ue(t){return Array.isArray(t.behaviors)||(t.behaviors=[]),t.behaviors.unshift(O.behavior),Behavior(t)}
