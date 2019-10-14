'use strict'

// mapping between stone size to the max split number

// Complete the stoneDivision function below.
function stoneDivision(n, s) {
    let size2splits = new Map();
    function split(sizeArr, size, sizeIndex) {
        if (size === 1)
            return 0;

        if (size2splits.has(size))
            return size2splits.get(size);

        let newSizes = [], newSizesIndex = [];
        for (let i = 0; i < sizeIndex; i++) {
            if ((size % sizeArr[i]) === 0) {
                newSizes.push(sizeArr[i]);
                newSizesIndex.push(i);
            }
        }

        let maxSplits = 0;
        for (let i = 0; i < newSizes.length; i++) {
            let newSize = newSizes[i], newSizeIndex = newSizesIndex[i];
            maxSplits = Math.max(maxSplits, 1 + (size / newSize) * split(sizeArr, newSize, newSizeIndex));
        }

        return maxSplits;
    }   // end of function split

    if (s.find(element => element === n) === undefined)
        s.push(n);

    s.sort((a, b) => a - b);
    for (let i = 0; i < s.length; i++) {
        let size = s[i];
        if (size2splits.has(size))
            continue;

        let maxSplit = split(s, size, i);
        size2splits.set(size, maxSplit);
    }

    return size2splits.get(n);
}

main();

function main() {
    let inputs = [`5
    377083280820 10
    1 377083280820 2 188541640410 3 125694426940 4 94270820205 5 75416656164
    377083280820 9
    1 377083280820 2 188541640410 3 125694426940 94270820205 5 75416656164
    798652236637 2
    1 798652236637
    733493187656 6
    1 733493187656 2 366746593828 4 183373296914
    597670549095 5
    1 597670549095 3 199223516365 5`,
        `4
    64 5
    2 4 8 16 64
    1 2
    1 2
    6 1
    3
    64 6
    2 4 8 16 32 64`, `1
  12 3
  2 3 4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const q = parseInt(lines[index++], 10);

        for (let qItr = 0; qItr < q; qItr++) {
            const nm = lines[index++].split(' ');

            const n = parseInt(nm[0], 10);

            const m = parseInt(nm[1], 10);

            const s = lines[index++].split(' ').map(sTemp => parseInt(sTemp, 10));

            let result = stoneDivision(n, s);
            console.log(result + "\n");
        }
    }
}