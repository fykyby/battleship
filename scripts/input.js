import { gameboard } from "./game.js";

const gameboardElement = document.querySelector('.grid');

gameboardElement.addEventListener('click', (e) => {
    if (!e.target.classList.contains('grid-cell')) return;

    const index = parseInt(e.target.getAttribute('data-index'));
    gameboard.hit(index);

    if (!e.target.classList.contains('ship')) {
        e.target.classList.add('hit-blank');
    } else {
        e.target.classList.add('hit-ship');
    }
});