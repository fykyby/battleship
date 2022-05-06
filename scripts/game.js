import { drawGameboard, drawShipCell } from "./display.js";

function Ship(startPos, size, direction, id) {
    this.startPos = startPos;
    this.size = size;
    this.direction = direction;
    this.hitcount = 0;
    this.isSunk = false;
    this.id = id;

    this.create = function() {
        for (let i = 0; i < this.size; i++) {
            if (direction === 0) {
                gameboard.grid[this.startPos + i].shipId = this.id;
                drawShipCell(this.startPos + i, this.id);
            } else {
                gameboard.grid[this.startPos + i * 10].shipId = this.id;
                drawShipCell(this.startPos + i * 10, this.id);
            }
        }
    }

    this.hit = function() {
        this.hitcount++;
        if (this.hitcount === size) this.sink();
    }

    this.sink = function() {
        this.isSunk = true;
        gameboard.areAllShipsSunk();
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

    this.areAllShipsSunk = function() {
        let sunk = ships.every(ship => ship.isSunk);
        if(sunk) {
            console.log('all ships sunk');
        }
    }

    this.create();
}

export const gameboard = new Gameboard(10);
let ships = [];
ships.push(new Ship(64, 4, 0, Date.now().toString()));
ships.push(new Ship(21, 4, 1, (Date.now() + 10).toString()));
