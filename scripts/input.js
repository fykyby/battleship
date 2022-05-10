import { game } from "./game.js";

const gameboardElement = document.querySelector('.grid[data-id="1"]');
const newGameBtn = document.querySelector('button#reset');

// Listen for clicks on gameboard
gameboardElement.addEventListener('click', (e) => {
    // Return if target is not a cell or game is over
    if (!e.target.classList.contains('grid-cell') || game.getIsGameOver()) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    const targetGameboard = game.gameboards[e.target.parentElement.getAttribute('data-id')];

    targetGameboard.hit(index);
});

newGameBtn.addEventListener('click', () => {
    game.startNewGame();
});
