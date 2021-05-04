export default [
    {   
        name: "Manual Click",
        unlocked: true,
        amount: 0,
        cost: 10,
        mulpli: 2,
        upgradeFunc: "mainClickerUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Autoclicker",
        unlocked: true,
        amount: 0,
        monePerS: 0.2,
        cost: 1,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "BetterAutoclicker",
        unlocked: true,
        amount: 0,
        monePerS: 5,
        cost: 10,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "69"}
    },
    {
        name: "EvenBetterAutoclicker",
        unlocked: false,
        amount: 0,
        monePerS: 500,
        cost: 1000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    }    
]