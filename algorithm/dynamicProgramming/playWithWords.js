'use strict'

main();

/**
 * 1. reverse input string s, create LCS (longest common sequence) result array 
 * @param {*} s 
 */
function playWithWords(s) {
    const S_LEN = s.length;
    let reversedS = s.split('').reverse().join(''), lcsArr = [];
    for (let i = 0; i < S_LEN; i++)
        lcsArr.push([]);

    // 1.1 fill up the first row
    let firstRow = lcsArr[0];
    firstRow[0] = ((s[0] === reversedS[0]) ? 1 : 0);
    for (let columnIdx = 1; columnIdx < S_LEN; columnIdx++) {
        if (firstRow[columnIdx - 1] === 1)
            firstRow[columnIdx] = 1;
        else {
            firstRow[columnIdx] = ((s[columnIdx] === reversedS[0]) ? 1 : 0);
        }
    }

    // 1.1 fill up the first column of each row (except the first row)
    for (let rowIdx = 1; rowIdx < S_LEN; rowIdx++) {
        let row = lcsArr[rowIdx];
        if (lcsArr[rowIdx - 1][0] === 1)
            row[0] = 1;
        else {
            row[0] = ((reversedS[rowIdx] === s[0]) ? 1 : 0);
        }
    }

    // 1.3 dynamic gramming to calculate every cell of lcsArr
    for (let rowIdx = 1; rowIdx < S_LEN; rowIdx++) {
        let row = lcsArr[rowIdx];
        for (let columnIdx = 1; columnIdx < S_LEN; columnIdx++) {
            if (s[columnIdx] === reversedS[rowIdx])
                row[columnIdx] = 1 + lcsArr[rowIdx - 1][columnIdx - 1];
            else
                row[columnIdx] = Math.max(row[columnIdx - 1], lcsArr[rowIdx - 1][columnIdx]);
        }
    }

    let parlindromDif = new Set(), dif, oppositeDif, maxResult = Number.MIN_SAFE_INTEGER;
    for (let columnIdx = 0; columnIdx < S_LEN; columnIdx++) {
        if (columnIdx === (S_LEN - 1)) {
            dif = lcsArr[0][S_LEN - 1];
            oppositeDif = 0;
        }
        else {
            dif = (lcsArr[S_LEN - 1][columnIdx] - lcsArr[S_LEN - 1 - columnIdx - 1][columnIdx]);
            oppositeDif = lcsArr[S_LEN - 1][S_LEN - 1] - lcsArr[columnIdx][columnIdx];
        }
        maxResult = Math.max(maxResult, dif * oppositeDif);
        parlindromDif.add(dif);
    }
    let parlindromDifArr = Array.from(parlindromDif);
    parlindromDifArr.sort((a, b) => b - a);
    return parlindromDifArr[0] * parlindromDifArr[1];
}

function main() {
    let inputs = [`eeegeeksforskeeggeeks`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const s = lines[index++];
        let result = playWithWords(s);
        console.log(result + "\n");
    }
}