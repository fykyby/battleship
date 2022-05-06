const gridElement = document.querySelector('.grid');

class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.shipId = undefined;
        this.hit = false;
    }
}

function createShip(startX, startY, size, direction) {
    let hitcount = 0;

    function handleCreate() {
        let x, y;
        for (let i = 0; i < size; i++) {
            if (direction === 'horizontal') {
                if (startX > gridSize - size) startX = gridSize - size;
                x = startX + i;
                y = startY;
            } else {
                if (startY > gridSize - size) startY = gridSize - size;
                x = startX;
                y = startY + i;
            }
            create(x, y);
            draw(x, y);
        }
    }

    function create(x, y) {
        const index = parseInt(x.toString() + y.toString());
        grid[index].shipId = ships.length;
    }

    function draw(x, y) {
        const pos = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        pos.classList.add('ship');
    }

    function hit() {
        hitcount++;
        console.log(hitcount);
    }

    // function checkCollisions(x, y) {
    //     const index = parseInt(y.toString() + x.toString());
    //     if (grid[index].shipId !== undefined) {
    //         console.log('collision');
    //     } else {
    //         console.log('no collision');
    //     }
    // }

    handleCreate()
    ships.push(this);
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
        cellElement.setAttribute('data-y', cell.y);
        cellElement.setAttribute('data-x', cell.x);
        parentElement.appendChild(cellElement);
    });
}

const gridSize = 10;
const grid = createGrid(gridSize);
drawGrid(grid, gridElement);

let ships = [];
createShip(1, 5, 3, 'horizontal');
createShip(7, 2, 3, 'vertical');

gridElement.addEventListener('click', e => {
    if (!e.target.classList.contains('grid-cell')) return;

    const x = (e.target.getAttribute('data-x'));
    const y = (e.target.getAttribute('data-y'));
    let target = grid[parseInt(x + y)];

    if (target.hit) return;
    target.hit = true;
    console.log(target);


    if (target.shipId === undefined) {
        e.target.classList.add('hit-blank');
    } else {
        // ships[target.shipId].hit();
        console.log(ships);
        console.log(ships[target.shipId]);
        e.target.classList.add('hit-ship');
    }   
})

// gridElement.addEventListener('click', e => {
//     if (!e.target.classList.contains('grid-cell')) return;
//     const x = parseInt(e.target.getAttribute('data-x'));
//     const y = parseInt(e.target.getAttribute('data-y'));
//     createShip(x, y, 3, 'horizontal');
// });
