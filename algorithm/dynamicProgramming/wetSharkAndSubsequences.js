'use strict'

main();

// Based on [the idea and sample code] from Discussion
function twoSubsequences(x, r, s) {
    const ARRAY_LEN = x.length, MODULO = 1000000007n, HALF_R_PLUS_S = Math.floor((r + s) / 2), HALF_R_MINUS_S = Math.floor((r - s) / 2);
    const m = ARRAY_LEN;
    /* dp is 3-dimensional array [i][j][k], the value represents [count of ways] that by using
    i: first i elements of array; 
    j: the size of subset; pciking up j elements from [ first i elements of array]
    k: sum value of elements from j subset
    */
    if (r < s)
        return 0;

    let dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        for (let j = 0; j <= m; j++) {
            dp[i][j] = [];
            for (let k = 0; k <= HALF_R_PLUS_S; k++) {
                dp[i][j][k] = 0n;
            }
        }
    }
    dp[0][0][0] = 1n;

    for (let i = 1; i <= m; i++) {
        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= HALF_R_PLUS_S; k++) {
                dp[i][j][k] = dp[i - 1][j][k];
                let iValue = x[i - 1];
                if (k >= iValue && j >= 1)
                    dp[i][j][k] += dp[i - 1][j - 1][k - iValue];
                dp[i][j][k] %= MODULO;
            }
        }
    }

    let sum = 0n;
    for (let j = 1; j <= m; j++) {
        sum += (dp[m][j][HALF_R_PLUS_S] * dp[m][j][HALF_R_MINUS_S]) % MODULO;
    }

    return sum;
}

function main() {
    let inputs = [`100 100 0
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1`,
        `4 3 5
    1 1 1 4`,
        `4 5 3
    1 1 1 4`];

    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const mrs = lines[index++].split(' '), m = parseInt(mrs[0], 10), r = parseInt(mrs[1], 10), s = parseInt(mrs[2], 10);

        const x = lines[index++].split(' ').map(xTemp => parseInt(xTemp, 10));
        console.log(twoSubsequences(x, r, s) + "\n");
    }
}
