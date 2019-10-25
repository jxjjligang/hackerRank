'use strict'
main();



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
                        grid[i][j] = true;     // there is no [next step], play 1 wins when put coin in [i, j]
                    else {
                        if (nextSteps.every(step => step === true))
                            grid[i][j] = false;
                        else if (nextSteps.some(step => step === false))
                            grid[i][j] = true;
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
