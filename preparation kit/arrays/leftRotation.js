'use strict'

function rotLeft(a, d) {
    let shifts = d % a.length, result;
    if (shifts !== 0) {
        result = [].concat(a.slice(shifts));
        result = result.concat(a.slice(0, shifts));
    }

    return result;
}

main();

function main() {
    let input = `5 4
    1 2 3 4 5`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const nd = lines[index++].split(' '), n = parseInt(nd[0], 10), d = parseInt(nd[1], 10);

    const a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10)), result = rotLeft(a, d);
    console.log(result.join(' ') + '\n');
}