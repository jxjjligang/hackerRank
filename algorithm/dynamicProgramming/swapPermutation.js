'use strict'

let fibArr = [1, 1];
main();


function swapPermutation(n, k) {
    const MOD = 1000000007;
    k = Math.min(n, k);

    function iniFabnacci(n) {
        if (fibArr[n] !== undefined)
            return;

        for (let i = fibArr.length; i <= n; i++)
            fibArr[i] = (i * fibArr[i - 1]) % MOD;
    }

    function getCombination(n, k) {
        let result = 1;
        while (n >= k) {
            result = (result * n) % MOD;
            n--;
        }

        return result;
    }

    iniFabnacci(n);

    return [getCombination(n, k), fibArr[n]];
}

function main() {
    let inputs = [`150 100`,
        `3 2`];

    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);

        let result = swapPermutation(n, k);
        console.log(result.join(" ") + "\n");
    }
}