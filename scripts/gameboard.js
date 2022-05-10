import { drawGameboard, showShipCells, showHits } from "./display.js";
import { game } from "./game.js";
import GridCell from "./gridcell.js";
import Ship from "./ship.js";

export default function Gameboard(id) {
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
