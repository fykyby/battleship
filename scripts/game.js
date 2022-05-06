import { drawGameboard, drawShipCell } from "./display.js";

function Ship(startPos, size, direction) {
    this.startPos = startPos;
    this.size = size;
    this.direction = direction;
    this.hitcount = 0;
    this.isSunk = false;
    this.id = Date.now().toString();

    this.create = function() {
        for (let i = 0; i < this.size; i++) {
            gameboard.grid[this.startPos + i].shipId = this.id;
            drawShipCell(this.startPos + i, this.id);
        }
    }

    this.hit = function() {
        this.hitcount++;
        console.log(this.hitcount);
        if (this.hitcount === size) this.sink();
    }

    this.sink = function() {
        this.isSunk = true;
        console.log('sunk');
    }

    this.create();
}

function GridCell(index) {
    this.index = index;
    this.shipId = null;
    this.isHit = false;

    this.hit = function() {
        if (this.isHit) return;

        this.isHit = true;
        if(this.shipId) {
            ships.find(ship => ship.id === this.shipId.toString()).hit();
        }
    }
}

function Gameboard(size) {
    this.size = size;
    this.grid = [];
    
    this.create = function() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.grid.push(new GridCell(i));
        }
        drawGameboard(this.grid);
    }
    
    this.hit = function(index) {
        this.grid[index].hit();
    }

    this.create();
}

export const gameboard = new Gameboard(10);
let ships = [];
ships.push(new Ship(64, 4, 0));
