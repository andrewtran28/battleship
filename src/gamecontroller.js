//"DOM_methods"

import { Gameboard } from "./DOMcontroller";
import { Player } from "./player";

const setupShipArray = [5,4,3,3,2];
const BOARDSIZE = 10;

function newGame() {
    const player1 = new Player('human');
    const player2 = new Player('computer');
    initializeGame(player1, player2);
}

function initializeGame(player1, player2) {
    const dialog = document.querySelector("dialog");
    const winMessage = document.getElementById('win-message');
    const btn_close = document.createElement('button');
    btn_close.id = "btn-close";
    btn_close.textContent = "Start New Game";

    btn_close.addEventListener('click', () => {
        dialog.close();
        newGame();
    });

    setupShips(player1);
    setupShips(player2);

    const p1_gameboard = Gameboard(player1);
    const p2_gameboard = Gameboard(player2);
    const cpu = computer(player1.gameboard);

    p2_gameboard.setTurnEvent(() => {
        p2_gameboard.createGrid();
        if (isWinner(player1.gameboard, player2.gameboard)) {
            winMessage.textContent = "PLAYER 1 WINS!";
            winMessage.appendChild(btn_close);
            dialog.showModal();
            return true;
        }

        cpu.attacking();
        p1_gameboard.createGrid();
        if (isWinner(player1.gameboard, player2.gameboard)) {
            winMessage.textContent = "PLAYER 2 WINS!"; 
            winMessage.appendChild(btn_close);
            dialog.showModal();
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
        let [randomX, randomY] = getRandomCoord();
        let randomOrientation = getRandomOrientation();

        while (!player.gameboard.validSpot(setupShipArray[i], randomX, randomY, randomOrientation)) {
            [randomX, randomY] = getRandomCoord();
            randomOrientation = getRandomOrientation();
        }

        player.gameboard.setShip(setupShipArray[i], randomX, randomY, randomOrientation);
    }
}

function isWinner(p1_gameboard, p2_gameboard) {
    return (p1_gameboard.allSunk() || p2_gameboard.allSunk());
}

function getRandomCoord() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];  //Random number between 0-9 (within gameboard)
}

function getRandomOrientation() {
    let isVert = Math.round(Math.random());  //Random 0 (!isVert) or 1 (isVert);
    return isVert == 1 ? true : false;
} 

function computer(playerBoard) {
    let currentMove = null;
    let horiMoves = [];
    let vertMoves = [];
    let rotation = null;

    const getMoves = () => {
        const {x,y} = currentMove;

        if ((x > 0) && !playerBoard.coordinates[x-1][y].isShot) {
            horiMoves.push([x-1, y]);
        }

        if ((x+1 < BOARDSIZE) && !playerBoard.coordinates[x+1][y].isShot) {
            horiMoves.push([x+1, y]);
        }

        if ((y > 0) && !playerBoard.coordinates[x][y-1].isShot) {
            vertMoves.push([x, y-1]);
        }

        if ((y+1 < BOARDSIZE) && !playerBoard.coordinates[x][y+1].isShot) {
            vertMoves.push([x, y+1]);
        }
    }

    const attacking = () => {
        let x = null;
        let y = null;  

        if(currentMove === null) {
            [x,y] = getRandomXY();
        } else {
            ({ x, y } = currentMove);
        }

        const shipShot = playerBoard.receiveAttack (x, y);

        if(shipShot) {
            currentMove = {x,y};
            getMoves();

            if(rotation === 'vertical') {           //if ship is vertical, clear possible computer horizontal moves
                horiMoves = [];
            } else if (rotation === 'horizontal') {
                vertMoves = [];
            }
        }

        if (horiMoves.length > 0) {
            [x, y] = horiMoves.shift();
            currentMove = {x,y};
            rotation = 'horizontal';
        } else if (vertMoves.length > 0) {
            [x, y] = vertMoves.shift();
            currentMove = {x,y};
            rotation = 'vertical';
        } else {
            currentMove = null;
            rotation = null;
        }

        return { attacking };
    }

    const getRandomXY = () => {
        let [randomX, randomY] = getRandomCoord();

        while (playerBoard.coordinates[randomX][randomY].isShot) {
            [randomX, randomY] = getRandomCoord();
        }

        return [randomX, randomY];
    }

    return { attacking }
}

export { newGame };