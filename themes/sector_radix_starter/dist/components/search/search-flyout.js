!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=39)}({39:function(e,t){!function(){var e=document.querySelector(".search--flyout");e.setAttribute("aria-hidden",!0);var t=e.querySelectorAll("input");t.forEach((function(e){return e.setAttribute("tabindex",-1)}));var n=e.querySelector("input[name=query]"),r=function(){n.blur(),e.setAttribute("aria-hidden",!0),t.forEach((function(e){return e.setAttribute("tabindex",-1)})),document.body.classList.remove("search-is-active")};Drupal.toggleFlyoutSearch=function(o){o?(n.focus(),e.setAttribute("aria-hidden",!1),t.forEach((function(e){return e.removeAttribute("tabindex")})),document.body.classList.add("search-is-active")):r()};var o=document.createElement("button");o.setAttribute("type","button"),o.classList.add("visually-hidden","close","btn","button","focusable"),o.appendChild(document.createTextNode("Close")),o.addEventListener("click",r),o.addEventListener("blur",r),e.querySelector(".form-actions").appendChild(o),document.addEventListener("keydown",(function(e){27===e.keyCode&&r()}))}()}});