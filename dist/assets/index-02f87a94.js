(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const w={};function F(e){w.context=e}function le(){return{...w.context,id:`${w.context.id}${w.context.count++}-`,count:0}}const oe=(e,t)=>e===t,re=Symbol("solid-track"),P={equals:oe};let fe=ee;const E=1,B=2,W={owned:null,cleanups:null,context:null,owner:null};var h=null;let v=null,d=null,p=null,C=null,j=0;function O(e,t){const n=d,s=h,i=e.length===0,o=i?W:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},r=i?e:()=>e(()=>L(()=>k(o)));h=o,d=null;try{return N(r,!0)}finally{d=n,h=s}}function X(e,t){t=t?Object.assign({},P,t):P;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),Y(n,i));return[Q.bind(n),s]}function D(e,t,n){const s=Z(e,t,!1,E);U(s)}function ue(e,t,n){n=n?Object.assign({},P,n):P;const s=Z(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,U(s),Q.bind(s)}function L(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function ce(e){return h===null||(h.cleanups===null?h.cleanups=[e]:h.cleanups.push(e)),e}function Q(){const e=v;if(this.sources&&(this.state||e))if(this.state===E||e)U(this);else{const t=p;p=null,N(()=>H(this),!1),p=t}if(d){const t=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(t)):(d.sources=[this],d.sourceSlots=[t]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function Y(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&N(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],r=v&&v.running;r&&v.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?p.push(o):C.push(o),o.observers&&te(o)),r||(o.state=E)}if(p.length>1e6)throw p=[],new Error},!1)),t}function U(e){if(!e.fn)return;k(e);const t=h,n=d,s=j;d=h=e,ae(e,e.value,s),d=n,h=t}function ae(e,t,n){let s;try{s=e.fn(t)}catch(i){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(k),e.owned=null),e.updatedAt=n+1,ne(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Y(e,s):e.value=s,e.updatedAt=n)}function Z(e,t,n,s=E,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:h,context:null,pure:n};return h===null||h!==W&&(h.owned?h.owned.push(o):h.owned=[o]),o}function z(e){const t=v;if(e.state===0||t)return;if(e.state===B||t)return H(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<j);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===E||t)U(e);else if(e.state===B||t){const i=p;p=null,N(()=>H(e,n[0]),!1),p=i}}function N(e,t){if(p)return e();let n=!1;t||(p=[]),C?n=!0:C=[],j++;try{const s=e();return de(n),s}catch(s){n||(C=null),p=null,ne(s)}}function de(e){if(p&&(ee(p),p=null),e)return;const t=C;C=null,t.length&&N(()=>fe(t),!1)}function ee(e){for(let t=0;t<e.length;t++)z(e[t])}function H(e,t){const n=v;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===E||n?i!==t&&(!i.updatedAt||i.updatedAt<j)&&z(i):(i.state===B||n)&&H(i,t))}}function te(e){const t=v;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=B,s.pure?p.push(s):C.push(s),s.observers&&te(s))}}function k(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const o=i.pop(),r=n.observerSlots.pop();s<i.length&&(o.sourceSlots[r]=s,i[s]=o,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)k(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function he(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ne(e){throw e=he(e),e}const pe=Symbol("fallback");function K(e){for(let t=0;t<e.length;t++)e[t]()}function ge(e,t,n={}){let s=[],i=[],o=[],r=0,l=t.length>1?[]:null;return ce(()=>K(o)),()=>{let u=e()||[],c,f;return u[re],L(()=>{let a=u.length,y,b,A,_,M,x,m,S,T;if(a===0)r!==0&&(K(o),o=[],s=[],i=[],r=0,l&&(l=[])),n.fallback&&(s=[pe],i[0]=O(ie=>(o[0]=ie,n.fallback())),r=1);else if(r===0){for(i=new Array(a),f=0;f<a;f++)s[f]=u[f],i[f]=O(g);r=a}else{for(A=new Array(a),_=new Array(a),l&&(M=new Array(a)),x=0,m=Math.min(r,a);x<m&&s[x]===u[x];x++);for(m=r-1,S=a-1;m>=x&&S>=x&&s[m]===u[S];m--,S--)A[S]=i[m],_[S]=o[m],l&&(M[S]=l[m]);for(y=new Map,b=new Array(S+1),f=S;f>=x;f--)T=u[f],c=y.get(T),b[f]=c===void 0?-1:c,y.set(T,f);for(c=x;c<=m;c++)T=s[c],f=y.get(T),f!==void 0&&f!==-1?(A[f]=i[c],_[f]=o[c],l&&(M[f]=l[c]),f=b[f],y.set(T,f)):o[c]();for(f=x;f<a;f++)f in A?(i[f]=A[f],o[f]=_[f],l&&(l[f]=M[f],l[f](f))):i[f]=O(g);i=i.slice(0,r=a),s=u.slice(0)}return i});function g(a){if(o[f]=a,l){const[y,b]=X(f);return l[f]=b,t(u[f],y)}return t(u[f])}}}let we=!1;function ye(e,t){if(we&&w.context){const n=w.context;F(le());const s=L(()=>e(t||{}));return F(n),s}return L(()=>e(t||{}))}function be(e){const t="fallback"in e&&{fallback:()=>e.fallback};return ue(ge(()=>e.each,e.children,t||void 0))}function xe(e,t,n){let s=n.length,i=t.length,o=s,r=0,l=0,u=t[i-1].nextSibling,c=null;for(;r<i||l<o;){if(t[r]===n[l]){r++,l++;continue}for(;t[i-1]===n[o-1];)i--,o--;if(i===r){const f=o<s?l?n[l-1].nextSibling:n[o-l]:u;for(;l<o;)e.insertBefore(n[l++],f)}else if(o===l)for(;r<i;)(!c||!c.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[o-1]&&n[l]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[l++],t[r++].nextSibling),e.insertBefore(n[--o],f),t[i]=n[o]}else{if(!c){c=new Map;let g=l;for(;g<o;)c.set(n[g],g++)}const f=c.get(t[r]);if(f!=null)if(l<f&&f<o){let g=r,a=1,y;for(;++g<i&&g<o&&!((y=c.get(t[g]))==null||y!==f+a);)a++;if(a>f-l){const b=t[r];for(;l<f;)e.insertBefore(n[l++],b)}else e.replaceChild(n[l++],t[r++])}else r++;else t[r++].remove()}}}const G="_$DX_DELEGATE";function me(e,t,n,s={}){let i;return O(o=>{i=o,t===document?e():q(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function se(e,t,n){const s=document.createElement("template");if(s.innerHTML=e,t&&s.innerHTML.split("<").length-1!==t)throw`The browser resolved template HTML does not match JSX input:
${s.innerHTML}

${e}. Is your HTML properly formed?`;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Ae(e,t=window.document){const n=t[G]||(t[G]=new Set);for(let s=0,i=e.length;s<i;s++){const o=e[s];n.has(o)||(n.add(o),t.addEventListener(o,Se))}}function J(e,t,n){return L(()=>e(t,n))}function q(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return I(e,t,s,n);D(i=>I(e,t(),i,n),s)}function Se(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),w.registry&&!w.done&&(w.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function I(e,t,n,s,i){for(w.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(w.context)return n;if(o==="number"&&(t=t.toString()),r){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=$(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(w.context)return n;n=$(e,n,s)}else{if(o==="function")return D(()=>{let l=t();for(;typeof l=="function";)l=l();n=I(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],u=n&&Array.isArray(n);if(R(l,t,n,i))return D(()=>n=I(e,l,n,s,!0)),()=>n;if(w.context){if(!l.length)return n;for(let c=0;c<l.length;c++)if(l[c].parentNode)return n=l}if(l.length===0){if(n=$(e,n,s),r)return n}else u?n.length===0?V(e,l,s):xe(e,n,l):(n&&$(e),V(e,l));n=l}else if(t instanceof Node){if(w.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=$(e,n,s,t);$(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function R(e,t,n,s){let i=!1;for(let o=0,r=t.length;o<r;o++){let l=t[o],u=n&&n[o];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=R(e,l,u)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=R(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else e.push(l),i=!0;else{const c=String(l);c==="<!>"?u&&u.nodeType===8&&e.push(u):u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function V(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function $(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let o=!1;for(let r=t.length-1;r>=0;r--){const l=t[r];if(i!==l){const u=l.parentNode===e;!o&&!r?u?e.replaceChild(i,l):e.insertBefore(i,n):u&&l.remove()}else o=!0}}else e.insertBefore(i,n);return[i]}const ve="/api/send",Ce=async(e,t,n)=>{const s=await fetch(ve,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:e,apiKey:t})});if(!s.ok){const u=await s.json();throw console.error(u.error),new Error("请求失败！")}const i=s.body;if(!i)throw new Error("没有数据！");const o=i.getReader(),r=new TextDecoder("utf-8");let l="";for(;;){const{value:u,done:c}=await o.read();if(c)break;if(u){const f=r.decode(u);if(f===`
`&&l.endsWith(`
`))continue;f&&(l+=f,n(f))}}};const Ee=se('<div class="h-screen box-border bg-blue-50"><div class="flex flex-col items-start w-full max-w-3xl h-full mx-auto pb-1 bg-white"><div class="w-full h-9 text-center bg-green-50"><span class="text-3xl select-none">ChatGPT</span></div><div class="flex-1 w-full p-2 overflow-auto"></div><div class="w-full"><input class="w-full p-1 border" type="text" placeholder="apiKey"><input class="w-full p-1 border" type="text" placeholder="输入问题..."></div></div></div>',14),Te=se("<div></div>",2);function $e(){const[e,t]=X([{role:"user",content:"你好"},{role:"assistant",content:"你好啊"}]);let n,s;const i=o=>{if(o.keyCode!==13)return;const r=s.value.trim();if(r===""){alert("请输入问题");return}const l=[...e(),{role:"user",content:r}];t([...l,{role:"assistant",content:""}]),Ce(l,n.value.trim(),u=>{const c=[...e()];c[c.length-1].content+=u,t(c)})};return(()=>{const o=Ee.cloneNode(!0),r=o.firstChild,l=r.firstChild,u=l.nextSibling,c=u.nextSibling,f=c.firstChild,g=f.nextSibling;q(u,ye(be,{get each(){return e()},children:b=>b.content&&(()=>{const A=Te.cloneNode(!0);return q(A,()=>b.content),D(()=>A.className="w-full h-7"+(b.role==="user"?" text-right bg-yellow-50":" text-left bg-red-50")),A})()}));const a=n;typeof a=="function"?J(a,f):n=f,g.$$keyup=i;const y=s;return typeof y=="function"?J(y,g):s=g,o})()}Ae(["keyup"]);me($e,document.getElementById("app"));
