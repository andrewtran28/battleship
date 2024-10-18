import { Gameboard } from '../gameboard';

test('Create a Gameboard that is 3x3', () => {
    const boardTest = new Gameboard(3);
    expect(boardTest).toEqual({ rows: 3, columns: 3, coordinates: [
        [{ isShot: false, ship: null }, { isShot: false, ship: null }, { isShot: false, ship: null }],
        [{ isShot: false, ship: null }, { isShot: false, ship: null }, { isShot: false, ship: null }],
        [{ isShot: false, ship: null }, { isShot: false, ship: null }, { isShot: false, ship: null }],
    ], ships: [] });
});


test('Create a Gameboard that is 10x10 (Coordinates are not tested)', () => {
    const gameboardTest = new Gameboard(10, 10);
    expect(gameboardTest).toEqual(expect.objectContaining({ rows: 10, columns: 10, ships: [] }));
});

test('Shooting at coordinates [2,3]', () => {
    const gameboardTest = new Gameboard(10, 10);
    gameboardTest.receiveAttack([2,3]);
    expect(gameboardTest.coordinates[2][3]).toEqual({ isShot: true, ship: null});
});

test('Place ship of length 1 at [0, 0] (Horizontal/Vertical does not matter', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 1, hits: 0 };
    gameboardTest.validSpot(testShip.length, [0,0], false);
    expect(gameboardTest.coordinates[0][0]).toEqual({ isShot: false, ship: testShip });
    expect(gameboardTest.coordinates[0][1]).toEqual({ isShot: false, ship: null });
    expect(gameboardTest.coordinates[1][0]).toEqual({ isShot: false, ship: null });
});

test('Place ship of length 2 at [1, 1] horizontally', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 2, hits: 0 };
    gameboardTest.validSpot(testShip.length, [1,1], false);
    expect(gameboardTest.coordinates[1][1]).toEqual({ isShot: false, ship: testShip });
    expect(gameboardTest.coordinates[2][1]).toEqual({ isShot: false, ship: testShip });
    expect(gameboardTest.coordinates[1][2]).toEqual({ isShot: false, ship: null });
});

test('Place ship of length 3 at [1, 1] vertically', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 3, hits: 0 };
    gameboardTest.validSpot(testShip.length, [1,1], true);
    expect(gameboardTest.coordinates[1][1]).toEqual({ isShot: false, ship: testShip });
    expect(gameboardTest.coordinates[1][2]).toEqual({ isShot: false, ship: testShip });
    expect(gameboardTest.coordinates[1][3]).toEqual({ isShot: false, ship: testShip });
});

test('Place ship of length 2 at [0, 9] vertically (Invalid spot: Out of bounds)', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 2, hits: 0 };
    expect(() => gameboardTest.validSpot(testShip.length, [0,9], true))
        .toThrow('Ship placement is out of bounds!');
});

test('Place ship at [4,3] where another ship already exists (Invalid spot: Ship overlap)', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 2, hits: 0 };
    const testShipInvalid = { length: 3, hits: 0 };
    gameboardTest.setShip(testShipInvalid.length, [4,3], false);
    expect(() => gameboardTest.validSpot(testShip.length, [4,3], true)).toThrow('A ship is already in this place!');
});

test('Not all ships are sunk', () => {
    const gameboardTest = new Gameboard(10, 10);
    gameboardTest.validSpot(2, [0,0], false);
    expect(gameboardTest.allSunk()).toBe(false);
})

test('Shoot a ship with length 1 at [1,1]; All ships sunk', () => {
    const gameboardTest = new Gameboard(10, 10);
    const testShip = { length: 1, hits: 1 }; 
    gameboardTest.validSpot(testShip.length, [0,0], false);
    gameboardTest.receiveAttack([0, 0]);
    expect(gameboardTest.coordinates[0][0]).toEqual({ isShot: true, ship: testShip });
    expect(gameboardTest.allSunk()).toBe(true);
})