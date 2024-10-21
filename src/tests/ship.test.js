import { Ship } from "../ship";

let testShip1, testShip5;

beforeEach(() => {
    testShip1 = new Ship(1);
    testShip5 = new Ship(5);
})

test('create Ship1 with length of 1', () => {
    expect(testShip1).toEqual({ length: 1, hits: 0 });
}) 

test('create Ship5 with length of 5', () => {
    expect(testShip5).toEqual({ length: 5, hits: 0 });
})

test('Ship1 is hit once; Ship1 is sunk', () => {
    testShip1.hit();
    expect(testShip1).toEqual({ length: 1, hits: 1 });
    expect(testShip1.isSunk()).toBe(true);
}) 

test('Ship5 is hit once; Ship5 is not sunk yet', () => {
    testShip5.hit();
    expect(testShip5).toEqual({ length: 5, hits: 1 });
    expect(testShip1.isSunk()).toBe(false);
})

test('Ship5 is hit 5 times; Ship5 is sunk', () => {
    for (let i = 0; i < 5; i += 1) {
        testShip5.hit();
    }
    expect(testShip5.isSunk()).toBe(true);
}) 