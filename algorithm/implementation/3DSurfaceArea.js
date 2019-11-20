'use strict'

main();

// Complete the surfaceArea function below.
function surfaceArea(A) {
    const ROW_COUNT = A.length, COLUMN_COUNT = A[0].length;

    //                       north,   east,   south,   west
    const FOUR_DIRECTIONS = [[-1, 0], [0, 1], [-1, 0], [0, -1]];

    let totalArea = 0;
    for (let i = 0; i < ROW_COUNT; i++) {
        let row = A[i];
        for (let j = 0; j < COLUMN_COUNT; j++) {
            let cell = row[j];
            totalArea += 2;   // adds up top/bottom side of cell
            for (let direction of FOUR_DIRECTIONS) {
                let anotherRow = A[i + direction[0]];
                if (anotherRow === undefined)
                    totalArea += cell;
                else {
                    let anotherCell = anotherRow[j + direction[1]];
                    if (anotherCell === undefined)
                        totalArea += cell;
                    else {
                        if (cell > anotherCell)
                            totalArea += (cell - anotherCell);
                    }
                }
            }
        }
    }

    return totalArea;
}

function main() {
    let inputs = [`1 1
    1`,
    `3 3
1 3 4
2 2 3
1 2 4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const HW = lines[index++].split(' '), H = parseInt(HW[0], 10), W = parseInt(HW[1], 10);
        let A = Array(H);
        for (let i = 0; i < H; i++)
            A[i] = lines[index++].split(' ').map(ATemp => parseInt(ATemp, 10));

        let result = surfaceArea(A);
        console.log(result + "\n");
    }
}