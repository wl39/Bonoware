"use strict";var precacheConfig=[["/index.html","0569592c30931df9e98c0fa0de0d895e"],["/static/css/main.77e26718.css","77e267184985e2b8d0c3a0edbf9e0885"],["/static/js/0.1b551189.chunk.js","a37f7f13a21baf8015b6e1cf7c5b6586"],["/static/js/1.3910cdda.chunk.js","d1e3763c1419c30f985ceb787775dcae"],["/static/js/10.3fbe6eb7.chunk.js","fb6e263594fd7656a94d0d6f24d84fca"],["/static/js/11.260ebca9.chunk.js","c8dd92df1fa634684ad6e95aba07b034"],["/static/js/12.abd08c61.chunk.js","d090674939bb6e579d28d1be3f76794c"],["/static/js/13.4ee4b965.chunk.js","70cf1730a1b05a73249c6b8f5afe83d9"],["/static/js/14.c1f6d663.chunk.js","4f68157817989f5d49298dc540ee259a"],["/static/js/15.e18c4de0.chunk.js","9f1d93daeb56f3bd541cd819473f387c"],["/static/js/16.e922ba1f.chunk.js","2e3fd5bc5fb1133346cd920684aac197"],["/static/js/17.49bba367.chunk.js","630cd741ca0502905f71571427cd9a50"],["/static/js/2.b5bd1c54.chunk.js","8344760086a2151adc1cb6cdf42441a2"],["/static/js/3.1aff82c7.chunk.js","6188c10be9dcd870a9480c8280d8fa7c"],["/static/js/4.54d8e2bd.chunk.js","89a0b1dbac813b9f0b35cb9b177d5624"],["/static/js/5.77c18abb.chunk.js","8134a59c983e0e73eb8e1c5079dc94f3"],["/static/js/6.9128d2ad.chunk.js","fc359ac67a89a89b1dd52013bc1c52c8"],["/static/js/7.2a1e02d8.chunk.js","a32a1967635426dbec7b156f4616ba84"],["/static/js/8.98ef4817.chunk.js","305a10a48ca3bc00c1b2b78273c14d81"],["/static/js/9.39671a41.chunk.js","a1e82525a3d7a53e8b460b940e841d18"],["/static/media/UploadIcon.1cedb6e9.svg","1cedb6e919bfed6a2c1ec00b5d8ee620"],["/static/media/avatar.f1d71f77.jpg","f1d71f777331fd7e3de116edf4ee3b67"],["/static/media/dummy.baa798f1.jpeg","baa798f1a04360de99d38b23c1d8cf11"],["/static/media/logo-white.eec7c7f6.svg","eec7c7f60134e712ef7174c96ca7ee5a"],["/static/media/probelogo6.5dfa3a0b.png","5dfa3a0bd5cdf4d6051f7dbd3ceadeaa"],["/static/media/sidebar-2.d30c9e30.jpg","d30c9e30978c9278180dcce2bb66c054"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});