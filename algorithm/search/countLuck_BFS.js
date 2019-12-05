'use strict'

main();



// Complete the countLuck function below.
function countLuck(matrix, k) {
    function getStartAndEnd(matrix) {
        let startX, startY, endX, endY;
        for (let i = 0; i < MATRIX_LENGTH; i++) {
            let line = matrix[i];
            for (let j = 0; j < MATRIX_WIDTH; j++) {
                let cell = line[j];
                if (cell === CELL_START) {
                    startX = i;
                    startY = j;
                } else if (cell === CELL_PORTKEY) {
                    endX = i;
                    endY = j;
                }

                if (startX !== undefined && endX !== undefined)
                    return [startX, startY, endX, endY];
            }
        }
    }

    const MATRIX_LENGTH = matrix.length, MATRIX_WIDTH = matrix[0].length;
    const CELL_START = 'M', CELL_PORTKEY = '*', CELL_TREE = 'X';

    //                    top,     right,  bottom, left
    const NEXT_OPTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    let startEnd = getStartAndEnd(matrix), startX = startEnd[0], startY = startEnd[1], endX = startEnd[2], endY = startEnd[3];

    // use BFS
    let visited = new Set(), waveMade = 0, queue = [{ x: startX, y: startY, waves: 0 }];
    while (queue.length > 0) {
        let current = queue.shift(), currentX = current.x, currentY = current.y;

        if (currentX === endX && currentY === endY) {
            if (current.waves === k)
                return 'Impressed';
            else
                return 'Oops!';
        }
        else {
            visited.add(`${currentX}:${currentY}`);
            let nextMoves = [];
            for (let option of NEXT_OPTIONS) {
                let nextX = currentX + option[0], nextY = currentY + option[1];
                if (nextX >= 0 && nextX < MATRIX_LENGTH && nextY >= 0 && nextY < MATRIX_WIDTH) {
                    let cell = matrix[nextX][nextY], cellKey = `${nextX}:${nextY}`;
                    if (cell !== CELL_TREE && !visited.has(cellKey))
                        nextMoves.push([nextX, nextY]);
                }
            }

            let newWaves = (nextMoves.length > 1 ? 1 + current.waves : current.waves);
            for (let nextMove of nextMoves) 
                queue.push({ x: nextMove[0], y: nextMove[1], waves: newWaves });
        }
    }
}

function main() {
    let inputs = [`1
    41 41
    .X.XXXXXXXXXXXXXXXXXXX.X.X.X.X.X.X.X.X.X.
    ...XXXXXXXXXXXXXXXXXXX...................
    .X..X.X.X.X.X.X.X..XXXX*X.X.X.X.X.X.X.XX.
    .XXXX.X.X.X.X.X.X.XX.X.X.X.X.X.X.X.X.X.X.
    .........................................
    .XX.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    .XX.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    .XX.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    .XX.X.X.X.XX.X.XX.X.X.X.X.X.X.X.X.X.X.X.X
    .X.X.X.X.X.XXX.X.X.X.X.X.X.X.X.X.X.X.X.X.
    X........................................
    X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    .X.XX.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.XX
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XMX.
    .X....................................X..
    ..X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .X...................................X...
    .XX.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.XX.XXXX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.XX.
    .X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.
    .........................................
    294`,
        `3
    3 3
    *.X
    X.X
    X.M
    0
    3 3
    *.X
    X.X
    ..M
    1
    3 3
    *..
    X.X
    ..M
    1`,
        `3
2 3
*.M
.X.
1
4 11
.X.X......X
.X*.X.XXX.X
.XX.X.XM...
......XXXX.
3
4 11
.X.X......X
.X*.X.XXX.X
.XX.X.XM...
......XXXX.
4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
            let matrix = [];
            for (let i = 0; i < n; i++) {
                const matrixItem = lines[index++];
                matrix.push(matrixItem);
            }

            const k = parseInt(lines[index++], 10);
            let result = countLuck(matrix, k);
            console.log(result + "\n");
        }
    }
}
