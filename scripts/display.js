const gameboardElement = document.querySelector('.grid');

export function drawGameboard(grid) {
    grid.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid-cell');
        cellElement.setAttribute('data-index', cell.index);
        gameboardElement.appendChild(cellElement);
    });
}

export function drawShipCell(index, id) {
    const cell = gameboardElement.querySelector(`[data-index="${index}"]`);
    cell.classList.add('ship');
    cell.setAttribute('data-id', id);
}
