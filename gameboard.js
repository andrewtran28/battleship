import { Ship } from './ship';

class Gameboard {
    constructor(size) {
        this.rows = size;
        this.columns = size;
        this.ships = [];

        const coordinates = new Array(size)
        for (var i = 0; i < size; i++) {
            coordinates[i] = new Array(size);
            for(var j = 0; j < size; j++) {
                const cellData = { ship: null, isShot: false };
                coordinates[i][j] = cellData;
            }
        }

        this.coordinates = coordinates;
    }

    validSpot(length, coord, isVert) {
        let x = coord[0];
        let y = coord[1];
                                   
        if(isVert && ((y + length) > this.columns)) {               //if ship is vertical
            throw new Error('Ship placement is out of bounds!');
        } else if(!isVert && ((x + length) > this.rows)) {          //if ship is horizontal
            throw new Error('Ship placement is out of bounds!');
        }

        for (var i = 0; i < length; i++) {
            if(isVert && (this.coordinates[x][y+i].ship !== null)) {                                //if ship is vertical
                throw new Error('A ship is already in this place!');
            } else if(!isVert && (this.coordinates[x+i][y].ship !== null)) {                       //if ship is horizontal
                throw new Error('A ship is already in this place!');
            }
        }
        
        return this.setShip(length, coord, isVert);
    }

    setShip(length, coord, isVert) {
        let x = coord[0];
        let y = coord[1];
        const ship = new Ship(length);
        this.ships.push(ship);

        for (var i = 0; i < length; i++) {
            if(isVert) {                                //if ship is vertical
                this.coordinates[x][y+i].ship = ship;
            } else if (!isVert) {                       //if ship is horizontal
                this.coordinates[x+i][y].ship = ship;
            }
        }
    }

    receiveAttack(coord) {
        let x = coord[0];
        let y = coord[1];
        this.coordinates[x][y].isShot = true;
        const target = this.coordinates[x][y].ship;

        if (target) {
            this.coordinates[x][y].ship.hit();
            return true;
        }

        return false;
    }

    allSunk() {
        return this.ships.every((currentShip) => currentShip.isSunk());
    }
}

export { Gameboard };