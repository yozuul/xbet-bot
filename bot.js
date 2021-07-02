let loopCount = 0

class Bot {
    async watchTabs() {
        const pause = await this.storageGet('pause')
        // ОЖИДАНИЕ ЗАМОРОЗКИ 1
        let freeze1Count = 0
        const waitFreezeFirst = async (stoped) => {
            let firstFreeze = await this.storageGet('firstFreeze')

            stoped = await this.storageGet('botStoped')
            if (stoped) { this.botStop('waitFreezeFirst'); return }

            if (!firstFreeze) {
                console.log('Ожидаем загрузки страницы в 1 вкладке', freeze1Count);
                freeze1Count++
                setTimeout(waitFreezeFirst, 1000)
            }
        };
        // ОЖИДАНИЕ ЗАМОРОЗКИ 2
        let freeze2Count = 0
        const waitFreezeSecond = async (stoped) => {
            let secondFreeze = await this.storageGet('secondFreeze')

            stoped = await this.storageGet('botStoped')
            if (stoped) { this.botStop('waitFreezeSecond'); return }

            if (!secondFreeze) {
                console.log('Ожидаем загрузки страницы во 2 вкладке', freeze2Count);
                freeze2Count++
                setTimeout(waitFreezeSecond, 1000)
            } else {
                this.checkDelayTimer()
            }
        };


        let firstFreeze = await this.storageGet('firstFreeze')
        let secondFreeze = await this.storageGet('secondFreeze')
        // ОТКРЫТИЕ ВКЛАДКИ 1
        const openFirstTab = async (props, stoped) => {

            stoped = await this.storageGet('botStoped')
            if (stoped) {  this.botStop('openFirstTab'); return }

            if(props == 'begin') {
                this.sendMessage('OPEN_FIRST')
                waitFreezeFirst()
                setTimeout(openSecondTab, pause)
            }
            if(props == 'continue') {
                this.sendMessage('CLOSE_FIRST')
                this.sendMessage('SAVE_SECOND_AS_FIRST')
                setTimeout(openSecondTab, pause)
            }
        };
        // ОТКРЫТИЕ ВКЛАДКИ 2
        const openSecondTab = async (stoped) => {

            stoped = await this.storageGet('botStoped')
            if (stoped) { this.botStop('openSecondTab'); return }

            this.sendMessage('OPEN_SECOND')
            waitFreezeSecond()
        };

        if(!firstFreeze&&!secondFreeze) {
            openFirstTab('begin')
        } else {
            openFirstTab('continue')
        }
    }


    async checkDelayTimer() {
        let firstFreeze = await this.storageGet('firstFreeze')
        let secondFreeze = await this.storageGet('secondFreeze')

        if(firstFreeze&&secondFreeze) {
            console.log('--\n', '❄️ ОБЕ ВКЛАДКИ ЗАМОРОЖЕНЫ ❄️', '\n--')

            const delay = await this.storageGet('delay')
            const timer = await this.storageGet('timer')
            console.log('🕐 Проверка таймера задержки ');

            this.storageSet({ started: true })
            this.start()

        } else {
            console.log('🚫 Ошибка в таймерах проверки статуса вкладок');
        }
    }


    async start() {
        const looper = async (stoped) => {

            stoped = await this.storageGet('botStoped')
            if (stoped) { this.botStop('looper'); return }

            console.log('--\n', 'ВЫПОЛНЯЕМ ЦИКЛ:', loopCount, '\n--')
            loopCount++
            this.watchTabs()
        };

        looper()

        const started = await this.storageGet('started')
        if(!started) {
            this.sendMessage('OPEN_DISCARD')
        }
    }


    async botStop(timerName) {
        let waitBet = await this.storageGet('waitBet')

        const checkFirstLoad = async () => {
            let firstFreeze = await this.storageGet('firstFreeze')
            if(!firstFreeze) {
                console.log('Ожидаем дозагрузки 1 вкладки');
                setTimeout(checkFirstLoad, 500)
            } else {
                console.log('⛔️ Бот остановлен')
                console.log('🕐 Сработал таймер:', timerName);
                this.sendMessage('STOP_BOT')
            }
        }

        if(!waitBet) {
            this.storageSet({ waitBet: true })
            checkFirstLoad()
        } else return
    }


    storageGet(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (obj) => {
                if (chrome.runtime.lastError) {
                    reject(new Error(chrome.runtime.lastError));
                } else { resolve(obj[key]) }
            })
        })
    }
    storageSet(key) {
        chrome.storage.sync.set(key)
    }
    sendMessage(cmd) {
        chrome.runtime.sendMessage(cmd)
    }
}


chrome.runtime.onMessage.addListener((cmd, sender, sendResponse) => {
    if (cmd == 'START_BOT') {
        new Bot().start()
        console.log('🏁 Бот запущен');
    }
})