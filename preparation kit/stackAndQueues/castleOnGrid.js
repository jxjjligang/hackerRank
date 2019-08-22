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

    function constructEdges(points) {
        function mapPointToEdge(map, point, edge) {
            let edges;
            if (!map.has(point)) {
                edges = [];
                map.set(point, edges);
            }
            else
                edges = map.get(point);

            if (!edges.find(e => e === edge))
                edges.push(edge);
        }

        let allEdges = new Map();
        for (let i = 0; i < points.length; i++) {
            let point = points[i], pointX = point[0], pointY = point[1];
            //                     right,               bottom,               left,                 top 
            let adjacentPoints = [[pointX, pointY + 1], [pointX + 1, pointY], [pointX, pointY - 1], [pointX - 1, pointY]];
            for (let j = 0; j < adjacentPoints.length; j++) {
                let adjPoint = adjacentPoints[j];
                let connectedPoint = points.find(p => p[0] === adjPoint[0] && p[1] === adjPoint[1]);
                if (!connectedPoint)
                    continue;

                let edge = [point, connectedPoint];
                mapPointToEdge(allEdges, point, edge);
                mapPointToEdge(allEdges, connectedPoint, edge);
            }
        }

        return allEdges;
    }

    function getEdges(allEdges, currentPoint) {
        return allEdges.get(currentPoint);
    }

    // find 4 way points from the current point
    function saveTurnOf4WayPoints(points2Turns, startPoint, turnValue, points, findVertical) {
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


        let funcs = [toRight, toLeft];
        if (findVertical)
            funcs = [toDown, toUp];

        for (let i = 0; i < funcs.length; i++) {
            let x = startPoint[0], y = startPoint[1], func = funcs[i];
            // to the right direction
            let p = findPoint(points, x, y);
            while (p) {
                let minTurn = points2Turns.get(p);
                if (minTurn === undefined || minTurn > turnValue)
                    points2Turns.set(p, turnValue);

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
    let pointsAndBlockers = getAllPoints(grid), points = pointsAndBlockers[0], blockers = pointsAndBlockers[1];
    if (blockers.length === 0)
        return (startX === goalX || startY === goalY) ? 1 : 2;

    let allEdges = constructEdges(points), startPoint = findPoint(points, startX, startY), targetPoint = findPoint(points, goalX, goalY);
    let queue = [startPoint], points2Turns = new Map(), visitedPoints = new Set(), visitedEdges = new Set();
    visitedPoints.add(startPoint);
    saveTurnOf4WayPoints(points2Turns, startPoint, 1, points, true);
    saveTurnOf4WayPoints(points2Turns, startPoint, 1, points, false);

    while (queue.length > 0) {
        // allVisited is used to improve performance
        let allVisited = true, targetEdges = allEdges.get(targetPoint);
        for (let te = 0; te < targetEdges.length; te++) {
            if (!visitedEdges.has(targetEdges[te])) {
                allVisited = false;
                break;
            }
        }
        if (allVisited)
            break;

        let currentPoint = queue[0];
        queue.shift();
        let edges = getEdges(allEdges, currentPoint);
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            if (visitedEdges.has(edge))
                continue;
            else
                visitedEdges.add(edge);

            let connectedPoint = getTheOtherPoint(edge, currentPoint);
            let currentTurn = points2Turns.get(currentPoint);
            saveTurnOf4WayPoints(points2Turns, connectedPoint, 1 + currentTurn, points, connectedPoint[1] === currentPoint[1]);

            if (!visitedPoints.has(connectedPoint)) {
                queue.push(connectedPoint);
                visitedPoints.add(connectedPoint);
            }
        }   // for (let i = 0; i < edges.length; i++) {
    }

    return points2Turns.get(targetPoint);
}

countTime(main)();
function main() {
    let input = `3
    .X.
    .X.
    ...
    0 0 0 2`;

    input = `40
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

    // input = `3
    // ...X......XX.
    // .X...........
    // ...X...X.X...
    // 0 0 2 8`;

    input = `100
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    ....................................................................................................
    0 0 99 99`;

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

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(2)} seconds spent.`);
        return result;
    }
}