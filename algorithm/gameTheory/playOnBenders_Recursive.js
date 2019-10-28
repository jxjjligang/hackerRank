'use strict'

/**
 * Based on the idea of Sprague – Grundy Theorem
 */
let nimValueMap = new Map(), nonLeaves;
function bendersPlay(n, paths, query) {
    function getNimValue(location, paths) {
        if (nonLeaves === undefined)
            nonLeaves = new Set(paths.map(p => p[0]));

        if (!nonLeaves.has(location)) {
            nimValueMap.set(location, 0);
            return 0;
        }

        if (nimValueMap.has(location))
            return nimValueMap.get(location);

        let adjacentPaths = paths.filter(p => p[0] === location);
        let nextLocations = adjacentPaths.map(p => p[1]);
        let nextNimSet = new Set();
        for (let nextLocation of nextLocations)
            nextNimSet.add(getNimValue(nextLocation, paths));

        let nimValue;
        for (let i = 0; i < nextNimSet.size; i++) {
            if (!nextNimSet.has(i)) {
                nimValue = i;
                break;
            }
        }
        if (nimValue === undefined)
            nimValue = nextNimSet.size;

        nimValueMap.set(location, nimValue);
        return nimValue;
    }

    let xorResult = 0;
    for (let location of query) {
        if (!nimValueMap.has(location))
            getNimValue(location, paths);

        let nimValue = nimValueMap.get(location);
        xorResult = xorResult ^ nimValue;
    }

    return ((xorResult !== 0) ? 'Bumi' : 'Iroh');
}

main();
function main() {
    let inputs = [`10 40
    9 10
    1 7
    3 9
    4 10
    3 7
    8 10
    6 5
    6 7
    7 10
    8 9
    6 4
    6 10
    2 5
    3 10
    2 10
    9 4
    8 1
    9 2
    3 4
    10 5
    8 3
    6 9
    1 2
    8 5
    8 2
    6 1
    2 7
    6 3
    3 5
    3 2
    4 5
    8 4
    4 7
    7 5
    1 10
    1 5
    2 4
    1 3
    1 4
    8 7
    10
    8
    2 4 5 8 3 7 9 1
    6
    6 5 10 7 1 3
    7
    9 3 2 8 10 7 5
    2
    1 3
    4
    8 5 4 7
    2
    9 3
    7
    6 7 5 2 9 4 8
    7
    2 1 4 9 3 6 5
    4
    5 4 2 6
    1
    5`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

        let paths = Array(m);
        for (let pathsRowItr = 0; pathsRowItr < m; pathsRowItr++)
            paths[pathsRowItr] = lines[index++].split(' ').map(pathsTemp => parseInt(pathsTemp, 10));

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const queryCount = parseInt(lines[index++], 10);
            const query = lines[index++].split(' ').map(queryTemp => parseInt(queryTemp, 10));
            let result = bendersPlay(n, paths, query);
            console.log(result);
        }
    }
}