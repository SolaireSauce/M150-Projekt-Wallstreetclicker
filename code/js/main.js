import Game from './game.js';


function setup() {
    window.game = new Game(
        document.getElementById("mainClicker"),
        document.getElementById("CurrentMoneDisplay"),
        document.getElementById("CurrentMonePerSecondDisplay"),
        document.getElementById("shopButtonContainer"),
        document.getElementById("unlockButtonContainer"),
    );
}

setup();