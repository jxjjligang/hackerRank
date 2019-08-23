'use strict'

// Complete the maxMin function below.
function maxMin(k, arr) {
    arr.sort((a, b) => a - b);

    let differenceArr = [];
    for (let i = k - 1; i < arr.length; i++)
        differenceArr.push(arr[i] - arr[i - k + 1]);

    return differenceArr.reduce((agg, cur) => Math.min(agg, cur));
}

main();
function main() {
    let input = `7
    3
    10
    100
    300
    200
    1000
    20
    30`;

    input=`10
    4
    1
    2
    3
    4
    10
    20
    30
    40
    100
    200`;

    input=`5
    2
    1
    2
    1
    2
    1`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const n = parseInt(lines[index++], 10), k = parseInt(lines[index++], 10);
    let arr = [];
    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(lines[index++], 10);
        arr.push(arrItem);
    }

    const result = maxMin(k, arr);
    console.log(result);
}