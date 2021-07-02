chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
   if(cmd == 'START_TIMERS') {
       console.log('🕐 Таймер запущен');
   }
})