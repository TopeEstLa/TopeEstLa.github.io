class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }


  afficherLeJeu() {
    this.view.afficherLeJeu(this.model.genererMatrice(), localStorage.getItem('couleur'));
  }



  actualiserLeJeu() {
    this.view.actualiserLeJeu(this.model.genererMatrice(), localStorage.getItem('couleur'));
    this.view.actualiserLeScore(this.model.serpent.size);
    app.model.sauvegarderRecord(app.model.serpent.size);
    this.view.actualiserLeScoreMax(localStorage.getItem("scoreMax"));
  }


  afficherEcranFin() {
    this.view.afficherEcranFin(this.model.genererMatrice());
  }
}

let app = new Controller(new Model(), new View());

app.afficherLeJeu();
restoreSelectedSnake();
restoreDifficulte();


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


function restoreDifficulte() {
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


function jeu() {
  if (app.model.deplacerSerpent()) {
    app.actualiserLeJeu();
  } else {
    clearInterval(interval); 
    app.afficherEcranFin();
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
  app.model.serpent.changerDirection(nouvelleDirection);
}, false);

let speed = obtenirVitesse();
let interval = setInterval(jeu, speed);
let restartButton = document.getElementById('restartButton');


restartButton.onclick = function () {
  app = new Controller(new Model(), new View());
  app.afficherLeJeu();
  clearInterval(interval);
  let speed = obtenirVitesse();
  interval = setInterval(jeu, speed);
};




function obtenirVitesse() {
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

