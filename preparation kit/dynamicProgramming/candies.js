'use strict'

function candies(n, arr) {
    // index 0 means result for the first element in arr; index 1 means result for the second element in arr; so on, so forth
    let candiesResult = [1];
    for (let i = 1; i < arr.length; i++) {
        let prevResult = candiesResult[i - 1];
        let resultOfI;
        if (arr[i] > arr[i - 1])
            resultOfI = (candiesResult[i - 1] + 1);
        else {
            resultOfI = 1;
            if (candiesResult[i - 1] === 1)
                candiesResult[i - 1]++;
        }

        candiesResult.push(resultOfI);
    }

    return candiesResult.reduce((agg, current) => agg + current);
}

main();
function main() {
    let inputs = [`3
    1
    2
    2`, `10
    2
    4
    2
    6
    1
    7
    8
    9
    2
    1`, `8
    2
    4
    3
    5
    2
    6
    4
    5`, `10
    10 
    9 
    8 
    7 
    6 
    5 
    4 
    3 
    2 
    1`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const n = parseInt(lines[index++], 10);

        let arr = [];
        for (let i = 0; i < n; i++) {
            const arrItem = parseInt(lines[index++], 10);
            arr.push(arrItem);
        }

        const result = candies(n, arr);
        console.log(result);
    }
}