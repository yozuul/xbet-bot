class DiscardManager {
    constructor(id) {
      this.id = id
    }
    attach() {

    }
  }

  class EventTab {
    constructor(url) {
      this.url = url
      this.tab1 = ''
      this.tab2 = ''
    }
    // async main() {
    //   const tab1 = await this.createTab({ url:  this.url })
    //   this.mainID = tab1.id
    //   // chrome.tabs.create({ url: action_url }, (newTab, activate, freeze, close) => {
    //   //   cb(newTab.id)
    //   // })
    // }
    newTab() {
      return new Promise((resolve, reject) => {
        chrome.tabs.create({url: this.url}, tab => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError));
          } else {
            resolve(tab)
          }
        })
      })
    }
  }


  class Bot {
    constructor(event, summ) {
      this.event = event
      this.summ = summ
    }
    // async tabManager(stop) {

      // const loopBot = ((stoped, stop) => {
      //   this.stoped = stoped
      //   console.log(stoped);
        // const stoped = this.stoped
        // console.log(stoped);
        // if(!stoped) {
        //   setTimeout(loopBot, 1000);
        // }
      // })()

      // loopBot(this.stoped, this.stop)
  //     const initTab1 = new EventTab(this.event)
  //     const initTab2 = new EventTab(this.event)
  //
  //     const tab1 = initTab1.newTab('tab1')

      // tab1
      // console.log(chrome.tabs.create({ url: action_url }));
      // return chrome.tabs.query({currentWindow: true})
      //   .then(async () => {
      //     return await chrome.tabs.create({ url: url })
      //   })
        // .then(() => {
          // watcher()
          // return chrome.tabs[0]
        // });
    // }

    start(data) {
      this.event = 'https://stackoverflow.com/questions/48894986'
      console.log(data);
      // this.event = data.url
      // this.summ = data.summ
      // this.tabManager(this.stop)
    }

    stop() {
      this.stoped = true
      console.log('STOP', this.stoped);
    }
  }

  // const BotRunner = new Bot()
  chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    sendResponse('ok')
    console.log(data);

    chrome.storage.sync.get('event', (items) => {
      // console.log(summ);
      console.log(items);
    })
    // data.cmd == 'start' ? BotRunner.start(data) : BotRunner.stop()
  })
  function botStart(startedTAB) {
    // chrome.storage.sync.get('summ', (items) => {
    //   chrome.runtime.sendMessage(items)
    // })
    // chrome.runtime.sendMessage({ openTAB:  'chrome://discards/' }, (tabID) => {
    //   chrome.storage.sync.set({ discardTAB: tabID }, () => {
    //     console.log('Discard TAB ID', tabID);
    //   })
    //   console.log('Discard TAB opened', tabID);
    // })
    // chrome.runtime.sendMessage({ closeTAB:  startedTAB }, (response) => {
    //   console.log('received user data', response);
    // })

    // chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    //   console.log(data);
    //   sendResponse('ok')
    // })

  }
  // function createTab(event, watcher) {
  //   return chrome.tabs.query({currentWindow: true})
  //     .then(async () => {
  //       return await chrome.tabs.create({ url: event })
  //     })
      // .then(() => {
        // watcher()
        // return chrome.tabs[0]
      // });
  // }

  //
  // const user = {
  //   username: 'demo-user'
  // };
  //
  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   // 2. A page requested user data, respond with a copy of `user`
  //   if (message === 'get-user-data') {
  //     sendResponse(user);
  //
  //     (async function tt() {
  //       const tab = await createTab('chrome://discards/')
  //       const tabID = tab.id
  //       console.log(tabID);
  //       chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //         if(changeInfo.status == 'complete') {
  //           chrome.scripting.executeScript({
  //             target: { tabId: tabID },
  //             function: test,
  //           })
  //         }
  //       })
  //     })()
  //   }
  // });

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   sendResponse(message)
  //   (async function tt() {
  //     const tab = await createTab('chrome://discards/')
  //     const tabID = tab.id
  //     console.log(tabID);
  //     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //       if(changeInfo.status == 'complete') {
  //         chrome.scripting.executeScript({
  //           target: { tabId: tabID },
  //           function: test,
  //         })
  //       }
  //     })
  //   })()
  // });
  // class Bot {
  //   async waitStart() {
  //     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //       sendResponse(message.id)
  //       this.loadSlots(message)
  //     });
  //   }
  //
  //   loadSlots(msg) {
  //     let slots = new Map();
  //     let stoped = false
  //
  //     const addTab = async function (watch) {
  //
  //       if(!slots.has('tab1')) {
  //         let tab1 = await createTab(msg.event)
  //         slots.set('tab1', tab1.id)
  //         watch()
  //       }
  //       if(!slots.has('tab2')) {
  //         let tab2 = await createTab(msg.event)
  //         slots.set('tab2', tab2.id)
  //         watch()
  //       }
  //
  //       if(slots.has('tab1')) {
  //         setTimeout(addTab, 1000);
  //
  //         chrome.tabs.get(slots.get('tab1'), async (tab) => {
  //           if(!tab) {
  //             let tab1 = await createTab(msg.event)
  //             slots.set('tab1', tab1.id)
  //           } else {
  //             console.log('tabExist', slots.get('tab1'));
  //           }
  //         });
  //         chrome.tabs.get(slots.get('tab2'), async (tab) => {
  //           if(!tab) {
  //             let tab2 = await createTab(msg.event)
  //             slots.set('tab2', tab2.id)
  //           } else {
  //             console.log('tabExist', slots.get('tab2'));
  //           }
  //         });
  //
  //       }
  //     }
  //
  //     addTab(this.watchLoad)
  //   }
  //
  //   checkTabExist(id) {
  //
  //   }
  //
  //   watchLoad() {
  //     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //       if(changeInfo.status == 'complete') {
  //         chrome.scripting.executeScript({
  //           target: { tabId: tabId },
  //           function: consolePush,
  //         })
  //       }
  //     })
  //   }
  //
  //   startCount() {
  //     function sayHi() {
  //       console.log('Привет');
  //     }
  //
  //     setTimeout(sayHi, 1000);
  //   }
  // }

  // new Bot().waitStart()

  // function test() {
  //   const discardRoot = document.querySelector('body discards-main').shadowRoot.querySelector('iron-pages').querySelector('discards-tab').shadowRoot
  //
  //   const aaa = Array.from(discardRoot.querySelectorAll('.actions-cell div'))
  //   // console.log(aaa);
  //
  //   for(let item of aaa) {
  //     if(item.innerText == '[Urgent Discard]') {
  //       item.click()
  //     }
  //   }

    // document.querySelector('body discards-main').setAttribute('id', 'mainTab')
    // document.querySelector('#mainTab').shadowRoot.querySelector('iron-pages').setAttribute('id', 'ironTab')
    // console.log(document.querySelector('#ironTab'))
    // const childNodes = Array.from(bbb.childNodes)
    // console.log(childNodes);
    // console.log(document.body.shadowRoot.querySelector('.actions-cell'));
  //   const consoleCode = '<div id="botConsole" style = "position: fixed; top: 0; bottom: 0; left: 0; width: 200px; z-index: 9999999; background-color: royalblue; color: white; text-align: center;">FREEZE</div>'
  //
  //   const bodyTag = document.body
  //   // document.addEventListener('DOMContentLoaded', (event) => {
  //   //   log.textContent = log.textContent + `DOMContentLoaded\n`;
  //   // })
  //   bodyTag.insertAdjacentHTML('beforebegin', consoleCode)
    // function sayHi() {
      // console.log(document.querySelector('body > discards-main'));
    // }
    // setTimeout(sayHi, 3000);
    // window.addEventListener('DOMContentLoaded', function(event) {
    //   const discard = document.querySelectorAll('.actions-cell')
    //   console.log(document);
    // });

    // const discard = document.querySelectorAll('.actions-cell')
    // console.log(document);

  // }


  // async function consolePush() {
  //   const consoleCode = '<div id="botConsole" style = "position: fixed; top: 0; bottom: 0; left: 0; width: 200px; z-index: 9999999; background-color: royalblue; color: white; text-align: center;">FREEZE</div>'
  //   // const bodyTag = document.querySelector('#mediaFree')
  //   const bodyTag = document.querySelector('.iron-selected')
  //   bodyTag.insertAdjacentHTML('beforebegin', consoleCode)
  // }

  // (async function getCurrentTab() {
  //   let queryOptions = { active: true, currentWindow: true };
  //   let [tab] = await chrome.tabs.query(queryOptions);
  //   console.log(tab.id);
  // })()


  // console.log(slots.get('tab1'));
  // console.log(createTab(msg.event));
  // chrome.runtime.sendMessage('check', (response) => {
  //   if(response) stoped = true
  // })