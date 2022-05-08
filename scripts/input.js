import { game } from "./game.js";
import { changeCellClass } from "./display.js";

const gameboardElement = document.querySelector('.gameboards');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    game.gameboards[e.target.parentElement.getAttribute('data-id')].hit(index);

    changeCellClass(e.target);
});
