class View {

    constructor() {}

    /**
     * @param matrice
     * @param color
     */
    showGame(matrice, color) {
        color = this.changeColorByDefault(color);

        let canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        const fond = new Image();
        const teteSerp = new Image();
        const corpsSerp = new Image();
        const fruit = new Image();

        fond.onload = () => {
            this.showBackground(matrice, ctx, fond);
            teteSerp.onload = () => {
                this.showHead(matrice, ctx, teteSerp);
            }
            corpsSerp.onload = () => {
                this.showCorp(matrice, ctx, corpsSerp);
            }
            fruit.onload = () => {
                this.showFruit(matrice, ctx, fruit);
            }
            teteSerp.src = './styles/ressources/headsnake-' + color + '.png';
            corpsSerp.src = './styles/ressources/bodysnake-' + color + '.png';
            fruit.src = './styles/ressources/food.png';
        }
        fond.src = './styles/ressources/boardgame.png';
    }

    /**
     *
     * @param matrice
     * @param ctx
     * @param fruit
     */
    showFruit(matrice, ctx, fruit) {
        for (var i = 0; i < matrice.length; i++) {
            for (var j = 0; j < matrice.length; j++) {
                if (matrice[j][i] == "F") {
                    ctx.drawImage(fruit, (i + 3) * 30, (j + 3) * 30, 30, 30);
                }
            }
        }
    }

    /**
     *
     * @param matrice
     * @param ctx
     * @param corpsSerp
     */
    showCorp(matrice, ctx, corpsSerp) {
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                if (matrice[j][i] === "S") {
                    ctx.drawImage(corpsSerp, (i + 3) * 30, (j + 3) * 30, 30, 30);
                }
            }
        }
    }

    /**
     *
     * @param matrice
     * @param ctx
     * @param teteSerp
     */
    showHead(matrice, ctx, teteSerp) {
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                if (matrice[j][i] == "T") {
                    ctx.drawImage(teteSerp, (i + 3) * 30, (j + 3) * 30, 30, 30);
                }
            }
        }
    }

    /**
     *
     * @param matrice
     * @param ctx
     * @param fond
     */
    showBackground(matrice, ctx, fond) {
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                ctx.drawImage(fond, (i + 3) * 30, (j + 3) * 30, 30, 30);
            }
        }
    }

    /**
     * @param color
     */
    changeColorByDefault(color) {
        if (!color) {
            color = "vert";
        }
        return color;
    }

    /**
     *
     * @param matrice
     * @param color
     */
    refreshGame(matrice, color) {
        let ctx;
        let fond;
        let teteSerp;
        let corpsSerp;
        let fruit;
        ({ctx, fond, teteSerp, corpsSerp, fruit, color} = this.loadResource(color));
        this.showBackground(matrice, ctx, fond);
        this.showHead(matrice, ctx, teteSerp);
        this.showCorp(matrice, ctx, corpsSerp);
        this.showFruit(matrice, ctx, fruit);
    }

    /**
     *
     * @param color
     * @returns {{corpsSerp: HTMLImageElement, teteSerp: HTMLImageElement, ctx: *, fruit: HTMLImageElement, color, fond: HTMLImageElement}}
     */
    loadResource(color) {
        color = this.changeColorByDefault(color);
        const canvas = document.getElementById("canvas");

        const ctx = canvas.getContext("2d");
        const fond = new Image();
        fond.src = './styles/ressources/boardgame.png';

        const teteSerp = new Image();
        teteSerp.src = './styles/ressources/headsnake-' + color + '.png';

        const corpsSerp = new Image();
        corpsSerp.src = './styles/ressources/bodysnake-' + color + '.png';

        const fruit = new Image();
        fruit.src = './styles/ressources/food.png';

        return {ctx, fond, teteSerp, corpsSerp, fruit, color};
    }

    /**
     *
     * @param matrice
     */
    showEndScreen(matrice) {
        const {ctx, fond} = this.loadFishResource();

        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice.length; j++) {
                ctx.drawImage(fond, (i + 3) * 30, (j + 3) * 30, 30, 30);
            }
        }

        ctx.fillStyle = "white";
        ctx.font = "40px '8bit'";
        ctx.fillText("Game Over", 200, 200);
    }


    loadFishResource() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const fond = new Image();
        fond.src = '.styles/ressources/boardgame.png';

        return {ctx, fond};
    }

    /**
     *
     * @param score
     */
    refreshScore(score) {
        document.getElementById('affScore').innerHTML = "Score actuel : " + score
    }


    /**
     *
     * @param score
     */
    refreshMaxScore(score) {
        document.getElementById('affScoreMax').innerHTML = "Score max : " + score;
    }

    /**
     *
     * @param idSelected
     * @param idUnselected1
     * @param idUnselected2
     */
    animation(idSelected, idUnselected1, idUnselected2) {
        document.getElementById(idSelected).className = 'iconsSkin selected';
        document.getElementById(idUnselected1).className = 'iconsSkin unSelected';
        document.getElementById(idUnselected2).className = 'iconsSkin unSelected';
    }

    /**
     *
     * @param idSelected
     * @param idUnselected1
     * @param idUnselected2
     */
    animationButton(idSelected, idUnselected1, idUnselected2) {
        switch (idSelected) {
            case "facile":
                document.getElementById(idSelected).className = 'smallbtn successSelected';
                document.getElementById(idUnselected1).className = 'smallbtn secondary';
                document.getElementById(idUnselected2).className = 'smallbtn danger';
                break;
            case "normal":
                document.getElementById(idSelected).className = 'smallbtn secondarySelected';
                document.getElementById(idUnselected1).className = 'smallbtn success';
                document.getElementById(idUnselected2).className = 'smallbtn danger';
                break;
            case "difficile":
                document.getElementById(idSelected).className = 'smallbtn dangerSelected';
                document.getElementById(idUnselected1).className = 'smallbtn success';
                document.getElementById(idUnselected2).className = 'smallbtn secondary';
                break;
            default:
                break;
        }

    }
}
