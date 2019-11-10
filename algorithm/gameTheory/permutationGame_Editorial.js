'use strict'

let cs, dp = [], vis = [];
function permutationGame(arr) {
    const n = arr.length;

    function isPositionSet(mask, pos) {
        let setFlag = ((1 << pos) & mask) > 0;
        return setFlag;
    }

    function setBitAndReturn(mask, pos) {
        let orResult = ((1 << pos) | mask);
        return orResult;
    }

    function isSorted(mask, arr) {
        let last = -1;
        for (let i = 0; i < arr.length; i++) {
            if (isPositionSet(mask, i) === false) {
                if (arr[i] <= last)
                    return false;
                last = arr[i];
            }
        }
        return true;
    }

    function solve(mask) {
        if (isSorted(mask, arr))
            return false;
        if (vis[mask] === cs)
            return dp[mask];
        vis[mask] = cs;
        let can_win = false;
        for (let i = 0; i < n; i++) {
            if (isPositionSet(mask, i) === false) {
                let orResult = setBitAndReturn(mask, i);
                if (solve(orResult) === false) {
                    can_win = true;
                    break;
                }
            }
        }
        dp[mask] = can_win;
        return can_win;
    }

    return (solve(0) === true) ? 'Alice' : 'Bob';
}

function main() {
    let inputs = [`100
    11
    11 9 10 5 8 3 2 7 6 4 1
    10
    10 7 9 2 5 8 4 1 3 6
    5
    3 4 5 1 2
    15
    15 2 4 10 12 13 8 7 11 14 1 6 5 9 3
    15
    9 4 7 10 13 12 8 6 2 5 1 14 3 15 11
    9
    6 9 1 2 3 7 8 4 5
    15
    13 5 6 7 3 10 1 14 9 2 12 8 15 11 4
    15
    15 3 13 4 14 5 8 12 2 10 1 11 9 6 7
    12
    12 9 10 6 3 4 11 2 5 1 7 8
    11
    11 6 8 4 3 9 2 7 1 5 10
    15
    8 13 1 9 10 12 6 5 3 15 4 7 2 14 11
    15
    15 12 8 3 2 6 10 5 13 4 11 14 9 1 7
    15
    14 4 6 5 12 9 11 10 7 8 15 3 2 13 1
    7
    2 5 4 3 7 1 6
    8
    8 7 4 2 1 5 6 3
    13
    11 10 7 5 1 3 13 12 8 6 2 9 4
    13
    4 12 1 2 11 5 6 8 13 9 7 10 3
    12
    5 11 7 10 6 8 9 3 4 12 2 1
    13
    4 5 2 12 10 1 9 13 6 7 8 3 11
    5
    1 3 4 5 2
    13
    9 2 12 8 4 5 11 10 6 3 13 1 7
    9
    6 2 3 1 9 5 8 7 4
    15
    12 7 9 5 6 4 10 15 14 8 1 2 13 11 3
    9
    8 1 6 3 5 2 9 4 7
    12
    8 4 9 1 7 6 3 11 5 10 12 2
    9
    4 5 3 7 8 6 2 9 1
    14
    6 13 10 12 5 14 8 1 7 3 11 2 4 9
    12
    6 5 4 10 9 11 7 3 1 2 12 8
    12
    5 11 2 9 7 8 1 6 10 4 12 3
    11
    5 6 4 7 10 9 8 1 3 2 11
    15
    5 11 10 9 8 3 1 4 14 6 15 12 7 13 2
    10
    2 5 7 1 6 8 3 4 9 10
    14
    4 6 2 14 8 1 9 11 10 5 7 12 13 3
    5
    3 1 4 5 2
    13
    5 7 6 10 1 3 4 9 12 11 2 8 13
    13
    5 2 3 12 6 8 9 4 11 1 7 13 10
    5
    3 2 1 4 5
    15
    4 7 12 15 8 1 9 6 11 10 5 13 3 2 14
    11
    11 9 4 10 3 1 6 7 5 2 8
    8
    1 6 7 2 5 4 8 3
    11
    11 4 6 9 10 1 8 2 7 3 5
    15
    3 14 10 2 1 13 9 8 7 12 6 4 5 11 15
    15
    2 14 1 5 3 6 9 10 15 8 12 13 4 7 11
    10
    5 9 3 10 1 4 2 7 6 8
    15
    12 4 13 7 9 14 8 10 15 1 3 6 2 5 11
    9
    8 3 7 9 1 2 4 6 5
    13
    13 9 10 11 2 1 4 8 6 12 3 5 7
    5
    4 3 1 5 2
    7
    6 3 7 5 1 4 2
    10
    8 1 9 10 7 2 4 5 6 3
    11
    6 3 10 11 9 7 5 8 1 2 4
    14
    10 8 7 11 6 5 4 13 3 1 2 12 9 14
    9
    4 3 6 2 9 1 7 5 8
    5
    5 1 3 2 4
    9
    8 4 5 7 9 6 2 3 1
    6
    4 2 5 3 1 6
    7
    6 1 5 2 7 4 3
    6
    5 1 2 4 6 3
    15
    4 5 1 10 14 2 3 6 8 7 13 9 15 11 12
    14
    8 2 11 9 6 1 4 10 7 13 14 5 12 3
    5
    2 3 1 5 4
    11
    4 3 5 6 8 11 7 10 9 1 2
    14
    4 10 2 3 11 6 8 5 7 1 13 12 14 9
    15
    2 7 8 6 9 3 12 10 5 13 4 14 1 15 11
    12
    7 1 2 8 3 5 9 10 12 4 11 6
    8
    3 4 5 7 8 1 2 6
    12
    5 3 7 1 2 9 10 6 4 8 12 11
    9
    1 4 6 5 8 7 9 3 2
    12
    2 9 7 10 11 4 6 1 5 12 8 3
    14
    14 10 9 1 3 2 6 11 13 4 12 7 5 8
    15
    7 11 13 2 9 1 12 10 15 3 4 5 6 14 8
    5
    4 3 5 2 1
    7
    4 7 5 3 1 2 6
    13
    9 12 8 5 4 6 10 11 7 13 2 3 1
    13
    6 3 10 2 9 7 5 11 8 12 1 4 13
    13
    13 5 8 10 7 3 6 11 1 4 12 2 9
    14
    13 3 8 11 4 6 9 2 14 1 10 12 5 7
    5
    1 5 4 2 3
    10
    3 2 9 6 8 5 1 10 4 7
    9
    9 2 4 6 8 5 1 7 3
    5
    5 2 4 1 3
    14
    2 3 7 1 6 4 5 11 8 10 9 14 13 12
    8
    1 3 8 7 6 4 5 2
    6
    3 2 4 5 1 6
    6
    6 5 2 3 4 1
    13
    9 11 8 5 7 10 1 12 2 3 13 6 4
    14
    5 10 6 7 3 1 13 4 2 12 9 14 11 8
    12
    9 1 2 11 10 7 6 8 12 3 5 4
    11
    3 4 8 6 10 9 11 2 5 1 7
    6
    4 3 2 6 1 5
    15
    12 4 1 9 5 11 10 14 6 15 7 13 8 3 2
    15
    1 11 2 3 10 5 7 12 15 9 14 13 6 8 4
    11
    8 10 11 4 1 7 5 3 2 6 9
    13
    11 7 8 2 6 10 12 1 13 4 9 3 5
    12
    5 1 11 3 2 4 12 6 7 10 8 9
    13
    9 13 8 6 7 5 3 10 4 12 2 11 1
    6
    6 4 1 5 3 2
    5
    1 3 2 4 5
    6
    6 3 5 4 1 2
    9
    8 1 6 9 2 3 4 5 7`];
    let corretResult = `Bob
    Alice
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Alice
    Bob
    Alice
    Alice
    Bob
    Bob
    Alice
    Alice
    Bob
    Alice
    Alice
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Bob
    Bob
    Bob
    Alice
    Bob
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Bob
    Bob
    Alice
    Alice
    Alice
    Bob
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Bob
    Bob
    Alice
    Bob
    Alice
    Alice
    Bob
    Alice
    Alice
    Bob
    Alice
    Bob
    Bob
    Bob
    Bob
    Alice
    Bob
    Alice
    Bob
    Bob
    Bob
    Alice
    Bob
    Bob
    Bob
    Bob
    Alice
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Bob
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Alice
    Bob
    Bob
    Alice
    Alice
    Alice
    Alice`.split('\n').map(s => s.trim());
    let errorCount = 0;
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const arrCount = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
            if (tItr + 1 !== 98)
                continue;
            cs = tItr + 1;
            let result = permutationGame(arr);
            if (result !== corretResult[tItr]) {
                errorCount++;
                console.log(`${tItr + 1}: ${result}, arrCount:${arrCount}, corretResult: ${corretResult[tItr]}`);
            }
        }
        console.log(`Total errors: ${errorCount}`);
    }
}

countTime(main)();

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