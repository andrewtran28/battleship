import { Gameboard } from "./gameboard";
import { Player } from "./player";

const GameController = (() => {

    const initializeGame = (player1, player2) => {
        setupShips(player1);
        setupShips(player2);

        const p1_Gameboard = Gameboard(player1);
        const p2_Gameboard = Gameboard(player2);
    };

    const setupShips = (player) => {
        const setupShipArray = [5,4,3,3,2];

        for (var i = 0; i < setupShips.length; i++) {
            let randomCoords = getRandomCoord();
            let randomOrientation = getRandomOrientation();

            while (!player.gameboard.validSpot(setupShips[i], randomCoords, randomOrientation)) {
                randomCoords = getRandomCoord();
                randomOrientation = getRandomOrientation();
            }

            player.gameboard.setShip(setupShips[i], randomCoords, randomOrientation);
        }
    };

    const isWinner = (p1_gameboard, p2_gameboard) => {
        return (p1_gameboard.allSunk() || p2_gamboard.allSunk());
    };

    const getRandomCoord = () => {
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];  //Random number between 0-9 (within gameboard)
    };

    const getRandomOrientation = () => {
        let isVert = Math.floor(Math.random()*2);  //Random 0 (!isVert) or 1 (isVert);
        isVert = 1 ? true : false;

        return isVert;
    } 

    return { setupShips };
})();

const DOMController = ((player) => {

    const btn_reset = document.getElementById('btn-reset')
    
    const { gameboard } = player;
    let showShips = false;
    let controller = null;
    let turnEvent = null;

    const createCell = (cellData) => {
        const cell = document.createElement('div');
        const marked = document.createElement('div');

        cell.classList.add('board-cell');
        marked.classList.add('marked');

        if (cellData.ship && cellData.isShot) {
            cell.classList.add('ship-shot');
        } else if (cellData.ship && showShips) {
            cell.classList.add('ship');
        } else if (cellData.isShot) {
            cell.classList.add('shot');
        }

        cell.appendChild(marked);

        return cell;
    };

    const renderGrid = () => {
        const cont_gameboard = document.createElement('div');
        cont_gameboard.classList.add('game-board');

        for (var i = 0; i < gameboard.size; i++) {
            for (var j = 0; j < gameboard.size; j++) {
                cont_gameboard.appendChild(createCell(gameboard.coordinates[i][j]));
            }
        }

        const type = showShips ? 'ship' : 'shooting';
        document.getElementById(`${type}`).innerHTML = '';
        document.getElementById(`${type}`).appendChild(cont_gameboard);
    }

    const createGrid = () => {
        renderGrid();
        if (!showShips) {
            addEventCells();
        }
    }

    const toggleShowShips = () => {
        showShips = !showShips;
        return showShips;
    }

    // toggleCheats
        // see where the enemy's ships are located

})(GameController);