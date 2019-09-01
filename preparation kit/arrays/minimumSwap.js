'use strict'

function minimumSwaps(arr) {
    function swap(arr, i1, i2, value2Index) {
        let tmp1 = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp1;

        // update value2Index
        value2Index.set(arr[i1], i1);
        value2Index.set(arr[i2], i2);
    }

    let swaps = 0, value2Index = new Map();
    for (let i = 0; i < arr.length; i++)
        value2Index.set(arr[i], i);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== (i + 1)) {
            let toIdx = value2Index.get(i + 1);
            swap(arr, i, toIdx, value2Index);
            swaps++;
        }
    }

    return swaps;
}

main();
function main() {
    let input = `5
    2 3 4 1 5`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);
    console.log(res);
}
