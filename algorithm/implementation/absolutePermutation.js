'use strict'

main();


// Complete the absolutePermutation function below.
function absolutePermutation(n, k) {
    let array = [];
    if (k === 0) {
        for (let i = 1; i <= n; i++)
            array.push(i);

        return array;
    }
    else {

        if (n % (2 * k) === 0) {
            let repeatTimes = (n / (2 * k));
            for (let times = 0; times < repeatTimes; times++) {
                let start = (1 + times * 2) * k;
                for (let idx = 1; idx <= k; idx++)
                    array.push(start + idx);

                for (let idx = 1; idx <= k; idx++)
                    array.push(start - k + idx);
            }

            return array;
        }
        else if ((k === 1) && (n % 2 === 0)) {
            for (let times = 0; times < (n / 2); times++) {
                let start = (1 + times) * 2;
                array.push(start);
                array.push(start - 1);
            }
            return array;
        }
        else
            return [-1];
    }
}

function main() {
    let inputs = [`10
    94 70
    95 49
    92 14
    96 2
    98 7
    92 85
    90 15
    92 10
    94 0
    92 40`,
        `10
    10 0
    10 1
    7 0
    10 9
    9 0
    10 3
    8 2
    8 0
    7 0
    10 1`];
    for (let i = 1; i < 2; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);

            let result = absolutePermutation(n, k);
            console.log(result.join(" "));
        }
    }
}