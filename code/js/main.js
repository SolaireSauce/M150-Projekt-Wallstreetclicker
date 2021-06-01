import Game from './game.js';

function setup() {
    window.game = new Game(
        document.getElementById("mainClicker"),
        document.getElementById("CurrentMoneDisplay"),
        document.getElementById("CurrentMonePerSecondDisplay"),
        document.getElementById("shopButtonContainer"),
        document.getElementById("unlockButtonContainer"),
        document.getElementById("achivementsContainer"),
        document.getElementsByClassName("msgDisplay")[0]
    );
}

setup();