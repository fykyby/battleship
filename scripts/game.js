import { drawGameboard, drawShipCell } from "./display.js";

class Ship {
    constructor(startPos, length, direction) {
        this.startPos = startPos;
        this.length = length;
        this.direction = direction;
        this.hitcount = 0;
        this.isSunk = false;
        this.id = Date.now().toString();

        this.create();
    }

    create() {
        for (let i = 0; i < this.length; i++) {
            gameboard.grid[this.startPos + i].shipId = this.id;
            drawShipCell(this.startPos + i, this.id);
        }
    }

    hit() {
        this.hitcount++;
        console.log(this.hitcount);
        if (hitcount === length) sink();
    }

    sink() {
        isSunk = true;
    }
}

class GridCell {
    constructor(index) {
        this.index = index;
        this.shipId = null;
        this.hit = false;
    }

    hit() {
        this.hit = true;
    }
}

class Gameboard {
    constructor(size) {
        this.size = size;
        this.grid = [];

        this.create();
    }

    create() {
        for (let i = 0; i < this.size * this.size; i++) {
            this.grid.push(new GridCell(i));
        }

        drawGameboard(this.grid);
    }

    hit(index) {
        // this.grid[index].hit();
        console.log(this.grid[index]);
    }
}

export const gameboard = new Gameboard(10);
let ships = [];
ships.push(new Ship(64, 4, 0));
console.log(gameboard);
