'use strict'
main();

// Complete the flippingMatrix function below.
function flippingMatrix(matrix) {
    const HALF_ROW_LENGGH = matrix[0].length / 2;
    let maxSumValue = 0;
    for (let row = 0; row < HALF_ROW_LENGGH; row++) {
        for (let column = 0; column < HALF_ROW_LENGGH; column++) {
            let positions = [
                [row, 2 * HALF_ROW_LENGGH - 1 - column],
                [2 * HALF_ROW_LENGGH - 1 - row, column],
                [2 * HALF_ROW_LENGGH - 1 - row, 2 * HALF_ROW_LENGGH - 1 - column]], maxCellValue = matrix[row][column];

            for (let position of positions)
                maxCellValue = Math.max(maxCellValue, matrix[position[0]][position[1]]);

            maxSumValue += maxCellValue;
        }
    }

    return maxSumValue;
}

function main() {
    let inputs = [`1
    2
    112 42 83 119
    56 125 56 49
    15 78 101 43
    62 98 114 108`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10);
            let matrix = Array(2 * n);

            for (let i = 0; i < 2 * n; i++)
                matrix[i] = lines[index++].split(' ').map(matrixTemp => parseInt(matrixTemp, 10));

            let result = flippingMatrix(matrix);
            console.log(result + "\n");
        }
    }
}

