'use strict'
main();

// Based on discussion from below
/*
    jawad_cs (3 years ago)
    From seeing the game one can conclude that positions (1,1)(1,2)(2,1)(2,2) are P positions.(i.e win for previous player who just played or in other words first player losing position )
    After marking these four squares with P's the rest of the squares can be marked recursively following the below procedure:-
    step-1: mark the four squares P's
    step-2: mark all those squares from where you can reach atleast one P postion as N
    step-3: mark all those squares from where all the legal moves lead you to only N positions as P positions
    Perform the above steps recursively and you will generate a chess board as the one shown below
*/
// Complete the chessboardGame function below.
function chessboardGame(x, y) {
    const GRID_SIZE = 15, NEXT_POSITIONS = [[-2, 1], [-2, -1], [1, -2], [-1, -2]];;
    let grid = [];
    initialize();
    function initialize() {
        for (let i = 0; i < GRID_SIZE; i++) {
            let row = [];
            grid.push(row);
        }

        let undefinedExisted;
        do {
            undefinedExisted = false;
            for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                    let existing = grid[i][j];
                    if (existing !== undefined)
                        continue;

                    undefinedExisted = true;
                    let nextSteps = [];
                    for (let p of NEXT_POSITIONS) {
                        let nextX = i + p[0], nextY = j + p[1];
                        if (nextX >= 0 && nextX < 15 && nextY >= 0 && nextY < 15)
                            nextSteps.push(grid[nextX][nextY]);
                    }
                    if (nextSteps.length === 0)
                        grid[i][j] = false;     // in this location [i,j], there is no [next step], play 1 will loses 
                    else {
                        if (nextSteps.some(step => step === false))
                            grid[i][j] = true;  // in this location [i,j], player 1 have at one move to a losing position for player 2, that's why we say player 1 will win
                        else if (nextSteps.every(step => step === true))
                            grid[i][j] = false; // in this location [i,j], player 2 have all his next step win, then for player 1 he will lose
                    }

                }
            }
        }
        while (undefinedExisted === true)
    }

    return grid[x - 1][y - 1] === true ? 'First' : 'Second';
}

function main() {
    let inputs = [`3
    7 3
    8 12
    9 7`,
        `3
        5 2
        5 3
        8 8`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const xy = lines[index++].split(' ');

            const x = parseInt(xy[0], 10);

            const y = parseInt(xy[1], 10);

            let result = chessboardGame(x, y);

            console.log(result);
        }
        console.log('-----------------------------');
    }
}
