import { drawGameboard, showShipAsSunken, showShipCells, showHits } from "./display.js";

function Ship(gameboard, startPos, size, direction, id) {
    this.gameboard = gameboard;
    this.startPos = startPos;
    this.size = size;
    this.direction = direction;
    this.hitcount = 0;
    this.isSunk = false;
    this.id = id;
    // this.randomize();
    this.checkForWalls();
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
    this.startPos = Math.round(Math.random() * 100);
    this.size = Math.round(Math.random() * 4) + 2;
    this.direction = Math.round(Math.random() * 2) === 0 ? 'horizontal' : 'vertical' ;
}

// Prevent ships from going out of bounds
Ship.prototype.checkForWalls = function() {
    if (this.direction === 'horizontal') {
        let startIndex = this.startPos;
        let endIndex = this.startPos + this.size;
        if (startIndex < 10) startIndex = '0' + startIndex.toString();
        if (endIndex < 10) endIndex = '0' + endIndex.toString();

        while (startIndex.toString()[0] !== endIndex.toString()[0]) {
            if (endIndex.toString()[1] === '0' && endIndex < 101) break;
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
    if (this.shipId) {
        const targetShip = ships.find(ship => ship.id === this.shipId);
        targetShip.hit();
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
    if (this.grid[index].shipId) {
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
    
    gameboards[0].ships.push(new Ship(gameboards[0], 1, 4, 'vertical', gameboards[0].ships.length.toString()));
    gameboards[0].ships.push(new Ship(gameboards[0], 64, 5, 'horizontal', gameboards[0].ships.length.toString()));
    gameboards[0].ships.push(new Ship(gameboards[0], 72, 2, 'vertical', gameboards[0].ships.length.toString()));
    gameboards[0].ships.push(new Ship(gameboards[0], 25, 4, 'horizontal', gameboards[0].ships.length.toString()));
    
    gameboards[1].ships.push(new Ship(gameboards[1], 1, 4, 'vertical', gameboards[1].ships.length.toString()));
    gameboards[1].ships.push(new Ship(gameboards[1], 64, 5, 'horizontal', gameboards[1].ships.length.toString()));
    gameboards[1].ships.push(new Ship(gameboards[1], 72, 2, 'vertical', gameboards[1].ships.length.toString()));
    gameboards[1].ships.push(new Ship(gameboards[1], 25, 4, 'horizontal', gameboards[1].ships.length.toString()));
    
    // Display player's ships
    gameboards[0].grid.forEach((cell, index) => {
        if (cell.shipId) {
            showShipCells(gameboards[0], index);
        }
    });

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
