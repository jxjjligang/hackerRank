'use strict'

function downToZero(n) {
    /*
     * Write your code here.
     */
    // Dynamic programming, 
    function toZeroDynamic(n, steps) {
        if (steps >= upperBound)
            return upperBound;

        if (n <= 0)
            return steps;
        else if (n == 1) {
            let finalSteps = steps + 1;
            if (finalSteps < upperBound)
                upperBound = finalSteps;
            return finalSteps;
        }
        else if (n == 2) {
            let finalSteps = steps + 2;
            if (finalSteps < upperBound)
                upperBound = finalSteps;
            return steps + 2;
        }
        else {
            var result = isPrime(n);
            if (result === true)
                return toZeroDynamic(n - 1, steps + 1);
            else {
                // for (let i = 0; i < result.length; i++) {
                // upperBound = Math.min(upperBound, Math.min(toZeroDynamic(result[i], steps + 1), toZeroDynamic(n - 1, steps + 1)));
                // }

                upperBound = Math.min(upperBound, Math.min(toZeroDynamic(Math.max(...result), steps + 1), toZeroDynamic(n - 1, steps + 1)));
                return upperBound;
            }
        }
    }

    function isPrime(n) {
        let divisors = [];
        for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
            if (n % i === 0)
                divisors.push(n / i);
        }

        return divisors.length === 0 ? true : divisors;
    }
    let upperBound = 2 * (Math.ceil(Math.log(n)) + 1);  // the maximum steps need to decrease n to 2, which is 2 * (1 + log(n))
    let dynamicResult = toZeroDynamic(n, 0);
    return dynamicResult;
}
console.log(countTime(downToZero)(812849));
//countTime(main)();

function main() {
    let input = `94
    966514
    812849
    808707
    360422
    691410
    691343
    551065
    432560
    192658
    554548
    27978
    951717
    663795
    315528
    522506
    300432
    412509
    109052
    614346
    589115
    301840
    7273
    193764
    702818
    639354
    584658
    208828
    255463
    506460
    471454
    554516
    739987
    303876
    813024
    118681
    708473
    616288
    962466
    55094
    599778
    385504
    428443
    646717
    572077
    463452
    750219
    725457
    672957
    750371
    542716
    87017
    743756
    293742
    301031
    939025
    503398
    334595
    209039
    191818
    158563
    617470
    118260
    176581
    966721
    48924
    235330
    200174
    992221
    411098
    559560
    117381
    814728
    795418
    309832
    943111
    775314
    875208
    168234
    933574
    444474
    995856
    687362
    543687
    761831
    952514
    970724
    611269
    237583
    88891
    708888
    387629
    407891
    393991
    577592`;

    let lines = input.split('\n').map(l => l.trim()), index = 0;
    const aCount = parseInt(lines[index++], 10);
    let a = [];
    for (let aItr = 0; aItr < aCount; aItr++) {
        const aItem = parseInt(lines[index++], 10);
        console.log(downToZero(aItem));
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


