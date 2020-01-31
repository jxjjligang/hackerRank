'use strict'
main();

function primeXor(a) {
    const XOR_MAX = 8192;    // the max XOR value that is possible for value in range [3500, 4500]
    const MOD = 1000000007;
    // Get array of prime numbers up to n, n is included
    function sieve(n) {
        if (n < 2)
            return [];

        let arr = [[2, true]];
        for (let i = 3; i <= n; i++)
            arr.push([i, true]);

        for (let i = 0; i <= Math.ceil(n / 2); i++) {
            let elementI = arr[i];
            if (elementI[1] === false)
                continue;

            for (let j = i + 1; j < arr.length; j++) {
                let elementJ = arr[j];
                if (elementJ[0] % elementI[0] === 0)
                    elementJ[1] = false;
            }
        }

        return arr.filter(element => element[1] === true).map(ele => ele[0]);
    }

    let num2Count = new Map(), numberSet = new Set(), primes = sieve(XOR_MAX);
    for (let num of a) {
        numberSet.add(num);
        if (!num2Count.has(num))
            num2Count.set(num, 1);
        else
            num2Count.set(num, 1 + num2Count.get(num));
    }

    // dp is 2-dimension array, dp[i][j] is the count of subset whose XOR value is j, use elements in range [0, i] of distinctArr 
    let dp = [], distinctArr = Array.from(numberSet), arrLen = distinctArr.length;
    for (let n of distinctArr) {
        let arrCopy = [];
        for (let j = 0; j <= XOR_MAX; j++)
            arrCopy.push(0);
        dp.push(arrCopy);
    }

    let firstValue = distinctArr[0];
    dp[0][0] = 1 + Math.floor(num2Count.get(firstValue) / 2);
    dp[0][firstValue] = Math.floor((1 + num2Count.get(firstValue)) / 2);

    for (let i = 1; i < arrLen; i++) {
        for (let j = 0; j <= XOR_MAX; j++) {
            let currentValue = distinctArr[i];
            dp[i][j] = (dp[i - 1][j] * (1 + Math.floor(num2Count.get(currentValue) / 2)) + dp[i - 1][j ^ currentValue] * Math.floor((1 + num2Count.get(currentValue)) / 2)) % MOD;;
        }
    }

    let ans = 0;
    for (let prime of primes)
        ans = (ans + dp[arrLen - 1][prime]) % MOD;
    return ans;
}

function main() {
    let inputs = [`1   
    3   
    3511 3671 4153`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10), a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10));

            let result = primeXor(a);
            console.log(result + "\n");
        }
    }
}