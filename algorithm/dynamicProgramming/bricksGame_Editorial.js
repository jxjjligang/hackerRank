'use strict'

main();

function bricksGame(arr) {
    const ARR_LENGTH = arr.length;

    function fillBriksDP(arr) {
        let reverseArr = arr.slice(), sum = [], dp = [];
        reverseArr.reverse();
        sum[0] = reverseArr[0];
        for (let i = 1; i < ARR_LENGTH; i++)
            sum[i] = reverseArr[i] + sum[i - 1];

        dp[0] = sum[0];
        dp[1] = sum[1];
        dp[2] = sum[2];
        for (let i = 3; i < ARR_LENGTH; i++) {
            let taken = 0;
            dp[i] = Number.MIN_SAFE_INTEGER;
            for (let j = 1; j <= 3; j++) {
                taken += reverseArr[i + 1 - j];
                dp[i] = Math.max(dp[i], taken + sum[i - j] - dp[i - j]);
            }
        }

        return dp[ARR_LENGTH - 1]
    }
    if (ARR_LENGTH === 1)
        return arr[0];
    else if (ARR_LENGTH === 2)
        return arr[0] + arr[1];
    else if (ARR_LENGTH === 3)
        return arr[0] + arr[1] + arr[2];

    return fillBriksDP(arr);
}

function main() {
    let inputs = [`3
    10
    321 386 740 595 161 176 606 64 577 316
    10
    267 744 264 372 943 683 506 607 504 441
    10
    3 559 416 40 263 747 634 135 817 34`,
        `2
  5
  999 1 1 1 0
  5
  0 1 1 1 999`];
    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const arrCount = parseInt(lines[index++], 10);
            const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

            let result = bricksGame(arr);
            console.log(result + "\n");
        }
    }
}