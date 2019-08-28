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
            if (shiftArr === rightResult) {
                let firstLeft = leftResult[0], cnt = 0;
                for (let i = 0; i < rightResult.length; i++) {
                    if (firstLeft > rightResult[i])
                        cnt++;
                    else
                        break;
                }

                inversions += cnt;
            }
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
    let input = `1
    3
     5 3 1`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const t = parseInt(lines[index++], 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = countInversions(arr);
        console.log(result);
    }
}
