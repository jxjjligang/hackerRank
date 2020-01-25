'use strict'

main();

// function intervalSelection(intervals) {
//     let startPoints = [], endPoints = [];
//     for (let interval of intervals) {
//         startPoints.push(interval[0]);
//         endPoints.push(interval[1]);
//     }

//     startPoints.sort((a, b) => a - b);
//     endPoints.sort((a, b) => a - b);
//     intervals.sort((iv1, iv2) => iv1[0] - iv2[0]);

//     let stack = [], maxValue = 0;
//     for (let interval of intervals) {
//         if (stack.length === 0)
//             stack.push([...interval, 1]);
//         else {
//             let start = interval[0], end = interval[1];
//             let stackLen = stack.length;
//             stack = stack.filter(arr => arr[1] >= start);
//             maxValue += (stackLen - stack.length);
//             stack.forEach(arr => arr[2]++);
//             stack.push([...interval, 1])
//             stack = stack.filter(arr => arr[2] <= 2);
//         }
//     }

//     return maxValue + stack.length;
// }

function intervalSelection(intervals) {
    let allPoints = [];
    for (let interval of intervals) {
        allPoints.push([interval[0], 0]);
        allPoints.push([interval[1], 1]);
    }

    allPoints.sort((ar1, ar2) => {
        if (ar1[0] !== ar2[0])
            return ar1[0] - ar2[0];
        else
            return ar1[1] - ar2[1]
    });

    let maxValue = 0, upDownResult = 0;
    for (let points of allPoints) {
        let isStart = (points[1] === 0);
        if (isStart)
            upDownResult++;
        else {
            upDownResult--;
            if (upDownResult < 2)
                maxValue++;
        }
    }

    return maxValue;
}

