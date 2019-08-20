'use strict'

function minimumMoves(grid, startX, startY, goalX, goalY) {
    function getAllPoints(grid) {
        let points = [];
        const ROW_COUNT = grid.length, COLUMN_COUNT = grid[0].length;
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COLUMN_COUNT; j++) {
                if (grid[i][j] !== 'X')
                    points.push([i, j]);
            }
        }

        return points;
    }

    function cons


    let minMoves = 0;
    let points = getAllPoints(grid);
    return minMoves;
}

main();
function main() {
    let input = `3
    .X.
    .X.
    ...
    0 0 0 2`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const n = parseInt(lines[index++], 10);
    let grid = [];
    for (let i = 0; i < n; i++) {
        const gridItem = lines[index++];
        grid.push(gridItem);
    }

    const startXStartY = lines[index++].split(' ');
    const startX = parseInt(startXStartY[0], 10), startY = parseInt(startXStartY[1], 10);
    const goalX = parseInt(startXStartY[2], 10), goalY = parseInt(startXStartY[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);
    console.log(result + '\n');
}