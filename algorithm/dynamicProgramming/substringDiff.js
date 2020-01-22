'use strict'

main();


// Complete the substringDiff function below.
function substringDiff(k, s1, s2) {
    function getMax(subStrValueArr) {
        let maxValue = 0;
        for (let row of subStrValueArr) {
            for (let j = 0; j < S1_LEN; j++) {
                let element = row[j];
                if (element[1] < 0)
                    continue;

                maxValue = Math.max(maxValue, element[0]);
            }
        }

        return maxValue;
    }

    const S1_LEN = s1.length, S2_LEN = s2.length;

    let subStrValueArr = [];
    for (let row = 0; row < S2_LEN; row++)
        subStrValueArr.push([]);

    // fill the first row
    let firstRow = subStrValueArr[0], s2First = s2[0], s1First = s1[0];
    for (let colIdx = 0; colIdx < S1_LEN; colIdx++)
        firstRow[colIdx] = (s1[colIdx] === s2First ? [1, k] : [1, k - 1]);

    // fill the first element of each row
    for (let rowIdx = 1; rowIdx < S2_LEN; rowIdx++)
        subStrValueArr[rowIdx][0] = (s2[rowIdx] === s1First ? [1, k] : [1, k - 1]);

    for (let rowIdx = 1; rowIdx < S2_LEN; rowIdx++) {
        let row = subStrValueArr[rowIdx];
        for (let colIdx = 1; colIdx < S1_LEN; colIdx++) {
            let prevVal = subStrValueArr[rowIdx - 1][colIdx - 1];
            if (s1[colIdx] === s2[rowIdx])
                if (prevVal[1] >= 0)
                    row[colIdx] = [1 + prevVal[0], prevVal[1]];
                else
                    row[colIdx] = [1, k];
            else {
                if (prevVal[1] > 0)
                    row[colIdx] = [1 + prevVal[0], prevVal[1] - 1];
                else
                    row[colIdx] = [1, k - 1];
            }
        }
    }

    // for (let row of subStrValueArr)
    // console.log(row.map(element => element[0] + ':' + element[1]).join('   '));
    return getMax(subStrValueArr);
}

function main() {
    let inputs = [`3
    2 tabriz torino
    0 abacba abcaba
    3 helloworld yellomarin`]; for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const kS1S2 = lines[index++].split(' '), k = parseInt(kS1S2[0], 10), s1 = kS1S2[1], s2 = kS1S2[2];

            let result = substringDiff(k, s1, s2);
            console.log(result + "\n");
        }
    }
}
