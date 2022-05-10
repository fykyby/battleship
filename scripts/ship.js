import { showShipAsSunk } from "./display.js";

export default function Ship(gameboard, id, size) {
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
    this.startPos = Math.round(Math.random() * 99);
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
    showShipAsSunk(this.gameboard, this.id);
}
