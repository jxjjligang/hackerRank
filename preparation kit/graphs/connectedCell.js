'use strict'

// Complete the maxRegion function below.
function maxRegion(grid) {
    function constructCells(grid) {
        let key2Value = new Map();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++)
                key2Value.set(i * COLUMN_LENGTH + j, grid[i][j]);
        }

        return key2Value;
    }

    function dfs(key, key2Value, visitedCells) {
        if (!key2Value.has(key) || visitedCells.has(key))
            return;

        let value = key2Value.get(key);
        if (value === 0)
            return;

        oneTimeResult++;
        visitedCells.add(key);
        /*
        0 means current cell, it has 8 possible adjacent cells, each number from 1 to 8 represents a possible position
                    6 7 8
                    5 0 1
                    4 3 2  
        */
        //                      1        2                        3                    4                        5        6                        7                    8
        // let adjacentCells = [key + 1, key + 1 + COLUMN_LENGTH, key + COLUMN_LENGTH, key + COLUMN_LENGTH - 1, key - 1, key - 1 - COLUMN_LENGTH, key - COLUMN_LENGTH, key - COLUMN_LENGTH + 1];
        // starts with position 3 and 7 
        let adjacentCells = [key + COLUMN_LENGTH, key - COLUMN_LENGTH];
        if (key % COLUMN_LENGTH !== 0) {
            adjacentCells.push(key + COLUMN_LENGTH - 1);
            adjacentCells.push(key - 1);
            adjacentCells.push(key - 1 - COLUMN_LENGTH);
        }
        if ((key + 1) % COLUMN_LENGTH !== 0) {
            adjacentCells.push(key + 1);
            adjacentCells.push(key + 1 + COLUMN_LENGTH);
            adjacentCells.push(key - COLUMN_LENGTH + 1);
        }
        adjacentCells = adjacentCells.filter(e => key2Value.has(e));

        adjacentCells.forEach(element => dfs(element, key2Value, visitedCells));
    }

    const ROW_LENGTH = grid.length, COLUMN_LENGTH = grid[0].length;
    let maxRegion = 0, key2Value = constructCells(grid), visitedCells = new Set();
    let oneTimeResult;
    for (let key = 0; key < ROW_LENGTH * COLUMN_LENGTH; key++) {
        if (!visitedCells.has(key) && key2Value.get(key) === 1) {
            oneTimeResult = 0;
            dfs(key, key2Value, visitedCells);
            maxRegion = Math.max(maxRegion, oneTimeResult);
        }
    }

    return maxRegion;
}

main();

function main() {
    let input = `4
    4
    1 1 0 0
    0 1 1 0
    0 0 1 0
    1 0 0 0`;       // expects 5

    input = `5
    5
    1 0 1 1 0
    1 1 0 0 1
    0 1 1 1 0
    0 0 0 0 1
    1 1 1 0 0`;     // expects 10

    input = `5
    4
    0 0 1 1
    0 0 1 0
    0 1 1 0
    0 1 0 0
    1 1 0 0`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const n = parseInt(lines[index++], 10), m = parseInt(lines[index++], 10);
    let grid = Array(n);
    for (let i = 0; i < n; i++)
        grid[i] = lines[index++].split(' ').map(gridTemp => parseInt(gridTemp, 10));

    const res = maxRegion(grid);
    console.log(res);
}
