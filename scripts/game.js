import { drawGameboard, showShipAsSunken, showShipCells, showHits } from "./display.js";

function Ship(gameboard, id, size) {
    this.gameboard = gameboard;
    this.size = size;
    this.startPos;
    this.direction;
    this.hitcount = 0;
    this.isSunk = false;
    this.id = id;
    this.initialize();
}

// Run initial functions
Ship.prototype.initialize = function() {
    do {
        this.randomize();
    } while (this.checkForCollisions());
    this.create();
}

// Add ship cells to grid
Ship.prototype.create = function() {
    for (let i = 0; i < this.size; i++) {
        if (this.direction === 'horizontal') {
            this.gameboard.grid[this.startPos + i].shipId = this.id;
        } else if (this.direction === 'vertical') {
            this.gameboard.grid[this.startPos + i * 10].shipId = this.id;
        }
    }
}

// Randomize ship variables
Ship.prototype.randomize = function() {
    this.startPos = Math.round(Math.random() * 98);
    this.direction = Math.round(Math.random()) === 0 ? 'horizontal' : 'vertical';
    this.checkForWalls();
}

// Check if ship would be placed next to another
Ship.prototype.checkForCollisions = function() {
    let collisionCells = [];
    const grid = this.gameboard.grid;

    if (this.direction === 'horizontal') {
        for (let i = 0; i < this.size; i++) {
            const index = this.startPos + i;
            const wallOnTop = grid[index].getCoordinate('y') === 0;
            const wallOnBottom = grid[index].getCoordinate('y') === 9;

            // Add ship cell
            collisionCells.push(grid[index]);

            // Add top and bottom if not out of bounds
            if (!wallOnTop) collisionCells.push(grid[index - 10]);
            if (!wallOnBottom) collisionCells.push(grid[index + 10]);
            
            // Add left and right if not out of bounds
            if (i === 0 && grid[index].getCoordinate('x') > 0) {
                collisionCells.push(grid[index - 1]);
                if (!wallOnTop) collisionCells.push(grid[index - 11]);
                if (!wallOnBottom) collisionCells.push(grid[index + 9]);
            } else if (i === this.size - 1 && grid[index].getCoordinate('x') < 9) {
                collisionCells.push(grid[index + 1]);
                if (!wallOnTop) collisionCells.push(grid[index - 9]);
                if (!wallOnBottom) collisionCells.push(grid[index + 11]);
            }
        }
    } else if (this.direction === 'vertical') {
        for (let i = 0; i < this.size; i++) {
            const index = this.startPos + i * 10;
            const wallOnLeft = grid[index].getCoordinate('x') === 0;
            const wallOnRight = grid[index].getCoordinate('x') === 9;
            
            // Add ship cell
            collisionCells.push(grid[index]);

            // Add left and right if not out of bouds
            if (grid[index].getCoordinate('x') > 0) collisionCells.push(grid[index - 1]);
            if (grid[index].getCoordinate('x') < 9) collisionCells.push(grid[index + 1]);

            // Add top and bottom if not out of bounds
            if (i === 0 && grid[index].getCoordinate('y') > 0) {
                collisionCells.push(grid[index - 10]);
                if (!wallOnLeft) collisionCells.push(grid[index - 11]);
                if (!wallOnRight) collisionCells.push(grid[index - 9]);
            } else if (i === this.size - 1 && grid[index].getCoordinate('y') < 9) {
                collisionCells.push(grid[index + 10]);
                if (!wallOnLeft) collisionCells.push(grid[index + 9]);
                if (!wallOnRight) collisionCells.push(grid[index + 11]);
            }
        }
    }

    for (let cell of collisionCells) {
        if (typeof cell.shipId === 'number') {
            return true;
        }
    }
    return false;
}

// Prevent ships from going out of bounds
Ship.prototype.checkForWalls = function() {
    if (this.direction === 'horizontal') {
        let startIndex = this.startPos;
        let endIndex = this.startPos + this.size;
        if (startIndex < 10) startIndex = '0' + startIndex.toString();
        if (endIndex < 10) endIndex = '0' + endIndex.toString();

        while (startIndex.toString()[0] !== endIndex.toString()[0]) {
            if (endIndex.toString()[1] === '0' && endIndex < 100) break;
            this.startPos = startIndex - 1;
            startIndex = this.startPos;
            endIndex = this.startPos + this.size;
        }
    } else if (this.direction === 'vertical') {
        while (this.startPos + (this.size - 1) * 10 > 99) {
            let temp = this.startPos.toString()[0];
            temp = parseInt(temp) - 1;
            this.startPos = parseInt(temp.toString() + this.startPos.toString()[1]);
        }
    }
}

