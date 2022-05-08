export function drawGameboard(grid, id) {
    grid.forEach((cell, index) => {
        const gameboardElement = document.querySelector(`.grid[data-id="${id}"]`);
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid-cell');
        cellElement.setAttribute('data-index', cell.index);
        cellElement.textContent = index;
        gameboardElement.appendChild(cellElement);
    });
}

export function drawShipCell(boardId, index, id) {
    const gameboardElement = document.querySelector(`.grid[data-id="${boardId}"]`);
    const cell = gameboardElement.querySelector(`[data-index="${index}"]`);
    cell.classList.add('ship');
    cell.setAttribute('data-id', id);
}

export function changeCellClass(cell) {
    if (!cell.classList.contains('ship')) {
        cell.classList.add('hit-blank');
    } else {
        cell.classList.add('hit-ship');
    }
}