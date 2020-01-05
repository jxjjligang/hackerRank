'use strict'

function legoBlocks(height, width) {
    const MODULOR = 10n ** 9n + 7n;
    let fibMap = new Map([[0, 1n]]);
    function pow(bigInt, exponent) {
        if (bigInt === 1n)
            return 1n;

        let result = 1n;
        while (exponent) {
            if (exponent % 2)
                result = (result * bigInt) % MODULOR;
            bigInt = (bigInt * bigInt) % MODULOR;
            exponent = Math.floor(exponent / 2);
        }

        return result;
    }

    function fillFibMap(newWidth) {
        for (let i = 1; i <= newWidth; i++) {
            if (fibMap.has(i))
                continue;

            let previous = [];
            for (let j = 1; j <= 4; j++) {
                if ((i - j) < 0)
                    break;
                else
                    previous.push(fibMap.get(i - j));
            }
            fibMap.set(i, previous.reduce((agg, cur) => agg + cur) % MODULOR);
        }
    }

    function getSafeCount(width) {
        for (let i = 2; i <= width; i++) {
            if (safeMap.has(i))
                continue;

            // calculate safe(i)
            let exponentI = exponentMap.get(i), unSafe = 0n;
            for (let j = 1; j <= i - 1; j++)
                unSafe = (unSafe + safeMap.get(j) * exponentMap.get(i - j)) % MODULOR;

            if (exponentI < unSafe)
                exponentI += MODULOR;
            safeMap.set(i, exponentI - unSafe);
        }
    }

    fillFibMap(width);
    let exponentMap = new Map(), safeMap = new Map();
    safeMap.set(1, 1n);
    for (let kv of fibMap) {
        let key = kv[0];
        if (!exponentMap.has(key))
            exponentMap.set(key, pow(kv[1], height) % MODULOR);
    }

    getSafeCount(width);
    return Number(safeMap.get(width) % MODULOR);
}

function main() {
    let inputs = [`100
    529 190
    873 909
    959 499
    37 809
    754 249
    304 334
    134 649
    891 755
    568 747
    369 530
    501 47
    789 798
    250 991
    304 34
    364 498
    254 893
    687 126
    153 997
    976 189
    158 730
    437 461
    415 922
    461 305
    29 28
    51 749
    557 903
    795 698
    700 44
    40 3
    429 404
    501 682
    648 539
    160 152
    536 135
    340 693
    216 128
    505 630
    50 965
    286 430
    344 336
    178 901
    239 972
    950 290
    368 989
    293 796
    744 145
    830 391
    683 341
    542 570
    827 233
    262 43
    361 118
    24 762
    82 310
    191 426
    997 368
    678 235
    691 627
    525 58
    615 169
    206 359
    313 387
    101 347
    727 995
    917 553
    579 530
    947 291
    648 971
    52 81
    632 594
    858 628
    313 887
    215 356
    513 91
    413 480
    611 970
    190 275
    356 642
    621 434
    988 889
    339 567
    771 285
    857 418
    607 261
    850 238
    206 60
    218 519
    946 784
    874 459
    874 638
    290 484
    608 479
    758 315
    472 730
    101 460
    619 439
    26 389
    75 234
    158 682
    494 359`
        , `100
    8 6
    7 3
    3 8
    4 7
    3 7
    8 10
    3 4
    10 3
    10 8
    2 3
    2 10
    9 5
    4 7
    7 4
    7 2
    5 8
    7 10
    5 6
    5 8
    4 1
    7 9
    4 2
    3 1
    10 3
    5 10
    5 9
    8 3
    3 7
    7 2
    5 10
    2 8
    2 6
    8 7
    7 6
    10 5
    3 10
    1 9
    1 10
    9 6
    2 6
    5 9
    4 1
    5 5
    4 2
    10 7
    8 9
    5 2
    10 8
    9 9
    9 10
    4 4
    7 1
    9 9
    8 7
    1 4
    3 6
    6 10
    10 3
    8 8
    9 2
    10 4
    1 3
    6 2
    9 6
    5 7
    9 7
    5 8
    1 7
    10 1
    4 2
    4 5
    10 2
    10 4
    1 6
    5 1
    7 3
    6 7
    8 3
    10 10
    3 8
    4 3
    10 10
    10 2
    6 9
    5 9
    3 10
    1 5
    3 1
    3 10
    9 4
    5 1
    10 7
    5 5
    4 7
    1 3
    4 6
    5 4
    7 10
    3 7
    3 9`
        , `4  
    2 2  
    3 2  
    2 3  
    4 4`];
    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

            let result = legoBlocks(n, m);
            console.log(result);
        }
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
countTime(main)();