'use strict'

main();
/**
 * Use the idea from Discussion -> find the [Nim Number] value of a specific pile 
 * The key point is divide [Nim Number] formula into 2 groups:
 * Group one is the normal one we are familar with: zero move has been used, we have below formula
 *  GN1[0]= 0, GN1[1]= 1, ..., GN1[n]= n 
 * 
 * Group two is the special case: zero move has not used, we have below formula
 * GN2[0]= 0 
 * GN2[1] = mex{GN2[0], GN1[1]}= mex{0,1}= 2
 * GN2[2] = mex{GN2[1], GN2[0], GN1[2]}= mex{2, 0, 2}= 1
 * By continue calculating GN2[3] and GN2[4], we can find the formula is different for odd number and even number.
 * 
 * 
 * @param {*} p 
 */
function zeroMoveNim(p) {
    function getNimValue(plateNum) {
        if (plateNum === 0)
            return 0;
        else {
            let isOdd = (plateNum % 2 === 1);
            return isOdd ? (plateNum + 1) : (plateNum - 1);
        }
    }

    if (p.length === 1)
        return 'W';

    let nimValues = p.map(num => getNimValue(num));
    let xorResult = nimValues.reduce((agg, cur) => agg ^ cur);

    return xorResult !== 0 ? 'W' : 'L';
}

function main() {
    let inputs = [`10
    10
    56 72 69 26 18 25 64 77 64 105
    10
    45 1 42 40 52 13 28 28 55 40
    10
    38 76 67 30 65 45 63 36 54 33
    10
    61 55 53 38 73 77 53 69 12 105
    10
    65 13 71 25 16 3 52 43 9 33
    10
    4 34 14 68 78 76 55 3 60 63
    10
    66 12 53 10 41 25 78 52 54 13
    10
    16 76 39 32 30 42 26 38 57 73
    10
    10 72 12 7 19 18 42 30 57 48
    10
    21 28 57 61 53 7 64 58 21 5`,
        `2
        2
        1 2
        2
        2 2`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const g = parseInt(lines[index++], 10);
        for (let gItr = 0; gItr < g; gItr++) {
            const n = parseInt(lines[index++], 10);
            const p = lines[index++].split(' ').map(pTemp => parseInt(pTemp, 10));

            let result = zeroMoveNim(p);
            console.log(result);
        }
    }
}