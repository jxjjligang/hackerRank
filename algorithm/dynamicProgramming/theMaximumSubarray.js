'use strict'

main()

// Complete the maxSubarray function below.
function maxSubarray(arr) {
    let allNegative = arr.every(element => element < 0);
    if (allNegative === true) {
        let max = arr.reduce((agg, cur) => Math.max(agg, cur), Number.MIN_SAFE_INTEGER);
        return [max, max];
    }
    else {
        let maxSubArr = 0, maxSubArrTillI = 0;
        for (let value of arr) {
            maxSubArrTillI += value;
            maxSubArrTillI = Math.max(0, maxSubArrTillI);
            maxSubArr = Math.max(maxSubArr, maxSubArrTillI);
        }

        let maxSubSequence = arr.filter(element => element >= 0).reduce((agg, cur) => agg + cur);
        return [maxSubArr, maxSubSequence];
    }
}

function main() {

    let inputs = [`2
    4
    1 2 3 4
    6
    2 -1 2 3 4 -5`,
        `1
    5
    -2 -3 -1 -4 -6`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

            let result = maxSubarray(arr);
            console.log(result.join(" ") + "\n");
        }
    }
}