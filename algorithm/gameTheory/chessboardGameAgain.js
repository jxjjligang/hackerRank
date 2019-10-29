'use strict'

main();


function chessboardGame(coins) {
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
                        grid[i][j] = 0;     // in this location [i,j], there is no [next step], play 1 will loses 
                    else {
                        if (nextSteps.some(step => step === undefined))
                            continue;
                        else {
                            let set = new Set(nextSteps);
                            let nimValue = set.size;
                            for (let i = 0; i < set.size; i++) {
                                if (!set.has(i)) {
                                    nimValue = i;
                                    break;
                                }
                            }
                            grid[i][j] = nimValue;
                        }
                    }

                }
            }
        }
        while (undefinedExisted === true)
    }

    let xorResult = 0;
    for (let coin of coins)
        xorResult ^= grid[coin[0] - 1][coin[1] - 1];
        
    return xorResult !== 0 ? 'First' : 'Second';
}

function main() {
    let inputs = [`2
3
5 4
5 8
8 2
6
7 1
7 2
7 3
7 4
7 4
7 4`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const k = parseInt(lines[index++], 10);
            let coins = Array(k);
            for (let coinsRowItr = 0; coinsRowItr < k; coinsRowItr++)
                coins[coinsRowItr] = lines[index++].split(' ').map(coinsTemp => parseInt(coinsTemp, 10));

            let result = chessboardGame(coins);
            console.log(result + "\n");
        }
    }
}
