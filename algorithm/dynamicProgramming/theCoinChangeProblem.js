'use strict'

countTime(main)();

function getWays(n, c) {
    // key: numeric amount value; value: set of 
    let amount2CountArr = new Map();

    function getPermutation(remaining, countArr) {
        function arrayEquals(arr1, arr2) {
            if (arr1.length !== arr2.length)
                return false;

            for (let i = 0; i < arr1.length; i++) {
                let v1 = arr1[i], v2 = arr2[i];
                if (v1 === undefined || v2 === undefined) {
                    if (v1 === undefined && v2 === undefined)
                        continue;
                    else
                        return false;
                }
                else {
                    if (v1 !== v2)
                        return false;
                }
            }

            return true;
        }

        function mergeArray(destArr, srcArr) {
            for (let i = 0; i < srcArr.length; i++) {
                let srcValue = srcArr[i], destValue = destArr[i];
                if (srcValue === undefined)
                    continue;

                if (destValue !== undefined)
                    destArr[i] += srcValue;
                else
                    destArr[i] = srcValue;
            }
        }

        function addToCache(countArr) {
            let amount = countArr.reduce((agg, element, index) => {
                if (element === undefined)
                    return agg;
                else
                    return agg + element * index;
            }, 0), countArrs;
            if (amount2CountArr.has(amount))
                countArrs = amount2CountArr.get(amount);
            else {
                countArrs = [];
                amount2CountArr.set(amount, countArrs);
            }

            let arrExisted = false;
            for (let i = 0; i < countArrs.length; i++) {
                if (arrayEquals(countArrs[i], countArr) === true) {
                    arrExisted = true;
                    break;
                }
            }
            if (arrExisted === false)
                countArrs.push(countArr);
        }

        if (remaining < 0)
            return;
        else if (remaining === 0) {     
            addToCache(countArr);
        }
        else if (amount2CountArr.has(remaining)) {
            let cntArrs = amount2CountArr.get(remaining);
            for (let cntArr of cntArrs) {
                let arrCopy = cntArr.slice();
                mergeArray(arrCopy, countArr);
                addToCache(arrCopy);
            }
        }
        else {
            for (let coinValue of coinValues) {
                if (remaining - coinValue >= 0) {
                    let arrCopy = countArr.slice();
                    if (arrCopy[coinValue] !== undefined)
                        arrCopy[coinValue]++;
                    else
                        arrCopy[coinValue] = 1;

                    getPermutation(remaining - coinValue, arrCopy);
                }
            }
        }
    }

    const coinValues = c.sort((a, b) => b - a), minCoin = coinValues[coinValues.length - 1];   
    for (let i = minCoin; i <= n; i++)
        getPermutation(i, []);

    if (!amount2CountArr.has(n))
        return 0;
    else
        return amount2CountArr.get(n).length;
}

function main() {
    let inputs = [`75 27
    25 10 11 29 49 31 33 39 12 36 40 22 21 16 37 8 18 4 27 17 26 32 6 38 2 30 34`
        ,`1 25
    48 6 34 50 49 36 30 35 40 41 17 43 39 13 4 20 19 2 46 7 38 33 28 18 21`,
        `166 23
    5 37 8 39 33 17 22 32 13 7 10 35 40 2 43 49 46 19 41 1 12 11 28`,
        `4 3
1 2 3`,
        `10 4
2 5 3 6`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10), m = parseInt(firstMultipleInput[1], 10);

        const c = lines[index++].replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));
        // Print the number of ways of making change for 'n' units using coins having the values given by 'c'
        const ways = getWays(n, c);
        console.log(ways + '\n');
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