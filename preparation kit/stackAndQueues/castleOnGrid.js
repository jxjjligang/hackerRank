'use strict'

function minimumMoves(grid, startX, startY, goalX, goalY) {
    function getAllPoints(grid) {
        let points = [], blockers = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            for (let j = 0; j < COLUMN_COUNT; j++) {
                if (grid[i][j] !== 'X')
                    points.push([i, j]);
                else
                    blockers.push([i, j]);
            }
        }

        return [points, blockers];
    }

    function edgeHasPoint(edge, point) {
        return edge[0] === point || edge[1] === point;
    }

    function isEdgeExisting(allEdges, point1, point2) {
        return allEdges.find(edge => edgeHasPoint(edge, point1) && edgeHasPoint(edge, point2)) !== undefined;
    }

    function constructEdges(points) {
        let allEdges = [];
        for (let i = 0; i < points.length; i++) {
            let point = points[i], pointX = point[0], pointY = point[1];
            //                     right,               bottom,               left,                 top 
            let adjacentPoints = [[pointX, pointY + 1], [pointX + 1, pointY], [pointX, pointY - 1], [pointX - 1, pointY]];
            for (let j = 0; j < adjacentPoints.length; j++) {
                let adjPoint = adjacentPoints[j];
                let connectedPoint = points.find(p => p[0] === adjPoint[0] && p[1] === adjPoint[1]);
                if (connectedPoint && !isEdgeExisting(allEdges, point, connectedPoint)) {
                    allEdges.push([point, connectedPoint]);
                }
            }
        }

        return allEdges;
    }

    function getEdges(allEdges, currentPoint) {
        return allEdges.filter(edge => edge[0] === currentPoint || edge[1] === currentPoint);
    }

    // find 4 way points from the current point
    function saveTurnOf4WayPoints(points2Turns, startPoint, turnValue, points) {
        function toRight(x, y) {
            return [x, y + 1];
        }

        function toLeft(x, y) {
            return [x, y - 1];
        }

        function toUp(x, y) {
            return [x - 1, y];
        }

        function toDown(x, y) {
            return [x + 1, y];
        }

        let funcs = [toRight, toLeft, toDown, toUp];
        for (let i = 0; i < funcs.length; i++) {
            let x = startPoint[0], y = startPoint[1], func = funcs[i];
            // to the right direction
            let p = findPoint(points, x, y);
            while (p) {
                let minTurn = turnValue;
                if (points2Turns.has(p))
                    minTurn = Math.min(minTurn, points2Turns.get(p));
                points2Turns.set(p, minTurn);

                let nextPoint = func(x, y);
                x = nextPoint[0], y = nextPoint[1];
                p = findPoint(points, x, y);
            }
        }
    }

    function findPoint(pointArr, x, y) {
        return pointArr.find(element => element[0] === x && element[1] === y);
    }

    function getTheOtherPoint(edge, excludePoint) {
        return edge[0] === excludePoint ? edge[1] : edge[0];
    }

    const ROW_COUNT = grid.length, COLUMN_COUNT = grid[0].length;
    let minMoves = 0, pointsAndBlockers = getAllPoints(grid);
    let points = pointsAndBlockers[0], blockers = pointsAndBlockers[1], allEdges = constructEdges(points);
    let startPoint = findPoint(points, startX, startY), targetPoint = findPoint(points, goalX, goalY);
    let queue = [startPoint], points2Turns = new Map(), visitedPoints = new Set();
    visitedPoints.add(startPoint);
    saveTurnOf4WayPoints(points2Turns, startPoint, 1, points);
    while (queue.length > 0) {
        let currentPoint = queue[0];
        queue.shift();
        let edges = getEdges(allEdges, currentPoint);
        for (let i = 0; i < edges.length; i++) {
            let connectedPoint = getTheOtherPoint(edges[i], currentPoint);
            if (!points2Turns.has(connectedPoint)) {
                let currentTurn = points2Turns.get(currentPoint);
                saveTurnOf4WayPoints(points2Turns, connectedPoint, 1 + currentTurn, points);
            }
            if (!visitedPoints.has(connectedPoint)) {
                queue.push(connectedPoint);
                visitedPoints.add(connectedPoint);
            }
        }   // for (let i = 0; i < edges.length; i++) {
    }
    return points2Turns.get(targetPoint);
}

main();
function main() {
    let input = `3
    .X.
    .X.
    ...
    0 0 0 2`;

    input=`40
    ...X......XX.X...........XX....X.XX.....
    .X..............X...XX..X...X........X.X
    ......X....X....X.........X...........X.
    .X.X.X..X........X.....X.X...X.....X..X.
    ....X.X.X...X..........X..........X.....
    ..X......X....X....X...X....X.X.X....XX.
    ...X....X.......X..XXX.......X.X.....X..
    ...X.X.........X.X....X...X.........X...
    XXXX..X......X.XX......X.X......XX.X..XX
    .X........X....X.X......X..X....XX....X.
    ...X.X..X.X.....X...X....X..X....X......
    ....XX.X.....X.XX.X...X.X.....X.X.......
    .X.X.X..............X.....XX..X.........
    ..X...............X......X........XX...X
    .X......X...X.XXXX.....XX...........X..X
    ...X....XX....X...XX.X..X..X..X.....X..X
    ...X...X.X.....X.....X.....XXXX.........
    X.....XX..X.............X.XX.X.XXX......
    .....X.X..X..........X.X..X...X.X......X
    ...X.....X..X.............X......X..X..X
    ........X.....................X....X.X..
    ..........X.....XXX...XX.X..............
    ........X..X..........X.XXXX..X.........
    ..X..X...X.......XX...X.....X...XXX..X..
    .X.......X..............X....X...X....X.
    .................X.....X......X.....X...
    .......X.X.XX..X.XXX.X.....X..........X.
    X..X......X..............X..X.X.......X.
    X........X.....X.....X....XX.......XX...
    X.....X.................X.....X..X...XXX
    XXX..X..X.X.XX..X....X.....XXX..X......X
    ..........X.....X.....XX................
    ..X.........X..X.........X...X.....X....
    .X.X....X...XX....X...............X.....
    .X....X....XX.XX........X..X............
    X...X.X................XX......X..X.....
    ..X.X.......X.X..X.....XX.........X..X..
    ........................X..X.XX..X......
    ........X..X.X.....X.....X......X.......
    .X..X....X.X......XX....................
    34 28 16 8`;


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