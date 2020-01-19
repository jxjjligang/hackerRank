'use strict'

main();


function countArray(n, k, x) {
    const MODULO = 1000000007n;

    let choices = BigInt(k - 1), results = [];
    results[1] = ((x === 1) ? BigInt(k - 1) : BigInt(k - 2));

    let index = 2, powers = [1n, choices];
    for (let i = 2n; i <= BigInt(n - 2); i++) {
        let powerResult = (powers[index - 1] * choices) % MODULO;
        powers[index] = powerResult;
        results[index] = (MODULO + powerResult - results[index - 1]) % MODULO;
        index++;
    }

    return results[n - 2].toString();
}

function main() {
    let inputs = [`1000 100 1`,  // 43813792
        `761 99 1`  // 236568308
        , `4 3 2`];
    for (let i = 0; i < 3; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nkx = lines[index++].split(' '), n = parseInt(nkx[0], 10), k = parseInt(nkx[1], 10), x = parseInt(nkx[2], 10);
        let answer = countArray(n, k, x);
        console.log(answer + "\n");
    }
}