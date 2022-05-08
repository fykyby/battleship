let gameboardElement;
let cellElement;

function setTargetGameboard(gameboard) {
    gameboardElement = document.querySelector(`.grid[data-id="${gameboard.id}"`);
}

function setTargetCell(index) {
    cellElement = gameboardElement.querySelector(`[data-index="${index}"]`);
}

export function drawGameboard(gameboard, grid) {
    setTargetGameboard(gameboard);
    grid.forEach((cell, index) => {
        const targetCell = document.createElement('div');
        targetCell.classList.add('grid-cell');
        targetCell.setAttribute('data-index', cell.index);
        targetCell.textContent = index;
        gameboardElement.appendChild(targetCell);
    });
}

export function showShipCells(gameboard, index) {
    setTargetGameboard(gameboard);
    setTargetCell(index);
    cellElement.classList.add('ship');
}

export function hideShipCells(gameboard, index) {
    setTargetGameboard(gameboard);
    setTargetCell(index);
    cellElement.classList.remove('ship');
}

export function showHits(gameboard, index) {
    setTargetGameboard(gameboard);
    setTargetCell(index);

    if (!gameboard.grid[index].shipId) {
        cellElement.classList.add('hit-blank');
    } else {
        cellElement.classList.add('hit-ship');
    }
}
