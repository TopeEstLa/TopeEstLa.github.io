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


    getHead() {
        return this.positions[this.positions.length - 1];
    }


    move() {
        let tete = this.getHead();

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
     *
     * @param newDirection
     */
    changeDirection(newDirection) {
        switch (newDirection) {
            case "est":
                if (this.previousdirection !== "ouest") {
                    this.direction = newDirection;
                }
                break;
            case "sud":
                if (this.previousdirection !== "nord") {
                    this.direction = newDirection;
                }
                break;
            case "nord":
                if (this.previousdirection !== "sud") {
                    this.direction = newDirection;
                }
                break;
            case "ouest":
                if (this.previousdirection !== "est") {
                    this.direction = newDirection;
                }
                break;
            default:
                break;
        }
    }

    seMordQueue() {
        let head = this.getHead();
        let count = 0
        for (let i = 0; i < this.positions.length; i++) {
            const element = this.positions[i];
            if (element.superpose(head)) {
                count++;
            }
        }
        return count > 1;
    }


    moveQueue() {
        this.positions.shift();
    }


    eat() {
        this.size++;
    }

    /**
     *
     * @param c
     * @returns {boolean}
     */
    isSnake(c) {
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
     *
     * @param c
     * @returns {boolean}
     */
    isHead(c) {
        return c.superpose(this.getHead());
    }
}
