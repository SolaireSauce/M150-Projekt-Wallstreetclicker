export default class Game {
    mone = 0;
    monePerS = 0;
    monePerClick = 1;
    recalculateUpgrades = false;
    upgrades = [
        {
            name: "Autoclicker",
            unlocked: true,
            amount: 0,
            monnePerS: 0.1,
            cost: 1
        }
    ]
    ticker;    
    mainClicker;
    moneDisplay;
    shopDisplay;

    constructor (mainClicker, moneDisplay, shopDisplay) {
        this.moneDisplay = moneDisplay;
        this.moneDisplay.innerText = this.mone;
        this.shopDisplay = shopDisplay;
        this.mainClicker = mainClicker;

        var i = 0;
        for(var u of this.upgrades) {
            console.log(u)
            if (u.unlocked) {
                shopDisplay.insertAdjacentHTML('afterend', `
                <div class="button hidden" onclick="game.buyUpgrade(${i}, this)">
                    <div class="title">${u.name}</div>
                    <div class="value">${u.monnePerS}/s</div>
                    <div class="value">${u.cost} mone</div>
                </div>
            `)                
            }
            i++;
        }

        this.ticker = setInterval(function() { this.doTick() }.bind(this), 1000);
    }

    buyUpgrade(id, element) {
        var up = this.upgrades[id]
        if (up.unlocked) {
            if (this.mone - up.cost >= 0) {
                this.mone -= up.cost
                up.amount++;
                up.cost = up.cost * 1.2;
                element.getElementsByClassName('value')[1].innerText = Math.ceil(up.cost);
                this.calcUpgradeMonePerS();
                this.updateDisplay();
            }
            else {
                console.log(`To expensive`)
            }
        } else {
            console.log(`Upgrade with id ${id} not unlocked`)
        }
    }

    async loadSave(save) {
        if (typeof save == 'string') {
            return true;
        } else {
            return false;
        }
    }

    updateDisplay(){
        this.moneDisplay.innerText = Math.ceil(this.mone);
    }

    clickedClicker() {
        this.mone += this.monePerClick;
        this.updateDisplay();
        this.mainClicker.classList.add('shake');      
        
        setTimeout(function(){
            this.mainClicker.classList.remove('shake');
        }.bind(this) , 500);
    }

    doTick() {
        this.mone += this.monePerS;
        this.updateDisplay();
    }

    calcUpgradeMonePerS () {
        this.monePerS = 0;

        for (const u of this.upgrades) {
            this.monePerS += (u.monnePerS * u.amount);
        }
    }
}