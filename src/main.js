import './styles.css';
import { newGame } from './gamecontroller';

const btn_reset = document.getElementById('btn-reset');
btn_reset.addEventListener('click', () => {
    newGame();
});

newGame();