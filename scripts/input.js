import { game } from "./game.js";

const gameboardElement = document.querySelector('.gameboards');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell') || game.isGameOver) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    game.gameboards[e.target.parentElement.getAttribute('data-id')].hit(index);
    if (!e.target.classList.contains('ship')) {
        e.target.classList.add('hit-blank');
    } else {
        e.target.classList.add('hit-ship');
    }
});
