'use strict'

main();

// Based on the idea and [sample code] from Editorial
function kMarsh(grid) {
    const ROW_LEN = grid.length, CLM_LEN = grid[0].length, DOT_CHAR = '.';

    // left is 2 dimensional array [i][j], i is row index, j is column index, left[i][j] saves value is how may . to its left (include itself)
    // up is 2 dimensional array [i][j], i is row index, j is column index, left[i][j] saves value is how may . to its upside (include itself) 
    let left = [], up = [];
    for (let i = 0; i < ROW_LEN; i++) {
        let leftRow = [];
        left.push(leftRow);
        leftRow[0] = (grid[i][0] === DOT_CHAR ? 0 : -1);
        for (let j = 1; j < CLM_LEN; j++)
            leftRow[j] = (grid[i][j] === DOT_CHAR ? 1 + left[i][j - 1] : -1);
    }

    let firstUpRow = [];
    up.push(firstUpRow);
    for (let j = 0; j < CLM_LEN; j++)
        firstUpRow[j] = (grid[0][j] === DOT_CHAR ? 0 : -1);

    for (let i = 1; i < ROW_LEN; i++) {
        let upRow = [];
        for (let j = 0; j < CLM_LEN; j++) {
            upRow[j] = (grid[i][j] === DOT_CHAR ? 1 + up[i - 1][j] : -1);
        }
        up.push(upRow);
    }

    let maxPerimeter = -1;
    for (let r1 = 0; r1 < ROW_LEN - 1; r1++) {
        for (let r2 = 1 + r1; r2 < ROW_LEN; r2++) {
            let rowDiff = r2 - r1, upRow = up[r2], clmIndexes = [];
            for (let j = 0; j < upRow.length; j++) {
                if (upRow[j] >= rowDiff)
                    clmIndexes.push(j);
            }

            let leftClm = 0;
            for (let rightIdx of clmIndexes) {
                let minLeft = rightIdx - Math.min(left[r2][rightIdx], left[r1][rightIdx]);
                while (clmIndexes[leftClm] < minLeft)
                    leftClm++;

                if (rightIdx > clmIndexes[leftClm])
                    maxPerimeter = Math.max(maxPerimeter, 2 * rowDiff + 2 * (rightIdx - clmIndexes[leftClm]));
            }
        }
    }

    console.log(maxPerimeter === -1 ? 'impossible' : maxPerimeter);
}

