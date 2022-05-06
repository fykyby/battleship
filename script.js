const gridElement = document.querySelector('.grid');

class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function createShip(startX, startY, size, direction) {
    let hitcount = 0;

    function draw() {
        const startPos = gridElement.querySelector(`[data-x='${startX}'][data-y='${startY}']`);

        if (direction === 'horizontal') {
            if (startX > gridSize - size) startX = gridSize - size;

            for (let i = 0; i < size; i++) {
                const pos = document.querySelector(`[data-x='${i + startX}'][data-y='${startY}']`);
                pos.classList.add('ship');
            }
        } else if (direction === 'vertical') {
            if (startY > gridSize - size) startY = gridSize - size;

            for (let i = 0; i < size; i++) {
                const pos = document.querySelector(`[data-x='${startX}'][data-y='${i + startY}']`);
                pos.classList.add('ship');
            }
        }
    }

    draw();
}

function createGrid(gridSize) {
    let grid = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid.push(new GridCell(j, i));
        }
    }

    return grid;
}

function drawGrid(grid, parentElement) {
    grid.forEach(cell => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid-cell');
        cellElement.setAttribute('data-x', cell.x);
        cellElement.setAttribute('data-y', cell.y);
        parentElement.appendChild(cellElement);
    });
}

const gridSize = 10;
const grid = createGrid(gridSize);
drawGrid(grid, gridElement);

let ships = [];
ships.push(createShip(2, 2, 3, 'vertical'));
