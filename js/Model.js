class Model {

    constructor() {
        this.grille = new Grille();
        this.serpent = new Serpent();
        this.fruit = new Case(8, 13);
    }


    moveSnake() {
        this.serpent.previousdirection = this.serpent.direction;
        this.serpent.move();

        if (!this.snakeEatFruit()) {
            this.serpent.moveQueue();
        }

        if (this.snakeEatFruit()) {
            this.serpent.eat();
            this.generateFruit();
        }
        return !(this.snakeGetOutOfTheGrid() || this.serpent.seMordQueue());
    }


    snakeGetOutOfTheGrid() {
        return this.serpent.getHead().posX >= this.grille.size || this.serpent.getHead().posY >= this.grille.size || this.serpent.getHead().posY < 0 || this.serpent.getHead().posX < 0;
    }


    snakeEatFruit() {
        return this.serpent.getHead().posX === this.fruit.posX && this.serpent.getHead().posY === this.fruit.posY;
    }


    generateFruit() {
        let nouveauFruit;
        do {
            let nouveauPosX = this.generateRandomNumber(0, this.grille.size - 1);
            let nouveauPosY = this.generateRandomNumber(0, this.grille.size - 1);
            nouveauFruit = new Case(nouveauPosX, nouveauPosY);
        }
        while (this.serpent.isSnake(nouveauFruit));
        this.fruit = nouveauFruit
    }

    /**
     *
     * @param score
     */
    saveScore(score) {
        if (localStorage.getItem("scoreMax") === "") localStorage.setItem("scoreMax", score);
        if (score > localStorage.getItem("scoreMax")) localStorage.setItem("scoreMax", score);
    }


    /**
     * Permet de generer la matrice qui servira à l'affichage
     * S = corps serpent
     * T = tete serpent
     * F = fruit
     * X = rien
     */
    generateMatrice() {
        let matrice = [];

        for (let i = 0; i < this.grille.size; i++) {
            matrice[i] = [];
            for (let j = 0; j < this.grille.size; j++) {
                const c = new Case(i, j);
                matrice[i][j] = 'X';

                this.serpent.positions.forEach(element => {
                    if (element.superpose(c)) {
                        matrice[i][j] = 'S';
                        if (c.superpose(this.serpent.getHead())) {
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
     *
     * @param min
     * @param max
     * @returns {number}
     */
    generateRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
}
