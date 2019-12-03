'use strict'

main();


// Complete the connectedCell function below.
function connectedCell(matrix) {
    const LINES_COUNT = matrix.length, COLUMN_COUNT = matrix[0].length, CELL_ZERO = 0;

    //                           top, upRight, right, bottomRight, bottom, bottomLeft, left, upLeft
    const CONNECTED_POSITIONS = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

    function getConnectedCount(line, column, matrix) {
        let cell = matrix[line][column];
        if (cell === CELL_ZERO)
            return 0;

        matrix[line][column] = CELL_ZERO;
        let count = 0;
        for (let position of CONNECTED_POSITIONS) {
            let newLine = line + position[0], newColumn = column + position[1];
            if (newLine < 0 || newLine >= LINES_COUNT || newColumn < 0 || newColumn >= COLUMN_COUNT || matrix[newLine][newColumn] === CELL_ZERO)
                continue;

            count += getConnectedCount(newLine, newColumn, matrix);
        }

        return 1 + count;
    }

    let max = 0;
    for (let i = 0; i < LINES_COUNT; i++) {
        for (let j = 0; j < COLUMN_COUNT; j++) {
            let cell = matrix[i][j];
            if (cell === CELL_ZERO)
                continue;
            max = Math.max(max, getConnectedCount(i, j, matrix));
        }
    }

    return max;
}

function main() {
    let inputs = [`4
    4
    1 1 0 0
    0 1 1 0
    0 0 1 0
    1 0 0 0`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const n = parseInt(lines[index++], 10), m = parseInt(lines[index++], 10);
        let matrix = Array(n);
        for (let i = 0; i < n; i++)
            matrix[i] = lines[index++].split(' ').map(matrixTemp => parseInt(matrixTemp, 10));

        let result = connectedCell(matrix);
        console.log(result + "\n");
    }
}