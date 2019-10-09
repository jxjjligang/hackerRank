'use strict'

countTime(main)();


// Complete the powerSum function below.
function powerSum(X, N) {
    let answers = [];

    function sumArray(arr) {
        return arr.reduce((agg, current) => agg + powers[current], 0);
    }

    function countOfPower(visitedIndex) {
        // console.log(visitedIndex);   // helps to understand how all the posssible combinations are tried
        let sumValue = sumArray(visitedIndex);
        if (sumValue > X)
            return 0;
        else if (sumValue === X) {
            answers.push(visitedIndex.slice());
            return 1;
        }

        let totalCount = 0;
        for (let i = 0; i < powers.length; i++) {
            if (visitedIndex.length === 0 || i > visitedIndex[visitedIndex.length - 1]) {
                visitedIndex.push(i);
                let oneTimeResult = countOfPower(visitedIndex);
                totalCount += oneTimeResult;
                visitedIndex.pop();
            }
        }

        return totalCount;
    }

    let number = 1, powers = [], power = Math.pow(number, N);
    while (power <= X) {
        powers.push(power);
        number++;
        power = Math.pow(number, N);
    }

    let sumValue = countOfPower([]);
    return sumValue;
}

function main() {
    let inputs = [`800
    2`, `100
    3`, `10
    2`, `100
2`];
    for (let i = 1; i < 2; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const X = parseInt(lines[index++], 10), N = parseInt(lines[index++], 10);

        let result = powerSum(X, N);
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