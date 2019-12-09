'use strict'

countTime(main)();

// Complete the minimumLoss function below.
function minimumLoss(price) {
    let minLoss = Number.MIN_SAFE_INTEGER, priceObjs = price.map((value, index) => { return { value: value, index: index } });
    priceObjs.sort((a, b) => a.value - b.value);
    for (let i = 0; i < priceObjs.length - 1; i++) {
        let current = priceObjs[i];
        for (let j = i + 1; j < priceObjs.length; j++) {
            let next = priceObjs[j];
            if (next.index > current.index)
                continue;
            else {
                minLoss = Math.max(minLoss, current.value - next.value);
                break;
            }
        }
    }

    return -minLoss;
}

function main() {
    let inputs = [`200000
        `3
    5 10 3`,
        `5
    20 7 8 2 5`];
    for (let i = 0; i < 3; i++) {    // inputs.length
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