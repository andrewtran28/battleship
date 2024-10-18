import { Player } from '../player';

let testPlayer1, testPlayer2;

beforeEach(() => {
    testPlayer1 = new Player('human');
    testPlayer2 = new Player('computer');
});

test('Create Player1 as a human player with gameboard', () => {
    expect(testPlayer1).toEqual(expect.objectContaining({ playerType: 'human', }));
    expect(testPlayer1).toEqual({ playerType: 'human', gameboard: expect.objectContaining({ rows: 10, columns: 10, ships: [] }) });
}); 

test('Create Player2 as a computer player with gameboard', () => {
    expect(testPlayer2).toEqual(expect.objectContaining({ playerType: 'computer', }));
    expect(testPlayer2).toEqual({ playerType: 'computer', gameboard: expect.objectContaining({ rows: 10, columns: 10, ships: [] }) });
}); 