export default function GridCell(index) {
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
