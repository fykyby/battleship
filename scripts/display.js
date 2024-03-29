let gameboardElement;
let cellElement;

function setGameboardElement(gameboard) {
    gameboardElement = document.querySelector(`.grid[data-id="${gameboard.id}"`);
}

function setCellElement(index) {
    cellElement = gameboardElement.querySelector(`[data-index="${index}"]`);
}

export function deleteGameboards() {
    const firstGrid = document.querySelector('.grid[data-id="0"');
    while (firstGrid.firstChild) firstGrid.firstChild.remove();

    const secondGrid = document.querySelector('.grid[data-id="1"');
    while (secondGrid.firstChild) secondGrid.firstChild.remove();
}

export function drawGameboard(gameboard, grid) {
    setGameboardElement(gameboard);

    grid.forEach((cell, index) => {
        const targetCell = document.createElement('div');
        targetCell.classList.add('grid-cell');
        targetCell.setAttribute('data-index', cell.index);
        targetCell.textContent = index;
        gameboardElement.appendChild(targetCell);
    });
}

export function showShipCells(gameboard, index) {
    setGameboardElement(gameboard);
    setCellElement(index);

    cellElement.classList.add('ship');
}

export function hideShipCells(gameboard, index) {
    setGameboardElement(gameboard);
    setCellElement(index);

    cellElement.classList.remove('ship');
}

export function showHits(gameboard, index) {
    setGameboardElement(gameboard);
    setCellElement(index);

    if (typeof gameboard.grid[index].shipId !== 'number') {
        cellElement.classList.add('hit-blank');
    } else {
        cellElement.classList.add('hit-ship');
    }
}

export function showShipAsSunk(gameboard, shipId) {
    setGameboardElement(gameboard);
    
    gameboard.grid.forEach(cell => {
        if (cell.shipId === shipId) {
            setCellElement(cell.index);
            cellElement.classList.add('sunk');
        }
    })
}

export function showGameOverScreen() {
    const gameOverElement = document.querySelector('.gameOverContainer');
    gameOverElement.style.display = 'flex';
}

export function hideGameOverScreen() {
    const gameOverElement = document.querySelector('.gameOverContainer');
    gameOverElement.style.display = 'none';
}
