class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;
    }


    showGame() {
        this.view.showGame(this.model.generateMatrice(), localStorage.getItem('couleur'));
    }


    refreshGame() {
        this.view.refreshGame(this.model.generateMatrice(), localStorage.getItem('couleur'));
        this.view.refreshScore(this.model.serpent.size);
        app.model.saveScore(app.model.serpent.size);
        this.view.refreshMaxScore(localStorage.getItem("scoreMax"));
    }


    showEndScreen() {
        this.view.showEndScreen(this.model.generateMatrice());
    }
}

let app = new Controller(new Model(), new View());

app.showGame();
restoreSelectedSnake();
restoreDifficulty();


function restoreSelectedSnake() {
    switch (localStorage.getItem('couleur')) {
        case "vert":
            app.view.animation('vert', 'orange', 'bleu');
            break;
        case "bleu":
            app.view.animation('bleu', 'vert', 'orange');
            break;
        case "orange":
            app.view.animation('orange', 'vert', 'bleu');
            break;
        default:
            app.view.animation('vert', 'orange', 'bleu');
    }
}


function restoreDifficulty() {
    switch (localStorage.getItem('difficulte')) {
        case "facile":
            app.view.animationButton('facile', 'normal', 'difficile');
            break;
        case "normal":
            app.view.animationButton('normal', 'facile', 'difficile');
            break;
        case "difficile":
            app.view.animationButton('difficile', 'facile', 'normal');
            break;
        default:
            app.view.animationButton('facile', 'normal', 'difficile');
    }
}


function game() {
    if (app.model.moveSnake()) {
        app.refreshGame();
    } else {
        clearInterval(interval);
        app.showEndScreen();
    }
};


document.addEventListener('keydown', (event) => {
    const nomTouche = event.key;
    let nouvelleDirection;

    switch (nomTouche) {
        case "ArrowUp":
            nouvelleDirection = "nord"
            break;
        case "ArrowDown":
            nouvelleDirection = "sud"
            break;
        case "ArrowLeft":
            nouvelleDirection = "ouest"
            break;
        case "ArrowRight":
            nouvelleDirection = "est"
            break;
        default:
            break;
    }
    app.model.serpent.changeDirection(nouvelleDirection);
}, false);

let speed = getSpeed();
let interval = setInterval(game, speed);
let restartButton = document.getElementById('restartButton');

restartButton.onclick = function () {
    app = new Controller(new Model(), new View());
    app.showGame();
    clearInterval(interval);
    let speed = getSpeed();
    interval = setInterval(game, speed);
};


function getSpeed() {
    let speed;
    switch (localStorage.getItem('difficulte')) {
        case "facile":
            speed = 150;
            break;
        case "normal":
            speed = 100;
            break;
        case "difficile":
            speed = 75;
            break;
        default:
            speed = 150;
    }
    return speed;
}

