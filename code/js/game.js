import upgradesImport from './../content/upgrades.js';
import achivementsImport from './../content/achivements.js';
export default class Game {
    currentVersion = "1.02"
    // Some important values
    mone = 0;
    monePerS = 0;
    monePerClick = 1;
    sessionClicks = 0;
    // Maybe will be needed
    recalculateUpgrades = false;
    // Content import
    upgrades = upgradesImport;
    achivements = achivementsImport;
    // Main Timer
    autoLoad = false;
    ticker;
    // HTML Elements
    mainClicker;
    moneDisplay;
    shopButtonDisplay;
    researchButtonDisplay;
    achivementsDisplay;
    msgDisplay;
    autoloadDisplay;

    
    constructor (mainClicker, moneDisplay, mpSDisplay, shopButtonDisplay, researchButtonDisplay, achivementsDisplay, msgDisplay, autoloadDisplay) {
        // Constructor doing constructor things
        this.moneDisplay = moneDisplay;
        this.shopButtonDisplay = shopButtonDisplay;
        this.mainClicker = mainClicker;
        this.mpSDisplay = mpSDisplay;
        this.researchButtonDisplay = researchButtonDisplay;
        this.achivementsDisplay = achivementsDisplay;
        this.msgDisplay = msgDisplay;
        this.autoloadDisplay = autoloadDisplay;
        
        // Adds upgrade buttons
        var i = 0;
        for(var u of this.upgrades) {
            if (u.unlocked) {
                eval('this.' + u.upgradeFunc + `({create: true, id: ${i}, u: ${JSON.stringify(u)}})`);
            } else {
                this.unlockUpgrade({create: true, id: i, u: u});
            }
            i++;
        }
        
        i = 0;

        for(var a of this.achivements) {
            a.isUnlocked = false;
            this.achivementsDisplay.insertAdjacentHTML('beforeEnd', `
            <div id="achivement${i}" class="${a.secret? "hidden" : ""} achivement locked">
                <div class="name">${a.name}</div>
                <div class="desc">${a.desc}</div>
                <div class="isLocked">Locked</div>
            </div>
            `)
            a.element = document.getElementById("achivement" + i)
            i++;
        }

        //Start of timer
        this.ticker = setInterval(function() { this.doTick() }.bind(this), 1000);

        //Doing some final things
        this.updateDisplay();
        //this.loadingScreen.classList.add('hidden');
        if (JSON.parse(localStorage.getItem('savedGame')).autoLoad) {
            this.loadGame()
        }
    }

    // Function returns formatet number
    formatNumber(number){     
        number = parseFloat(number);
        if (number > 1e5) {
            return number.toExponential(1).replace("+","");
        } else {
           return number;
        }
    }

    //Weird function i implemented
    argumentsAsString(args, i){
        var returnArgs = '{';
        for (var a in args) {
            if (a == 'id') {
                returnArgs += `'${a}': ${i}`;
            } else {
                returnArgs += `'${a}': ${args[a]}`;
            }
            returnArgs += ',';
        }
        return returnArgs += '}';
    }
    
    // Upgrade function for most upgrades
    defaultUpgrade(args) {
        // Creates Button
        if (args.create) {
            this.shopButtonDisplay.insertAdjacentHTML('beforeEnd', `
            <div id="buyButton${args.id}" class="button" onclick="game.${args.u.upgradeFunc + '(' + this.argumentsAsString(args.u.upgradeFuncArgs, args.id) + ')'}">
                <div class="name">${args.u.name}</div>
                <div class="value">Owned: ${args.u.amount}</div>
                <div class="value">+${this.formatNumber(args.u.monePerS)}/s</div>
                <div class="value">${this.formatNumber(args.u.cost.toFixed(1))} mone</div>
            </div>`);
            this.upgrades[args.id].htmlElement = document.getElementById(`buyButton${args.id}`);
            return;
        }

        // Upgrades
        var up = this.upgrades[args.id];
        if (up.unlocked) {
            if (this.mone >= up.cost) {
                this.mone -= up.cost;
                up.amount++;
                up.cost = up.cost * up.costIncrease;
                up.htmlElement.getElementsByClassName('value')[2].innerText = this.formatNumber(up.cost.toFixed(1)) + ' mone';
                up.htmlElement.getElementsByClassName('value')[0].innerText = 'Owned: ' + this.formatNumber(up.amount);
                this.calcUpgradeMonePerS();
                this.updateDisplay();
                this.buttonStatusDisplay(up.htmlElement, 'success') 
            }
            else {
                this.buttonStatusDisplay(up.htmlElement, 'error')          
            }
        } else {
            console.log(`Upgrade with id ${args.id} not unlocked`)
        }
    }

