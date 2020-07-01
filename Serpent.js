class Serpent {

    constructor() {
        this.size = 3;
        this.direction = "est";
        this.previousdirection = "est";
        this.positions = new Array();
        this.positions.push(new Case(8, 2));
        this.positions.push(new Case(8, 3));
        this.positions.push(new Case(8, 4));
    }


    getTete() {
        return this.positions[this.positions.length - 1];
    }


    avancer() {
        let tete = this.getTete();
        switch (this.direction) {
            case "est":
                this.positions.push(
                    new Case(tete.posX, tete.posY + 1));
                break;
            case "sud":
                this.positions.push(
                    new Case(tete.posX + 1, tete.posY));
                break;
            case "nord":
                this.positions.push(
                    new Case(tete.posX - 1, tete.posY));
                break;
            case "ouest":
                this.positions.push(
                    new Case(tete.posX, tete.posY - 1));
                break;
            default:
                break;
        }
    }

    /**
     * @param {*} nouvelleDirection
     */
    changerDirection(nouvelleDirection) {
        switch (nouvelleDirection) {
            case "est":
                if (this.previousdirection != "ouest") {
                    this.direction = nouvelleDirection;
                }
                break;
            case "sud":
                if (this.previousdirection != "nord") {
                    this.direction = nouvelleDirection;
                }
                break;
            case "nord":
                if (this.previousdirection != "sud") {
                    this.direction = nouvelleDirection;
                }
                break;
            case "ouest":
                if (this.previousdirection != "est") {
                    this.direction = nouvelleDirection;
                }
                break;
            default:
                break;
        }
    }

    seMordQueue() {
        let tete = this.getTete();
        let count = 0
        for (let i = 0; i < this.positions.length; i++) { 
            const element = this.positions[i];
            if (element.superpose(tete)) {
                count++;
            }
        }
        return count > 1; 
    }


    avancerQueue() {
        this.positions.shift();
    }


    manger() {
        this.size++;
    }

    /**
     * @param {*} c
     */
    faisPartiDuSerpent(c) {
        let count = 0
        for (let i = 0; i < this.positions.length; i++) { 
            const element = this.positions[i];
            if (element.superpose(c)) {
                count++;
            }
        }
        return count > 0; 
    }

    /**
     * @param {*} c
     */
    estLaTete(c) {
        return c.superpose(this.getTete());
    }
}
