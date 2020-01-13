'use strict'
main();

function coinOnTheTable(m, k, board) {
    const ROW_COUNT = board.length, COLUMN_COUNT = m, STAR = '*', BASE = 100;
    //                  left,    right,  up,      down                  
    const NEIGHBOURS = [[0, -1], [0, 1], [-1, 0], [1, 0]], NEIGHBOUR_LETTERS = ['L', 'R', 'U', 'D'];

    function getChanges(nodeKeys) {
        let nodes = nodeKeys.map(key => {
            let x = Math.floor(key / BASE), y = key - x * BASE;
            return [x, y];
        });

        let changes = 0;
        for (let i = 1; i < nodes.length; i++) {
            let prev = nodes[i - 1], current = nodes[i];
            let offsetX = current[0] - prev[0], offsetY = current[1] - prev[1];

            for (let j = 0; j < NEIGHBOURS.length; j++) {
                let neighbour = NEIGHBOURS[j];
                if (neighbour[0] === offsetX && neighbour[1] === offsetY) {
                    if (grid[prev[0]][prev[1]] !== NEIGHBOUR_LETTERS[j])
                        changes++;
                    break;
                }
            }
        }

        return changes;
    }

    let grid = [], END_ROW = -1, END_COLUMN;
    for (let i = 0; i < ROW_COUNT; i++) {
        let line = board[i];
        let cells = line.split('');
        grid.push(cells);
        if (END_ROW === -1) {
            END_COLUMN = cells.findIndex(element => element === STAR);
            if (END_COLUMN !== -1)
                END_ROW = i;
        }
    }

    // use BFS to find all the possible path 
    let startNode = [0, 0], nodeKey = startNode[0] * BASE + startNode[1];
    let queue = [{ x: startNode[0], y: startNode[1], visited: new Set([nodeKey]) }], minChanges = Number.MAX_SAFE_INTEGER;
    while (queue.length > 0) {
        let node = queue.shift();
        if (node.visited.size > k)
            continue;

        let currentX = node.x, currentY = node.y;
        for (let i = 0; i < NEIGHBOURS.length; i++) {
            let neighbour = NEIGHBOURS[i];
            let nextX = currentX + neighbour[0], nextY = currentY + neighbour[1];
            if (nextX < 0 || nextX >= ROW_COUNT || nextY < 0 || nextY >= COLUMN_COUNT)
                continue;

            nodeKey = nextX * BASE + nextY;
            if (node.visited.has(nodeKey))
                continue;

            if (nextX === END_ROW && nextY === END_COLUMN)
                minChanges = Math.min(minChanges, getChanges([...node.visited, nodeKey]));

            // push a new route into stack
            let newNode = { x: nextX, y: nextY, visited: new Set([...node.visited, nodeKey]) };
            queue.push(newNode);
        }
    }   // the end of while (queue.length > 0) {

    return minChanges > k ? -1 : minChanges;
}

function main() {
    let inputs = [`2 2 3  
    RD  
    *L`,
        `2 2 1  
    RD  
    *L`]; for (let i = 1; i < 2; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const nmk = lines[index++].split(' '), n = parseInt(nmk[0], 10), m = parseInt(nmk[1], 10), k = parseInt(nmk[2], 10);

        let board = [];
        for (let boardItr = 0; boardItr < n; boardItr++) {
            const boardItem = lines[index++];
            board.push(boardItem);
        }

        let result = coinOnTheTable(m, k, board);
        console.log(result + "\n");
    }
}
