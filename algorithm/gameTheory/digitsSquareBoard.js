'use strict'

let board2NimValue = new Map();
main();
function squareBoard(board) {
    function getNonPrimes(board) {
        let nonPrimes = [];
        for (let i = 0; i < board.length; i++) {
            let line = board[i];
            for (let j = 0; j < line.length; j++) {
                let cell = line[j];
                if (cell === 1 || cell === 4 || cell === 6 || cell === 8 || cell === 9)
                    nonPrimes.push([i, j]);
            }
        }

        return nonPrimes;
    }

    function mex(nimValues) {
        if (nimValues.length === 0)
            return 0;

        let set = new Set(nimValues);
        let i = 0;
        for (; i < set.size; i++) {
            if (!set.has(i))
                return i;
        }

        return i;
    }

    function getBoardKey(board) {
        let rows = board.map(row => row.reduce((agg, cur) => agg + cur, ''));
        return rows.join('-');
    }


    function getNimValue(board) {
        if (board.length * board[0].length === 1)
            return 0;

        let boardKey = getBoardKey(board)
        if (board2NimValue.has(boardKey))
            return board2NimValue.get(boardKey);

        let nonPrimes = getNonPrimes(board);
        if (nonPrimes.length === 0)
            return 0;

        let nimValues = [], boardRows = board.length, boardColumns = board[0].length;
        nonPrimes.forEach(cell => {
            let cellRowIdx = cell[0], cellColumnIdx = cell[1];

            // there could be 4 ways to cut cell, 
            // First, try split horizontally 
            if (boardRows > 1) {
                let indexes = [];
                if (cellRowIdx === 0)
                    indexes.push(1);
                else {
                    indexes.push(cellRowIdx);
                    if (cellRowIdx < (boardRows - 1))
                        indexes.push(cellRowIdx + 1);
                }
                for (let splitIdx of indexes) {
                    let board1 = board.slice(0, splitIdx), board2 = board.slice(splitIdx);
                    let nimValue1 = getNimValue(board1), nimValue2 = getNimValue(board2);
                    nimValues.push(nimValue1 ^ nimValue2);
                }
            }

            if (boardColumns > 1) {  // split by column
                let indexes = [];
                if (cellColumnIdx === 0)
                    indexes.push(1);
                else {
                    indexes.push(cellColumnIdx);
                    if (cellColumnIdx < (boardColumns - 1))
                        indexes.push(cellColumnIdx + 1);
                }
                for (let splitIdx of indexes) {
                    let board1 = [], board2 = [];
                    for (let row of board) {
                        board1.push(row.slice(0, splitIdx));
                        board2.push(row.slice(splitIdx));
                    }

                    let nimValue1 = getNimValue(board1), nimValue2 = getNimValue(board2);
                    nimValues.push(nimValue1 ^ nimValue2);
                }
            }

        });
        let nimValue = mex(nimValues);
        board2NimValue.set(boardKey, nimValue);
        return nimValue;
    }

    let nim = getNimValue(board);
    return (nim !== 0 ? 'First' : 'Second');
}

/**
 * 3
4 6 3
5 4 3
6 2 1 
Second should win
 */
function main() {
    let inputs = [`1
    3
4 6 3
5 4 3
6 2 1`,
        `6
    1
    3
    2
    2 3
    5 7
    3
    2 2 2
    2 1 2
    2 2 2
    5
    1 2 3 4 5
    1 2 3 4 5
    1 2 3 4 5
    1 2 3 4 5
    9 8 7 6 5
    2
    4 4
    4 4
    3
    9 9 8
    9 8 9
    9 6 8`,
        `2
    3
    2 7 5
    2 7 5
    7 7 7
     2
    4 3
    1 2`   ];

    // i === 1, result is Second Second Second Second First Second
    // i === 2, result is Second First

    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);
            let board = Array(n);
            for (let boardRowItr = 0; boardRowItr < n; boardRowItr++)
                board[boardRowItr] = lines[index++].split(' ').map(boardTemp => parseInt(boardTemp, 10));

            let result = squareBoard(board);
            console.log(result);
        }
    }
}
