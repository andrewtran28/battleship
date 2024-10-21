import { Gameboard } from './gameboard';

class Player {
    constructor(playerType) {
        this.playerType = playerType;
        this.gameboard = new Gameboard(10, 10);
    }
}

export { Player };