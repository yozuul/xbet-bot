query('#botStart').addEventListener('click', async () => {
   const startedTAB = await getStartedTAB()

   const startedStorageData = {
     event: startedTAB.url,
     summ: query('#summ').value,
     delay: 7*1000,
     pause: 4*1000,
     started: false,
     firstTABid: false,
     firstFreeze: false,
     secondTABid: false,
     secondFreeze: false,
     discardTAB: false,
     botStoped: false,
     waitBet: false,
     timer: false,
   }

   chrome.storage.sync.set(startedStorageData, () => {
     console.log('Create started storage');
   })

   chrome.runtime.sendMessage('START_BOT')
   chrome.runtime.sendMessage('START_TIMERS')

 })

 query('#botStop').addEventListener('click', () => {
   chrome.storage.sync.set({ botStoped: true }, () => {
     console.log('Bot stoped');
   })
 })

 function getStartedTAB() {
   return new Promise((resolve, reject) => {
     chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
       if (chrome.runtime.lastError) {
         reject(new Error(chrome.runtime.lastError));
       } else {
         resolve(tab[0])
       }
     })
   })
 }

 function query(el) {
   return document.querySelector(el)
 }

 chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
   if(cmd == 'OPEN_FIRST') {
     chrome.runtime.sendMessage('OPEN_FIRST')
   }
   if(cmd == 'OPEN_SECOND') {
     chrome.runtime.sendMessage('OPEN_SECOND')
   }
   if(cmd == 'CLOSE_FIRST') {
     chrome.runtime.sendMessage('CLOSE_FIRST')
   }
   if(cmd == 'SAVE_SECOND_AS_FIRST') {
     chrome.runtime.sendMessage('SAVE_SECOND_AS_FIRST')
   }
   if(cmd == 'OPEN_DISCARD') {
     chrome.runtime.sendMessage('OPEN_DISCARD')
   }


   if(cmd == 'STOP_BOT') {
     chrome.runtime.sendMessage('STOP_BOT')
   }
 })