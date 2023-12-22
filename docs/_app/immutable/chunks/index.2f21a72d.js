import{S as w,K as Z,x as v,F as g,ap as X,am as R,R as D,U as J,V as Q,ak as ee,M as I,O as E,aq as te,aj as ie,ao as ne,ar as se}from"./3.bf59e641.js";function u(){var t=arguments[0];typeof t=="string"&&(t=document.createElement(t));var e=1,i=arguments[1];if(i&&typeof i=="object"&&i.nodeType==null&&!Array.isArray(i)){for(var n in i)if(Object.prototype.hasOwnProperty.call(i,n)){var s=i[n];typeof s=="string"?t.setAttribute(n,s):s!=null&&(t[n]=s)}e++}for(;e<arguments.length;e++)O(t,arguments[e]);return t}function O(t,e){if(typeof e=="string")t.appendChild(document.createTextNode(e));else if(e!=null)if(e.nodeType!=null)t.appendChild(e);else if(Array.isArray(e))for(var i=0;i<e.length;i++)O(t,e[i]);else throw new RangeError("Unsupported child node: "+e)}class oe{constructor(e,i,n){this.from=e,this.to=i,this.diagnostic=n}}class m{constructor(e,i,n){this.diagnostics=e,this.panel=i,this.selected=n}static init(e,i,n){let s=e,o=n.facet(h).markerFilter;o&&(s=o(s));let l=g.set(s.map(r=>r.from==r.to||r.from==r.to-1&&n.doc.lineAt(r.from).to==r.from?g.widget({widget:new me(r),diagnostic:r}).range(r.from):g.mark({attributes:{class:"cm-lintRange cm-lintRange-"+r.severity+(r.markClass?" "+r.markClass:"")},diagnostic:r}).range(r.from,r.to)),!0);return new m(l,i,b(l))}}function b(t,e=null,i=0){let n=null;return t.between(i,1e9,(s,o,{spec:l})=>{if(!(e&&l.diagnostic!=e))return n=new oe(s,o,l.diagnostic),!1}),n}function j(t,e){let i=t.startState.doc.lineAt(e.pos);return!!(t.effects.some(n=>n.is(k))||t.changes.touchesRange(i.from,i.to))}function B(t,e){return t.field(f,!1)?e:e.concat(w.appendConfig.of(K))}function G(t,e){return{effects:B(t,[k.of(e)])}}const k=w.define(),L=w.define(),_=w.define(),f=D.define({create(){return new m(g.none,null,null)},update(t,e){if(e.docChanged){let i=t.diagnostics.map(e.changes),n=null;if(t.selected){let s=e.changes.mapPos(t.selected.from,1);n=b(i,t.selected.diagnostic,s)||b(i,null,s)}t=new m(i,t.panel,n)}for(let i of e.effects)i.is(k)?t=m.init(i.value,t.panel,e.state):i.is(L)?t=new m(t.diagnostics,i.value?C.open:null,t.selected):i.is(_)&&(t=new m(t.diagnostics,t.panel,i.value));return t},provide:t=>[J.from(t,e=>e.panel),v.decorations.from(t,e=>e.diagnostics)]});function re(t){let e=t.field(f,!1);return e?e.diagnostics.size:0}const le=g.mark({class:"cm-lintRange cm-lintRange-active"});function ae(t,e,i){let{diagnostics:n}=t.state.field(f),s=[],o=2e8,l=0;n.between(e-(i<0?1:0),e+(i>0?1:0),(a,c,{spec:d})=>{e>=a&&e<=c&&(a==c||(e>a||i>0)&&(e<c||i<0))&&(s.push(d.diagnostic),o=Math.min(a,o),l=Math.max(c,l))});let r=t.state.facet(h).tooltipFilter;return r&&(s=r(s)),s.length?{pos:o,end:l,above:t.state.doc.lineAt(o).to<l,create(){return{dom:H(t,s)}}}:null}function H(t,e){return u("ul",{class:"cm-tooltip-lint"},e.map(i=>q(t,i,!1)))}const V=t=>{let e=t.state.field(f,!1);(!e||!e.panel)&&t.dispatch({effects:B(t.state,[L.of(!0)])});let i=Z(t,C.open);return i&&i.dom.querySelector(".cm-panel-lint ul").focus(),!0},P=t=>{let e=t.state.field(f,!1);return!e||!e.panel?!1:(t.dispatch({effects:L.of(!1)}),!0)},$=t=>{let e=t.state.field(f,!1);if(!e)return!1;let i=t.state.selection.main,n=e.diagnostics.iter(i.to+1);return!n.value&&(n=e.diagnostics.iter(0),!n.value||n.from==i.from&&n.to==i.to)?!1:(t.dispatch({selection:{anchor:n.from,head:n.to},scrollIntoView:!0}),!0)},ce=t=>{let{state:e}=t,i=e.field(f,!1);if(!i)return!1;let n=e.selection.main,s,o,l,r;return i.diagnostics.between(0,e.doc.length,(a,c)=>{c<n.to&&(s==null||s<a)&&(s=a,o=c),(l==null||a>l)&&(l=a,r=c)}),l==null||s==null&&l==n.from?!1:(t.dispatch({selection:{anchor:s??l,head:o??r},scrollIntoView:!0}),!0)},de=[{key:"Mod-Shift-m",run:V,preventDefault:!0},{key:"F8",run:$}],z=Q.fromClass(class{constructor(t){this.view=t,this.timeout=-1,this.set=!0;let{delay:e}=t.state.facet(h);this.lintTime=Date.now()+e,this.run=this.run.bind(this),this.timeout=setTimeout(this.run,e)}run(){let t=Date.now();if(t<this.lintTime-10)this.timeout=setTimeout(this.run,this.lintTime-t);else{this.set=!1;let{state:e}=this.view,{sources:i}=e.facet(h);Promise.all(i.map(n=>Promise.resolve(n(this.view)))).then(n=>{let s=n.reduce((o,l)=>o.concat(l));this.view.state.doc==e.doc&&this.view.dispatch(G(this.view.state,s))},n=>{ee(this.view.state,n)})}}update(t){let e=t.state.facet(h);(t.docChanged||e!=t.startState.facet(h)||e.needsRefresh&&e.needsRefresh(t))&&(this.lintTime=Date.now()+e.delay,this.set||(this.set=!0,this.timeout=setTimeout(this.run,e.delay)))}force(){this.set&&(this.lintTime=Date.now(),this.run())}destroy(){clearTimeout(this.timeout)}}),h=I.define({combine(t){return Object.assign({sources:t.map(e=>e.source)},E(t.map(e=>e.config),{delay:750,markerFilter:null,tooltipFilter:null,needsRefresh:null},{needsRefresh:(e,i)=>e?i?n=>e(n)||i(n):e:i}))}});function fe(t,e={}){return[h.of({source:t,config:e}),z,K]}function ue(t){let e=t.plugin(z);e&&e.force()}function N(t){let e=[];if(t)e:for(let{name:i}of t){for(let n=0;n<i.length;n++){let s=i[n];if(/[a-zA-Z]/.test(s)&&!e.some(o=>o.toLowerCase()==s.toLowerCase())){e.push(s);continue e}}e.push("")}return e}function q(t,e,i){var n;let s=i?N(e.actions):[];return u("li",{class:"cm-diagnostic cm-diagnostic-"+e.severity},u("span",{class:"cm-diagnosticText"},e.renderMessage?e.renderMessage():e.message),(n=e.actions)===null||n===void 0?void 0:n.map((o,l)=>{let r=!1,a=W=>{if(W.preventDefault(),r)return;r=!0;let S=b(t.state.field(f).diagnostics,e);S&&o.apply(t,S.from,S.to)},{name:c}=o,d=s[l]?c.indexOf(s[l]):-1,p=d<0?c:[c.slice(0,d),u("u",c.slice(d,d+1)),c.slice(d+1)];return u("button",{type:"button",class:"cm-diagnosticAction",onclick:a,onmousedown:a,"aria-label":` Action: ${c}${d<0?"":` (access key "${s[l]})"`}.`},p)}),e.source&&u("div",{class:"cm-diagnosticSource"},e.source))}class me extends ne{constructor(e){super(),this.diagnostic=e}eq(e){return e.diagnostic==this.diagnostic}toDOM(){return u("span",{class:"cm-lintPoint cm-lintPoint-"+this.diagnostic.severity})}}class M{constructor(e,i){this.diagnostic=i,this.id="item_"+Math.floor(Math.random()*4294967295).toString(16),this.dom=q(e,i,!0),this.dom.id=this.id,this.dom.setAttribute("role","option")}}class C{constructor(e){this.view=e,this.items=[];let i=s=>{if(s.keyCode==27)P(this.view),this.view.focus();else if(s.keyCode==38||s.keyCode==33)this.moveSelection((this.selectedIndex-1+this.items.length)%this.items.length);else if(s.keyCode==40||s.keyCode==34)this.moveSelection((this.selectedIndex+1)%this.items.length);else if(s.keyCode==36)this.moveSelection(0);else if(s.keyCode==35)this.moveSelection(this.items.length-1);else if(s.keyCode==13)this.view.focus();else if(s.keyCode>=65&&s.keyCode<=90&&this.selectedIndex>=0){let{diagnostic:o}=this.items[this.selectedIndex],l=N(o.actions);for(let r=0;r<l.length;r++)if(l[r].toUpperCase().charCodeAt(0)==s.keyCode){let a=b(this.view.state.field(f).diagnostics,o);a&&o.actions[r].apply(e,a.from,a.to)}}else return;s.preventDefault()},n=s=>{for(let o=0;o<this.items.length;o++)this.items[o].dom.contains(s.target)&&this.moveSelection(o)};this.list=u("ul",{tabIndex:0,role:"listbox","aria-label":this.view.state.phrase("Diagnostics"),onkeydown:i,onclick:n}),this.dom=u("div",{class:"cm-panel-lint"},this.list,u("button",{type:"button",name:"close","aria-label":this.view.state.phrase("close"),onclick:()=>P(this.view)},"×")),this.update()}get selectedIndex(){let e=this.view.state.field(f).selected;if(!e)return-1;for(let i=0;i<this.items.length;i++)if(this.items[i].diagnostic==e.diagnostic)return i;return-1}update(){let{diagnostics:e,selected:i}=this.view.state.field(f),n=0,s=!1,o=null;for(e.between(0,this.view.state.doc.length,(l,r,{spec:a})=>{let c=-1,d;for(let p=n;p<this.items.length;p++)if(this.items[p].diagnostic==a.diagnostic){c=p;break}c<0?(d=new M(this.view,a.diagnostic),this.items.splice(n,0,d),s=!0):(d=this.items[c],c>n&&(this.items.splice(n,c-n),s=!0)),i&&d.diagnostic==i.diagnostic?d.dom.hasAttribute("aria-selected")||(d.dom.setAttribute("aria-selected","true"),o=d):d.dom.hasAttribute("aria-selected")&&d.dom.removeAttribute("aria-selected"),n++});n<this.items.length&&!(this.items.length==1&&this.items[0].diagnostic.from<0);)s=!0,this.items.pop();this.items.length==0&&(this.items.push(new M(this.view,{from:-1,to:-1,severity:"info",message:this.view.state.phrase("No diagnostics")})),s=!0),o?(this.list.setAttribute("aria-activedescendant",o.id),this.view.requestMeasure({key:this,read:()=>({sel:o.dom.getBoundingClientRect(),panel:this.list.getBoundingClientRect()}),write:({sel:l,panel:r})=>{let a=r.height/this.list.offsetHeight;l.top<r.top?this.list.scrollTop-=(r.top-l.top)/a:l.bottom>r.bottom&&(this.list.scrollTop+=(l.bottom-r.bottom)/a)}})):this.selectedIndex<0&&this.list.removeAttribute("aria-activedescendant"),s&&this.sync()}sync(){let e=this.list.firstChild;function i(){let n=e;e=n.nextSibling,n.remove()}for(let n of this.items)if(n.dom.parentNode==this.list){for(;e!=n.dom;)i();e=n.dom.nextSibling}else this.list.insertBefore(n.dom,e);for(;e;)i()}moveSelection(e){if(this.selectedIndex<0)return;let i=this.view.state.field(f),n=b(i.diagnostics,this.items[e].diagnostic);n&&this.view.dispatch({selection:{anchor:n.from,head:n.to},scrollIntoView:!0,effects:_.of(n)})}static open(e){return new C(e)}}function x(t,e='viewBox="0 0 40 40"'){return`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(t)}</svg>')`}function y(t){return x(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${t}" fill="none" stroke-width=".7"/>`,'width="6" height="3"')}const he=v.baseTheme({".cm-diagnostic":{padding:"3px 6px 3px 8px",marginLeft:"-1px",display:"block",whiteSpace:"pre-wrap"},".cm-diagnostic-error":{borderLeft:"5px solid #d11"},".cm-diagnostic-warning":{borderLeft:"5px solid orange"},".cm-diagnostic-info":{borderLeft:"5px solid #999"},".cm-diagnostic-hint":{borderLeft:"5px solid #66d"},".cm-diagnosticAction":{font:"inherit",border:"none",padding:"2px 4px",backgroundColor:"#444",color:"white",borderRadius:"3px",marginLeft:"8px",cursor:"pointer"},".cm-diagnosticSource":{fontSize:"70%",opacity:.7},".cm-lintRange":{backgroundPosition:"left bottom",backgroundRepeat:"repeat-x",paddingBottom:"0.7px"},".cm-lintRange-error":{backgroundImage:y("#d11")},".cm-lintRange-warning":{backgroundImage:y("orange")},".cm-lintRange-info":{backgroundImage:y("#999")},".cm-lintRange-hint":{backgroundImage:y("#66d")},".cm-lintRange-active":{backgroundColor:"#ffdd9980"},".cm-tooltip-lint":{padding:0,margin:0},".cm-lintPoint":{position:"relative","&:after":{content:'""',position:"absolute",bottom:0,left:"-2px",borderLeft:"3px solid transparent",borderRight:"3px solid transparent",borderBottom:"4px solid #d11"}},".cm-lintPoint-warning":{"&:after":{borderBottomColor:"orange"}},".cm-lintPoint-info":{"&:after":{borderBottomColor:"#999"}},".cm-lintPoint-hint":{"&:after":{borderBottomColor:"#66d"}},".cm-panel.cm-panel-lint":{position:"relative","& ul":{maxHeight:"100px",overflowY:"auto","& [aria-selected]":{backgroundColor:"#ddd","& u":{textDecoration:"underline"}},"&:focus [aria-selected]":{background_fallback:"#bdf",backgroundColor:"Highlight",color_fallback:"white",color:"HighlightText"},"& u":{textDecoration:"none"},padding:0,margin:0},"& [name=close]":{position:"absolute",top:"0",right:"2px",background:"inherit",border:"none",font:"inherit",padding:0,margin:0}}});function F(t){return t=="error"?4:t=="warning"?3:t=="info"?2:1}class ge extends se{constructor(e){super(),this.diagnostics=e,this.severity=e.reduce((i,n)=>F(i)<F(n.severity)?n.severity:i,"hint")}toDOM(e){let i=document.createElement("div");i.className="cm-lint-marker cm-lint-marker-"+this.severity;let n=this.diagnostics,s=e.state.facet(T).tooltipFilter;return s&&(n=s(n)),n.length&&(i.onmouseover=()=>be(e,i,n)),i}}function pe(t,e){let i=n=>{let s=e.getBoundingClientRect();if(!(n.clientX>s.left-10&&n.clientX<s.right+10&&n.clientY>s.top-10&&n.clientY<s.bottom+10)){for(let o=n.target;o;o=o.parentNode)if(o.nodeType==1&&o.classList.contains("cm-tooltip-lint"))return;window.removeEventListener("mousemove",i),t.state.field(Y)&&t.dispatch({effects:A.of(null)})}};window.addEventListener("mousemove",i)}function be(t,e,i){function n(){let l=t.elementAtHeight(e.getBoundingClientRect().top+5-t.documentTop);t.coordsAtPos(l.from)&&t.dispatch({effects:A.of({pos:l.from,above:!1,create(){return{dom:H(t,i),getCoords:()=>e.getBoundingClientRect()}}})}),e.onmouseout=e.onmousemove=null,pe(t,e)}let{hoverTime:s}=t.state.facet(T),o=setTimeout(n,s);e.onmouseout=()=>{clearTimeout(o),e.onmouseout=e.onmousemove=null},e.onmousemove=()=>{clearTimeout(o),o=setTimeout(n,s)}}function we(t,e){let i=Object.create(null);for(let s of e){let o=t.lineAt(s.from);(i[o.from]||(i[o.from]=[])).push(s)}let n=[];for(let s in i)n.push(new ge(i[s]).range(+s));return R.of(n,!0)}const ke=te({class:"cm-gutter-lint",markers:t=>t.state.field(U)}),U=D.define({create(){return R.empty},update(t,e){t=t.map(e.changes);let i=e.state.facet(T).markerFilter;for(let n of e.effects)if(n.is(k)){let s=n.value;i&&(s=i(s||[])),t=we(e.state.doc,s.slice(0))}return t}}),A=w.define(),Y=D.define({create(){return null},update(t,e){return t&&e.docChanged&&(t=j(e,t)?null:Object.assign(Object.assign({},t),{pos:e.changes.mapPos(t.pos)})),e.effects.reduce((i,n)=>n.is(A)?n.value:i,t)},provide:t=>ie.from(t)}),ye=v.baseTheme({".cm-gutter-lint":{width:"1.4em","& .cm-gutterElement":{padding:".2em"}},".cm-lint-marker":{width:"1em",height:"1em"},".cm-lint-marker-info":{content:x('<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>')},".cm-lint-marker-warning":{content:x('<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>')},".cm-lint-marker-error":{content:x('<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>')}}),K=[f,v.decorations.compute([f],t=>{let{selected:e,panel:i}=t.field(f);return!e||!i||e.from==e.to?g.none:g.set([le.range(e.from,e.to)])}),X(ae,{hideOn:j}),he],T=I.define({combine(t){return E(t,{hoverTime:300,markerFilter:null,tooltipFilter:null})}});function xe(t={}){return[T.of(t),U,ke,ye,Y]}function ve(t,e){let i=t.field(f,!1);if(i&&i.diagnostics.size)for(let n=R.iter([i.diagnostics]);n.value;n.next())e(n.value.spec.diagnostic,n.from,n.to)}const Te=Object.freeze(Object.defineProperty({__proto__:null,closeLintPanel:P,diagnosticCount:re,forEachDiagnostic:ve,forceLinting:ue,lintGutter:xe,lintKeymap:de,linter:fe,nextDiagnostic:$,openLintPanel:V,previousDiagnostic:ce,setDiagnostics:G,setDiagnosticsEffect:k},Symbol.toStringTag,{value:"Module"}));export{u as c,Te as i,de as l};
