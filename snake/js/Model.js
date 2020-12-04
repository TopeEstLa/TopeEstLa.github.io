class Model {
  constructor() {
    this.grille = new Grille();
    this.serpent = new Serpent();
    this.fruit = new Case(8, 13);
  }


  deplacerSerpent() {
    this.serpent.previousdirection = this.serpent.direction;
    this.serpent.avancer();
    if (!this.serpentMangeFruit()) {

      this.serpent.avancerQueue();
    }
    if (this.serpentMangeFruit()) {

      this.serpent.manger();
      this.genererFruit();
    }
    return !(this.serpentSorsDeLaGrille() || this.serpent.seMordQueue());
  }


  serpentSorsDeLaGrille() {
    return this.serpent.getTete().posX >= this.grille.size || this.serpent.getTete().posY >= this.grille.size || this.serpent.getTete().posY < 0 || this.serpent.getTete().posX < 0;
  }


  serpentMangeFruit() {
    return this.serpent.getTete().posX == this.fruit.posX && this.serpent.getTete().posY == this.fruit.posY;
  }


  genererFruit() {
    let nouveauFruit;
    do {
      let nouveauPosX = this.genererNombreAleatoire(0, this.grille.size - 1);
      let nouveauPosY = this.genererNombreAleatoire(0, this.grille.size - 1);
      nouveauFruit = new Case(nouveauPosX, nouveauPosY);
    }
    while (this.serpent.faisPartiDuSerpent(nouveauFruit));
    this.fruit = nouveauFruit 
  }

  /**
   * @param {*} score 
   */
  sauvegarderRecord(score) {
    if (localStorage.getItem("scoreMax") == "") localStorage.setItem("scoreMax", score);
    if (score > localStorage.getItem("scoreMax")) localStorage.setItem("scoreMax", score);
  }


  /**
   * Permet de generer la matrice qui servira à l'affichage
   * S = corps serpent
   * T = tete serpent
   * F = fruit
   * X = rien
   */
  genererMatrice() {
    var matrice = [];
    for (var i = 0; i < this.grille.size; i++) {
      matrice[i] = [];
      for (var j = 0; j < this.grille.size; j++) {
        var c = new Case(i, j); 
        matrice[i][j] = 'X'; 
        this.serpent.positions.forEach(element => {
          if (element.superpose(c)) { 
            matrice[i][j] = 'S';
            if (c.superpose(this.serpent.getTete())) { 
              matrice[i][j] = 'T';
            }
          }
        });
        if (c.superpose(this.fruit)) {
          matrice[i][j] = 'F';
        }
      }
    }
    return matrice;
  }

  /**
   * @param {*} min
   * @param {*} max
   */
  genererNombreAleatoire(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };
}
