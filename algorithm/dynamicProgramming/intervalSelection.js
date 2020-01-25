'use strict'

main();

/* Based on the idea from [Discussion] xDavidLiu
 Here's my greedy solution that passes all test cases:
 1. Sort by the [end time value]. 
 2. Since we are dealing with the [2 resource interval scheduling] problem, our greedy method is more complicated than the simple 
    "just keep grabbing the next compatible interval with the smallest end time" that we would use in the 1-resource problem. 
    Instead, for every interval, we need to decide which resource to give it to. 
    Here's the rule: we keep track the most recent interval placed in each of the two resources, and for a new interval, 
       we replace the interval of the resource with the latest compatible end time (if any). 
    Doing this allows the highest chance of some interval with a later end time being able to fit in the other resource, 
    since that other resource has an earlier end time, so is strictly more likely to make accomodations for some interval we will encounter later. 
    Hopefully this helps people, as I found most of the comments on this thread about the greedy solution utterly incomprehensible.
The sorting is O(N lg N) and the rest is O(N).
*/
function intervalSelection(intervals) {
    intervals.sort((iv1, iv2) => iv1[1] - iv2[1]);        // sort by interval's ending point
    let firstTwo = [[0, 0], [0, 0]], count = 0;
    for (let interval of intervals) {
        let start = interval[0];
        if (start > firstTwo[1][1]) {
            count++;
            firstTwo[1] = interval;
        }
        else if (start > firstTwo[0][1]) {
            count++;
            firstTwo[0] = interval;
            if (firstTwo[0][1] > firstTwo[1][1]) {          // swap if necessary
                let temp = firstTwo[0];
                firstTwo[0] = firstTwo[1];
                firstTwo[1] = temp;
            }
        }
    }

    return count;
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
        , `4
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