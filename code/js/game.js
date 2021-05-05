import upgradesJson from './../content/upgrades.js';

export default class Game {
    // Some important values
    mone = 0;
    monePerS = 0;
    monePerClick = 1000;
    // Maybe will be needed
    recalculateUpgrades = false;
    // Upgrades import
    upgrades = upgradesJson;
    // Main Timer
    ticker;
    // HTML Elements
    mainClicker;
    moneDisplay;
    shopButtonDisplay;
    researchButtonDisplay;
    loadingScreen;

    
    constructor (mainClicker, moneDisplay, mpSDisplay, shopButtonDisplay, researchButtonDisplay) {
        // Constructor doing constructor things
        this.moneDisplay = moneDisplay;
        this.shopButtonDisplay = shopButtonDisplay;
        this.mainClicker = mainClicker;
        this.mpSDisplay = mpSDisplay;
        this.researchButtonDisplay = researchButtonDisplay;
        
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

        //Start of timer
        this.ticker = setInterval(function() { this.doTick() }.bind(this), 1000);

        //Doing some final things
        this.updateDisplay();
        //this.loadingScreen.classList.add('hidden');
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
                <div class="value">${Math.ceil(this.formatNumber(args.u.cost))} mone</div>
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
                <div class="value">x1</div>
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
                <div class="value">${args.u.unlockCost} mone</div>    
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
                this.researchButtonDisplay.parentElement.remove();
            }
        } else {
            this.buttonStatusDisplay(args.thrower, 'error')
        }
    }


    // Not yet implemented
    async loadSave(save) {
        if (typeof save == 'string') {
            return true;
        } else {
            return false;
        }
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

    // Updates HTML elements, 
    updateDisplay(){
        this.mpSDisplay.innerText = this.formatNumber(this.monePerS.toFixed(1));
        this.moneDisplay.innerText = this.formatNumber(this.mone.toFixed(1));
    }

    // Funtion for big button in the middle of the screen
    clickedClicker() {
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