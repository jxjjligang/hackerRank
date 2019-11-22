'use strict'

main();

/*
 * Complete the 'initialize' function below.
 *
 * The function accepts STRING s as parameter.
 */
function initialize(s) {
    // This function is called once before all queries.

}

/*
 * Complete the 'answerQuery' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER l
 *  2. INTEGER r
 */
function answerQuery(l, r) {
    // Return the answer for this query modulo 1000000007.
    return -1;
}

function main() {
    let inputs = [`week
    2
    1 4
    2 3`,
        `abab
    1
    1 4`];
        for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const s = lines[index++];
        initialize(s);

        const q = parseInt(lines[index++].trim(), 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' '), l = parseInt(firstMultipleInput[0], 10),r = parseInt(firstMultipleInput[1], 10);

            const result = answerQuery(l, r);
            console.log(result + '\n');
        }
    }
}
