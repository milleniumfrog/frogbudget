!function(e){var n={};function t(f){if(n[f])return n[f].exports;var o=n[f]={i:f,l:!1,exports:{}};return e[f].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,f){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:f})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var f=Object.create(null);if(t.r(f),Object.defineProperty(f,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(f,o,function(n){return e[n]}.bind(null,o));return f},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=36)}({36:function(e,n,t){"use strict";var f=this&&this.__awaiter||function(e,n,t,f){return new(t||(t=Promise))(function(o,c){function a(e){try{i(f.next(e))}catch(e){c(e)}}function d(e){try{i(f.throw(e))}catch(e){c(e)}}function i(e){e.done?o(e.value):new t(function(n){n(e.value)}).then(a,d)}i((f=f.apply(e,n||[])).next())})};let o=self;const c="frogbudget-0.1.4";o.addEventListener("install",e=>f(this,void 0,void 0,function*(){console.info("installing servicewoker for version 0.1.4"),e.waitUntil(function(){return f(this,void 0,void 0,function*(){if(console.info("precache"),!(yield caches.has(c))){console.info("delete caches");let e=yield caches.keys();for(let n of e)console.info(`delete cache ${n}`),yield caches.delete(n);let n=yield caches.open(c);return console.info("create new cache"),n.addAll(["fa-brands-400.e8019d507e8cb51d169ab4f94a0cda12.eot","fa-brands-400.83e6c29fb363b2f0ea6cc18fefff729c.svg","fa-brands-400.fdf44bc43e8fa2358bbb7d9165d78455.ttf","fa-brands-400.da408238128b876cbda6424391f1566f.woff","fa-brands-400.6814d0e8136d34e313623eb7129d538e.woff2","fa-regular-400.8d9ab84bfe87a3f77112a6698cf639fb.woff2","fa-regular-400.ba2a91dc95e6cfdc4b2a186a7ba83e29.svg","fa-regular-400.8d220c793e2612bd131ed8522c54669f.ttf","fa-regular-400.dad90637f797356bbc70d2664832e0b6.woff","fa-regular-400.e6c93cb47e716b579264a5fdfbf7e84d.eot","fa-solid-900.2d0415fa29ea596b7a02c78eddeede20.woff","fa-solid-900.132e9759d93e4eefd7cdde0d7a322991.ttf","fa-solid-900.b75b4bfe0d58faeced5006c785eaae23.woff2","fa-solid-900.de1d242d8acb26ec43c0d071fe78e72d.svg","fa-solid-900.ea363ed422723673917901680be9b37c.eot","ionicons.2c159d0d05473040b53ec79df8797d32.woff","ionicons.19e65b89cee273a249fba4c09b951b74.eot","ionicons.aff28a207631f39ee0272d5cdde43ee7.svg","ionicons.dd4781d1acc57ba4c4808d1b44301201.ttf","Material-Design-Iconic-Font.b351bd62abcd96e924d9f44a3da169a7.ttf","Material-Design-Iconic-Font.a4d31128b633bc0b1cc1f18a34fb3851.woff2","Material-Design-Iconic-Font.d2a55d331bdd1a7ea97a8a1fbb3c569c.woff","index.html","/frogbudget/","icons-df37451e1a7c92800a2e47065a4f3d72/favicon.ico","sw.js","pwa.0.1.4.js","vendors~pwa.chunk.0.1.4.js","vendors~pwa.0.1.4.css","pwa.0.1.4.css"])}console.info("cache exists")})}())})),o.addEventListener("fetch",e=>{console.info("fetch"),console.info(e.request),e.respondWith(function(e){return f(this,void 0,void 0,function*(){console.info("fetch");let n=yield caches.open(c);return(yield n.match(e))||(yield fetch(e))})}(e.request))})}});
//# sourceMappingURL=sw.js.map