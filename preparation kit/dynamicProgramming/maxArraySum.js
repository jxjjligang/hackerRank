'use strict'

function maxSubsetSum(arr) {
    if (arr.length === 1)
        return arr[0];
    else if (arr.length === 2)
        return Math.max(arr[0], arr[1]);

    return Math.max(arr[0] + maxSubsetSum(arr.slice(2)), maxSubsetSum(arr.slice(1)));
}

main();
function main() {
    let inputs = [`5
    3 7 4 6 5`, `5
    2 1 5 8 4`, `5
    3 5 -7 8 10`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const res = maxSubsetSum(arr);
        console.log(res);
    }
}