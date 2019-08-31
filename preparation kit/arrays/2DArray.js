'use strict'
function hourglassSum(arr) {
    let result = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length - 2; i++) {
        for (let j = 0; j < arr[0].length - 2; j++) {
            let thisResult = arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j + 1] + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
            result = Math.max(result, thisResult);
        }
    }

    return result;
}
main();
function main() {
    let input = `1 1 1 0 0 0
    0 1 0 0 0 0
    1 1 1 0 0 0
    0 0 2 4 4 0
    0 0 0 2 0 0
    0 0 1 2 4 0`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    let arr = Array(6);
    for (let i = 0; i < 6; i++)
        arr[i] = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = hourglassSum(arr);
    console.log(result + "\n");
}
