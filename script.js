const gridElement = document.querySelector('.grid');

function createGrid(gridSize) {
    let grid = [];
    for (let i = 0; i < gridSize; i++) 
    {
        for (let j = 0; j < gridSize; j++)
        {
            grid.push(new GridCell(i, j));
        }
    }
    return grid;
}

class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const grid = createGrid(10);

grid.forEach(col => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('grid-cell');
    gridElement.appendChild(cellElement);
});