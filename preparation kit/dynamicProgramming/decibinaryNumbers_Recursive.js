'use strict'

function decibinaryNumbers(x) {
    function getCountOfNumber(number, digits) {
        if (digits < 1)
            throw Error(`Unexpected case: number: ${number}, digits: ${digits}.`);
        if (number < 10 && digits === 1)
            return 1;
        else if (number === 0 || number === 1)
            return 1;
        else if (number >= Math.pow(10, digits))
            return 0;

        let count = 0, lessDigits = digits - 1, n = number;
        while (n >= 0) {
            count += getCountOfNumber(n, lessDigits);
            n -= Math.pow(2, lessDigits);
        }

        return count;
    }

    let numbers = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
        let digits = Math.ceil(Math.log2(number)), isPowerOf2 = number === Math.pow(2, digits);
        let answer = getCountOfNumber(number, digits);
        if (isPowerOf2)
            answer++;

        console.log(`number: ${number}, answer: ${answer}`);
    }

    return 1;
}

main();
function main() {
    let inputs = [`5
    1
    2
    3
    4
    10`, `7
    8
    23
    19
    16
    26
    7
    6`, `10
    19
    25
    6
    8
    20
    10
    27
    24
    30
    11`];

    inputs = [`1
    10`]

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const x = parseInt(lines[index++], 10);

            let result = decibinaryNumbers(x);
            console.log(result);
        }
    }
}