    mainClickerUpgrade(args){
        if (args.create) {
            this.shopButtonDisplay.insertAdjacentHTML('beforeEnd', `
            <div id="buyButton${args.id}" class="button" onclick="game.${args.u.upgradeFunc + '(' + this.argumentsAsString(args.u.upgradeFuncArgs, args.id) + ')'}">
                <div class="name">${args.u.name}</div>
                <div class="value">${args.u.amount == 0? 1 : Math.pow(2, args.u.amount)}x</div>
                <div class="value">Click x${this.formatNumber(args.u.mulpli)}</div>
                <div class="value">${Math.ceil(this.formatNumber(args.u.cost))} mone</div>
            </div>`);
            this.upgrades[args.id].htmlElement = document.getElementById(`buyButton${args.id}`);
            return;         
        }

        var up = this.upgrades[args.id];
        if (up.unlocked) {
            if (this.mone >= up.cost) {
                this.mone -= up.cost;
                up.amount++;
                up.cost = up.cost * up.costIncrease;
                up.htmlElement.getElementsByClassName('value')[2].innerText = this.formatNumber(up.cost.toFixed(1)) + ' mone';
                up.htmlElement.getElementsByClassName('value')[0].innerText = `${Math.pow(2, up.amount)}x`;
                this.monePerClick = this.monePerClick * up.mulpli;
                this.updateDisplay();
                this.buttonStatusDisplay(up.htmlElement, 'success') 
            }
            else {
                this.buttonStatusDisplay(up.htmlElement, 'error')           
            }
        } else {
            console.log(`Upgrade with id ${args.id} not unlocked`)
        }
    }

    unlockUpgrade(args){
        if (args.create) {
            this.researchButtonDisplay.insertAdjacentHTML('beforeEnd', `
            <div class="button" onclick="game.unlockUpgrade({id: ${args.id}, thrower: this})">
                <div class="value">UNLOCK</div>            
                <div class="name">${args.u.name}</div>
                <div class="value">${this.formatNumber(args.u.unlockCost)} mone</div>    
            </div>`);
            return;
        }

        var u = this.upgrades[args.id];
        if (this.mone >= u.unlockCost) {
            this.mone -= u.unlockCost
            u.unlocked = true;
            eval('this.' + u.upgradeFunc + `({create: true, id: ${args.id}, u: ${JSON.stringify(u)}})`);
            this.updateDisplay();
            args.thrower.remove();
            if (this.researchButtonDisplay.getElementsByClassName('button').length == 0) {
                this.researchButtonDisplay.parentElement.classList.add('hidden');
            }
        } else {
            this.buttonStatusDisplay(args.thrower, 'error')
        }
    }

    saveGame() {
        var sg = {version: this.currentVersion, autoLoad: this.autoLoad, mone: this.mone, monePerClick: this.monePerClick, upgrades: this.upgrades, achivements: this.achivements}
        localStorage.setItem('savedGame', JSON.stringify(sg))
        this.buttonStatusDisplay(document.getElementsByClassName("saveButton")[0], "success")
    }

