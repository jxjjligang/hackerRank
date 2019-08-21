'use strict'

/* Based on the code from discussion */
function minimumMoves(grid, startX, startY, goalX, goalY) {
    function getAllPoints(grdLine) {
        let allPoints = [];
        for (let i = 0; i < grdLine.length; i++) {
            let line = grdLine[i];
            for (let j = 0; j < line.length; j++) {
                if (line[j] === '.')
                    allPoints.push([i, j]);
            }
        }

        return allPoints;
    }

    function addPointToMap(nextPoint, key, map) {
        let array = map.get(key);
        if (array === undefined) {
            array = [];
            map.set(key, array);
        }

        array.push(nextPoint);
    }

    function findCrossPoints(allPoints, point) {
        let foundPoints = [], row = point[0], column = point[1];
        // find points has same column value, but row value is higher
        for (let i = row + 1; i < rowCount; i++) {
            let p = allPoints.find(p => p[0] === i && p[1] === column)
            if (p === undefined)
                break;
            else
                foundPoints.push(p);
        }

        // find points has same column value, but row value is lower
        for (let i = row - 1; i >= 0; i--) {
            let p = allPoints.find(p => p[0] === i && p[1] === column)
            if (p === undefined)
                break;
            else
                foundPoints.push(p);
        }

        // find points has same row value, but column value is higher
        for (let j = column + 1; j < columnCount; j++) {
            let p = allPoints.find(p => p[0] === row && p[1] === j)
            if (p === undefined)
                break;
            else
                foundPoints.push(p);
        }

        // find points has same row value, but column value is higher
        for (let j = column - 1; j >= 0; j--) {
            let p = allPoints.find(p => p[0] === row && p[1] === j)
            if (p === undefined)
                break;
            else
                foundPoints.push(p);
        }

        return foundPoints;
    }

    let rowCount = grid.length, columnCount = grid[0].length, allPoints = getAllPoints(grid);
    let startPoint = allPoints.find(p => p[0] === startX && p[1] === startY), endPoint = allPoints.find(p => p[0] === goalX && p[1] === goalY);
    let turns2Points = new Map();
    turns2Points.set(0, [startPoint]);
    let visitedPoints = [startPoint], turns = 0;

    while (true) {
        let points = turns2Points.get(turns);
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            for (let nextPoint of findCrossPoints(allPoints, point)) {
                if (visitedPoints.findIndex(p => p === nextPoint) === -1) {
                    if (nextPoint === endPoint)
                        return turns + 1;
                    visitedPoints.push(nextPoint);
                    addPointToMap(nextPoint, turns + 1, turns2Points);
                }
            }
        }
        turns++;
    }
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