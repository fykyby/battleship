import { game } from "./game.js";
import { showShipCells, hideShipCells} from "./display.js";

const gameboardElement = document.querySelector('.grid[data-id="1"]');
const showShipsCheckbox = document.querySelector('#showShips');

// Listen for clicks on gameboard
gameboardElement.addEventListener('click', (e) => {
    // Return if target is not a cell or game is over
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    const targetGameboard = game.gameboards[e.target.parentElement.getAttribute('data-id')];
    
    targetGameboard.hit(index);
});
