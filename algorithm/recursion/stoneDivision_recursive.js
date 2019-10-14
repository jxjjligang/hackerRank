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
            if (sizeArr[i] < size && (size % sizeArr[i]) === 0) {
                newSizes.push(sizeArr[i]);
                newSizesIndex.push(i);
            }
        }

        let maxSplits = 0;
        for (let i = 0; i < newSizes.length; i++) {
            let newSize = newSizes[i], newSizeIndex = newSizesIndex[i];
            maxSplits = Math.max(maxSplits, 1 + (size / newSize) * split(sizeArr, newSize, newSizeIndex));
        }
        size2splits.set(size, maxSplits);
        return maxSplits;
    }   // end of function split

    s.sort((a, b) => a - b);
    if (s.find(element => element === n) === undefined)
        s.push(n);

    let lastIndex = s.length - 1;
    return split(s, n, lastIndex);
}

main();

function main() {
    let inputs = [`1
    99033715019 5
    1 99033715019 89 1112738371 864721694069`];
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