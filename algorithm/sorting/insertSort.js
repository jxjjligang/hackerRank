'use strict'

function insertionSort1(n, arr) {
    let storedValue = arr[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] < storedValue) {
            arr[i + 1] = storedValue;
            console.log(arr.join(' '));
            return;
        }
        else {
            arr[i + 1] = arr[i];
            console.log(arr.join(' '));
        }
    }

    if (storedValue < arr[0]) {
        arr[0] = storedValue;
        console.log(arr.join(' '));
    }
}

let input = `5
2 4 6 8 3`;

input = `10
2 3 4 5 6 7 8 9 10 1`;

let lines = input.split('\n'), index = 0;
const n = parseInt(lines[index++], 10);
const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
insertionSort1(n, arr);
