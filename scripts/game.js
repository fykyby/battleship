import { drawGameboard, drawShipCell } from "./display.js";

function Ship(gameboard, startPos, size, direction, id) {
    this.gameboard = gameboard;
    this.startPos = startPos;
    this.size = size;
    this.direction = direction;
    this.hitcount = 0;
    this.isSunk = false;
    this.id = id;
    this.create();  
}

Ship.prototype.create = function() {
    for (let i = 0; i < this.size; i++) {
        if (this.direction === 'horizontal') {
            this.gameboard.grid[this.startPos + i].shipId = this.id;
            drawShipCell(this.gameboard.id, this.startPos + i, this.id);
        } else if (this.direction === 'vertical') {
            this.gameboard.grid[this.startPos + i * 10].shipId = this.id;
            drawShipCell(this.gameboard.id, this.startPos + i * 10, this.id);
        }
    }
}

Ship.prototype.hit = function() {
    this.hitcount++;
    if (this.hitcount === this.size) this.sink();
}

Ship.prototype.sink = function() {
    this.isSunk = true;
    this.gameboard.areAllShipsSunk();
}

function GridCell(index) {
    this.index = index;
    this.shipId = null;
    this.isHit = false;
}

GridCell.prototype.hit = function(ships) {
    if (this.isHit) return;
    this.isHit = true;
    if(this.shipId) {
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

Gameboard.prototype.create = function() {
    for (let i = 0; i < this.size * this.size; i++) {
        this.grid.push(new GridCell(i));
    }
    drawGameboard(this.grid, this.id);
}

Gameboard.prototype.hit = function(index) {
    this.grid[index].hit(this.ships);
}

Gameboard.prototype.areAllShipsSunk = function() {
    let sunk = this.ships.every(ship => ship.isSunk);
    if(sunk) {
        console.log(`Board's ${this.id} ships sunk`);
    }
}

export let gameboards = [];
gameboards.push(new Gameboard(gameboards.length));
gameboards.push(new Gameboard(gameboards.length));

gameboards[0].ships.push(new Ship(gameboards[0], 64, 4, 'horizontal', gameboards[0].ships.length.toString()));
gameboards[0].ships.push(new Ship(gameboards[0], 21, 4, 'vertical', gameboards[0].ships.length.toString()));
gameboards[1].ships.push(new Ship(gameboards[1], 6, 3, 'vertical', gameboards[1].ships.length.toString()));
gameboards[1].ships.push(new Ship(gameboards[1], 72, 2, 'horizontal', gameboards[1].ships.length.toString()));