function main() {
    let inputs = [`1
    9
    5 6
    5 6
    1 4
    1 3
    1 1
    3 8
    2 5
    1 4
    1 3
    2
    1 2
    2 6
    11
    2 5
    1 1
    1 2
    1 2
    2 3
    5 5
    3 5
    1 2
    1 4
    2 4
    3 4
    8
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    6
    5 7
    4 9
    3 4
    3 7
    3 5
    1 8
    6
    6 7
    5 7
    3 5
    2 6
    2 7
    4 8
    9
    1 2
    1 1
    1 2
    2 2
    1 1
    1 2
    1 1
    1 1
    1 2
    3
    1 1
    1 1
    1 1
    5
    1 4
    2 3
    2 3
    1 3
    4 4
    10
    2 2
    2 2
    1 2
    2 2
    2 2
    1 2
    1 2
    1 2
    1 2
    1 2
    5
    2 5
    2 8
    2 5
    3 4
    3 4
    8
    4 5
    3 3
    1 3
    1 5
    1 4
    3 3
    5 5
    1 4
    4
    6 6
    7 8
    1 5
    4 8
    11
    2 5
    3 6
    1 5
    1 7
    2 7
    2 3
    1 6
    1 6
    1 5
    1 7
    3 5
    2
    1 2
    1 4
    9
    1 3
    4 4
    2 4
    1 3
    1 4
    1 3
    1 1
    2 2
    4 4
    6
    2 2
    2 4
    1 1
    1 3
    1 2
    4 4
    6
    6 7
    3 5
    1 7
    2 6
    3 4
    4 6
    6
    4 5
    3 6
    6 6
    3 3
    3 3
    1 5
    6
    7 8
    6 7
    6 7
    3 5
    1 3
    6 7
    9
    4 5
    2 5
    1 6
    5 5
    1 2
    1 5
    2 3
    1 4
    1 6
    3
    4 6
    1 3
    4 5
    11
    3 7
    5 7
    2 4
    1 3
    1 2
    5 6
    2 8
    2 2
    2 3
    1 4
    3 7
    7
    1 1
    2 3
    1 3
    2 3
    2 2
    1 2
    2 3
    6
    6 8
    6 7
    7 7
    8 8
    1 1
    3 3
    4
    2 3
    2 3
    1 2
    1 3
    6
    1 3
    2 2
    1 2
    1 2
    2 2
    1 1
    2
    1 1
    1 1
    11
    3 4
    3 4
    3 4
    2 3
    1 3
    5 5
    1 5
    3 3
    4 5
    1 2
    3 5
    5
    5 5
    1 7
    1 3
    3 9
    4 5
    3
    2 2
    1 1
    1 1
    7
    2 5
    6 8
    2 7
    7 8
    6 8
    3 3
    2 2
    8
    5 7
    6 7
    3 4
    1 7
    1 2
    4 5
    1 6
    4 5
    10
    6 7
    1 4
    6 6
    3 8
    5 8
    1 7
    5 6
    3 8
    7 8
    1 3
    2
    1 2
    1 2
    3
    1 2
    1 5
    1 7
    3
    1 1
    1 1
    1 1
    6
    1 2
    1 1
    1 1
    1 2
    1 2
    2 2
    11
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    8
    2 5
    1 4
    5 5
    1 1
    1 1
    2 2
    1 3
    4 4
    6
    4 9
    5 5
    2 10
    6 8
    7 8
    3 5
    4
    1 6
    1 6
    2 4
    2 3
    10
    1 1
    1 2
    1 2
    1 1
    1 2
    1 1
    2 2
    2 2
    2 2
    2 2
    10
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    7
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    1 1
    3
    1 5
    4 4
    4 5
    8
    2 2
    1 1
    1 2
    1 2
    1 2
    1 2
    1 1
    1 2
    5
    3 6
    1 9
    7 9
    2 8
    4 4
    2
    4 9
    1 2
    3
    1 1
    2 2
    1 2
    9
    4 7
    1 1
    4 6
    1 4
    3 7
    1 2
    2 5
    5 5
    4 4
    4
    4 7
    2 7
    3 5
    3 7
    9
    3 5
    5 5
    2 4
    2 2
    6 6
    1 3
    4 5
    1 2
    3 4
    11
    3 3
    4 6
    3 7
    2 5
    2 7
    1 2
    3 5
    2 7
    4 6
    3 7
    1 4
    5
    3 8
    1 6
    3 5
    1 9
    3 7
    8
    1 5
    1 2
    4 4
    2 4
    5 5
    1 2
    2 5
    1 5
    3
    1 3
    3 5
    1 7
    10
    4 6
    2 5
    3 3
    8 8
    2 10
    1 5
    5 8
    8 9
    7 9
    1 9
    8
    1 2
    1 2
    2 2
    1 1
    1 2
    1 2
    2 2
    1 2
    8
    3 3
    1 3
    1 3
    1 2
    3 3
    1 3
    1 1
    3 3
    10
    4 5
    5 5
    2 5
    2 4
    1 5
    2 4
    4 4
    1 5
    1 2
    2 3
    11
    7 8
    5 9
    2 8
    2 8
    3 6
    7 7
    1 5
    6 6
    2 8
    1 5
    3 9
    6
    1 1
    1 3
    2 3
    1 2
    1 1
    3 3
    6
    4 4
    3 3
    2 6
    4 6
    2 3
    1 7
    2
    1 1
    1 2
    5
    1 1
    2 2
    1 2
    1 2
    1 2
    2
    2 6
    4 4
    6
    1 1
    2 3
    4 4
    5 6
    4 5
    2 6
    2
    2 2
    1 2
    7
    3 6
    2 3
    2 2
    3 7
    4 6
    1 2
    1 4
    2
    1 2
    1 2
    11
    7 10
    3 5
    1 3
    4 7
    9 10
    3 9
    7 8
    4 6
    4 6
    6 10
    8 10
    11
    1 6
    2 3
    1 3
    1 7
    4 7
    5 10
    5 9
    1 9
    5 5
    3 9
    3 5
    9
    4 8
    2 6
    1 7
    1 3
    3 4
    4 7
    6 8
    3 5
    2 5
    8
    6 7
    2 2
    3 5
    8 8
    3 4
    3 4
    1 7
    3 9
    8
    3 4
    4 7
    4 6
    6 6
    2 7
    1 7
    5 7
    1 4
    10
    5 7
    7 8
    4 5
    3 5
    3 5
    3 5
    6 6
    3 3
    1 1
    4 6
    4
    6 7
    3 5
    1 3
    3 7
    2
    4 5
    3 5
    11
    2 7
    2 4
    1 5
    3 5
    3 7
    5 6
    3 3
    2 3
    7 7
    5 7
    5 7
    11
    6 8
    4 8
    3 6
    4 8
    2 7
    3 7
    2 7
    2 6
    1 6
    1 6
    3 7
    11
    1 2
    1 6
    5 5
    7 7
    5 5
    2 3
    4 5
    3 7
    2 6
    6 6
    6 7
    5
    3 4
    1 7
    6 6
    3 3
    1 6
    6
    1 3
    1 4
    1 2
    1 2
    1 3
    3 4
    6
    7 10
    2 6
    1 7
    3 3
    3 3
    4 8
    8
    1 1
    1 2
    2 2
    1 2
    1 1
    1 2
    1 2
    1 2
    9
    1 2
    1 1
    1 1
    1 2
    1 1
    1 2
    1 2
    1 2
    1 1
    7
    5 7
    2 3
    3 4
    2 3
    5 6
    3 6
    5 6
    6
    8 8
    3 4
    4 6
    7 8
    1 3
    2 6
    9
    2 5
    1 2
    5 5
    1 2
    3 4
    1 4
    1 5
    4 5
    2 5
    4
    1 1
    1 4
    3 4
    2 3
    6
    1 4
    2 3
    4 4
    1 3
    4 4
    2 2
    9
    3 4
    1 8
    3 9
    1 8
    2 5
    2 7
    2 3
    9 9
    2 8
    2
    1 2
    1 2
    9
    7 7
    5 5
    5 5
    3 4
    6 7
    4 7
    1 4
    3 4
    1 7
    11
    4 4
    1 1
    3 4
    2 4
    3 4
    1 3
    1 3
    2 2
    2 3
    4 4
    2 3
    9
    1 5
    1 3
    2 3
    2 3
    1 5
    3 4
    3 4
    3 4
    3 3
    6
    2 3
    1 1
    3 5
    1 3
    2 4
    3 3
    9
    1 3
    1 2
    2 3
    3 5
    1 4
    3 4
    1 4
    1 3
    1 2
    7
    2 2
    1 2
    2 2
    1 2
    1 1
    1 2
    1 2`
        ,`4
3
1 2
2 3
2 4
3
1 5
1 5
1 5
4
1 10
1 3
4 6
7 10
4
1 10
1 3
3 6
7 10`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const s = parseInt(lines[index++], 10);
        for (let sItr = 0; sItr < s; sItr++) {
            const n = parseInt(lines[index++], 10);
            let intervals = Array(n);
            for (let intervalsRowItr = 0; intervalsRowItr < n; intervalsRowItr++)
                intervals[intervalsRowItr] = lines[index++].split(' ').map(intervalsTemp => parseInt(intervalsTemp, 10));

            let result = intervalSelection(intervals);
            console.log(result);
        }
    }
}