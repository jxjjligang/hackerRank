'use strict'

main();

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    function getSquares(r_q, c_q, n, blockers, direction) {
        let count = 0, x = r_q + direction[0], y = c_q + direction[1];
        while (x > 0 && x <= n && y > 0 && y <= n) {
            if (blockers.has(x + ':' + y))
                break;

            count++;
            x += direction[0];
            y += direction[1];
        }

        return count;
    }

    //                  left     right   up       down    upRight downright downLeft upLeft
    const DIRECTIONS = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, 1], [1, 1], [1, -1], [-1, -1]];
    let squares = 0, blockers = new Set();
    for (let obstacle of obstacles)
        blockers.add(obstacle[0] + ':' + obstacle[1]);

    for (let i = 0; i < DIRECTIONS.length; i++)
        squares += getSquares(r_q, c_q, n, blockers, DIRECTIONS[i]);

    return squares;
}

function main() {
    let inputs = [`4 0
4 4`,
        `5 3
4 3
5 5
4 2
2 3`,
        `1 0
1 1`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
        const r_qC_q = lines[index++].split(' '), r_q = parseInt(r_qC_q[0], 10), c_q = parseInt(r_qC_q[1], 10);

        let obstacles = Array(k);
        for (let i = 0; i < k; i++)
            obstacles[i] = lines[index++].split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));

        let result = queensAttack(n, k, r_q, c_q, obstacles);
        console.log(result + "\n");
    }
}