import { game } from "./game.js";
import { showShipCells, hideShipCells} from "./display.js";

const gameboardElement = document.querySelector('.grid[data-id="1"]');
const showShipsCheckbox = document.querySelector('#showShips');
const addShipBtn = document.querySelector('#addShip');

// Listen for clicks on gameboard
gameboardElement.addEventListener('click', (e) => {
    // Return if target is not a cell or game is over
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    const targetGameboard = game.gameboards[e.target.parentElement.getAttribute('data-id')];

    targetGameboard.hit(index);
});

// TEMPORARY
// Show or hide enemy ships on checkbox change
showShipsCheckbox.addEventListener('change', () => {
    if (showShipsCheckbox.checked) {
        game.gameboards[1].grid.forEach((cell, index) => {
            if (typeof cell.shipId === 'number') {
                showShipCells(game.gameboards[1], index);
            }
        });
    } else {
        game.gameboards[1].grid.forEach((cell, index) => {
            if (typeof cell.shipId === 'number') {
                hideShipCells(game.gameboards[1], index);
            }
        });
    }
});
