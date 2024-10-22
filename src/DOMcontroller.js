//"DOM_gameboard.js"

function Gameboard(player) {
    
    const { gameboard } = player; //Player's Gameboard for easier readability
    let showShips = false;
    let controller = null;
    let turnEvent = null;

    const setTurnEvent = (func) => {
        turnEvent = func;
    }

    const getTurnEvent = () => {
        turnEvent();
    }

    const getController = () => {
        controller;
    }

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

    const addCellEvents = () => {
        if (turnEvent === null) {
            return;
        }

        controller = new AbortController();
        const cellList = Array.from(document.querySelectorAll('#shooting .board-cell'));
        let cellIndex = 0;

        for (var x = 0; x < gameboard.size; x++) {
            for (var y = 0; y < gameboard.size; x++) {
                if (!gameboard.coordinates[x][y].isShot) {
                    cellList[cellIndex].addEventListener('click', () => {
                        gameboard.receiveAttack([x,y]);
                        const endGame = getTurnEvent();
                        if (endgame) {
                            getController().abort();
                        }
                    }, {signal: controller.signal});
                }
                cellIndex++;
            }
        }
    }

    const createGrid = () => {
        renderGrid();
        if (!showShips) {
            addCellEvents();
        }
    }

    const toggleShowShips = () => {
        showShips = !showShips;
        return showShips;
    }

    return { createGrid, toggleShowShips, setTurnEvent };

}

export { Gameboard };