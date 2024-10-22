import './styles.css';
import { Player } from './player';
import { initializeGame } from './gamecontroller';

function newGame() {
    console.log("@new game");
    const player1 = new Player('human');
    const player2 = new Player('computer');
    initializeGame(player1, player2);
}

const btn_reset = document.getElementById('btn-reset');
btn_reset.addEventListener('click', () => {
    newGame();
});

const btn_randomize = document.getElementById('btn-randomize');
// btn_randomize.addEventListener('click', () => {

// });

newGame();