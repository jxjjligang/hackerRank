'use strict'

main();

// Complete the bomberMan function below.
function bomberMan(n, grid) {
    const EMPTY = '.', BOMB = 'O', POSITIONS = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];

    if (n <= 1)
        return grid;
    else {  // n > 1
        let gridAllBombs = [];
        for (let i = 0; i < grid.length; i++)
            gridAllBombs.push(grid[i].slice().replace(/\./g, BOMB).split(''));

        if (n % 2 === 0)
            return gridAllBombs.map(row => row.join(''));
        else {
            if ((n - 1) % 4 === 0)
                return grid;
            else {
                for (let i = 0; i < grid.length; i++) {
                    let row = grid[i];
                    for (let j = 0; j < row.length; j++) {
                        let char = row[j];
                        if (char === BOMB) {
                            for (let position of POSITIONS) {
                                if (gridAllBombs[i + position[0]] !== undefined && gridAllBombs[i + position[0]][j + position[1]] !== undefined)
                                    gridAllBombs[i + position[0]][j + position[1]] = EMPTY;
                            }
                        }
                    }
                }
                return gridAllBombs.map(row => row.join(''));
            }
        }
    }
}

function main() {
    let inputs = [`6 7 5
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