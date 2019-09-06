'use strict'

function componentsInGraph(gb) {
    function getRoot(rootArr, idx) {
        while (rootArr[idx] !== idx)
            idx = rootArr[idx];

        return idx;
    }

    function rootAToB(rootArr, idxA, idxB, sizeArr) {
        let root_A = getRoot(rootArr, idxA), root_B = getRoot(rootArr, idxB);
        if (root_A !== root_B) {
            rootArr[root_A] = root_B;
            let sizeA = sizeArr[root_A], sizeB = sizeArr[root_B]
            sizeArr[root_B] = sizeA + sizeB;
            // sizeArr[root_A] = sizeA + sizeB;
        }
    }

    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < gb.length; i++)
        maxValue = Math.max(maxValue, gb[i][0], gb[i][1]);

    let rootArr = [], sizeArr = [];
    for (let i = 0; i <= maxValue; i++) {
        rootArr[i] = i;
        sizeArr[i] = 1;
    }

    for (let i = 0; i < gb.length; i++)
        rootAToB(rootArr, gb[i][0], gb[i][1], sizeArr);

    let rootValues = new Set();
    for (let i = 1; i < rootArr.length; i++)
        rootValues.add(getRoot(rootArr, i));

    let minSize = Number.MAX_SAFE_INTEGER, maxSize = Number.MIN_SAFE_INTEGER;
    for (let rootI of rootValues.values()) {
        let sizeI = sizeArr[rootI];
        if (sizeI > 1) {
            minSize = Math.min(minSize, sizeI);
            maxSize = Math.max(maxSize, sizeI);
        }
    }

    return [minSize, maxSize];
}

main();
function main() {
    let inputs = [`5
    1 6 
    2 7
    3 8
    4 9
    2 6`, `10
    1 17
    5 13
    7 12
    5 17
    5 12
    2 17
    1 18
    8 13
    2 15
    5 20`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const n = parseInt(lines[index++], 10);
        let gb = Array(n);
        for (let gbRowItr = 0; gbRowItr < n; gbRowItr++)
            gb[gbRowItr] = lines[index++].split(' ').map(gbTemp => parseInt(gbTemp, 10));

        let result = componentsInGraph(gb);
        console.log(result.join(" ") + "\n");
    }
}
