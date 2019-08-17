'use strict'

function riddle(arr) {
    function saveToMap(number, size, size2Num) {
        let maxNumber = number;
        if (size2Num.has(size))
            maxNumber = Math.max(maxNumber, size2Num.get(size));

        size2Num.set(size, maxNumber);
    }

    // stack is used to save the index value of arrCopy
    let arrCopy = arr.slice(), stack = [0];
    arrCopy.push(Number.MIN_SAFE_INTEGER);
    stack.top = function () {
        return stack[stack.length - 1];
    }

    stack.isEmpty = function () {
        return stack.length === 0;
    }

    let size2Num = new Map(); // save the mapping between number and the max window size
    for (let index = 1; index < arrCopy.length; index++) {
        let currentNumber = arrCopy[index], topIndex = stack.top(), topNumber = arrCopy[topIndex];
        while (currentNumber < topNumber) {
            stack.pop();
            let windowSize = stack.isEmpty() ? index : (index - stack.top() - 1);
            saveToMap(topNumber, windowSize, size2Num);
            topIndex = stack.top();
            topNumber = arrCopy[topIndex];
        }
        stack.push(index);
    }

    let answers = [], arrSize = arr.length;

    // this is for case [Window Size] -> [Number], it could have 
    // 716998518 -> 3 and 694294362 -> 2, we need update the value of samll window size 
    for (let i = arrSize - 1; i >= 1; i--) 
        saveToMap(size2Num.get(i + 1), i, size2Num);

    for (let i = 1; i <= arrSize; i++) 
        answers.push(size2Num.get(i));
    
    return answers;
}

main();

function main() {

    let strArr = '2 6 1 12';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 12 2 1 1

    strArr = '1 2 3 5 1 13 3';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 13 3 2 1 1 1 1

    strArr = '3 5 4 7 6 2';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 7 6 4 4 3 2

    strArr = '11 2 3 14 5 2 11 12';

    // strArr = '3 2 1';

    strArr = `789168277 694294362 532144299 20472621 316665904 59654039 685958445 925819184 371690486 285650353 522515445 624800694 396417773 467681822 964079876 355847868 424895284 50621903 728094833 535436067 221600465 832169804 641711594 518285605 235027997 904664230 223080251 337085579 5125280 448775176 831453463 550142629 822686012 555190916 911857735 144603739 751265137 274554418 450666269 984349810 716998518 949717950 313190920 600769443 140712186 218387168 416515873 194487510 149671312 241556542 575727819 873823206`;
    console.log(countTime(riddle)(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 12 2 1 1

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