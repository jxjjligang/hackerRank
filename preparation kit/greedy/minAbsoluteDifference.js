'use strict'

function minimumAbsoluteDifference(arr) {
    arr.sort((a, b) => a - b);
    let differenceArray = [];
    for (let i = 1; i < arr.length; i++)
        differenceArray.push(arr[i] - arr[i - 1]);

    return differenceArray.reduce((agg, cur) => Math.min(agg, cur));
}

main();

function main() {
    let input = `3
    3 -7 0`;
    
    input=`10
    -59 -36 -13 1 -53 -92 -2 -96 -54 75`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const n = parseInt(lines[index++], 10);
    const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = minimumAbsoluteDifference(arr);
    console.log(result);
}