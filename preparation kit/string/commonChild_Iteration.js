'use strict'

function commonChild(s1, s2) {
    const S1_LENGTH = s1.length, S2_LENGTH = s2.length;

    // use iterative method, s1 index used for column value, s2 index used for row value
    // each element of s2Rows is a row, index from 0 to S1_LENGTH
    let s2Rows = [];

    // step 1. initialize each row with its first element
    for (let rowIdx = 0; rowIdx < S2_LENGTH; rowIdx++) {
        let row = [s2.slice(0, rowIdx + 1).indexOf(s1[0]) !== -1 ? 1 : 0];
        s2Rows.push(row);
    }

    // step 2. initialize each element of the first row
    let row = s2Rows[0];
    for (let columnIdx = 1; columnIdx < S1_LENGTH; columnIdx++)
        row.push(s1.slice(0, columnIdx + 1).indexOf(s2[0]) !== -1 ? 1 : 0);

    // step 3. iterate to compute value for element [rowIdx, columnIdx] in the grid
    for (let rowIdx = 1; rowIdx < S2_LENGTH; rowIdx++) {
        let row = s2Rows[rowIdx];
        for (let columnIdx = 1; columnIdx < S1_LENGTH; columnIdx++) {
            if (s1[columnIdx] === s2[rowIdx])
                row.push(1 + s2Rows[rowIdx - 1][columnIdx - 1]);
            else
                row.push(Math.max(s2Rows[rowIdx - 1][columnIdx], row[columnIdx - 1]));
        }
    }

    return s2Rows[S2_LENGTH - 1][S1_LENGTH - 1];
}

main();
function main() {
    let inputs = [`HARRY
    SALLY`, `AA
    BB`, `SHINCHAN
    NOHARAAA`]; // expects 2, 0, 3

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const s1 = lines[index++], s2 = lines[index++];

        let result = commonChild(s1, s2);
        console.log(result);
        console.log('\n');
    }
}
