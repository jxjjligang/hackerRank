'use strict'

main();


// Complete the knightlOnAChessboard function below.
function knightlOnAChessboard(n) {
    /**
     * 
     * @param {the length/width of a square chessboard} n 
     * @param {knight can move horizontally or vertically} a 
     * @param {knight can move horizontally or vertically} b 
     */
    function bfs(n, a, b) {
        // use an array represent the location, index 0 for row, index 1 for column, index 2 for moves
        let start = [0, 0, 0], queue = [start], visited = new Set();
        let possibleMoves = [[-a, -b], [-b, -a], [-a, b], [-b, a], [a, b], [b, a], [a, -b], [b, -a]];
        visited.add(start[0] + ':' + start[1]);
        while (queue.length > 0) {
            let current = queue.shift();
            for (let pom of possibleMoves) {
                let nextX = current[0] + pom[0], nextY = current[1] + pom[1],  moves = current[2] + 1;
                if (nextX===n-1 && nextY===n-1)
                    return moves;

                let nextID = nextX + ':' + nextY;
                if (visited.has(nextID))
                    continue;
                else
                    visited.add(nextID);
                if (nextX < 0 || nextY < 0 || nextX >= n || nextY >= n) // check invliad location
                    continue;
                else {
                    queue.push([nextX, nextY, moves]);
                }
            }
        }

        return -1;
    }

    let resultArray = [];
    for (let i = 0; i < n - 1; i++)
        resultArray.push([]);

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1; j++) {
            let result = resultArray[i][j];
            if (result === undefined) {
                let moves = bfs(n, i + 1, j + 1);
                resultArray[i][j] = moves;
                resultArray[j][i] = moves;
            }
        }
    }

    return resultArray;
}

function main() {
    let inputs=[`5`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const n = parseInt(lines[index++], 10);

        let result = knightlOnAChessboard(n);

        console.log(result.map(x => x.join(' ')).join("\n") + "\n");
    }
}