(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const X=(n,c,e,d)=>(n/=d/2,n<1?e/2*n*n+c:(n--,-e/2*(n*(n-2)-1)+c));async function z(n,c){if(!n)return()=>console.log("no element");let e,d,t=n.clientWidth,o=n.clientHeight,i=0,h=!1,L=0,f=0,E=0,s=0,M=0,I=0;const D=()=>{e=document.createElement("canvas"),e.id="slider-canvas",e.width=t,e.height=o,e.addEventListener("mousedown",N),e.addEventListener("mouseleave",w),e.addEventListener("mouseup",w),n==null||n.appendChild(e);const r=e.getContext("2d");if(!r)throw new Error("No context");d=r},O=async()=>(await Promise.allSettled(Array.from({length:v},(r,l)=>{const a=new Image;return new Promise((u,y)=>{a.src=P(l+1),a.onload=()=>u(a),a.onerror=()=>y(new Error("Image not loaded"))})}))).filter(({status:r})=>r==="fulfilled").map(r=>r.value),g=(r,l)=>{const a=p[r],u=Math.min(t/a.width,o/a.height),y=l+(t-a.width*u)/2,S=(o-a.height*u)/2;d.drawImage(a,0,0,a.width,a.height,y,S,a.width*u,a.height*u)},m=()=>{A(),i>0&&g(i-1,s-t),g(i,s),i<p.length-1&&g(i+1,s+t)},q=()=>{M=s,I=t*-1*f-s,L=Date.now(),requestAnimationFrame(b)},b=()=>{const l=Date.now()-L;s=X(l,M,I,300),m(),l<300?requestAnimationFrame(b):(i=(i+f+v)%v,s=0,m())},N=r=>{h||(h=!0,E=r.pageX,e.addEventListener("mousemove",x))},x=r=>{!h||(r.preventDefault(),s=r.pageX-E,f=s/Math.abs(s)*-1,(i===0&&f===-1||i===p.length-1&&f===1)&&(s=0),m())},w=()=>{if(!!h){if(h=!1,Math.abs(s)<10){s=0,m();return}q(),e.removeEventListener("mousemove",x)}},C=()=>{t=e.width=n.clientWidth,o=e.height=n.clientHeight,m()},A=()=>{d.clearRect(0,0,e.width,e.height)};function F(){e.removeEventListener("mousedown",N),e.removeEventListener("mouseleave",w),e.removeEventListener("mouseup",w),window.removeEventListener("resize",C)}const{imageNb:v,imageUrl:P}=c;D();const p=await O();return g(i,0),window.addEventListener("resize",C),F}z(document.querySelector("#app"),{imageNb:5,imageUrl:n=>{const c=1600+Math.round(Math.random()*500-250),e=1100+Math.round(Math.random()*500-250);return`https://picsum.photos/id/${n}/${c}/${e}`}});