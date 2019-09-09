'use strict'

let countArray = [1, 1];            // save the count for each number, at index 0 save the count for number 0, at index 1 save the count for number 1, so on and so forth
let sumCountArray = [1, 2];         // save the total count until number at index
let maxNumberOfDigit = [9];        // save the max NUMBER for number of digit (1 + index)
let number2Digit2Arr = new Map();  // number -> {digit: array of decibinary format}

let digit2Arr = new Map();
digit2Arr.set(1, [0])
number2Digit2Arr.set(0, digit2Arr);

digit2Arr = new Map();
digit2Arr.set(1, [1])
number2Digit2Arr.set(1, digit2Arr);

function decibinaryNumbers(x) {
    function addToMap(mapOfMap, number, digit, array) {
        let digit2Arr;

        if (mapOfMap.has(number))
            digit2Arr = mapOfMap.get(number);
        else {
            digit2Arr = new Map();
            mapOfMap.set(number, digit2Arr);
        }

        if (digit2Arr.has(digit))
            throw Error(`Number ${number} already has formats for digit ${digit}`);

        digit2Arr.set(digit, array);
        if (digit2Arr.count === undefined)
            digit2Arr.count = array.length;
        else
            digit2Arr.count += array.length;
    }

    function getMinDigit(number) {
        while (maxNumberOfDigit[maxNumberOfDigit.length - 1] < number) {
            let nextDigit = maxNumberOfDigit.length;
            let maxNumber = maxNumberOfDigit[maxNumberOfDigit.length - 1] + 9 * Math.pow(2, nextDigit);
            maxNumberOfDigit.push(maxNumber);
        }

        return maxNumberOfDigit.length;
    }

    /**
     * Get the formats for number
     * @param {*} number 
     */
    function updateCountArrays(number) {
        let minDigit = getMinDigit(number), maxDigit = Math.ceil(Math.log2(number));
        for (let digit = minDigit; digit <= maxDigit; digit++) {
            let formats = getFormatsOfNumber(number, digit);
            addToMap(number2Digit2Arr, number, digit, formats);
        }

        if (number === Math.pow(2, maxDigit))
            addToMap(number2Digit2Arr, number, maxDigit + 1, [parseInt(Number(number).toString(2))]);

        let index = number, count = number2Digit2Arr.get(number).count;
        countArray[index] = count;
        sumCountArray[index] = count + sumCountArray[index - 1];
    }

    function getLastFormatOfNumber(digit2Arr) {
        let keys = Array.from(digit2Arr.keys()), lastKey = keys[keys.length - 1];
        let array = digit2Arr.get(lastKey);
        return array[array.length - 1];
    }

    function getFormatsOfNumber(number, digit) {
        if (digit < 1)
            throw Error(`Unexpected case: number: ${number}, digit: ${digit}.`);
        if (number < 10 && digit === 1)
            return [number];
        else if (number === 0 || number === 1)
            return [number];
        else if (digit < getMinDigit(number))
            return [];

        let lessDigits = digit - 1, n = number - Math.pow(2, lessDigits), formats = [];
        while (n >= 0) {
            formats = formats.concat(getFormatsOfNumber(n, lessDigits));
            n -= Math.pow(2, lessDigits);
        }

        return formats;
    }

    while (x > sumCountArray[sumCountArray.length - 1]) {
        updateCountArrays(sumCountArray.length);
    }

    let index = sumCountArray.findIndex(value => value === x);
    if (index !== -1)
        return getLastFormatOfNumber(number2Digit2Arr.get(index));
    else
        index = sumCountArray.findIndex((value, index) => sumCountArray[index - 1] < x && value > x);

    if (index === -1)
        throw Error(`Error: can't find index for the ${x}th element.`);

    let difference = x - sumCountArray[index - 1];
    let digit2Arr = number2Digit2Arr.get(index);
    for (let digit of digit2Arr.keys()) {
        let formats = digit2Arr.get(digit);
        if (difference - formats.length <= 0)
            return formats[difference - 1];
        else
            difference -= formats.length
    }

    throw Error(`Shouldn't reach here, check if any error happens.`);
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

    for (let i = 0; i < 1; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const x = parseInt(lines[index++], 10);

            let result = decibinaryNumbers(x);
            console.log(result);
        }
        console.log('\n');
    }
}