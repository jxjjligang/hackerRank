'use strict'
function pairs(k, arr) {
    let indexArr = [];
    for (let i = 0; i < arr.length; i++)
        indexArr[arr[i]] = arr[i];

    let sorted = arr.sort((a, b) => a - b), pairs = 0;;
    for (let i = 0; i < sorted.length - 1; i++) {
        let curret = sorted[i], target = curret + k;
        if (indexArr[target])
            pairs++;
    }

    return pairs;
}

main();

function main() {
    let input = `5 2  
    1 5 3 4 2  `;
    let lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
    const k = lines[index++].split(' ').map(s => parseInt(s))[1];
    let arr = lines[index++].split(' ').map(s => parseInt(s));

    console.log(pairs(k, arr));
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