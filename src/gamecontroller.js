//"DOM_methods"

import { Gameboard } from "./DOMcontroller";

const setupShipArray = [5,4,3,3,2];
const BOARDSIZE = 10;

function initializeGame(player1, player2) {
    console.log("@initializeGame");
    const winMessage = document.getElementById('winner-message');
    setupShips(player1);
    setupShips(player2);

    const p1_gameboard = Gameboard(player1);
    const p2_gameboard = Gameboard(player2);
    const cpu = computer(player1.gameboard);

    p2_gameboard.setTurnEvent(() => {
        p2_gameboard.createGrid();
        if (isWinner(player1.gameboard, player2.gameboard)) {
            winMessage.innerHTML = "Player 1 wins!";
            winMessage.showModal();
            return true;
        }

        cpu.attacking();
        p1_gameboard.createGrid();
        if (isWinner(player1.gameboard, player2.gameboard)) {
            winMessage.innerHTML = "Player 2 wins!";
            winMessage.showModal();
            return true;
        }

        return false;
    });

    p1_gameboard.toggleShowShips();
    p1_gameboard.createGrid();
    p2_gameboard.createGrid();
}

function setupShips(player) {
    for (var i = 0; i < setupShipArray.length; i++) {
        let randomCoords = getRandomCoord();
        let randomOrientation = getRandomOrientation();

        while (!player.gameboard.validSpot(setupShipArray[i], randomCoords, randomOrientation)) {
            randomCoords = getRandomCoord();
            randomOrientation = getRandomOrientation();
        }

        player.gameboard.setShip(setupShipArray[i], randomCoords, randomOrientation);
    }
}

function isWinner(p1_gameboard, p2_gameboard) {
    return (p1_gameboard.allSunk() || p2_gameboard.allSunk());
}

function getRandomCoord() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];  //Random number between 0-9 (within gameboard)
}

function getRandomOrientation() {
    let isVert = Math.floor(Math.random()*2);  //Random 0 (!isVert) or 1 (isVert);
    isVert = 1 ? true : false;

    return isVert;
} 

function computer(playerBoard) {
    let currentMove = null;
    let horiMoves = [];
    let vertMoves = [];
    let rotation = null;

    const getMoves = () => {
        const [x,y] = currentMoves;

        if ((x > 0) && !playerBoard.coordinates[x-1][y].isShot) {
            horiMoves.push([x-1, y]);
        }

        if ((x+1 < BOARDSIZE) && !playerBoard.coordinates[x+1][y]) {
            horiMoves.push([x+1, y]);
        }

        if ((y > 0) && !playerBoard.coordinates[x][y-1].isShot) {
            vertMoves.push([x, y-1]);
        }

        if ((y+1 < BOARDSIZE) && !playerBoard.coordinates[x][y+1]) {
            vertMoves.push([x, y+1]);
        }
    }

    const attacking = () => {
        let x = null;
        let y = null;  

        if(currentMove = null) {
            [x,y] = getRandomCoord();
        } else {
            [x,y] = currentMove;
        }

        const shipShot = playerBoard.receiveAttack (x, y);

        if(shipShot) {
            currentMove = [x,y];
            getMoves();

            if(rotation === 'vertical') {           //if ship is vertical, clear possible computer horizontal moves
                horiMoves = [];
            } else if (!isVert === 'horizontal') {
                vertMoves = [];
            }
        }

        if (horiMoves.length > 0) {
            [x, y] = horiMoves.shift();
            currentMove = [x,y];
            rotation = 'horizontal';
        } else if (vertMoves.length > 0) {
            [x, y] = vertMove.shift();
            currentMove = [x,y];
            rotation = 'vertical';
        } else {
            currentMove = null;
            rotation = null;
        }
    }

    return { attacking }
}

export { initializeGame };