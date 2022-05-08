import { game } from "./game.js";
import { showShipCells, hideShipCells} from "./display.js";

const gameboardElement = document.querySelector('.grid[data-id="1"]');
const showShipsCheckbox = document.querySelector('#showShips');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;
    
    const index = parseInt(e.target.getAttribute('data-index'));
    const targetGameboard = game.gameboards[e.target.parentElement.getAttribute('data-id')];
    targetGameboard.hit(index);
});

showShipsCheckbox.addEventListener('change', () => {
    if (showShipsCheckbox.checked) {
        game.gameboards[1].grid.forEach((cell, index) => {
            if (cell.shipId) {
                showShipCells(game.gameboards[1], index);
            }
        });
    } else {
        game.gameboards[1].grid.forEach((cell, index) => {
            if (cell.shipId) {
                hideShipCells(game.gameboards[1], index);
            }
        });
    }
})
