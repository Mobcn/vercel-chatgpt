(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();const w={};function Y(e){w.context=e}function de(){return{...w.context,id:`${w.context.id}${w.context.count++}-`,count:0}}const he=(e,t)=>e===t,ge=Symbol("solid-track"),k={equals:he};let te=oe;const E=1,R=2,ne={owned:null,cleanups:null,context:null,owner:null};var g=null;let L=null,d=null,p=null,S=null,G=0;function H(e,t){const n=d,s=g,l=e.length===0,i=l?ne:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},r=l?e:()=>e(()=>N(()=>F(i)));g=i,d=null;try{return B(r,!0)}finally{d=n,g=s}}function I(e,t){t=t?Object.assign({},k,t):k;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=l=>(typeof l=="function"&&(l=l(n.value)),ie(n,l));return[le.bind(n),s]}function P(e,t,n){const s=z(e,t,!1,E);K(s)}function pe(e,t,n){te=ye;const s=z(e,t,!1,E);s.user=!0,S?S.push(s):K(s)}function j(e,t,n){n=n?Object.assign({},k,n):k;const s=z(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,K(s),le.bind(s)}function N(e){if(d===null)return e();const t=d;d=null;try{return e()}finally{d=t}}function se(e){pe(()=>N(e))}function we(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function le(){const e=L;if(this.sources&&(this.state||e))if(this.state===E||e)K(this);else{const t=p;p=null,B(()=>V(this),!1),p=t}if(d){const t=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(t)):(d.sources=[this],d.sourceSlots=[t]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function ie(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&B(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],r=L&&L.running;r&&L.disposed.has(i),(r&&!i.tState||!r&&!i.state)&&(i.pure?p.push(i):S.push(i),i.observers&&re(i)),r||(i.state=E)}if(p.length>1e6)throw p=[],new Error},!1)),t}function K(e){if(!e.fn)return;F(e);const t=g,n=d,s=G;d=g=e,be(e,e.value,s),d=n,g=t}function be(e,t,n){let s;try{s=e.fn(t)}catch(l){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(F),e.owned=null),e.updatedAt=n+1,ce(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ie(e,s):e.value=s,e.updatedAt=n)}function z(e,t,n,s=E,l){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:null,pure:n};return g===null||g!==ne&&(g.owned?g.owned.push(i):g.owned=[i]),i}function U(e){const t=L;if(e.state===0||t)return;if(e.state===R||t)return V(e);if(e.suspense&&N(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<G);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===E||t)K(e);else if(e.state===R||t){const l=p;p=null,B(()=>V(e,n[0]),!1),p=l}}function B(e,t){if(p)return e();let n=!1;t||(p=[]),S?n=!0:S=[],G++;try{const s=e();return ve(n),s}catch(s){n||(S=null),p=null,ce(s)}}function ve(e){if(p&&(oe(p),p=null),e)return;const t=S;S=null,t.length&&B(()=>te(t),!1)}function oe(e){for(let t=0;t<e.length;t++)U(e[t])}function ye(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:U(s)}for(w.context&&Y(),t=0;t<n;t++)U(e[t])}function V(e,t){const n=L;e.state=0;for(let s=0;s<e.sources.length;s+=1){const l=e.sources[s];l.sources&&(l.state===E||n?l!==t&&(!l.updatedAt||l.updatedAt<G)&&U(l):(l.state===R||n)&&V(l,t))}}function re(e){const t=L;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=R,s.pure?p.push(s):S.push(s),s.observers&&re(s))}}function F(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const i=l.pop(),r=n.observerSlots.pop();s<l.length&&(i.sourceSlots[r]=s,l[s]=i,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)F(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function me(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ce(e){throw e=me(e),e}const $e=Symbol("fallback");function J(e){for(let t=0;t<e.length;t++)e[t]()}function xe(e,t,n={}){let s=[],l=[],i=[],r=0,o=t.length>1?[]:null;return we(()=>J(i)),()=>{let u=e()||[],f,c;return u[ge],N(()=>{let a=u.length,b,_,m,M,D,$,x,A,T;if(a===0)r!==0&&(J(i),i=[],s=[],l=[],r=0,o&&(o=[])),n.fallback&&(s=[$e],l[0]=H(ae=>(i[0]=ae,n.fallback())),r=1);else if(r===0){for(l=new Array(a),c=0;c<a;c++)s[c]=u[c],l[c]=H(h);r=a}else{for(m=new Array(a),M=new Array(a),o&&(D=new Array(a)),$=0,x=Math.min(r,a);$<x&&s[$]===u[$];$++);for(x=r-1,A=a-1;x>=$&&A>=$&&s[x]===u[A];x--,A--)m[A]=l[x],M[A]=i[x],o&&(D[A]=o[x]);for(b=new Map,_=new Array(A+1),c=A;c>=$;c--)T=u[c],f=b.get(T),_[c]=f===void 0?-1:f,b.set(T,c);for(f=$;f<=x;f++)T=s[f],c=b.get(T),c!==void 0&&c!==-1?(m[c]=l[f],M[c]=i[f],o&&(D[c]=o[f]),c=_[c],b.set(T,c)):i[f]();for(c=$;c<a;c++)c in m?(l[c]=m[c],i[c]=M[c],o&&(o[c]=D[c],o[c](c))):l[c]=H(h);l=l.slice(0,r=a),s=u.slice(0)}return l});function h(a){if(i[c]=a,o){const[b,_]=I(c);return o[c]=_,t(u[c],b)}return t(u[c])}}}let _e=!1;function C(e,t){if(_e&&w.context){const n=w.context;Y(de());const s=N(()=>e(t||{}));return Y(n),s}return N(()=>e(t||{}))}function ue(e){const t="fallback"in e&&{fallback:()=>e.fallback};return j(xe(()=>e.each,e.children,t||void 0))}function Ae(e,t,n){let s=n.length,l=t.length,i=s,r=0,o=0,u=t[l-1].nextSibling,f=null;for(;r<l||o<i;){if(t[r]===n[o]){r++,o++;continue}for(;t[l-1]===n[i-1];)l--,i--;if(l===r){const c=i<s?o?n[o-1].nextSibling:n[i-o]:u;for(;o<i;)e.insertBefore(n[o++],c)}else if(i===o)for(;r<l;)(!f||!f.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[i-1]&&n[o]===t[l-1]){const c=t[--l].nextSibling;e.insertBefore(n[o++],t[r++].nextSibling),e.insertBefore(n[--i],c),t[l]=n[i]}else{if(!f){f=new Map;let h=o;for(;h<i;)f.set(n[h],h++)}const c=f.get(t[r]);if(c!=null)if(o<c&&c<i){let h=r,a=1,b;for(;++h<l&&h<i&&!((b=f.get(t[h]))==null||b!==c+a);)a++;if(a>c-o){const _=t[r];for(;o<c;)e.insertBefore(n[o++],_)}else e.replaceChild(n[o++],t[r++])}else r++;else t[r++].remove()}}}const X="_$DX_DELEGATE";function Se(e,t,n,s={}){let l;return H(i=>{l=i,t===document?e():v(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{l(),t.textContent=""}}function y(e,t,n){const s=document.createElement("template");if(s.innerHTML=e,t&&s.innerHTML.split("<").length-1!==t)throw`The browser resolved template HTML does not match JSX input:
${s.innerHTML}

${e}. Is your HTML properly formed?`;let l=s.content.firstChild;return n&&(l=l.firstChild),l}function fe(e,t=window.document){const n=t[X]||(t[X]=new Set);for(let s=0,l=e.length;s<l;s++){const i=e[s];n.has(i)||(n.add(i),t.addEventListener(i,Ee))}}function Ce(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function W(e,t,n){return N(()=>e(t,n))}function v(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return Z(e,t,s,n);P(l=>Z(e,t(),l,n),s)}function Ee(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),w.registry&&!w.done&&(w.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?s.call(n,l,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function Z(e,t,n,s,l){for(w.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(w.context)return n;if(i==="number"&&(t=t.toString()),r){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=O(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(w.context)return n;n=O(e,n,s)}else{if(i==="function")return P(()=>{let o=t();for(;typeof o=="function";)o=o();n=Z(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],u=n&&Array.isArray(n);if(q(o,t,n,l))return P(()=>n=Z(e,o,n,s,!0)),()=>n;if(w.context){if(!o.length)return n;for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=O(e,n,s),r)return n}else u?n.length===0?Q(e,o,s):Ae(e,n,o):(n&&O(e),Q(e,o));n=o}else if(t instanceof Node){if(w.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=O(e,n,s,t);O(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function q(e,t,n,s){let l=!1;for(let i=0,r=t.length;i<r;i++){let o=t[i],u=n&&n[i];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))l=q(e,o,u)||l;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();l=q(e,Array.isArray(o)?o:[o],Array.isArray(u)?u:[u])||l}else e.push(o),l=!0;else{const f=String(o);f==="<!>"?u&&u.nodeType===8&&e.push(u):u&&u.nodeType===3&&u.data===f?e.push(u):e.push(document.createTextNode(f))}}return l}function Q(e,t,n=null){for(let s=0,l=t.length;s<l;s++)e.insertBefore(t[s],n)}function O(e,t,n,s){if(n===void 0)return e.textContent="";const l=s||document.createTextNode("");if(t.length){let i=!1;for(let r=t.length-1;r>=0;r--){const o=t[r];if(l!==o){const u=o.parentNode===e;!i&&!r?u?e.replaceChild(l,o):e.insertBefore(l,n):u&&o.remove()}else i=!0}}else e.insertBefore(l,n);return[l]}const Le="/api/send",Ne=async(e,t,n)=>{const s=await fetch(Le,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:e,apiKey:t})});s.ok||n("请求失败！",!0);const l=s.body;l||n("没有返回数据！",!0);const i=l.getReader(),r=new TextDecoder("utf-8");for(;;){const{value:o,done:u}=await i.read();if(n(r.decode(o),u),u)break}},Me=y('<div class="navbar bg-base-100"><div class="flex-1"><a class="btn btn-ghost normal-case text-xl" href="/">ChatGPT</a></div><div class="flex-none mr-2 px-2 border border-blue-400 rounded-md h-8"><span class="pr-2">连续对话</span><input class="toggle toggle-sm toggle-info" type="checkbox"></div><div class="flex-none"><button class="btn btn-square btn-ghost"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></button></div></div>',19),Te=y('<dialog class="p-0 bg-transparent z-50"><div class="flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"><div class="w-full max-w-3xl p-3 rounded-xl bg-white"><div class="flex w-full p-2"><span class="mr-3 leading-8">API_KEY :</span><input class="input input-sm input-bordered input-primary flex-1 focus:outline-none focus:border-2 w-60" type="password" placeholder="请输入 API_KEY"></div></div></div></dialog>',11);function Oe(e){const[t,n]=I(!1);let s;se(()=>{const i=localStorage.getItem("CHATGPT_API_KEY");i&&(s.value=i,e.setKey(i))});const l=i=>{const r=i.target.value;localStorage.setItem("CHATGPT_API_KEY",r),e.setKey(r)};return[(()=>{const i=Me.cloneNode(!0),r=i.firstChild,o=r.nextSibling,u=o.firstChild,f=u.nextSibling,c=o.nextSibling,h=c.firstChild;return f.addEventListener("change",a=>e.setRemember(a.target.checked)),h.$$click=()=>n(!0),i})(),(()=>{const i=Te.cloneNode(!0),r=i.firstChild,o=r.firstChild,u=o.firstChild,f=u.firstChild,c=f.nextSibling;r.$$click=a=>a.target.parentNode.tagName==="DIALOG"&&n(!1),c.addEventListener("change",l);const h=s;return typeof h=="function"?W(h,c):s=c,P(()=>i.open=t()),i})()]}fe(["click"]);const Ie=y("<div><div></div></div>",4),Pe=y("<p></p>",2),Ke=y('<div class="avatar"><div class="w-11 rounded-full"></div></div>',4),Be=y('<svg class="w-11 h-11 scale-90 text-cyan-900" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path></svg>',6),De=y('<svg class="w-11 h-11 scale-90 text-fuchsia-800" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"></path><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"></path></svg>',6);function He(e){return(()=>{const t=Ie.cloneNode(!0),n=t.firstChild;return v(t,(()=>{const s=j(()=>e.role==="assistant");return()=>s()&&C(ee,{role:"assistant"})})(),n),v(n,C(ue,{get each(){return e.content.split(`
`)},children:s=>(()=>{const l=Pe.cloneNode(!0);return v(l,s),l})()})),v(t,(()=>{const s=j(()=>e.role==="user");return()=>s()&&C(ee,{role:"user"})})(),null),P(s=>{const l="chat items-end "+(e.role==="user"?"chat-end":"chat-start"),i="chat-bubble "+(e.role==="user"?"chat-bubble-info":"chat-bubble-accent");return l!==s._v$&&(t.className=s._v$=l),i!==s._v$2&&(n.className=s._v$2=i),s},{_v$:void 0,_v$2:void 0}),t})()}function ee(e){return(()=>{const t=Ke.cloneNode(!0),n=t.firstChild;return v(n,(()=>{const s=j(()=>e.role==="user");return()=>s()?Be.cloneNode(!0):De.cloneNode(!0)})()),t})()}const ke=y('<div class="flex-1 w-full overflow-auto bg-teal-50"></div>',2);function Re(e){let t;return se(()=>{e.expose.toDown=()=>t.scrollTop=t.scrollHeight}),(()=>{const n=ke.cloneNode(!0),s=t;return typeof s=="function"?W(s,n):t=n,v(n,C(ue,{get each(){return e.messages},children:l=>l.content&&C(He,{get role(){return l.role},get content(){return l.content}})})),n})()}const je=y('<div class="flex w-full"><input class="input input-bordered input-primary flex-1 focus:outline-none focus:border-2 rounded-r-none" type="text"><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path></svg></button></div>',9);function Ue(e){let t;const n=()=>{e.onSend(t.value||""),t.value=""};return(()=>{const s=je.cloneNode(!0),l=s.firstChild,i=l.nextSibling;l.$$keyup=o=>o.key==="Enter"&&n();const r=t;return typeof r=="function"?W(r,l):t=l,i.$$click=n,P(o=>{const u=e.loading||e.placeholder||"请输入...",f=e.loading,c="btn btn-outline border-l-0 rounded-l-none "+(e.loading?"btn-disabled":"btn-primary");return u!==o._v$&&Ce(l,"placeholder",o._v$=u),f!==o._v$2&&(l.disabled=o._v$2=f),c!==o._v$3&&(i.className=o._v$3=c),o},{_v$:void 0,_v$2:void 0,_v$3:void 0}),s})()}fe(["keyup","click"]);const Ve=y('<div class="w-full"></div>',2);function Ze(e){const[t,n]=I(""),s=l=>{n("AI思考中..."),e.onSendMessages(l,()=>{n("")})};return(()=>{const l=Ve.cloneNode(!0);return v(l,C(Ue,{get loading(){return t()},onSend:s})),l})()}const Ge=y('<div class="h-screen box-border bg-blue-50"><div class="flex flex-col items-start w-full max-w-3xl h-full mx-auto pb-1 bg-white"></div></div>',4);function Fe(){const[e,t]=I([]),[n,s]=I(!1),[l,i]=I(""),r={},o=(u,f)=>{if(u=u.trim(),u===""){alert("请输入问题"),f();return}const c=l().trim();if(c===""){alert("请输入apiKey"),f();return}const h={role:"user",content:u},a=[...e(),h];t(a),r.toDown();const b={role:"assistant",content:""},_=n()?a:[h];Ne(_,c,(m,M)=>{m!==""&&(b.content+=m.replace(/ /g," "),t([...a,Object.assign({},b)]),r.toDown()),M&&f()}).catch(m=>{console.error(m),f()})};return(()=>{const u=Ge.cloneNode(!0),f=u.firstChild;return v(f,C(Oe,{setRemember:s,setKey:i}),null),v(f,C(Re,{get messages(){return e()},expose:r}),null),v(f,C(Ze,{onSendMessages:o}),null),u})()}Se(Fe,document.getElementById("app"));