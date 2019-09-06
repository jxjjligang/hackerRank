'use strict'

// Complete the sansaXor function below.
function sansaXor(arr) {

    return (arr.length%2) === 0 ? 0 : arr.reduce((agg, cur, currentIndex) => {
        if (currentIndex % 2 === 0)
            return agg ^ arr[currentIndex];
        else
            return agg;
    }, 0);
}

let input = `5
3
1 2 3
4
4 5 7 5
5
1 2 3 4 5
6
1 2 3 4 5 6
7
1 2 3 4 5 6 7`;

// input=`2
// 3
// 98 74 12
// 3
// 50 13 2`;

let lines = input.split('\n');
const t = parseInt(lines[0], 10);
let index = 1;
for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(lines[index++], 10);
    const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));
    let result = sansaXor(arr);
    console.log(result + "\n");
}
