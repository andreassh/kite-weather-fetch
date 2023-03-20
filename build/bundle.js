(()=>{var e={738:(e,n,t)=>{const r=t(147),o=t(17),s=t(37),i=t(968).version,a=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function c(e){console.log(`[dotenv@${i}][DEBUG] ${e}`)}const l={config:function(e){let n=o.resolve(process.cwd(),".env"),t="utf8";const i=Boolean(e&&e.debug),a=Boolean(e&&e.override);var p;e&&(null!=e.path&&(n="~"===(p=e.path)[0]?o.join(s.homedir(),p.slice(1)):p),null!=e.encoding&&(t=e.encoding));try{const e=l.parse(r.readFileSync(n,{encoding:t}));return Object.keys(e).forEach((function(n){Object.prototype.hasOwnProperty.call(process.env,n)?(!0===a&&(process.env[n]=e[n]),i&&c(!0===a?`"${n}" is already defined in \`process.env\` and WAS overwritten`:`"${n}" is already defined in \`process.env\` and was NOT overwritten`)):process.env[n]=e[n]})),{parsed:e}}catch(e){return i&&c(`Failed to load ${n} ${e.message}`),{error:e}}},parse:function(e){const n={};let t,r=e.toString();for(r=r.replace(/\r\n?/gm,"\n");null!=(t=a.exec(r));){const e=t[1];let r=t[2]||"";r=r.trim();const o=r[0];r=r.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===o&&(r=r.replace(/\\n/g,"\n"),r=r.replace(/\\r/g,"\r")),n[e]=r}return n}};e.exports.config=l.config,e.exports.parse=l.parse,e.exports=l},147:e=>{"use strict";e.exports=require("fs")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.0.3","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"require":"./lib/main.js","types":"./lib/main.d.ts","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^17.0.9","decache":"^4.6.1","dtslint":"^3.7.0","sinon":"^12.0.1","standard":"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2","tap":"^15.1.6","tar":"^6.1.11","typescript":"^4.5.4"},"engines":{"node":">=12"}}')}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var s=n[r]={exports:{}};return e[r](s,s.exports,t),s.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";t.r(r),t.d(r,{default:()=>o,run:()=>n});var e=t(738);t.n(e)().config();var n=function(e){return n=void 0,t=void 0,o=function(){return function(e,n){var t,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(a){return function(c){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,a[0]&&(i=0)),i;)try{if(t=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=n.call(e,i)}catch(e){a=[6,e],r=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}(this,(function(n){switch(n.label){case 0:return console.log("Running job from req.body",null==e?void 0:e.body),[4,new Promise((function(e){return e(!0)}))];case 1:return[2,n.sent()]}}))},new((r=void 0)||(r=Promise))((function(e,s){function i(e){try{c(o.next(e))}catch(e){s(e)}}function a(e){try{c(o.throw(e))}catch(e){s(e)}}function c(n){var t;n.done?e(n.value):(t=n.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((o=o.apply(n,t||[])).next())}));var n,t,r,o};const o={run:n}})(),module.exports.job=r})();
//# sourceMappingURL=bundle.js.map