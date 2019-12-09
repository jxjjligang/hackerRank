'use strict'

countTime(main)();

// Complete the minimumLoss function below.
function minimumLoss(price) {
    const INVALID_ELEMENT = -1;
    /**
     * 1. Find the samllest element from array that bigger than value, else return -1;
     * 2. Merge the value into the array and keep the array in ascending order
     * @param {*} prevPrices in ascending order
     * @param {*} currentPrice 
     */
    function binarySearch(prevPrices, currentPrice) {
        let len = prevPrices.length, first = prevPrices[0], last = prevPrices[len - 1], result;
        if (first > currentPrice) {
            prevPrices.unshift(currentPrice);
            return first;
        }
        else {  // first < value is true
            if (last < currentPrice) {
                prevPrices.push(currentPrice);
                return INVALID_ELEMENT;
            }
            else {  // first < value < last is true
                let start = 0, end = len - 1, middle = Math.floor((start + end) / 2);
                while (true) {
                    if (prevPrices[middle] < currentPrice) {
                        if (prevPrices[middle + 1] > currentPrice) {
                            result = prevPrices[middle + 1];
                            prevPrices.splice(middle + 1, 0, currentPrice);
                            break;
                        }
                        else {
                            start = middle;
                            middle = Math.floor((start + end) / 2)
                        }
                    }
                    else {
                        end = middle;
                        middle = Math.floor((start + end) / 2)
                    }
                }
            }
        }

        return result;
    }

    let prevPrices = [price[0]], minLoss = Number.MIN_SAFE_INTEGER;
    for (let i = 1; i < price.length; i++) {
        let currentPrice = price[i], biggestOfLess = binarySearch(prevPrices, currentPrice);
        if (biggestOfLess !== INVALID_ELEMENT)
            minLoss = Math.max(minLoss, currentPrice - biggestOfLess);
    }

    return -minLoss;
}

function main() {
    let inputs = [`200000
        `3
    5 10 3`,
        `5
    20 7 8 2 5`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const n = parseInt(lines[index++], 10), price = lines[index++].split(' ').map(priceTemp => parseInt(priceTemp, 10));

        let result = minimumLoss(price.slice(0, n));
        console.log(result + "\n");
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