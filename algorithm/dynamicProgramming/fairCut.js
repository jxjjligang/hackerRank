'use strict'

main();


// follow the idea of zh2196, use sample code from [mayurnagdev123]
function fairCut(k, arr) {
    function getDifferenceValue(liArr, arr) {
        arr = arr.filter(element => element !== IMPOSSIBLE_VALUE);
        let sum = 0;
        for (let v1 of liArr) {
            sum += arr.reduce((agg, cur) => agg + Math.abs(cur - v1), 0);
        }

        return sum;
    }

    const ARR_LEN = arr.length, IMPOSSIBLE_VALUE = -1;
    arr.sort((a, b) => a - b);
    k = Math.min(k, ARR_LEN - k);
    let liArr = [];
    if (k === 1) {
        let middle = Math.floor(ARR_LEN / 2);
        liArr.push(arr[middle]);
        arr[middle] = IMPOSSIBLE_VALUE;

        return getDifferenceValue(liArr, arr);
    } else { // k > 1
        let middle = Math.floor(ARR_LEN / 2), leftIndex = middle, rightIndex = middle;
        liArr.push(arr[middle]);
        arr[middle] = IMPOSSIBLE_VALUE;
        k--;
        while (k > 1) {
            leftIndex -= 2;
            liArr.push(arr[leftIndex]);
            arr[leftIndex] = IMPOSSIBLE_VALUE;

            rightIndex += 2;
            liArr.push(arr[rightIndex]);
            arr[rightIndex] = IMPOSSIBLE_VALUE;
            k -= 2;
        }
        if (k === 1) {
            leftIndex -= 2;
            rightIndex += 2;
            let leftValid = (leftIndex >= 0), rightValid = (rightIndex < ARR_LEN);
            if (leftValid && rightValid) {
                let arrCopy = arr.slice(), liArrCopy = liArr.slice();
                liArrCopy.push(arr[leftIndex]);
                arrCopy[leftIndex] = IMPOSSIBLE_VALUE;
                let leftFairValue = getDifferenceValue(liArrCopy, arrCopy);

                liArr.push(arr[rightIndex]);
                arr[rightIndex] = IMPOSSIBLE_VALUE;
                let rightFairValue = getDifferenceValue(liArr, arr);

                return Math.min(leftFairValue, rightFairValue);
            } else if (leftValid) {
                liArr.push(arr[leftIndex]);
                arr[leftIndex] = IMPOSSIBLE_VALUE;
                return getDifferenceValue(liArr, arr);
            }
            else if (rightValid) {
                liArr.push(arr[rightIndex]);
                arr[rightIndex] = IMPOSSIBLE_VALUE;
                return getDifferenceValue(liArr, arr);
            }
        }
        else
            return getDifferenceValue(liArr, arr);
    }
}

function main() {
    let inputs = [`4 1
    3 3 3 1`,
    `4 2
    4 3 1 2`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
        const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        console.log(fairCut(k, arr) + "\n");
    }
}