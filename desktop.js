import {WindowManager} from "/Window/windows.js";
import {createIcon} from "/Icon/icons.js";
import {detectEnvironment} from "/Browser/detection.js";
// Browser desktop shell; automatically initializes only for fine-pointer desktop layouts.
export function initializeDesktop({container=document.body,force=false}={}){
 const environment=detectEnvironment();
 if(!force&&environment.layout!=="desktop")return {enabled:false,environment};
 const root=document.createElement("div");
 root.id="suomisaundi-desktop";
 root.style.cssText="position:relative;min-height:70vh;border:1px solid #54756f;border-radius:14px;background:linear-gradient(145deg,#13282b,#25434a);padding:18px;overflow:hidden";
 const dock=document.createElement("div");dock.style.cssText="display:flex;gap:12px;flex-wrap:wrap;align-items:center";
 const wm=new WindowManager(root);
 const entries=[
  {title:"System Inventory",icon:"folder",url:"https://suomisaundi-system.github.io/#system-inventory"},
  {title:"Business",icon:"business",url:"https://github.com/Suomisaundi-System/Business"},
  {title:"Music",icon:"music",url:"https://github.com/Suomisaundi-System/Music"},
  {title:"Events",icon:"calendar",url:"https://github.com/Suomisaundi-System/Event"},
  {title:"Settings",icon:"settings",url:"https://github.com/Suomisaundi-System/Configuration"}
 ];
 for(const item of entries){
  const button=document.createElement("button");button.type="button";
  button.style.cssText="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:95px;max-width:130px;padding:10px;border:1px solid #4a6c66;background:#1e383c;color:white;border-radius:12px;cursor:pointer";
  button.append(createIcon(item.icon,{size:30}),document.createTextNode(item.title));
  button.addEventListener("click",()=>{
   const link=document.createElement("a");link.href=item.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent="Open "+item.title;
   wm.open({title:item.title,content:link,width:420,height:240});
  });
  dock.append(button);
 }
 const caption=document.createElement("p");caption.textContent="Desktop environment · integrated Window and Icon systems";caption.style.color="#b8d8d1";
 root.append(dock,caption);container.append(root);
 return {enabled:true,environment,element:root,windows:wm};
}
