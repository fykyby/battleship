import { gameboard } from "./game.js";

const gameboardElement = document.querySelector('.grid');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell')) return;
    if (e.target.classList.contains('ship')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        gameboard.hit(index);
    }
});