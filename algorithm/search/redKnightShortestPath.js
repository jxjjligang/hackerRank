'use strict'

main();

// Complete the printShortestPath function below.
function printShortestPath(n, i_start, j_start, i_end, j_end) {
    const STEPS = ['UL', 'UR', 'R', 'LR', 'LL', 'L'], UNREACHABLE_RESULT = 'Impossible';

    // row index offset first, then column index offset
    const OFFSETS = [{ x: -2, y: -1, step: 'UL' },
    { x: -2, y: 1, step: 'UR' },
    { x: 0, y: 2, step: 'R' },
    { x: 2, y: 1, step: 'LR' },
    { x: 2, y: -1, step: 'LL' },
    { x: 0, y: -2, step: 'L' },
    ];



    // use BFS to find the final position
    function bfsSearch(n, i_start, j_start, i_end, j_end) {
        const INDEX_UPPER_BOUND = n;
        let queue = [{ x: i_start, y: j_start, steps: '' }], visited = new Set();
        while (queue.length > 0) {
            let current = queue.shift();
            let ij = '' + current.x + ',' + current.y;
            if (visited.has(ij))
                continue;
            else
                visited.add(ij);

            for (let i = 0; i < OFFSETS.length; i++) {
                let offset = OFFSETS[i], nextStep = OFFSETS[i].step;
                let nextX = current.x + offset.x, nextY = current.y + offset.y;
                if (nextX < 0 || nextX > INDEX_UPPER_BOUND || nextY < 0 || nextY > INDEX_UPPER_BOUND)
                    continue;

                let nextPosition = { x: nextX, y: nextY, steps: current.steps + ',' + nextStep }
                if (nextX === i_end && nextY === j_end)
                    return nextPosition.steps;

                queue.push(nextPosition);
            }
        }

        return UNREACHABLE_RESULT;
    }

    let result = bfsSearch(n, i_start, j_start, i_end, j_end);
    if (result !== UNREACHABLE_RESULT) {
        let steps = result.split(',').filter(s => s !== '');
        console.log(steps.length);
        console.log(result.replace(/,/g, ' ').trim());
    }
    else
        console.log(UNREACHABLE_RESULT);
}

function main() {
    let inputs = [`7
    6 6 0 1`, `6
    5 1 0 5`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const n = parseInt(lines[index++], 10), i_startJ_start = lines[index++].split(' ');
        const i_start = parseInt(i_startJ_start[0], 10), j_start = parseInt(i_startJ_start[1], 10);
        const i_end = parseInt(i_startJ_start[2], 10), j_end = parseInt(i_startJ_start[3], 10);
        printShortestPath(n, i_start, j_start, i_end, j_end);
    }
}
