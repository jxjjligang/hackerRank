'use strict'

main();

// Complete the unboundedKnapsack function below.
function unboundedKnapsack(k, arr) {
    let set = new Set(arr), distinctArr = Array.from(set);
    for (let element of distinctArr) {
        if (k % element === 0)
            return k;
    }

    distinctArr.sort((a, b) => a - b);
    let min = distinctArr[0], max = distinctArr[distinctArr.length - 1];
    if (min > k)
        return 0;
    else if (min === k)
        return min;

    let combination = [0];
    for (let element of distinctArr) {
        if (element > k)
            break;

        let times = 1;
        while (times * element <= k) {
            combination[times * element] = times * element;
            times++;
        }
    }

    let minIndex = combination.findIndex((element, index) => element !== undefined && index > 0), nextMinIndex = -1, halfk = Math.ceil(k / 2);
    while (minIndex !== -1 && minIndex <= halfk) {
        for (let i = minIndex + 1; (i + minIndex) <= k; i++) {
            let element = combination[i];
            if (element === undefined)
                continue;

            if (nextMinIndex === -1)
                nextMinIndex = i;
            combination[minIndex + i] = combination[minIndex] + combination[i];
        }

        minIndex = nextMinIndex;
        nextMinIndex = -1;
    }

    for (let i = k; i >= 0; i--) {
        if (combination[i] !== undefined)
            return combination[i];
    }
}

function main() {
    let inputs = [`7
    3 9
    3 2 4
    3 12
    3 10 4
    3 13
    3 10 4
    3 16
    3 10 4
    3 2000
    2000 2000 2000
    3 9
    9 9 9
    3 8
    9 9 9`
        , `2
    4 13
    3 7 9 11
    3 11
    3 7 9`
        , `2
    3 12
    1 6 9
    5 9
    3 4 4 4 8`];
    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let i = 0; i < t; i++) {
            let nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
            const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
            let result = unboundedKnapsack(k, arr);
            console.log(result);
        }
    }
}