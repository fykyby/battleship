export function drawGameboard(grid, id) {
    grid.forEach(cell => {
        const gameboardElement = document.querySelector(`.grid[data-id="${id}"]`);
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid-cell');
        cellElement.setAttribute('data-index', cell.index);
        gameboardElement.appendChild(cellElement);
    });
}

export function drawShipCell(boardId, index, id) {
    const gameboardElement = document.querySelector(`.grid[data-id="${boardId}"]`);
    const cell = gameboardElement.querySelector(`[data-index="${index}"]`);
    cell.classList.add('ship');
    cell.setAttribute('data-id', id);
}
