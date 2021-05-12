export default [
    {   
        name: "Manual Click",
        unlocked: true,
        amount: 0,
        cost: 10,
        costIncrease: 3,
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
        costIncrease: 1.2,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "BetterAutoclicker",
        unlocked: false,
        amount: 0,
        monePerS: 5,
        cost: 100,
        costIncrease: 1.2,
        unlockCost: 500,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "EvenBetterAutoclicker",
        unlocked: false,
        amount: 0,
        monePerS: 500,
        cost: 1000,
        costIncrease: 1.2,
        unlockCost: 5000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    }
]