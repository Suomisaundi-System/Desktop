import {WindowManager} from "/Window/windows.js";
import {createIcon} from "/Icon/icons.js";
import {detectEnvironment} from "/Browser/detection.js";
// A browser-contained desktop, not a native OS desktop.
export function initializeDesktop({container=document.body,force=false}={}){
 const environment=detectEnvironment();
 const wide=matchMedia("(min-width: 900px)").matches;
 if(!force&&!wide)return {enabled:false,environment};
 const root=document.createElement("div");root.id="suomisaundi-desktop";
 root.style.cssText="position:relative;height:min(76vh,790px);min-height:520px;border:1px solid #4c7770;border-radius:14px;background:radial-gradient(circle at 60% 25%,#294f52,#11262b 70%);color:#eaf8f3;overflow:hidden;box-shadow:0 14px 45px #0005";
 const bar=document.createElement("div");bar.style.cssText="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;background:#14292eea;border-bottom:1px solid #52756d";
 const brand=document.createElement("strong");brand.textContent="Suomisaundi System";
 const clock=document.createElement("time");const tick=()=>clock.textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
 tick();const timer=setInterval(tick,60000);root.addEventListener("DOMNodeRemoved",()=>clearInterval(timer),{once:true});
 bar.append(brand,clock);
 const workspace=document.createElement("div");workspace.style.cssText="position:absolute;inset:42px 0 44px;overflow:hidden";
 const icons=document.createElement("div");icons.style.cssText="display:grid;grid-template-columns:repeat(2,96px);grid-auto-rows:100px;gap:10px;padding:20px;justify-content:start";
 const taskbar=document.createElement("div");taskbar.style.cssText="position:absolute;bottom:0;left:0;right:0;height:44px;display:flex;align-items:center;gap:8px;padding:4px 12px;background:#102327e8;border-top:1px solid #52756d";
 const wm=new WindowManager(workspace);
 const entries=[
  ["System Inventory","folder","https://suomisaundi-system.github.io/#system-inventory"],
  ["Business","business","https://github.com/Suomisaundi-System/Business"],
  ["Music","music","https://github.com/Suomisaundi-System/Music"],
  ["Events","calendar","https://github.com/Suomisaundi-System/Event"],
  ["Settings","settings","https://github.com/Suomisaundi-System/Configuration"],
  ["Files","folder","https://github.com/orgs/Suomisaundi-System/repositories"]
 ];
 const tasks=new Map();
 function openApp(title,url){
  const content=document.createElement("div");content.style.cssText="display:grid;gap:12px";
  const p=document.createElement("p");p.textContent=title+" is connected to the Suomisaundi System repository. More in-window functionality is under development.";
  const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Open "+title+" repository";a.style.color="#98f5d5";
  content.append(p,a);
  const id=wm.open({title,content,width:Math.min(500,workspace.clientWidth-30),height:270});
  const task=document.createElement("button");task.type="button";task.textContent=title;task.style.cssText="padding:5px 12px;border:1px solid #60857e;border-radius:7px;background:#244b4c;color:white;cursor:pointer";
  task.addEventListener("click",()=>{const state=wm.list().find(x=>x.id===id);if(!state){task.remove();tasks.delete(id);return;}if(state.minimized)wm.restore(id);else wm.focus(id);});
  taskbar.append(task);tasks.set(id,task);
 }
 for(const [title,icon,url] of entries){
  const button=document.createElement("button");button.type="button";
  button.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;background:transparent;border:1px solid transparent;border-radius:12px;color:inherit;cursor:pointer;font:13px system-ui";
  button.addEventListener("pointerenter",()=>button.style.background="#ffffff16");
  button.addEventListener("pointerleave",()=>button.style.background="transparent");
  button.append(createIcon(icon,{size:36}),document.createTextNode(title));
  button.addEventListener("click",()=>openApp(title,url));icons.append(button);
 }
 workspace.append(icons);root.append(bar,workspace,taskbar);container.append(root);
 return {enabled:true,environment,element:root,windows:wm,openApp};
}
