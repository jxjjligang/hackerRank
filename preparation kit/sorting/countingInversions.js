'use strict'

function countInversions(arr) {
    function mergeSort(arr) {
        if (arr.length < 2)
            return arr;

        let middle = Math.floor(arr.length / 2), leftHalf = arr.slice(0, middle), rightHalf = arr.slice(middle);
        let leftResult = mergeSort(leftHalf), rightResult = mergeSort(rightHalf);
        let sorted = [];
        while (leftResult.length > 0 && rightResult.length > 0) {
            let shiftArr = ((leftResult[0] <= rightResult[0]) ? leftResult : rightResult);
            if (shiftArr === rightResult)
                inversions += leftResult.length;    // each item in leftResult is bigger than first item of rightResult
            sorted.push(shiftArr.shift());
        }

        if (leftResult.length > 0)
            sorted = sorted.concat(leftResult);
        if (rightResult.length > 0)
            sorted = sorted.concat(rightResult);

        return sorted;
    }

    let inversions = 0;
    let result = mergeSort(arr);
    return inversions;
}

main();
function main() {
    let input = `2
    5
    1 1 1 2 2
    5
    2 1 3 1 2`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const t = parseInt(lines[index++], 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = countInversions(arr);
        console.log(result);
    }
}