// Hit ship
Ship.prototype.hit = function() {
    this.hitcount++;

    // Sink if hitcount equals ship size
    if (this.hitcount === this.size) this.sink();
}

// Sink ship
Ship.prototype.sink = function() {
    this.isSunk = true;

    // Check if all ships has been sunk
    this.gameboard.areAllShipsSunk();

    // Display sunk ships in different color
    showShipAsSunken(this.gameboard, this.id);
}

function GridCell(index) {
    this.index = index;
    this.shipId = null;
    this.isHit = false;
}

// Hit cell
GridCell.prototype.hit = function(ships) {
    this.isHit = true;

    // If cell contains ship, hit it
    if (typeof this.shipId === 'number') {
        const targetShip = ships.find(ship => ship.id === this.shipId);
        targetShip.hit();
    }
}

GridCell.prototype.getCoordinate = function(axis) {
    let indexStr;
    if (this.index < 10) {
        indexStr = '0' + this.index.toString();
    } else {
        indexStr = this.index.toString();
    } 

    if (axis === 'x') {
        return parseInt(indexStr[1]);
    } else if (axis === 'y') {
        return parseInt(indexStr[0]);
    } else {
        return null;
    }
}

function Gameboard(id) {
    this.size = 10; 
    this.id = id;
    this.grid = [];
    this.ships = [];
    this.create();
}

// Create and display gameboard
Gameboard.prototype.create = function() {
    for (let i = 0; i < this.size * this.size; i++) {
        this.grid.push(new GridCell(i));
    }
    drawGameboard(this, this.grid);
}

// Main hit function
Gameboard.prototype.hit = function(index) {
    // If cell has already been hit or it isn't your turn - return 
    if (this.grid[index].isHit || game.getTurn() % 2 !== this.id) return;

    // Hit
    this.grid[index].hit(this.ships);

    // Display hits
    showHits(this, index);

    // If hit a ship, return true
    // Else continue to next turn
    if (typeof this.grid[index].shipId === 'number') {
        return true;
    } else {
        game.nextTurn();
    }
}

// If every ship is sunk - end game
Gameboard.prototype.areAllShipsSunk = function() {
    let sunk = this.ships.every(ship => ship.isSunk);
    if (sunk) {
        game.isGameOver = true;
        console.log(`Board's ${this.id} ships sunk`);
    }
}

Gameboard.prototype.addShips = function() {
    let availableShips = [5, 4, 3, 3, 2];
    availableShips.forEach(shipSize => {
        this.addShip(shipSize);
    });
}

// Add ship to this gameboard
Gameboard.prototype.addShip = function(size) {
    this.ships.push(new Ship(this, this.ships.length, size));
}

// Draw ships on this gameboard
Gameboard.prototype.drawShips = function() {
    this.grid.forEach((cell, index) => {
        if (typeof cell.shipId === "number") {
            showShipCells(this, index);
        }
    });
}

const enemy = (() => {
    function attack() {
        // Randomize target cell index
        let target = Math.floor(Math.random() * 100);

        // Randomize if target cell has already been hit
        while (game.gameboards[0].grid[target].isHit) {
            target = Math.floor(Math.random() * 100);
        }

        // If target was a ship, hit again
        if (game.gameboards[0].hit(target)) attack();
    }

    return {
        attack
    }
})();

// Main game function
export const game = (() => {
    let isGameOver = false;
    let turn = 1;
    const getTurn = () => turn;
    let gameboards = [];

    gameboards.push(new Gameboard(gameboards.length));
    gameboards.push(new Gameboard(gameboards.length));

    gameboards[0].addShips();
    gameboards[0].drawShips();
    gameboards[1].addShips();
    
    // Advance turn
    function nextTurn() {
        turn++;
        if (turn % 2 === 0) {
            enemy.attack();
        }
    }

    return {
        isGameOver,
        gameboards,
        nextTurn,
        getTurn
    }
})();