function main() {
    let inputs = [`164 220
    .....x.....x...x...x.....x...x...x......x...x.....x....x.x...x....x....x......x....x.x......x....x.....xx....x....x....x........x.x..x....x...x....x......x..x......x.x....x....x...x....x....x......x...x...x....x...x.....
    x..x........xx....x....x...x....x....x....x......x.x......x.x....x....x.....x..x....x....x......x......x.x....x..x....x...x......x..x....x....x.....x..x....x...x....x....x.....x....x......xx....x.....x......xx....x....x.
    ..x.....x....x...x...x.....x.....x..x...x.....x....x...x.....x....x...x...x....x...x.....x...x....x......x.x....x....x...x......x....x......xx...x....x.....x...x...x.......x..x...x...x.....x...x....x......x.x......x....x
    ..x...x.........xx..x......x...x...x...........x...x..x..x.x...x......x..x....x...x.....x...x....x...x....x....x....x.....x...x...x......x.x.....x.....x...x...x....x...x......x..x....x...x......x..x...x....x....x....x...
    .x...x.....x...x....x...x.......x..x...x.....x......xx.......x.x....x...x......x..x....x....x...x...x....x.....x.....x..x...x.....x......x...x.x....x....x....x....x...x....x......x..x......x.x....x...x....x.......x.x....
    .x..x....x.....x...x...x....x.....x.....x.x.....x.......xx...........x..xx..x......x..x...x.........x..xx.......x.x....x...x....x....x....x...x.....x...x....x...x....x....x....x...x....x.......x...x..x......x.....x.x...x
    ....x....x....x...x...x.....x...x....x...x.......x..x...x....x...x....x....x....x....x.....x..x.....x..x.....x....x....x...x...x.....x...x...x......x...x...x...x.......x..x...x...x.....x.....x...x.....x.x......x....x...x
    ...x...x....x....x........x.x..x.....x..x....x.......x..x...x....x...x....x....x.....x..x......x...x..x....x.....x...x....x...x.....x....x.....x..x.....x..x....x.....x...x...x........xx...x......x..x.....x..x.....x....x.
    .x....x......x..x...x.....x....x...x...x......x..x.....x......x.x.......x..x...x..x......x..x....x....x.......xx......x.x....x.....x....x..x....x.......x...x...x..x....x....x....x....x.......x.x...x......x.x.....x...x...
    x......x..x.....x...x...x.....x...x.....x.....x.x.....x....x..x....x....x....x...x.......x..x....x..x......x...x...x...x...........xx..x...x...x......x...x...x.......x....x.....x..x.x...x....x....x...x......x..x....x...x
    .....x....x.....x....x.x....x......x..x...x.....x...x....x....x....x...x....x...x......x..x....x...x.....x...x....x....x...x....x....x....x...x.......x.x....x...x.....x.....x....x...x...x.....x...x.......x.x......xx.....
    x......xx......x..x...x......x..x.......x..x..x.....x....x....x....x..x.....x......xx.....x.....x..x...x....x.....x....x...x...x....x....x.....x..x....x........x.x..x.....x...x...x....x....x....x....x...x.....x....x....x
    ....x..x....x....x...x.....x...x......x...x..x....x......x..x....x....x.....x....x.x........x...x.x...x....x....x....x...x....x....x......x..x...x......x.........x.xx....x........x.x..x...x....x....x...x....x....x.....x.
    .x.....x....x...x...x....x....x.......xx......x......x.x......x.x...x....x....x.....x..x....x....x...x.......x...x...x..x.....x...x......x.x....x....x....x.......x.x...x.....x...x.....x....x..x.....x...x...x....x....x...
    x.....x...x....x....x.....x..x....x.....x....x...x.......x....xx.....x....x.....xx.....x.....x....x.x....x....x....x....x....x....x....x.........xx..x......x...x..x...x....x....x...x......x.....x.x....x...x.....x...x....
    x...x..........xx.....x...x....x..x...x...x....x........xx...x....x....x.......x.x.....x...x...x...x..........x.x..x.....x.x....x....x....x....x....x......x..x...x...x....x........xx....x.......xx...x....x....x....x....x
    .....x..x....x......x.x....x.....x....x....x....x...x...x.......x.x............x.x.x..x..x.....x...x...x.....x...x.....x..x.....x....x....x...x...x.......x.x...x......x..x.....x..x....x....x....x....x......x..x...x....x.
    ..x....x....x.....x..x....x....x.......xx....x.......x..x....x..x....x.....x....x..x.....x....x....x....x....x.....x.x...x....x......x....x.......x.....xx.x.....x...x....x....x...x...x....x.....x.....x.....xx.....x....x.
    .x....x..........xx.x......x..x....x...x....x.....x...x....x...x....x.....x....x..x....x....x......x.x....x....x....x....x.....x..x.........x.x....x.x....x....x....x...x.....x...x....x....x...x.....x..x.......x.x....x...
    x....x.....x....x.....x.x....x....x....x...x.....x....x...x....x....x...x....x...x....x.....x......xx....x....x.....x..x.....x.....x..x....x...x....x....x....x....x.......x.x......x......x.x.x....x...x....x......x..x...x
    ......x.....x.x....x....x...x......x..x...x.......x.x.....x..x....x.....x...x.....x..x.....x....x..x....x.....x...x......x...x..x....x....x...x.......x.x.....x..x.......x.....xx...x......x...x...x...x....x....x.....x....
    x.....x....x....x..x...x...x....x....x...x........x...x...x...x..x.....x....x...x....x...x.....x.....x.x......x..x.....x..x....x....x.......x.x...x......x..x...x.....x...x....x....x.....x..x....x.....x..x.......x.......x
    x..x...x....x....x...x.....x....x...x......x.x....x....x...x....x......x...x....x..x......x..x....x...x....x....x....x.....x..x....x....x....x......x.x....x.....x..x.......x.x....x.....x..x.........x....xx..x.......x.x..
    ...x.....x.x....x...x....x............xxx...x........x...x..x...x....x...x......x..x...x....x....x...x....x....x......x...x...x....x........x........xx.x.x....x....x...x....x......x.x.....x....x...x....x...x.....x...x...
    .x.......x..x...x..x....x.....x.....x..x...x....x.......x.x...x....x.........x.x.x....x...........xxx......x..x.....x..x.....x.....x..x....x...x......x..x......x...x..x....x......x.x.....x....x.....x.....xx....x.......x.
    x....x....x....x...x.......x.x...x.....x..x.......x..x...x...x....x....x.........xx...x....x...x....x...x....x.....x...x.....x..x.....x.....x...x...x.......xx...x....x....x......x...........xx....xx.x....x.....x...x....x
    .....x...x...x....x...x......x..x.......xx....x....x....x...x......x..x....x...x....x.......x..x....x..x....x....x....x.....x...x...x.....x....x.....x.x....x.....x..x....x....x...x....x......x..x....x....x.....x..x....x.
    ..x....x.....x.....x.x.........x.x....x.....x...x.x.....x...x.....x....x..x.....x..x....x.....x...x....x...x....x....x....x......x.x.......xx........xx....x....x....x...x......x..x......x....x.x......x..x...x....x.....x.
    .x....x....x......x.x......x....x..x...x....x....x....x......x.x.....x....x.....x....x....x.....xx....x...x.....x...x....x...x....x....x...x....x.....x...x....x...x.....x...x.......xx.....x....x...x......x...x..x......x.
    x........xx.....x...x...x....x.....x......xx....x.....x....x......xx....x......x.x....x........xx....x...x....x.....x...x...x........xx.....x....x...x...x.....x..x......x.......xx....x......x.x....x...x...x......x..x...x
    ......x....x.....x..x....x..x.......x...x...x..x....x.......x.x...x........x.x.....x.x....x.....x..x....x.....x...x....x...x....x......x....x..x....x.....x..x...x....x....x....x.....x.....x.x....x...x....x.....x...x.....
    .x.x....x....x.......xx....x....x.......xx....x....x.........x.x.x.....x....x....x..x.....x...x.....x..x......x..x.....x..x......x..x....x.....x....x..x........x.x..x....x....x...x......x..x....x......x..x.......xx......
    x..x...x......x..x....x....x...x........x..x.x....x.......xx....x....x....x....x...x....x....x.....x..x.....x.....x..x....x...x.....x...x.........x.x......xx....x..x.....x...x......x..x...x.....x...x...x....x....x.......
    xx......x..x....x....x.....x..x....x.....x..........x.....xxx..x....x....x......x.x....x....x.....x..x....x....x....x...x....x.....x...x...x.......x.x......x....x...x...x...x.....x..x....x.....x.....x.x........x....x.x..
    ...x.x........xx...x....x....x......x...x...x...x......x....x.....xx....x....x.....x..x....x....x....x...x.....x...x....x....x......x...x.....x.x.........x.x.x....x...x......x....x..x...x.....x...x....x...x......x..x...x
    ......x..x.....x...x....x...x........xx...x......x..x.....x...x.............xx.xx....x.....x.........x..x....x.x..x.....x....x..x....x....x...x.....x....x...x...x....x....x........x.x...x.....x.....xx.....x....x....x...x
    ...x.....x...x....x.......x.x....x...x...x.....x....x....x..x....x....x....x...x....x....x....x......x....x.x......x...x..x......x...x....x...x...x.....x...x...x....x.....x.......x..x.x....x....x.....x...x....x...x....x.
    ..x.....x...x.......xx....x....x....x...x....x....x....x...x.......x...x..x....x....x...x.....x...x...x......x...x......x.x....x.....x......x.x...x......x.x....x......x.x......x...x...x...x....x....x....x...x....x.....x.
    .x.......x.....x...x...x.x....x....x...x....x....x.....x....x..x....x......x.....x....x...x...x..x...x....x...........xx.....xx......x.x......x..x.....x..x....x...x....x.....x...x...x.....x.....x..x...x....x....x....x...
    .x...x....x....x....x...x......x...x...x....x...x....x....x...x......x...x.........xx..x...x.....x..x.....x...x.......x...x.x.....x...x.....x..x....x.......x..x..x......x...x......x......xx......x....x.x...x....x.....x.x
    ....x.....x...x.......x....x....x.x...x....x...x.....x....x........x..x..x....x..x...x.....x...x...x....x....x....x....x...x........x...x..x...x....x......x.....x..x...x.......x.x.x........x.x...x.....x..x....x....x.....
    .x....x..x...x.......x..x..x....x....x...x.......x...x.......xx..x....x....x.....x....x..x.....x...x...x........xx....x...x....x....x....x...x......x.....x.x....x...x....x....x....x....x......x..x.....x.x....x.....x...x.
    ...x...x..........xx.x...........xx.x...x....x....x....x....x...x.....x....x....x...x...x....x.....x..x....x....x........xx...x.......x..x......xx....x......x.x.....x...x....x....x...x....x....x.....x..x....x.......x....
    .xx....x...x.......xx....x....x....x....x....x...x.....x...x....x...x.......x..x...x...x....x....x...x....x....x.....x..x....x.....x.....x.x....x....x....x....x...x....x......x..x......x.x....x....x....x...x......x..x...
    .x...x.......x..x...x...x.....x........x.......xxx....x...x...x.....x...x......x.x.......x....x..x...x.....x....x..x...x....x.....x...x....x.......xx....x....x......x.x....x....x....x...x.....x....x..x....x....x....x....
    x....x....x....x.....x..x...x....x.....x..x....x....x.....x..x........xx....x...x....x.....x...x...x....x......x......x.x.....x.x....x.........xx...x.......x...xx.....x...x......x..x....x...x.......x.x........xx...x....x
    ...x.....x....x...x.....x...x...x....x.......x...x...x...x...x....x....x....x..x........x..x..x.....x.......xx...x.......x...x.x....x....x...x.....x....x......xx.....x...x......x..x........x.x..x.......x.x...x......x...x
    ....x..x.....x...x...x....x.....x...x...x.....x....x...x...x.....x......x..x...x...x......x...x.....x.....x.x...x....x...x.........xx...x...x.....x.....x....x..x....x....x...x....x....x...x.....x....x..x....x....x....x..
    ..x...x....x......x.....xx........xx...x......x....x..x..........x.xx....x....x......x..x....x.......xx....x....x...x....x....x....x...x.......x..x..x....x.......xx....x....x......x.x......x..x....x....x...x....x....x...
    x....x....x....x.....x...x...x.....x....x..x.....x......x.x...x....x.....x...x...x....x....x.....x.....x..x.....x..x....x...x....x.......x..x..x....x.....x....x...x....x......x...x...x..x....x.....x..x.........x.x..x....
    ..x.x....x....x.....x......xx....x......x..x.....x.....x....x......xx...x....x..x....x......x..x...x.....x...x....x....x........x.....x.x.x....x...x.....x...x...x.....x...x.....x..x.....x...x....x...x......x..x....x....x
    ...x.....x...x....x...x....x......x...x.....x.x....x.......x.x...x......x...x...x.....x....x..x....x...x....x.....x.....x.x......x..x.....x...x...x.......x.x.....x..x....x....x.......xx....x.....x...x....x....x..........
    xxx.......x.x.....x..x....x....x....x....x....x...x.....x..x....x....x......x...x......xx.....x...x....x....x........xx..x.......x.x....x....x......x......x..x.x....x...x.........xx..x....x.....x...x...x....x....x....x..
    .x....x.....x.......xx...x.....x....x....x...x....x....x...x....x...x....x........xx....x...x....x....x...x....x.....x.....x.x....x.....x..x....x.....x...x....x....x......x...x...x..x.....x.....x....x..x...x.....x....x..
    x....x.....x...x...x....x....x.....x....x..x....x....x....x...x.....x....x....x..x....x.......x.x.....x..x....x....x....x...x....x....x.....x..x......x..x........xx....x...x....x...x..........x.x.x.....x...x....x........
    x....xx....x..x....x...x....x.......x.......xx.....x.x.....x.......x.......xxx....x....x........xx.x....x....x....x.....x..x.......x.x.......xx.....x.....x....x..x....x....x......x..x...x...x....x....x...x....x.....x...x
    ...x.....x...x.....x...x...x....x.....x...x...x.....x.....x.x.....x...x....x.......x.x....x...x......x.x....x......x..x....x...x....x....x...x.......x.x.....x.....x.x....x....x...x.......x...x..x.....x..x.....x.....x....
    x.x......x...x...x.....x..x....x....x...x....x.....x...x....x...x.......x.x.....x..x....x....x.....x..x.....x...x.....x..x.....x...x....x....x......x.....x.x.....x....x.x....x....x.......x.....x..x.x...x....x....x.....x.
    .x.......x.x....x...x......x..x....x....x...x......x...x.......x.....xx...x........x..xx....x....x...x........x..x..x....x......x.x.....x..x......x..x....x....x........x.x..x......x..x...x......x..x....x....x...x....x...
    .x....x...x....x....x.......xx....x.....x....x.....x.x....x....x........xx........x.x.x.......x..x..x....x....x......x..x....x....x.......xx...x....x....x.....x..x....x.....x...x.....x..x....x......x.....x.x.......xx....
    x...x....x....x.........xx...x....x...x...x....x....x....x...x....x........x.x...x........xx......x.x...x.......x.x....x...x.....x....x....x..x....x.....x.....x..x.....x..x......x.x....x....x....x...x......x....x.....x.x
    ...x....x....x....x....x...x....x..........xx....x.x....x.....x..x....x....x....x...x......x.....x..x....x..x....x....x.....x....x....x..x.....x...x...x....x....x.....x...x...x...x....x......x..x....x...x....x....x....x.
    ...x...x.....x.....x.x....x.....x...x....x....x.....x.....xx....x....x.....x...x...x....x....x......x.x....x....x........x.....xx......x.x...x.....x..x....x.....x...x.....x..x......x...x......xx....x...x.....x...x....x..
    ..x......x..x...x....x...x....x....x....x......x.x....x......x....x..x...x......x.....x..x..x....x....x...x....x........x.....x.x...x..x...x.....x...x....x......x.x....x.....x...x......x.x....x....x...x......x....x..x...
    ...x...x....x...x.......x...x..x.......x..xx......x..x......x.x.......x......xx...x...x.....x....x..x.....x...x....x....x...x.....x......x......xx..x.......x...x.x......x..x....x..........x....xx...x...x.....x...x..x...x
    ....x.....x...x.....x....x...x....x...x....x...x....x.....x...x.....x...x...x...x......x...x...x.....x..x....x.....x....x..x......x...x......xx.....x....x...x.......x.....xx...x...x.......x...x..x.....x....x......xx.....
    x...x.....x..x....x...x......x...x.......xx...x.....x...x.....x..x.......x.x...x....x.....x....x...x......x.x....x....x....x....x...x....x...x.....x....x.....x...x..x.......x.x...x....x....x....x.....x..x....x.....x...x.
    ..x.....x...x.....x......x..x...x......xx....x....x....x...x....x.....x...x........xx....x......x.x....x....x...x....x...x....x.....x.....x.x....x....x......x.x.........x..x.x....x....x...x....x.......x.x...x.......x....
    x..x..x.....x...x.........xx..x.....x..x......x......xx......x.x.....x.......x....x.x..x........x.x....x...x..........xxx....x..........x.xx....x....x....x....x...x.....x...x.......xx....x....x....x...x....x....x.....x..
    ...x.x....x.....x...x.....x...x....x......xx....x.......x.x....x...x....x....x........xx....x....x.....x.x.....x...x....x...x....x.....x...x....x....x.....x......x.x...x...x....x........x.x..x....x.....x..x.....x....x...
    x......x..x...x.....x..x.....x.....x....x..x......x....x...x......xx....x...x....x...x.....x...x.....x..x....x....x....x......x.x.....x...x...x....x.....x....x..x....x....x.....x...x...x....x....x...x.....x...x......x...
    ...x.x..x.....x...x.....x...x...x.....x...x.........x.x.x...x....x.....x...x.....x..x....x.....x...x...x.....x....x...x.....x..x....x....x.....x..x.....x...x...x....x....x.....x.....x..x...x.....x...x...x....x.....x....x
    ....x.....x.x....x...x........xx.......xx.....x......x...x.x......x..x....x....x....x....x...x....x...x.....x...x....x....x....x...x....x.......xx....x....x...x......x..x......x...x..x.....x...x.....x..x........x.x.....x
    ..x.....x..x....x...x.....x...x......x..x.......xx.......x.x...x....x....x.....x...x.....x.....x.x....x....x...x......x.x....x....x.....x..x....x......x..x....x....x.......xx....x...x....x....x.....x..x.......x.x....x...
    ..x..x....x......x...x...x...x.........xx..x.....x.....x..x....x...x....x....x.....x...x.....x.........xx..x..x....x.....x...x....x.....x..x....x....x...x....x.....x...x.....x...x..x....x......x..x.....x......xx.....x...
    .x...x.....x...x....x..x.....x...x....x...x....x.....x....x...x...x....x....x.....x....x....x..x...x.......x.x......x.....x.x.....x..x....x...x....x....x.....x...x...x....x....x.....x..x......x..x...x....x....x.....x....
    ...x...x.x.....x.......x...x.x..x....x......x...x..x....x.......xx........xx....x....x...x....x.......xx....x.....x.....x.x....x....x......x.x....x..........xx..x...x....x....x...x....x....x....x....x...x.....x......x.x.
    ...x....x...x.....x...x...x.......x.x.....x..x....x....x...x.....x...x.....x....x...x...x.....x...x...x......x..x....x....x...x....x........xx....x...x....x.....x...x...x....x....x...x....x.....x....x....x..x....x.......
    .xx....x....x....x...x...x.....x....x..x....x....x....x....x.....x....x...x...x...x....x.....x...x...x.....x....x....x....x...x....x....x........x..x.x....x...x...x.....x....x...x....x....x...x....x....x...x....x.....x..
    .x...x....x....x...x.....x....x....x.....x.x....x....x.....x...x...x..........xx..x...x.....x.....x.x....x.....x...x.....x..x....x......x..x....x...x.........x.x.x.....x...x....x...x....x....x....x...x.......x...x...x..x
    ......x..x.....x.....x.x....x.....x.....x.x....x.....x...x.......xx....x....x...x....x....x.....x...x...x.....x...x....x...x.....x...x....x...x.....x.....x.....x....xx....x....x....x.....x....x..x...x.......x..x...x.....
    x...x...x......x....x..x...x.....x...x........xx...x.....x....x..x....x....x.....x....x....x...x.....x.x....x......x..x......x.x....x.......xx.....x......x.x....x....x...x....x....x...x........xx....x.......xx....x.....x
    ...x...x............x...x.....xxx...x...x....x....x....x....x......x.x....x....x....x....x.....x.....xx....x........x.x...x...x........x.x...x...x......x...x..x........xx.....x.....x.x....x....x......x..x.....x...x...x..
    .x....x.....x...x...x.....x...x......x..x..........xx..x...x...x....x....x....x.....x...x.........xx.x....x.....x.....x.x......x....x..x...x.....x...x....x.....x...x...x....x.......xx....x....x.....x....x..x....x....x...
    x....x....x....x...x....x....x.....x...x...x.....x...x....x...x....x....x.......x..x.....x..x.....x...x..x..........x..x.x...x...x....x......x..x...x....x....x....x...x....x.....x....x..x....x....x....x.....x..x....x....
    x......x..x...x.......xx.....x....x...x...x....x....x....x.......x..x..x....x.....x..x....x....x....x...x....x....x....x....x....x....x....x..x.....x.....x..x...x.....x....x...x.....x..x.......x..x....x.....x.x....x....x
    ...x....x.....x....x.......xx....x...x...x....x.....x....x...x....x...x....x....x.....x.....x.x.....x..x.....x...x.....x..x.....x....x...x.....x...x...x....x...x.....x...x....x.....x...x...x....x....x...x......x.....x.x.
    ...x...x....x....x...x.....x....x...x....x....x....x.....x.x....x......x....x...x....x..x.....x...x.....x......xx.....x....x...x...x.....x...x...x....x....x...x.........x..x.x....x....x...x....x....x...x.....x...x.....x.
    .x.......x.x.....x........xx..x.....x.....x.x......x..x....x.....x..x....x....x......x.x.....x...x...x......x..x.......x.x...x......x..x....x...x....x....x....x...x....x.....x......xx.....x...x.....x....x...x...x.....x..
    x....x....x......x....x..x...x....x.....x..x.....x......x.x...x....x....x.....x...x....x.....x...x.....x.....x.x...x........x.x..x......x..x...x......x..x....x.....x...x...x....x...x.....x......x..x...x...x....x.......xx
    ....x....x....x....x.....x..x.......x..x...x...x........x..x...x..x......x..x....x.....x....x....x..x.....x....x...x....x..x....x.....x....x..x....x.....x...x.......xx....x.....x...x....x....x.....x....x.x....x.......x.x
    ...x....x.....x...x....x......x.x....x.....x..x.....x...x....x...x.....x......xx.......x.x....x....x...x....x....x.......x...x.x....x....x....x...x.....x...x...x....x....x....x...x.......x.x....x...........xxx....x.....x
    ...x.....x..x....x...x......x..x.....x...........xx...x.x...x...x........x.x...x...x....x....x....x...x.....x...x......x.x....x....x....x...x....x....x.........xx..x......x..x....x........xx...x.....x....x..x.....x.....x
    ..x...x....x....x....x...x.......x.x...x......x...x...x.....x..x......x....x...x....x....x..x......x.x....x....x....x...x.........xx...x.....x...x....x.........xx.x....x......x...x..x....x.....x......x.....x...x.x...x...
    x....x......x........x...x.x....x.x.....x....x..........xxx.......xx.....x....x..x.....x.........xx...x..x....x....x.....x..x....x.....x....x....x...x...x....x...x....x..........x.x..x....x....x..x...x....x.......x.x...x
    ......x...x....x....x..x.....x....x.....x.x........x...x..x...x....x...x.......xx....x.....x....x..x......x..x....x......x..x.....x..x....x...x......x.....x.x....x...x....x....x....x....x...x....x...x.....x......x...x...
    x..x....x.......x.x...x....x....x....x......x.x......x..x.....x..x....x....x......x.x.......x......x..x....x..x....x......xx...x..........xx.x....x.....x...x......x..x........x.x..x...x....x......x..x....x....x...x....x.
    ..x.....x...x.....x...x......x.....xx....x.....x..x........x..x..x...x.....x........x..xx.....x...x...x.......x..x....x..x.....x...x....x......x....x.x.....x...x....x...x......x.....xx.....x......x.x....x...x....x....x..
    ..x......x..x...x....x....x....x...x...x.....x...x.......x..x...x....x....x....x.....x...x...x...x...x......x..x....x.......x...x...x...x....x..x....x....x.....x...x...x....x....x...x......x..x....x....x...x....x....x...
    x......x..x....x...x.....x.....x......x.x..x....x.....x.......x..x.x....x....x...x.......x..x...x...x.....x......x..x..x....x.....x......x..x..x.....x....x...x.......x.x...x....x...x....x..........xx..x...x....x....x....
    x...x......x....x...x....x..x.....x...x....x...x....x.....x....x..x....x.....x......x....xx.....x..x......x....x..x....x.....x...x.......x.x..x....x.......x.....xx.....x...x...x...x.....x...x........xx.....x....x..x.....
    .x...x..x.........x..x...x..........xx.x.x....x.....x.......x..x..x...x....x.........x..x.....x.x...x..x......x..x....x.......xx....x.....x....x....x..x....x.....x..x..........x.x..x...x...x......x..x...x.....x...x.....x
    .......xx.......x..x.x.....x..................x..xxx.x.x...x.....x...x....x.....x..x......x..x....x...x......x..x....x......x...x..x....x....x...x....x.....x...x......x.x....x........xx...x....x....x.....x....x..x.....x.
    .x......x...x.....x.x.....x...x......x.x....x.....x...x......x..x.....x..x.......xx.........x..x.....xx.....x..x....x...x.....x....x....x.....x....x..x...x.............x..x.........x...x.x.......x..x..xxx..x....x........
    .....xx.x.....xx...x......x..x....x....x...x........xx....x......x.x.....x..........xxx......x..x.........xx..x....x...x.......x...x...x...x...x....x.....x...x...x....x......x.......x......x..xx...x..x....x......x..x....
    x...x.....x.........x.....xx.x......x.x.....x......xx....x....x....x...x....x.....x..x......x..x...x.....x...x....x......x.x......x..x......x..x........xx...x....x....x...x.........xx..x.....x......x...x..x....x....x...x
    .......xx.....x......x.x....x....x...x.....x..x....x....x....x....x...x....x...x....x.......x.x......x.x......x...x...x....x....x.....x...x....x.....x....x..x...x...x.......x..x..x....x......x..x.....x......xx....x....x.
    ...x...x....x....x...x.......x..x......xx.......x.x....x...x....x....x....x....x.......xx......x....x.x....x......x..x...x.....x...x......x.x.......x.x....x...x.....x......x..x....x..x....x.....x........x.x.x........x...
    .xx...x....x....x.....x..x....x....x....x...x......x....x..x......x....x.....xx....x....x....x....x..x.....x....x...x...x.....x....x...x.....x...x......x..x...x.....x..x.....x.....x.....xx....x......x..x....x...x....x...
    .x...x....x.......x..x....x.....x..x...x....x....x.....x..x....x.....x..x......x.x....x.......x..x....x....x..x.....x...x.....x.....x..x....x..x.......x...x.......xx..x.....x...x......x.x....x....x...x.....x....x...x...x
    .....x....x.....x...x...x.....x...x....x....x......x..x..x........xx.....x...x...x...x....x.....x..x........xx....x....x....x......x.x.....x....x...x....x...x....x...x....x.....x.....x....x..x.....x...x..x.....x...x....x
    ........xx...x......x...x..x....x.....x..x.....x...x.....x......xx....x....x....x...x..........xx..x...x.......x.x....x...x......x...x....x..x....x.....x...x.....x..x....x.....x..x....x........xx....x...x.....x.......xx.
    ..x....x....x....x......x..x....x....x.....x..x...x.....x......xx......x..x......x.x......x..x....x...x......x.......xx...x...x.............xxx..x....x.....x..x......x..x....x....x....x......x.x.....x..x......x....x..x..
    .......xx.....x....xx......x..x....x...x..........xx....x..x...x....x....x........x.x...x....x...x.....x..x........x.x..x..........x.x.x...x......x..x....x.......x.x...x......x..x...x............x...x..xx.....x.x....x...
    ..x..x.......x...x..x...x.....x...x....x....x...x....x....x...x....x....x....x....x.....x..x....x...x.....x....x....x...x...x....x....x....x....x....x...x.........xx...x......x.x...x.....x...x....x...x....x....x......x.x
    .......x..x..........xx.x.....x..x.....x..x......x.....x.x.....x...x...x....x...x.....x....x...x...x....x....x.....x...x...x........x..x...x......x..x..x.....x..x......x...x....x....x....x.....x......x...xx...x....x.....
    x..x....x......x..x.....x..x....x....x...x.......x.x....x....x....x.....x....x..x......x.x.....x...x...x.......x......xx......x.x....x...x...x....x....x.......x...x.x.....x...x...x.....x......x.x.....x..x....x.....x...x.
    ...x...x.............xxx...x....x....x....x..x....x....x.....x..x....x....x....x.....x..x...........xxx....x.....x...x....x....x......x...x.x....x.....x...x.....x.......x.x....x..x...x......x..........xxx.....x..x....x..
    ..x.........xx..x...x.....x...x.....x..x.....x....x......x.x.......x..x...x...x...x.....x...x....x....x...x.....x...x.....x..x.........xx..x.......x..x......x....x..x.....x..x...x.......x......x....xx.....x.x...x....x...
    x....x..........x..xx......x.x....x.....x..x......x.........x.xx...x....x.....x...x...x....x.......x...x.x....x....x...x....x.....x......x.....x.....xx..x....x...x.....x......x..x...x......x.........x.x.x.....xx.....x..x
    .....x....x.....x..x....x...x.......x....x.x...x....x....x.....x..x....x....x.....x...x.....x......x.x......xx.....x...x...x.......x..x.......x...xx.....x...x...x....x....x.....x..x........x.x...x..........x.x.....xx...x
    ....x....x...x....x...x.....x...x......x.x....x....x......x.x.......x.x.....x..x....x....x....x....x.....x..x.....x...x...x.....x.......xx....x......x..x......xx......x..x......x.x....x....x....x.......x...x.x....x....x.
    .....x.x......x...x..x......x..x....x...x....x....x....x....x...x....x.....x...x...x....x.....x.....x.x....x.....x...x...x.....x....x....x....x.....x..x...x...x....x..........x.x.x....x....x...x.....x..x.......x....x.x..
    .x....x......x..x.....x..x.....x......xx....x....x....x.....x..x....x.....x...x...x...........x.xx.....x..x....x....x...x....x....x.....x..x....x....x....x......x.x....x.....x...x...x....x....x....x...x.......x.x.....x..
    x....x.......x.x...x.....x.....x..x.....x..x....x.....x...x.....x..x....x.....x.......x.x.....x.x...x.........x........xx.x...x...x...x.....x..x....x.....x.....x...x..x....x.....x...x...x....x....x...x....x....x....x...x
    .....x.....x..x....x....x...x....x....x...x.....x...x.....x....x.....x...x..x....x...x....x.....x...x...x....x....x........xx......x.x....x....x....x......x.x......x...x....x..x...x....x......x.....xx.......x.x....x.....
    .........x.xx..x..x...x.....x.....x...x..x.....x....x...x....x...x....x....x...x....x....x....x.....x....x..........x..xx..x.....x..x....x....x...x.....x...x......x..x...x....x....x....x.....x..x....x.....x...x...x....x.
    ..x........x.x....x...x.....x...x....x..x....................x....x.xxx.x..x...x...x.....x.....x..x....x....x....x...x....x...x....x....x...x....x....x.......xx.......x..x...x.......xx....x....x....x...x.....x...x.....x.
    ..x......x.....x..x.x....x....x..........x..xx....x......x.x...x....x.....x...x...x.....x....x....x..x....x.....x...x...x....x.......x.x...x....x....x........x.x..x.....x...x....x....x....x...x....x...x.......x....x.x...
    .x...x......x..x.....x..x....x.....x...x...x.......x..x.....x.x....x.....x...x.......x.x......x...x.x....x......x...x..x....x.....x......x.x...x.....x...x....x...x.....x......x..x..x......x..x.....x.......xx...x......x.x
    ....x....x......x...x..x.....x.....x..x.....x....x.....x.x....x....x.....x...x...x..........xx...x.x........x.x...x....x...x........x.x....x...x....x...x....x...x....x.....x.....x..x.....x..x.....x..x..........xx..x.....
    ..x....xx....x....x....x...x....x....x....x......x..x....x...x.....x...x...x...x.....x...x....x....x....x...x....x....x......x...x..x....x....x...x......x...x.....x.x....x....x.......xx.....x.....x..x...x....x....x....x.
    ..x......x...x...x.....x..x......x..x.....x....x..x......x..x.....x..x........x..x.x....x....x....x...x......x....x..x.....x...x...x........x..x..x.....x..x....x...x.......x.x........x.........xxx..x....x....x......x.x..
    .x....x.....x...x....x...x......x..x.......xx....x....x....x.....x..x.......x..x...x...x......x..x.....x..x.....x...x...x.....x...x....x...x....x....x....x....x....x...x.....x...x...x....x.......x.x...x....x......x...x..
    ..x..x....x.....x..x.....x...x....x....x...x....x.......x...x..x...x......x......x..x...x...x....x...x....x.....x......x.x...x...x....x....x..........xx.x.......xx.....x...x.....x......x.x....x.......xx...x....x.....x..x
    .....x....x......x..x..x.....x......x.x....x....x...x......x.x.....x.........x...x....x...x.x....x.x....x....x....x....x.......x...x.x....x...x....x....x....x....x....x....x...x...x....x....x....x...x....x........x.x...x
    ....x....x.....x....x..x....x......x.x...x....x.....x...x...x.......x..x....x...x...x.....x...x.......xx.....x....x..........x.....x...xx..x.....xx....x.........xx...x...x.......xx............x........xx..x..xx....x...x.
    ..x....x.....x....x...x...x......x..x....x...x.....x...x...x....x.......x.x....x.....x...x....x.......xx......x..x....x..x......x..x.....x..x.....x......x...x.x....x....x.......x.......x....xx.x....x.......x..x..x.....x.
    .....x.x....x....x......x.x.....x..x...x....x.....x....x...x......x.x.....x...x...x.....x...x....x...x....x.....x...x...x....x.....x.....x.x....x.....x...x....x...x......x....x...x...x....x...x....x...x....x....x....x...
    x.....x.....x..x......x...x...........xx.x.x....x.....x.....x..x...x.......x.x...x....x.....x...x...x.......x.x.....x......xx....x....x....x...x....x....x.....x....x..x..........xx..x...x....x......x.x.....x...x....x...x
    ....x....x....x......x..x...x.....x...x......x.x....x......x.....xx....x.......x.x...x....x....x.......x.x......x....x.x...x....x..........x..x.x..x....x.....x....x..x....x....x....x...x....x....x...x....x.......x..x...x
    ....x....x....x...x...x....x....x.....x..x......x..x....x....x.......xx....x......x..x...x....x......x.x....x......x..x...x....x.....x...x...x....x.......x...x.x....x....x....x...x....x....x.....x...x......x...x...x.....
    .xx.....x.....x...x......xx......x...x..x....x......x..x...x.....x.....x..x.....x......xx....x.....x.....x.x....x..........xx...x....x..x...x.....x...x.........xx..x....x.....x...x...x....x....x....x....x...x.....x....x.
    .x.....x...x.....x..x......x....x..x...x....x....x......x....x.x.....x...x....x...x....x....x....x......x...x..x....x...x......x..x.....x...x...x....x....x....x...x.......x..x...x...x....x....x....x...x......x..x....x...
    x....x....x....x...x....x....x.........xx..x.....x...x.....x..x.......x...x.....x.x.....x..x....x...x....x....x....x....x...x......x.....x.x......x..x.....x...x...x...x....x....x...x.....x....x.....x..x...x.....x...x....
    x...x....x....x....x.....x...x...x....x....x....x...x.......xx....x..........x.xx....x.....x.....x..x.......x.x...x....x...x.....x...x.....x...x.......x..x..x...x....x.......x.x...x.....x...x.....x..x.......x.x....x....x
    ...x......x....x..x...x.....x....x...x.....x.....x..x.....x...x...x...x.......x..x....x...x......x....x..x..x.....x....x..x......x...x.......xx......x.x....x....x...x....x....x.....x..x.....x.....x....x......xx...x....x.
    ....x....x...x...x...x....x......x......xx...x....x.......xx....x.......x.x....x.....x...x.....x.......x.x..x.....x..x...x....x....x......x.x....x....x....x......x.x......x..x....x.......x..x....x...x.....x..x....x.....x
    ..x.....x..x.......x..x...x...x.......x.x...x.....x........x.x..x....x...x....x...x....x....x......x..x.....x......x...x.x....x...x.........x..x.....x...xx.....x..x......x..x....x...x....x.....x...x....x.....x....x....x.
    .x......x.x.........xx....x..x....x....x.....x..x....x....x...x....x.....x....x....x..x.....x...x.....x...x....x......xx.......x..x...x....x....x...x....x.......xx.....x...x......x.x.......x...x..x....x....x....x...x....
    .x...x...x....x.......x.x.......xx....x...x.....x...x....x....x.....x.......x...xx.....x...x....x.....x..x...x....x.......xx......x.....x....xx....x.....x...........xx..x...x...x...x...x....x....x.....x..x....x.........x
    x..x....x.....x...x....x...x....x......x..x...x........xx...x....x......x.....xx.....x...x....x....x.........xx....x...x..x.........xx....x...x.....x..x.....x...x...x....x....x....x....x.....x...x...x....x....x...x.....x
    ...x...x......x..x.....x..x....x.....x...x....x....x...x...x.....x.....x..x....x...x.....x....x...x...x.....x....x...x.....x..x....x....x...x....x........xx....x....x...x....x....x....x...x......x..x...x....x.........xx.
    ...x..x.....x.....x.x....x....x....x...x......x.....x..x....x.......x.x..x......x.x........xx.....x....x..x.....x.......x.x..x.....x....x...x...x.....x...x....x...x.......x.x.....x..x.....x...x....x...x....x....x......x.
    x....x......x..x....x.........xx..x....x...x....x....x....x....x...x....x....x....x...x....x....x...x....x....x.....x....x..x.....x...x......x..x...x....x.....x...x.....x....x..x.....x......x.x....x...x....x...x.....x..x
    ....x....x....x........xx...x....x....x...x.....x...x....x...x.....x...x....x...x.....x.......xx....x.....x..x....x......x..x....x...x....x...x.....x...x.....x..x....x....x......x...x..x........xx....x...x......x..x.....
    x...x...x.....x...x...x....x....x.....x....x....x....x...x..x......x..x....x....x...x....x....x....x.....x..x....x......x.x....x....x.......x.x...x.......x..x...x.....x..x....x...x.......x..x...x.....x.....x...x...x...x.
    ..x.....x....x.......xx....x...x....x...x....x.....x.....x.x....x.....x....x...x.....x..x....x.....x..x....x.....x....x.....x..x....x....x...x...x.....x...x.....x..x....x.......x.x...x....x.......x...x..x...x.....x.....x
    .x....x......x...x..x....x........x.x.......x.x..x....x....x.......xx.....x.....x...x......x.x...x...x......x...x.....x..x...x....x........xx...x.....x...x.....x...x.....x...x....x...x...x......x..x....x...x....x....x...
    x.....x...x......x.x....x....x.......x..x..x.....x...x....x.....x..x.....x...x....x....x.....x...x..x......x..x....x...x....x........xx......x.x....x....x....x.....x..x......x....x...x..x.....x...x...x..........x..xx....
    .x..x....x....x......x..x....x...x....x....x....x....x......xx....x......x..x...x........x.x...x...x.......x..x....x...x....x....x...x....x.......x...x....x.x...x....x.......x....xx....x....x......x.x....x....x....x.....
    .x..x...x....x....x.....x...x....x....x..x....x....x....x....x....x......x..x.....x..x......x...x..x....x...x.....x....x..x....x.....x...x...x....x....x.....x......x...x..x.....x..x...x....x....x.....x..x.....x...x....x.
    .....x.x....x....x....x....x...x....x...x....x......x..x...x.....x...x.....x...x...x......x..x......x...x....x...x...x....x....x...x....x.....x....x..x.....x..x....x........x...x.x...x....x.....x.........xx.x.....x....x.
    ..x...x.....x....x...x...x......x...x..x....x.....x......x.....xx...x.....x....x.........x..x.x...x..x....x......x..x....x.........xx....x..x...x....x........xx...x......x...x...x...x.....x...x....x....x....x...x....x...`,
        `4 5
    .....
    .x.x.
    .....
    .....`,
        `2 2
.x
x.`,
        `2 5
.....
xxxx.`];
    for (let i = 0; i < inputs.length; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const mn = lines[index++].split(' '), m = parseInt(mn[0], 10), n = parseInt(mn[1], 10);

        let grid = [];
        for (let gridItr = 0; gridItr < m; gridItr++) {
            const gridItem = lines[index++];
            grid.push(gridItem);
        }
        kMarsh(grid);
    }
}