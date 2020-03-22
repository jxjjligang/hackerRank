'use strict'
const MODULO = 1000000007n;

let cache = new Map();
countTime(main)();

function getCacheValue(x, steps) {
    let finalMap = cache.get(steps);
    for (let i = 0; i < x.length - 1; i++) {
        let childMap = finalMap.get(x[i]);
        if (childMap === undefined)
            return undefined;
        else
            finalMap = childMap;
    }

    return finalMap.get(x[x.length - 1]);
}

function saveCacheValue(x, cacheValue, steps) {
    let finalMap = cache.get(steps);
    for (let i = 0; i < x.length - 1; i++) {
        let childMap = finalMap.get(x[i]);
        if (childMap === undefined) {
            childMap = new Map();
            finalMap.set(x[i], childMap);
        }
        finalMap = childMap;
    }

    finalMap.set(x[x.length - 1], cacheValue);
}

function gridWalking(m, x, D) {
    let steps = m;
    if (cache.size === 0) {
        for (let i = 0; i <= steps; i++)
            cache.set(i, new Map());
    }

    if (steps === 0) {
        return 1n;
    }
    let cacheResult = getCacheValue(x, steps);
    if (cacheResult !== undefined)
        return cacheResult;

    let ways = 0n;
    for (let i = 0; i < x.length; i++) {
        let dimensionValue = x[i], dimensionBound = D[i];
        if (dimensionValue < dimensionBound) {
            x[i]++;
            let plusWays = gridWalking(steps - 1, x, D) % MODULO;
            saveCacheValue(x, plusWays, steps - 1);
            x[i]--;
            ways = (ways + plusWays) % MODULO;
        }
        if (dimensionValue > 1) {
            x[i]--;
            let minusWays = gridWalking(steps - 1, x, D) % MODULO;
            saveCacheValue(x, minusWays, steps - 1);
            x[i]++;
            ways = (ways + minusWays) % MODULO;
        }
    }
    // saveCacheValue(x, ways, steps);
    return ways;
}

function main() {
    let inputs = [`1
    5 100
    31 64 13 10 65
    33 77 40 27 95
    6 71
    29 58 77 1 7 1
    35 68 98 18 53 2
    7 242
    66 15 41 22 40 12 8
    66 45 41 32 98 82 10
    8 257
    34 3 2 5 27 21 4 32
    98 87 7 20 29 33 4 71
    9 216
    25 39 9 24 16 49 4 39 89
    41 97 19 47 22 80 65 42 94
    5 65
    15 1 16 2 17
    25 88 44 28 60
    3 252
    19 68 47
    38 76 75
    9 296
    8 26 8 8 4 63 36 3 3
    30 36 19 44 29 77 44 14 7
    5 119
    23 48 1 19 66
    29 70 18 25 71
    1 300
    24
    73`,
        ,`10
    2 14
    2 58
    22 85
    1 5
    3
    16
    2 7
    53 16
    92 57
    1 11
    19
    97
    2 6
    38 15
    85 37
    1 10
    8
    14
    1 16
    11
    83
    1 8
    15
    35
    2 11
    57 43
    88 77
    1 5
    4
    4`,
        `10
    1 287
    44
    78
    1 236
    25
    87
    1 122
    41
    63
    1 260
    7
    64
    1 127
    3
    73
    1 69
    6
    68
    1 231
    14
    63
    1 236
    13
    30
    1 259
    38
    70
    1 257
    11
    12`,
        `1
    2 3
    1 1
    2 3`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

            const x = lines[index++].split(' ').map(xTemp => parseInt(xTemp, 10));
            const D = lines[index++].split(' ').map(DTemp => parseInt(DTemp, 10));
            cache.clear();
            console.log(gridWalking(m, x, D).toString());
        }
    }
}

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}