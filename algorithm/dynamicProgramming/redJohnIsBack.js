'use strict'

let PRIMES = [];
let resultCache = [];
main();

/**
 * My solution is calculating the number of permutation, hard to implement and eventually only passed 2 cases.
 * @param {*} n 
 */
function redJohn(n) {
    const MAX_BRCIKS = 40, MAX_FOUR_HORIZON_BRICKS_AMOUNT = 10;

    function findPrimes(uBound) {
        function isPrime(number) {
            for (let i = 2; i < Math.ceil(Math.sqrt(number)); i++) {
                if (number % i === 0)
                    return false;
            }

            return true;
        }

        if (PRIMES.length > 0)
            return;

        for (let i = 2; i < uBound; i++) {
            if (isPrime(i))
                PRIMES.push(i);
        }
    }

    /* resultCache is 2-Dimensional array, the [row index] represents the amount of vertical bricks, 
                                        the [column index] represents the amount of [Four Horizantal Bricks] (they are treated as one special brick)
        Define square as 4 1x4 bricks lay horizontally                                
    */
    function initializeResultCache() {
        let n2Factorial = new Map();

        function getCombinations(bricks, squares) {
            function nFactorial(num) {
                if (n2Factorial.has(num))
                    return n2Factorial.get(num);

                let result = 1n, remaining =  BigInt(num);
                while (remaining > 1n)
                    result *= remaining--;

                n2Factorial.set(n, result);
                return result;
            }

            let n = bricks + squares, k = squares;
            return nFactorial(n) / (nFactorial(squares) * nFactorial(bricks));
        }

        if (resultCache.length > 0)
            return;

        for (let i = 0; i <= MAX_BRCIKS; i++) {
            let row = [1n];
            resultCache.push(row);

            if (i === 0) {
                for (let j = 1; j < MAX_FOUR_HORIZON_BRICKS_AMOUNT; j++)
                    row.push(1n);
            }
        }

        let oneBrickRow = resultCache[1];
        for (let j = 0; j <= MAX_FOUR_HORIZON_BRICKS_AMOUNT; j++)
            oneBrickRow[j] = BigInt(1 + j);

        for (let i = 2; i <= MAX_BRCIKS; i++) {
            let brickRow = resultCache[i];
            for (let j = 1; j <= MAX_FOUR_HORIZON_BRICKS_AMOUNT; j++) {
                if (i + 4 * j > MAX_BRCIKS)
                    continue;

                brickRow[j] = getCombinations(i, j);
            }
        }

        return resultCache;
    }

    function binarySearch(ways) {
        if (ways < PRIMES[0])
            return -1;
        else if (ways > PRIMES[PRIMES.length - 1])
            throw Error(`Should not reach here.`);

        let left = 0, right = PRIMES.length - 1, middle = Math.floor((left + right) / 2);
        while (left <= right) {
            if (PRIMES[middle] <= ways) {
                if (PRIMES[middle + 1] > ways)
                    return middle;
                else {
                    left = middle + 1;
                    middle = Math.floor((left + right) / 2);
                }
            }
            else {
                right = middle;
                middle = Math.floor((left + right) / 2);
            }
        }
    }

    function getWays(num, resultCache) {
        if (num < 4)
            return 1;

        let total = 0n;  // i means [Special Brick amount]
        for (let i = 0; i <= Math.floor(num / 4); i++)
            total += resultCache[num - 4 * i][i];

        return total;
    }

    initializeResultCache();
    findPrimes(210000);
    let ways = getWays(n, resultCache);
    return 1 + binarySearch(ways);
}

function main() {
    let inputs = [`8
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
    for (let i = 0; i < 3; i++) {        // inputs.length
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