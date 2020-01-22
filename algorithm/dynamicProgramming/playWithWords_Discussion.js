'use strict'

main();

/**
 * 1. reverse input string s, create LCS (longest common sequence) result array 
 * @param {*} s 
 */
function playWithWords(s) {
    const S_LEN = s.length;
    let pldValueArr = []; // pld => parlindrom
    for (let i = 0; i < S_LEN; i++) {
        let values = [];
        for (let j = 0; j < i; j++)
            values[j] = 0;
        values[i] = 1;
        pldValueArr.push(values);
    }

    for (let strLen = 2; strLen <= S_LEN; strLen++) {
        for (let i = 0; i <= S_LEN - strLen; i++) {
            let j = i + strLen - 1;
            if (s[i] === s[j]) {
                if (strLen === 2)
                    pldValueArr[i][j] = 2;
                else
                    pldValueArr[i][j] = 2 + pldValueArr[i + 1][j - 1];
            }
            else
                pldValueArr[i][j] = Math.max(pldValueArr[i + 1][j], pldValueArr[i][j - 1]);
        }
    }
    // for (let row of pldValueArr)
    //     console.log(row.join(' '));

    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < S_LEN - 1; i++) {
        let row = pldValueArr[i];
        let prevValue = pldValueArr[0][i], postValue = pldValueArr[i + 1][S_LEN - 1];
        maxValue = Math.max(maxValue, prevValue * postValue);
    }

    return maxValue;
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