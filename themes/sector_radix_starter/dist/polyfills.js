!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=39)}([function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n(41))},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(1);t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(3),o=n(6),i=n(14);t.exports=r?function(t,e,n){return o.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(3),o=n(19),i=n(7),u=n(18),c=Object.defineProperty;e.f=r?c:function(t,e,n){if(i(t),e=u(e,!0),i(n),o)try{return c(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(4);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){var r=n(15),o=n(17);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(0),o=n(5);t.exports=function(t,e){try{o(r,t,e)}catch(n){r[t]=e}return e}},function(t,e){t.exports={}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e,n){var r=n(0),o=n(13).f,i=n(5),u=n(43),c=n(9),s=n(47),a=n(54);t.exports=function(t,e){var n,f,p,l,h,d=t.target,v=t.global,g=t.stat;if(n=v?r:g?r[d]||c(d,{}):(r[d]||{}).prototype)for(f in e){if(l=e[f],p=t.noTargetGet?(h=o(n,f))&&h.value:n[f],!a(v?f:d+(g?".":"#")+f,t.forced)&&void 0!==p){if(typeof l==typeof p)continue;s(l,p)}(t.sham||p&&p.sham)&&i(l,"sham",!0),u(n,f,l,t)}}},function(t,e,n){var r=n(3),o=n(42),i=n(14),u=n(8),c=n(18),s=n(2),a=n(19),f=Object.getOwnPropertyDescriptor;e.f=r?f:function(t,e){if(t=u(t),e=c(e,!0),a)try{return f(t,e)}catch(t){}if(s(t,e))return i(!o.f.call(t,e),t[e])}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(1),o=n(16),i="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r=n(4);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(3),o=n(1),i=n(20);t.exports=!r&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var r=n(0),o=n(4),i=r.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,e,n){var r=n(22),o=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return o.call(t)}),t.exports=r.inspectSource},function(t,e,n){var r=n(0),o=n(9),i=r["__core-js_shared__"]||o("__core-js_shared__",{});t.exports=i},function(t,e,n){var r=n(24),o=n(25),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,e,n){var r=n(46),o=n(22);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e,n){var r=n(49),o=n(0),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(r[t])||i(o[t]):r[t]&&r[t][e]||o[t]&&o[t][e]}},function(t,e,n){var r=n(2),o=n(8),i=n(51).indexOf,u=n(10);t.exports=function(t,e){var n,c=o(t),s=0,a=[];for(n in c)!r(u,n)&&r(c,n)&&a.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(a,n)||a.push(n));return a}},function(t,e,n){var r=n(29),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(56),o=n(15),i=n(58),u=n(28),c=n(59),s=[].push,a=function(t){var e=1==t,n=2==t,a=3==t,f=4==t,p=6==t,l=5==t||p;return function(h,d,v,g){for(var y,m,b=i(h),w=o(b),E=r(d,v,3),_=u(w.length),x=0,O=g||c,I=e?O(h,_):n?O(h,0):void 0;_>x;x++)if((l||x in w)&&(m=E(y=w[x],x,b),t))if(e)I[x]=m;else if(m)switch(t){case 3:return!0;case 5:return y;case 6:return x;case 2:s.call(I,y)}else if(f)return!1;return p?-1:a||f?f:I}};t.exports={forEach:a(0),map:a(1),filter:a(2),some:a(3),every:a(4),find:a(5),findIndex:a(6)}},function(t,e,n){var r=n(0),o=n(24),i=n(2),u=n(25),c=n(32),s=n(61),a=o("wks"),f=r.Symbol,p=s?f:f&&f.withoutSetter||u;t.exports=function(t){return i(a,t)||(c&&i(f,t)?a[t]=f[t]:a[t]=p("Symbol."+t)),a[t]}},function(t,e,n){var r=n(1);t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},function(t,e,n){var r=n(3),o=n(1),i=n(2),u=Object.defineProperty,c={},s=function(t){throw t};t.exports=function(t,e){if(i(c,t))return c[t];e||(e={});var n=[][t],a=!!i(e,"ACCESSORS")&&e.ACCESSORS,f=i(e,0)?e[0]:s,p=i(e,1)?e[1]:void 0;return c[t]=!!n&&!o((function(){if(a&&!r)return!0;var t={length:-1};a?u(t,1,{enumerable:!0,get:s}):t[1]=1,n.call(t,f,p)}))}},,,,,,function(t,e,n){"use strict";n.r(e);n(40),n(63);window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),n(69),n(70)},function(t,e,n){"use strict";var r=n(12),o=n(55);r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!r.call({1:2},1);e.f=i?function(t){var e=o(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r=n(0),o=n(5),i=n(2),u=n(9),c=n(21),s=n(44),a=s.get,f=s.enforce,p=String(String).split("String");(t.exports=function(t,e,n,c){var s=!!c&&!!c.unsafe,a=!!c&&!!c.enumerable,l=!!c&&!!c.noTargetGet;"function"==typeof n&&("string"!=typeof e||i(n,"name")||o(n,"name",e),f(n).source=p.join("string"==typeof e?e:"")),t!==r?(s?!l&&t[e]&&(a=!0):delete t[e],a?t[e]=n:o(t,e,n)):a?t[e]=n:u(e,n)})(Function.prototype,"toString",(function(){return"function"==typeof this&&a(this).source||c(this)}))},function(t,e,n){var r,o,i,u=n(45),c=n(0),s=n(4),a=n(5),f=n(2),p=n(23),l=n(10),h=c.WeakMap;if(u){var d=new h,v=d.get,g=d.has,y=d.set;r=function(t,e){return y.call(d,t,e),e},o=function(t){return v.call(d,t)||{}},i=function(t){return g.call(d,t)}}else{var m=p("state");l[m]=!0,r=function(t,e){return a(t,m,e),e},o=function(t){return f(t,m)?t[m]:{}},i=function(t){return f(t,m)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(e){var n;if(!s(e)||(n=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e,n){var r=n(0),o=n(21),i=r.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,e){t.exports=!1},function(t,e,n){var r=n(2),o=n(48),i=n(13),u=n(6);t.exports=function(t,e){for(var n=o(e),c=u.f,s=i.f,a=0;a<n.length;a++){var f=n[a];r(t,f)||c(t,f,s(e,f))}}},function(t,e,n){var r=n(26),o=n(50),i=n(53),u=n(7);t.exports=r("Reflect","ownKeys")||function(t){var e=o.f(u(t)),n=i.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(0);t.exports=r},function(t,e,n){var r=n(27),o=n(11).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(8),o=n(28),i=n(52),u=function(t){return function(e,n,u){var c,s=r(e),a=o(s.length),f=i(u,a);if(t&&n!=n){for(;a>f;)if((c=s[f++])!=c)return!0}else for(;a>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},function(t,e,n){var r=n(29),o=Math.max,i=Math.min;t.exports=function(t,e){var n=r(t);return n<0?o(n+e,0):i(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(1),o=/#|\.prototype\./,i=function(t,e){var n=c[u(t)];return n==a||n!=s&&("function"==typeof e?r(e):!!e)},u=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},c=i.data={},s=i.NATIVE="N",a=i.POLYFILL="P";t.exports=i},function(t,e,n){"use strict";var r=n(30).forEach,o=n(62),i=n(33),u=o("forEach"),c=i("forEach");t.exports=u&&c?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},function(t,e,n){var r=n(57);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){var r=n(17);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(4),o=n(60),i=n(31)("species");t.exports=function(t,e){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?r(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){var r=n(16);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(32);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,e,n){"use strict";var r=n(1);t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},function(t,e,n){"use strict";var r=n(12),o=n(30).find,i=n(64),u=n(33),c=!0,s=u("find");"find"in[]&&Array(1).find((function(){c=!1})),r({target:"Array",proto:!0,forced:c||!s},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("find")},function(t,e,n){var r=n(31),o=n(65),i=n(6),u=r("unscopables"),c=Array.prototype;null==c[u]&&i.f(c,u,{configurable:!0,value:o(null)}),t.exports=function(t){c[u][t]=!0}},function(t,e,n){var r,o=n(7),i=n(66),u=n(11),c=n(10),s=n(68),a=n(20),f=n(23),p=f("IE_PROTO"),l=function(){},h=function(t){return"<script>"+t+"<\/script>"},d=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;d=r?function(t){t.write(h("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=a("iframe")).style.display="none",s.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(h("document.F=Object")),t.close(),t.F);for(var n=u.length;n--;)delete d.prototype[u[n]];return d()};c[p]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(l.prototype=o(t),n=new l,l.prototype=null,n[p]=t):n=d(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(3),o=n(6),i=n(7),u=n(67);t.exports=r?Object.defineProperties:function(t,e){i(t);for(var n,r=u(e),c=r.length,s=0;c>s;)o.f(t,n=r[s++],e[n]);return t}},function(t,e,n){var r=n(27),o=n(11);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(26);t.exports=r("document","documentElement")},function(t,e){!function(){"use strict";var t,e,n,r,o=document.createElement("details"),i="undefined"!=typeof HTMLDetailsElement&&o instanceof HTMLDetailsElement,u="open"in o||i,c="ontoggle"in o,s=[],a=s.forEach,f=s.slice;function p(t){(function(t,e){return(t.tagName==e?[t]:[]).concat("function"==typeof t.getElementsByTagName?f.call(t.getElementsByTagName(e)):[])})(t,"SUMMARY").forEach((function(t){var e=v(t,"DETAILS");t.setAttribute("aria-expanded",e.hasAttribute("open")),t.hasAttribute("tabindex")||t.setAttribute("tabindex","0"),t.hasAttribute("role")||t.setAttribute("role","button")}))}function l(t){return!(t.defaultPrevented||t.ctrlKey||t.metaKey||t.shiftKey||t.target.isContentEditable)}function h(t){addEventListener("click",(function(e){if(l(e)&&e.which<=1){var n=v(e.target,"SUMMARY");n&&n.parentNode&&"DETAILS"==n.parentNode.tagName&&t(n.parentNode)}}),!1),addEventListener("keydown",(function(e){if(l(e)&&(13==e.keyCode||32==e.keyCode)){var n=v(e.target,"SUMMARY");n&&n.parentNode&&"DETAILS"==n.parentNode.tagName&&(t(n.parentNode),e.preventDefault())}}),!1)}function d(t){var e=document.createEvent("Event");e.initEvent("toggle",!1,!1),t.dispatchEvent(e)}function v(t,e){if("function"==typeof t.closest)return t.closest(e);for(;t;){if(t.tagName==e)return t;t=t.parentNode}}u||(document.head.insertAdjacentHTML("afterbegin",'<style>\ndetails, summary {\n  display: block;\n}\ndetails:not([open]) > *:not(summary) {\n  display: none;\n}\nsummary::before {\n  content: "►";\n  padding-right: 0.3rem;\n  font-size: 0.6rem;\n  cursor: default;\n}\n[open] > summary::before {\n  content: "▼";\n}\n</style>'),t=document.createElement("details").constructor.prototype,e=t.setAttribute,n=t.removeAttribute,r=Object.getOwnPropertyDescriptor(t,"open"),Object.defineProperties(t,{open:{get:function(){return"DETAILS"==this.tagName?this.hasAttribute("open"):r&&r.get?r.get.call(this):void 0},set:function(t){return"DETAILS"==this.tagName?t?this.setAttribute("open",""):this.removeAttribute("open"):r&&r.set?r.set.call(this,t):void 0}},setAttribute:{value:function(t,n){var r=this,o=function(){return e.call(r,t,n)};if("open"==t&&"DETAILS"==this.tagName){var i=this.hasAttribute("open"),u=o();if(!i){var c=this.querySelector("summary");c&&c.setAttribute("aria-expanded",!0),d(this)}return u}return o()}},removeAttribute:{value:function(t){var e=this,r=function(){return n.call(e,t)};if("open"==t&&"DETAILS"==this.tagName){var o=this.hasAttribute("open"),i=r();if(o){var u=this.querySelector("summary");u&&u.setAttribute("aria-expanded",!1),d(this)}return i}return r()}}}),h((function(t){t.hasAttribute("open")?t.removeAttribute("open"):t.setAttribute("open","")})),p(document),window.MutationObserver?new MutationObserver((function(t){a.call(t,(function(t){a.call(t.addedNodes,p)}))})).observe(document.documentElement,{subtree:!0,childList:!0}):document.addEventListener("DOMNodeInserted",(function(t){p(t.target)}))),u&&!c&&(window.MutationObserver?new MutationObserver((function(t){a.call(t,(function(t){var e=t.target,n=t.attributeName;"DETAILS"==e.tagName&&"open"==n&&d(e)}))})).observe(document.documentElement,{attributes:!0,subtree:!0}):h((function(t){var e=t.getAttribute("open");setTimeout((function(){var n=t.getAttribute("open");e!=n&&d(t)}),1)})))}()},function(t,e){!function(){"use strict";if("object"==typeof window)if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var t=window.document,e=[];r.prototype.THROTTLE_TIMEOUT=100,r.prototype.POLL_INTERVAL=null,r.prototype.USE_MUTATION_OBSERVER=!0,r.prototype.observe=function(t){if(!this._observationTargets.some((function(e){return e.element==t}))){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},r.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter((function(e){return e.element!=t})),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},r.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},r.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},r.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter((function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))},r.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}}));return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},r.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(o(window,"resize",this._checkForIntersections,!0),o(t,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},r.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,i(window,"resize",this._checkForIntersections,!0),i(t,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},r.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach((function(r){var o=r.element,i=u(o),c=this._rootContainsTarget(o),s=r.entry,a=t&&c&&this._computeTargetAndRootIntersection(o,e),f=r.entry=new n({time:window.performance&&performance.now&&performance.now(),target:o,boundingClientRect:i,rootBounds:e,intersectionRect:a});s?t&&c?this._hasCrossedThreshold(s,f)&&this._queuedEntries.push(f):s&&s.isIntersecting&&this._queuedEntries.push(f):this._queuedEntries.push(f)}),this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},r.prototype._computeTargetAndRootIntersection=function(e,n){if("none"!=window.getComputedStyle(e).display){for(var r,o,i,c,a,f,p,l,h=u(e),d=s(e),v=!1;!v;){var g=null,y=1==d.nodeType?window.getComputedStyle(d):{};if("none"==y.display)return;if(d==this.root||d==t?(v=!0,g=n):d!=t.body&&d!=t.documentElement&&"visible"!=y.overflow&&(g=u(d)),g&&(r=g,o=h,i=void 0,c=void 0,a=void 0,f=void 0,p=void 0,l=void 0,i=Math.max(r.top,o.top),c=Math.min(r.bottom,o.bottom),a=Math.max(r.left,o.left),f=Math.min(r.right,o.right),l=c-i,!(h=(p=f-a)>=0&&l>=0&&{top:i,bottom:c,left:a,right:f,width:p,height:l})))break;d=s(d)}return h}},r.prototype._getRootRect=function(){var e;if(this.root)e=u(this.root);else{var n=t.documentElement,r=t.body;e={top:0,left:0,right:n.clientWidth||r.clientWidth,width:n.clientWidth||r.clientWidth,bottom:n.clientHeight||r.clientHeight,height:n.clientHeight||r.clientHeight}}return this._expandRectByRootMargin(e)},r.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map((function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100})),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},r.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,r=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==r)for(var o=0;o<this.thresholds.length;o++){var i=this.thresholds[o];if(i==n||i==r||i<n!=i<r)return!0}},r.prototype._rootIsInDom=function(){return!this.root||c(t,this.root)},r.prototype._rootContainsTarget=function(e){return c(this.root||t,e)},r.prototype._registerInstance=function(){e.indexOf(this)<0&&e.push(this)},r.prototype._unregisterInstance=function(){var t=e.indexOf(this);-1!=t&&e.splice(t,1)},window.IntersectionObserver=r,window.IntersectionObserverEntry=n}function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,r=this.intersectionRect,o=r.width*r.height;this.intersectionRatio=n?Number((o/n).toFixed(4)):this.isIntersecting?1:0}function r(t,e){var n,r,o,i=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(i.root&&1!=i.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),r=this.THROTTLE_TIMEOUT,o=null,function(){o||(o=setTimeout((function(){n(),o=null}),r))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(i.rootMargin),this.thresholds=this._initThresholds(i.threshold),this.root=i.root||null,this.rootMargin=this._rootMarginValues.map((function(t){return t.value+t.unit})).join(" ")}function o(t,e,n,r){"function"==typeof t.addEventListener?t.addEventListener(e,n,r||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function i(t,e,n,r){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,r||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function u(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=s(n)}return!1}function s(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e}}()}]);