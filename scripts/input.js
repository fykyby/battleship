import { game } from "./game.js";
import { showHits, showShipCells, hideShipCells} from "./display.js";

const gameboardElement = document.querySelector('.gameboards');
const showShipsCheckbox = document.querySelector('#showShips');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    const targetGameboard = game.gameboards[e.target.parentElement.getAttribute('data-id')];
    targetGameboard.hit(index);

    // changeCellClass(e.target);
    showHits(targetGameboard, index);
});

showShipsCheckbox.addEventListener('change', () => {
    if (showShipsCheckbox.checked) {
        // render ships
        game.gameboards.forEach(board => {
            board.grid.forEach((cell, index) => {
                if (cell.shipId) {
                    showShipCells(board, index);
                }
            });
        });
    } else {
        // hide ships
        game.gameboards.forEach(board => {
            board.grid.forEach((cell, index) => {
                if (cell.shipId) {
                    hideShipCells(board, index);
                }
            });
        });
    }
})
