'use strict'
let PRIMES = [];

countTime(main)();

// Complete the redJohn function below.
function redJohn(n) {
    const MAX_BRCIKS = 40;

    // Sieve of Eratosthenes
    function sieve(uBound) {
        if (PRIMES.length > 0)
            return;

        let numbers = [[0, false], [1, false]];
        for (let i = 2; i <= uBound; i++)
            numbers.push([i, true]);        // true means we think it's PRIME

        let primeIndex = 2, half = Math.ceil(uBound / 2);
        while (primeIndex !== -1 && numbers[primeIndex][0] <= half) {
            // flip flag for numbers who is multiples of currentPrime
            let ratio = 2, primeValue = numbers[primeIndex][0];
            while (primeValue * ratio <= uBound) {
                numbers[primeValue * ratio][1] = false;
                ratio++;
            }

            primeIndex++;
            while (primeIndex <= uBound && numbers[primeIndex][1] === false) {
                primeIndex++;
            }

        }

        PRIMES = numbers;;
        console.log('Sieve complete.');
    }

    let brickWays = [];
    for (let i = 0; i <= MAX_BRCIKS; i++) {
        if (i < 4)
            brickWays[i] = 1;
        else
            brickWays[i] = brickWays[i - 1] + brickWays[i - 4];
    }

    sieve(250000);
    return PRIMES.filter(arr => arr[0] <= brickWays[n] && arr[1] === true).length;
}

function main() {
    let inputs = [`20
    35
    23
    25
    38
    4
    35
    19
    8
    23
    35
    3
    36
    12
    10
    30
    13
    18
    31
    40
    37`
        , `8
    4
19
8
3
12
10
13
18`
        , `3
    3
    5
    8`,
        `2
        1
7` ];
    for (let i = 1; i < inputs.length; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);
            let result = redJohn(n);
            console.log(result);
        }
        console.log(`---------------------------------------------------`);
    }
}

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}