class TabManager {

  async createFirst() {
    console.log('✔️ ОТКРЫВАЕМ ПЕРВУЮ ВКЛАДКУ');
    const freeze = () => this.freeze('firstFreeze')
    setTimeout(freeze, 4500)
  }

  createSecond() {
    console.log('✔️ ОТКРЫВАЕМ ВТОРУЮ ВКЛАДКУ');
    const freeze = () => this.freeze('secondFreeze')
    setTimeout(freeze, 4500)
  }

  async closeFirst() {
    console.log('❌ ЗАКРЫВАЕМ ПЕРВУЮ ВКЛАДКУ');

    chrome.storage.sync.set({ secondFreeze: false })

  }

  switchFirstSecond() {
    console.log('🌀 ПЕРЕСОХРАНЯЕМ ВТОРУЮ ВКЛАДКУ В ПЕРВЫЙ СЛОТ');
  }

  createDiscard() {
    console.log('Открываем вкладку Discards');
  }

  freeze(tab) {
    let tabName = 'ПЕРВАЯ ВКЛАДКА'
    tab == 'secondFreeze' ? tabName = 'ВТОРАЯ ВКЛАДКА' : ''
    chrome.storage.sync.set({ [tab]: true }, () => {
      console.log('--\n', `❄️ ${tabName} ЗАМОРОЖЕНА`, '\n--');
    })
  }

  unfreezeFirst() {
    console.log('💰 Размораживаем первую вкладку и делаем ставку');
  }


  storage(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (obj) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError));
        } else {
          resolve(obj[key])
        }
      })
    })
  }
  storageSet(key) {
      chrome.storage.sync.set(key)
  }
}

chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
  sendResponse('ok')
  const tab = new TabManager()

  if(cmd == 'OPEN_FIRST') {
    tab.createFirst()
  }
  if(cmd == 'OPEN_SECOND') {
    tab.createSecond()
  }
  if(cmd == 'CLOSE_FIRST') {
    tab.closeFirst()
  }
  if(cmd == 'SAVE_SECOND_AS_FIRST') {
    tab.switchFirstSecond()
  }
  if(cmd == 'OPEN_DISCARD') {
    tab.createDiscard()
  }

  if(cmd == 'STOP_BOT') {
    tab.unfreezeFirst()
  }
})