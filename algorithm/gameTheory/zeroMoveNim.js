'use strict'

main();

function zeroMoveNim(p) {
    function getNimValue(plateNum) {
        return (plateNum === 0) ? 0 : (1 + plateNum);
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