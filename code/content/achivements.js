export default [
    {   
        name: "The Beginning",
        desc: "Claim 1 mone",
        eval: "this.mone >= 1",
    },
    {   
        name: "AUTOMATION",
        desc: "Claim 0.2 Mone per Second (MpS)",
        eval: "this.monePerS >= 0.2",
    },    
    {   
        name: "No Autoclicker needed",
        desc: "Upgrade your clicker",
        eval: "this.upgrades[0].amount >= 1",
    },
    {   
        name: "Time to mine",
        desc: "Research old PC miner",
        eval: "this.upgrades[2].unlocked",
    },
    {   
        name: "More",
        desc: "Get 10 mone per Second",
        eval: "this.monePerS >= 10",
    },
    {   
        name: "Only 5 times more",
        desc: "Claim 1000 mone",
        eval: "this.mone >= 1000",
    },
    {   
        name: "This is the Way",
        desc: "Upgrade your clicker 10 times",
        eval: "this.upgrades[0].amount >= 10",
    },
    {   
        name: "There are Secret achivements?!",
        desc: "Upgrade arduino auto clicker 100 times",
        eval: "this.upgrades[1].amount >= 100",
        secret: true
    },
    {   
        name: "Better mining",
        desc: "Research the GPU mining Farm",
        eval: "this.upgrades[3].unlocked",
    },
    {   
        name: "Even MORE",
        desc: "Claim 2000 mone per Second",
        eval: "this.monePerS >= 2000",
    },
    {   
        name: "This is just the start",
        desc: "Get 50000 mone per Second",
        eval: "this.monePerS >= 50000",
    },    
    {   
        name: "MORE MONE",
        desc: "Get 1e6 mone",
        eval: "this.mone >= 1e6",
    },
    {   
        name: "It's enough already",
        desc: "Get 1e6 mone per Second",
        eval: "this.monePerS >= 1e6",
    },
    {   
        name: "The future awaits",
        desc: "Research Space agency",
        eval: "this.upgrades[9].unlocked",
    },
    {   
        name: "Master researcher",
        desc: "Research every upgrade",
        eval: `
        function tempF (g) {
            var failed = false;
            for (var u of g.upgrades) {
                if (!u.unlocked) {
                    failed = true;
                    break;
                }
            }
            if (failed) 
                return false;
            return true;            
        }
        tempF(this)
        `,
        secret: true
    },
    {   
        name: "Owner of the world",
        desc: "Claim the solar system",
        eval: "this.upgrades[10].amount > 0",
    },
    {   
        name: "A bit beyond",
        desc: "spooky",
        eval: "this.upgrades[10].amount >= 10",
    },
    {   
        name: "Cheater",
        desc: "",
        eval: "this.mone == Infinity",
        secret: true
    },{   
        name: "Clicker hero",
        desc: "Click more than 1000 times in one session",
        eval: "this.sessionClicks >= 1000",
        secret: true
    },
]