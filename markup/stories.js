!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){!function(){"use strict";function e(e){var t=!0,n=!1,o=null,i={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function r(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function s(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function c(e){t=!1}function d(){document.addEventListener("mousemove",a),document.addEventListener("mousedown",a),document.addEventListener("mouseup",a),document.addEventListener("pointermove",a),document.addEventListener("pointerdown",a),document.addEventListener("pointerup",a),document.addEventListener("touchmove",a),document.addEventListener("touchstart",a),document.addEventListener("touchend",a)}function a(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,document.removeEventListener("mousemove",a),document.removeEventListener("mousedown",a),document.removeEventListener("mouseup",a),document.removeEventListener("pointermove",a),document.removeEventListener("pointerdown",a),document.removeEventListener("pointerup",a),document.removeEventListener("touchmove",a),document.removeEventListener("touchstart",a),document.removeEventListener("touchend",a))}document.addEventListener("keydown",(function(n){n.metaKey||n.altKey||n.ctrlKey||(r(e.activeElement)&&s(e.activeElement),t=!0)}),!0),document.addEventListener("mousedown",c,!0),document.addEventListener("pointerdown",c,!0),document.addEventListener("touchstart",c,!0),document.addEventListener("visibilitychange",(function(e){"hidden"===document.visibilityState&&(n&&(t=!0),d())}),!0),d(),e.addEventListener("focus",(function(e){var n,o,c;r(e.target)&&(t||(o=(n=e.target).type,"INPUT"===(c=n.tagName)&&i[o]&&!n.readOnly||"TEXTAREA"===c&&!n.readOnly||n.isContentEditable))&&s(e.target)}),!0),e.addEventListener("blur",(function(e){var t;r(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout((function(){n=!1}),100),(t=e.target).hasAttribute("data-focus-visible-added")&&(t.classList.remove("focus-visible"),t.removeAttribute("data-focus-visible-added")))}),!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document)}()},function(e,t,n){"use strict";n.r(t);n(0);const o=document.querySelector("body"),i=o.querySelector(".colors-theme-toggle"),r="theme_dark",s="theme_light";let c=!0;const d=document.querySelectorAll(".favicon"),a=document.querySelector(".favicon-msapplication");i.addEventListener("click",(()=>{o.classList.contains(r)?(o.classList.remove(r),o.classList.add(s)):(o.classList.remove(s),o.classList.add(r)),(()=>{let e,t;c?(e="dark",t="light"):(e="light",t="dark");for(const n of d)n.href=n.href.replace("".concat(e),"".concat(t));a.content=a.content.replace("".concat(e),"".concat(t)),c=!c})()})),(e=>{const t=document.querySelector(".".concat(e));if(!t)return;const n=t.querySelector(".".concat(e,"__swiper-container")),o=t.querySelector(".".concat(e,"__swiper-wrapper")),i=t.querySelector(".".concat(e,"__swiper-button-prev")),r=t.querySelector(".".concat(e,"__swiper-button-next")),s=t.querySelectorAll(".".concat(e,"__swiper-slide")),c="".concat(e,"__swiper-slide--active"),d="button--disabled";s[0].classList.add(c);let a=0,u=n.offsetHeight;const l=()=>{const e="translateY(".concat(-1*a*u,"px)");o.style.transform=e};document.addEventListener("DOMContentLoaded",(()=>{window.onresize=()=>{u=n.offsetHeight,l()}}));const m=e=>{e.classList.add(d),e.setAttribute("disabled","disabled")},v=e=>{e.classList.remove(d),e.removeAttribute("disabled")},f=()=>{(e=>{const t=s[e].querySelectorAll(".people__link");for(const e of t)e.setAttribute("tabindex",-1)})(a),s[a].classList.remove(c)},p=()=>{l(),(e=>{const t=s[e].querySelectorAll(".people__link");for(const e of t)e.setAttribute("tabindex",0)})(a),s[a].classList.add(c)};if(m(i),1===s.length)return void m(r);i.addEventListener("click",(()=>{f(),a--,0===a&&m(i),a===s.length-2&&v(r),p()})),r.addEventListener("click",(()=>{f(),a++,1===a&&v(i),a===s.length-1&&m(r),p()}))})("vote")}]);