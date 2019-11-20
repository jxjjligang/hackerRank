'use strict'

main();

/**
 * Based on the idea from Discussion board, count inversions and return final result based on the count is even or not
 * @param {*} array 
 */
function larrysArray(array) {
    const ARRAY_LAST_INDEX = array.length - 1;

    let countOfInversion = 0;
    for (let i = 0; i < ARRAY_LAST_INDEX; i++) {
        for (let j = i+1; j < ARRAY_LAST_INDEX + 1; j++) {
            if (array[i] > array[j])
                countOfInversion++;
        }
    }

    return (countOfInversion % 2 === 0) ? 'YES' : 'NO';
}

function main() {

    let inputs = [`5
    12
    9 6 8 12 3 7 1 11 10 2 5 4
    21
    17 21 2 1 16 9 12 11 6 18 20 7 14 8 19 10 3 4 13 5 15
    15
    5 8 13 3 10 4 12 1 2 7 14 6 15 11 9
    13
    8 10 6 11 7 1 9 12 3 5 13 4 2
    18
    7 9 15 8 10 16 6 14 5 13 17 12 3 11 4 1 18 2`,
        `4
    6
    1 6 5 2 4 3
    3
    3 1 2
    4
    1 3 4 2
    5
    1 2 3 5 4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10), A = lines[index++].split(' ').map(ATemp => parseInt(ATemp, 10));

            let result = larrysArray(A);
            console.log(result + "\n");
        }
    }
}