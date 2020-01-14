'use strict'

main();

/**
*  -----------------------------------> A
*  |
*  |
*  |
*  |
*  |
*  |
*  |
*  B
* 
*  Each element in resultArr will be the lCS value for (a[0, j], b[0, i]):
*/
function longestCommonSubsequence(a, b) {
    const A_LEN = a.length, B_LEN = b.length, ONE = 1, ZERO = 0;

    let resultArr = [];
    for (let i = 0; i < B_LEN; i++)
        resultArr.push([]);

    let firstRow = resultArr[0], firstB = b[0];
    firstRow[0] = ((a[0] === firstB) ? ONE : ZERO);
    for (let j = 1; j < A_LEN; j++) {
        if (firstRow[j - 1] === ONE)
            firstRow[j] = ONE;
        else
            firstRow[j] = (a[j] === firstB) ? ONE : ZERO;
    }

    let firstA = a[0];
    for (let i = 1; i < B_LEN; i++) {
        let row = resultArr[i];
        row[0] = ((resultArr[i - 1][0] === ONE || b[i] === firstA) ? ONE : ZERO);
    }

    for (let i = 1; i < B_LEN; i++) {
        for (let j = 1; j < A_LEN; j++) {
            let lcsValue;
            if (a[j] === b[i])
                lcsValue = 1 + resultArr[i - 1][j - 1];
            else
                lcsValue = Math.max(resultArr[i - 1][j], resultArr[i][j - 1]);

            resultArr[i][j] = lcsValue;
        }
    }

    let row = B_LEN - 1, column = A_LEN - 1, maxLCS = resultArr[row][column], elements = [];
    while (maxLCS > 0) {
        if (a[column] === b[row]) {
            elements.unshift(a[column]);
            row--;
            column--;
            maxLCS--;
        }
        else {
            if (row > 0 && resultArr[row - 1][column] === maxLCS)
                row--;
            else
                column--;
        }
    }

    return elements;
}

function main() {
    let inputs = [`50 46
    16 27 89 79 60 76 24 88 55 94 57 42 56 74 24 95 55 33 69 29 14 7 94 41 8 71 12 15 43 3 23 49 84 78 73 63 5 46 98 26 40 76 41 89 24 20 68 14 88 26
    27 76 88 0 55 99 94 70 34 42 31 47 56 74 69 46 93 88 89 7 94 41 68 37 8 71 57 15 43 89 43 3 23 35 49 38 84 98 47 89 73 24 20 14 88 75`
        , `9 10
    3 9 8 3 9 7 9 7 0
    3 3 9 9 9 1 7 2 0 6`
        , `5 6
1 2 3 4 1
3 4 1 2 1 3`];

    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
        const a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10)), b = lines[index++].split(' ').map(bTemp => parseInt(bTemp, 10));

        let result = longestCommonSubsequence(a, b);
        console.log(result.join(" ") + "\n");
    }
}