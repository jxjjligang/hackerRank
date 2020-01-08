'use strict'

main();


// Complete the longestIncreasingSubsequence function below.
function longestIncreasingSubsequence(arr) {
    const ARR_LEN = arr.length, MIN_NUMBER = Number.MIN_SAFE_INTEGER;

    let idx2LISValue = new Map([[0, 1]]), maxLCS = 1;
    for (let i = 1; i < ARR_LEN; i++) {
        let itemI = arr[i], maxJ = MIN_NUMBER;
        for (let j = 0; j < i; j++) {
            if (itemI > arr[j])
                maxJ = Math.max(maxJ, idx2LISValue.get(j))
        }

        if (maxJ === MIN_NUMBER)
            idx2LISValue.set(i, 1);
        else {
            idx2LISValue.set(i, 1 + maxJ);
            maxLCS = Math.max(maxLCS, 1 + maxJ);
        }
    }

    return maxLCS;
}

function main() {
    let inputs = [`5
2
7
4
3
8`, `6
2
4
3
7
4
5`];
    for (let i = 0; i < 2; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const n = parseInt(lines[index++], 10);
        let arr = [];
        for (let i = 0; i < n; i++)
            arr.push(parseInt(lines[index++], 10));

        let result = longestIncreasingSubsequence(arr);
        console.log(result + "\n");
    }
}