    loadGame() {
        var sg = JSON.parse(localStorage.getItem('savedGame'))
        clearInterval(this.ticker)
        if (this.currentVersion != sg.version) {
            this.displayNotification("Old Version: trying...", 3000)
        }
        if (sg.version == this.currentVersion) {
            this.mone = sg.mone == null ? 0 : sg.mone
            this.monePerClick = sg.monePerClick
            this.upgrades = sg.upgrades
            this.achivements = sg.achivements
            this.autoLoad = sg.autoLoad
        } else {
            this.mone = sg.mone
            this.monePerClick = sg.monePerClick
            for (var up of this.upgrades){
                 for (var sUp of sg.upgrades){
                    if (up.name == sUp.name) {
                        up.amount = sUp.amount
                        var cost = up.cost;
                        for(var i = 0; i < up.amount; i++) {
                            cost *= up.costIncrease
                        }
                        up.cost = cost
                        up.unlocked = sUp.unlocked
                    }
                 }
            } 
            for (var ad of this.achivements){
                for(var sAd of sg.achivements) {
                    if (sAd.name == ad.name) {
                        ad.unlocked = sAd.unlocked
                    }
                }
            }
            this.autoLoad = false
        }

        this.calcUpgradeMonePerS()

        this.shopButtonDisplay.innerText = ''
        this.researchButtonDisplay.innerText = ''
        this.achivementsDisplay.innerText = ''

        var i = 0;
        for(var u of this.upgrades) {
            if (u.unlocked) {
                eval('this.' + u.upgradeFunc + `({create: true, id: ${i}, u: ${JSON.stringify(u)}})`);
            } else {
                this.unlockUpgrade({create: true, id: i, u: u});
            }
            i++;
        }

        if (!this.researchButtonDisplay.getElementsByClassName('button').length == 0) {
            this.researchButtonDisplay.parentElement.classList.remove('hidden');
        } else {
            if (!game.researchButtonDisplay.parentElement.classList.contains('hidden')) {
                this.researchButtonDisplay.parentElement.classList.add('hidden');                
            }
        }

        var i = 0;
        
        for(var a of this.achivements) {
            this.achivementsDisplay.insertAdjacentHTML('beforeEnd', `
            <div id="achivement${i}" class="achivement ${a.secret && !a.unlocked? "hidden" : ""} ${a.isUnlocked? 'unlocked':'locked'}">
                <div class="name">${a.name}</div>
                <div class="desc">${a.desc}</div>
                ${a.isUnlocked? '':'<div class="isLocked">Locked</div>'}                
            </div>
            `)
            a.element = document.getElementById("achivement" + i)
            i++;
        }

        if (this.mone == sg.mone && this.upgrades == sg.upgrades && this.monePerClick == sg.monePerClick) {
            this.buttonStatusDisplay(document.getElementsByClassName("loadButton")[0], "success")            
        } else {
            this.buttonStatusDisplay(document.getElementsByClassName("loadButton")[0], "error") 
        }

        this.ticker = setInterval(function() { this.doTick() }.bind(this), 1000);

        this.updateDisplay()
        this.autoloadDisplay.checked = this.autoLoad;
    }

    buttonStatusDisplay(button, status){
        if (status == 'success') {            
            button.classList.add('buttonSuccess')
            setTimeout(function(){
                button.classList.remove('buttonSuccess');
            }, 100);
        }
        else if (status == 'error') {            
            button.classList.add('buttonError')
            setTimeout(function(){
                button.classList.remove('buttonError');
            }, 100);
        }
    }

    displayNotification(msg, duration) {
        this.msgDisplay.innerText = msg;
        setTimeout(function () {
            this.msgDisplay.innerText = ""
        }.bind(this), duration)
    }

    // Updates HTML elements, 
    updateDisplay(){
        this.mpSDisplay.innerText = this.formatNumber(this.monePerS.toFixed(1));
        this.moneDisplay.innerText = this.formatNumber(this.mone.toFixed(1));
    }

    // Funtion for big button in the middle of the screen
    clickedClicker() {
        this.sessionClicks++;
        this.mone += this.monePerClick;
        this.updateDisplay();
        this.mainClicker.classList.add('shake');      
        
        setTimeout(function(){
            this.mainClicker.classList.remove('shake');
        }.bind(this) , 500);
    }

    // Gets called by timer every cycle
    doTick() {
        this.mone += this.monePerS;
        this.updateDisplay();
        this.checkAchivements();
    }

    toggleAutoLoad () {
        this.autoLoad = !this.autoLoad;
        var sg = JSON.parse(localStorage.getItem('savedGame'))
        sg.autoLoad = this.autoLoad
        localStorage.setItem('savedGame', JSON.stringify(sg))
    }

    checkAchivements() {
        for (var a of this.achivements) {
            if (!a.isUnlocked && eval(a.eval)) {
                a.isUnlocked = true
                if (a.secret? true : false) {
                    a.element.classList.remove('hidden')
                }
                a.element.classList.remove('locked')
                a.element.classList.add('unlocked')
                a.element.getElementsByClassName('isLocked')[0].remove()
                this.displayNotification(`unlocked achivement: \n ${a.name}`, 4000)
            }
        }
    }

    // Calcs total MpS, for performance reasons, don't think it's actually needed
    calcUpgradeMonePerS () {
        this.monePerS = 0;

        for (const u of this.upgrades) {
            if (u.hasOwnProperty('monePerS')) {
                this.monePerS += (u.monePerS * u.amount);                
            }
        }
    }
}