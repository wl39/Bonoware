webpackJsonp([12],{7324:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),c=n.n(a),u=n(129),f=(n(62),n(7429)),p=n(7793),s=n.n(p),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),d(t,[{key:"componentDidMount",value:function(){var e=s.a.parse(this.props.location.search);fetch("https://cognito-idp.ap-northeast-2.amazonaws.com",{method:"POST",headers:{"x-amz-target":"AWSCognitoIdentityProviderService.ConfirmSignUp","Content-Type":"application/x-amz-json-1.1"},body:JSON.stringify({ClientId:e.clientId,ConfirmationCode:e.code,Username:e.username})})}},{key:"render",value:function(){var e=this.props.classes;return c.a.createElement("div",{className:e.container},"\uc774\uba54\uc77c \uc778\uc99d \uc131\uacf5\ud558\uc168\uc2b5\ub2c8\ub2f9")}}]),t}(c.a.Component);t.default=Object(u.j)(f.a)(l)},7429:function(e,t,n){"use strict";var r={container:{display:"flex",flexDirection:"column",paddingTop:"100px",borderRadius:"6px",zIndex:"3",position:"relative",background:"#FFFFFF",marginLeft:"auto",marginRight:"auto",paddingLeft:"15px",paddingRight:"15px",paddingBottom:"10px",width:"1200px","@media (max-width: 1200px)":{maxWidth:"90%"},"@media (max-width: 992px)":{maxWidth:"90%"},"@media (max-width: 768px)":{maxWidth:"100%"},"@media (max-width: 576px)":{maxWidth:"100%"}}};t.a=r},7793:function(e,t,n){"use strict";function r(e){switch(e.arrayFormat){case"index":return function(t,n,r){return null===n?[i(t,e),"[",r,"]"].join(""):[i(t,e),"[",i(r,e),"]=",i(n,e)].join("")};case"bracket":return function(t,n){return null===n?i(t,e):[i(t,e),"[]=",i(n,e)].join("")};default:return function(t,n){return null===n?i(t,e):[i(t,e),"=",i(n,e)].join("")}}}function o(e){var t;switch(e.arrayFormat){case"index":return function(e,n,r){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(r[e]=n);void 0===r[e]&&(r[e]={}),r[e][t[1]]=n};case"bracket":return function(e,n,r){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===r[e]?void(r[e]=[n]):void(r[e]=[].concat(r[e],n)):void(r[e]=n)};default:return function(e,t,n){if(void 0===n[e])return void(n[e]=t);n[e]=[].concat(n[e],t)}}}function i(e,t){return t.encode?t.strict?c(e):encodeURIComponent(e):e}function a(e){return Array.isArray(e)?e.sort():"object"===typeof e?a(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var c=n(7794),u=n(253);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=u({arrayFormat:"none"},t);var n=o(t),r=Object.create(null);return"string"!==typeof e?r:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),o=t.shift(),i=t.length>0?t.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),n(decodeURIComponent(o),i,r)}),Object.keys(r).sort().reduce(function(e,t){var n=r[t];return Boolean(n)&&"object"===typeof n&&!Array.isArray(n)?e[t]=a(n):e[t]=n,e},Object.create(null))):r},t.stringify=function(e,t){t=u({encode:!0,strict:!0,arrayFormat:"none"},t);var n=r(t);return e?Object.keys(e).sort().map(function(r){var o=e[r];if(void 0===o)return"";if(null===o)return i(r,t);if(Array.isArray(o)){var a=[];return o.slice().forEach(function(e){void 0!==e&&a.push(n(r,e,a.length))}),a.join("&")}return i(r,t)+"="+i(o,t)}).filter(function(e){return e.length>0}).join("&"):""}},7794:function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}}});