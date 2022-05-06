const gridElement = document.querySelector('.grid');

function createGrid(gridSize) {
    let grid = [];
    for (let i = 0; i < gridSize; i++) 
    {
        for (let j = 0; j < gridSize; j++)
        {
            grid.push(new GridCell(j, i));
        }
    }
    return grid;
}

function drawGrid(grid, parentElement) {
    grid.forEach(col => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('grid-cell');
        cellElement.setAttribute('data-x', col.x);
        cellElement.setAttribute('data-y', col.y);
        parentElement.appendChild(cellElement);
    });
}

class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const grid = createGrid(10);
drawGrid(grid, gridElement);
