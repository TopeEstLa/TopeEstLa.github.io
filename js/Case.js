class Case {

    /**
     * @param posX
     * @param posY
     */
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * @param {*} case2 
     */
    superpose(case2) {
        let case1 = this;
        const aProps = Object.getOwnPropertyNames(case1);
        const bProps = Object.getOwnPropertyNames(case2);

        if (aProps.length !== bProps.length) {
            return false;
        }
        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];
            if (case1[propName] !== case2[propName]) {
                return false;
            }
        }
        return true;
    }

}
