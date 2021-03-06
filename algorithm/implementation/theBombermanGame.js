'use strict'

main();

// Complete the bomberMan function below.
function bomberMan(n, grid) {
    const EMPTY = '.', BOMB = 'O', POSITIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const GRID_ROWS = grid.length, GRID_COLUMNS = grid[0].length;

    function decreaseTime(gridArr) {
        for (let i = 0; i < GRID_ROWS; i++) {
            let row = gridArr[i];
            for (let j = 0; j < GRID_COLUMNS; j++) {
                let char = row[j];
                if (char === 3 || char === 2 || char === 1)
                    row[j]--;

                char = row[j];  // updated cell value

            }
        }
    }

    function detnote(gridArr) {
        for (let i = 0; i < GRID_ROWS; i++) {
            let row = gridArr[i];
            for (let j = 0; j < GRID_COLUMNS; j++) {
                let char = row[j];
                if (char === 0) {   // bomb detonate
                    let jj = j;
                    for (let position of POSITIONS) {
                        row[j] = EMPTY;
                        let newI = i + position[0], newJ = j + position[1];
                        if (newI >= 0 && newI < GRID_ROWS && newJ >= 0 && newJ < GRID_COLUMNS && gridArr[newI][newJ] !== 0)
                            gridArr[newI][newJ] = EMPTY;
                    }
                }   // if (char === 0) {
            }       // for (let j = 0;
        }           //  for (let i = 0;
    }

    function plantBomb(gridArr) {
        for (let i = 0; i < GRID_ROWS; i++) {
            let row = gridArr[i];
            for (let j = 0; j < GRID_COLUMNS; j++) {
                let char = row[j];
                if (char === EMPTY)
                    row[j] = 3;
            }
        }
    }

    function outputResult(secondsElapsed, gridArr) {
        console.log(`${secondsElapsed} seconds passed.`);

        let tmpGridArr = gridArr.map(row => row.map(c => (c === 3 || c === 2 || c === 1) ? BOMB : c));
        tmpGridArr = tmpGridArr.map(row => row.join(''));
        console.log(tmpGridArr.join(''));
        console.log();
    }

    function getGridAfter(n, grid) {
        let gridArr = grid.map(row => row.split('').map(c => (c === BOMB ? 3 : c)));
        let secondsElapsed = 0;
        while (n > 0) {
            n--;
            secondsElapsed++;

            decreaseTime(gridArr);
            detnote(gridArr);
            if (secondsElapsed % 2 === 0)
                plantBomb(gridArr);

            // outputResult(secondsElapsed, gridArr);
        }

        gridArr = gridArr.map(row => row.map(c => (c === 3 || c === 2 || c === 1) ? BOMB : c));
        return gridArr.map(row => row.join(''));
    }

    if (n <= 1)
        return grid;
    else {
        if (n % 2 === 0)
            return grid.map(row => BOMB.repeat(GRID_COLUMNS));
        else {
            let remainder = n % 4;
            return getGridAfter(remainder === 1 ? 5 : remainder, grid);
        }
    }
}

function main() {
    let inputs = [`1 199 181054341
    O..OO........O..O........OO.O.OO.OO...O.....OOO...OO.O..OOOOO...O.O..O..O.O..OOO..O..O..O....O...O....O...O..O..O....O.O.O.O.....O.....OOOO..O......O.O.....OOO....OO....OO....O.O...O..OO....OO..O...O`,
        `6 7 5
    .......
    ...O.O.
    ....O..
    ..O....
    OO...OO
    OO.O...`,
        `6 7 3
    .......
    ...O...
    ....O..
    .......
    OO.....
    OO.....`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const rcn = lines[index++].split(' '), r = parseInt(rcn[0], 10), c = parseInt(rcn[1], 10), n = parseInt(rcn[2], 10);

        let grid = [];
        for (let i = 0; i < r; i++) {
            const gridItem = lines[index++];
            grid.push(gridItem);
        }

        let result = bomberMan(n, grid);
        console.log(result.join("\n") + "\n");
    }
}