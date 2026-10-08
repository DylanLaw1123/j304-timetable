// 让通知在其他标签页、甚至最小化浏览器时也能弹出，点击通知会回到课表页
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const c of list){if("focus" in c)return c.focus();}
    return self.clients.openWindow("./");
  }));
});
