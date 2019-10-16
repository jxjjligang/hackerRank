'use strict'

main();

/**
 * 
 * @param {*} n: the integer number of sticks to buy
 * @param {*} k: the integer number of box sizes the store carries 
 * @param {*} b: the integer number of boxes to buy 
 */
function bonetrousle(n, k, b) {
    const UNREACHABLE = -1;
    if (b > k)
        return [UNREACHABLE];

    let bigN = n, bigK = k,bigB = b;
    let minValue = bigB * (bigB + 1n) / 2n, maxValue =bigB * (2n * bigK - bigB + 1n) / 2n;
    // let minValue = b * (b + 1) / 2, maxValue = b * (2 * k - b + 1) / 2;
    if (bigN < minValue || bigN > maxValue)
        return [UNREACHABLE];

    let times = (bigN - minValue) / bigB, leftAmount = bigN - minValue - times * bigB;
    let result = [];
    for (let i = 1n; i <= bigB; i++)
        result.push(i + times);

    let index = result.length - 1;
    while (leftAmount > 0) {
        result[index]++;
        index--;
        leftAmount--;
    }

    return result;
}

function main() {
    let inputs = [`20
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000
    999999995000050000 10000000000000 100000`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const nkb = lines[index++].split(' '), n = BigInt(nkb[0]), k = BigInt(nkb[1]), b = BigInt(nkb[2]);

            let result = bonetrousle(n, k, b);
            console.log(result.join(" ") + "\n");
        }
    }
}