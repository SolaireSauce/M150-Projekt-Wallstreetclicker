export default [
    {   
        name: "Manual Click",
        unlocked: true,
        amount: 0,
        cost: 10,
        costIncrease: 2.2,
        mulpli: 2,
        upgradeFunc: "mainClickerUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Arduino auto clicker",
        unlocked: true,
        amount: 0,
        monePerS: 0.1,
        cost: 1,
        costIncrease: 1.2,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Old PC miner",
        unlocked: false,
        amount: 0,
        monePerS: 2,
        cost: 25,
        costIncrease: 1.2,
        unlockCost: 500,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Lemon Stand",
        unlocked: false,
        amount: 0,
        monePerS: 500,
        cost: 1000,
        costIncrease: 1.2,
        unlockCost: 5000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "GPU mining farm",
        unlocked: false,
        amount: 0,
        monePerS: 2000,
        cost: 10000,
        costIncrease: 1.1,
        unlockCost: 20000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Investment AI",
        unlocked: false,
        amount: 0,
        monePerS: 50000,
        cost: 50000,
        costIncrease: 1.5,
        unlockCost: 100000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Bank",
        unlocked: false,
        amount: 0,
        monePerS: 100000,
        cost: 750000,
        costIncrease: 1.1,
        unlockCost: 1000000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Shopping mall",
        unlocked: false,
        amount: 0,
        monePerS: 7.5e5,
        cost: 2500000,
        costIncrease: 1.2,
        unlockCost: 5000000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Space agency",
        unlocked: false,
        amount: 0,
        monePerS: 5e6,
        cost: 1000,
        costIncrease: 1.2,
        unlockCost: 25000000,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Lunar mining",
        unlocked: false,
        amount: 0,
        monePerS: 2e7,
        cost: 2e8,
        costIncrease: 1.1,
        unlockCost: 5e8,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    },
    {
        name: "Dyson sphere",
        unlocked: false,
        amount: 0,
        monePerS: 1e10,
        cost: 2e10,
        costIncrease: 1.002,
        unlockCost: 5e10,
        upgradeFunc: "defaultUpgrade",
        upgradeFuncArgs: {id: "id"}
    }
]