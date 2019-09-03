'use strict'

// Complete the balancedForest function below.
function balancedForest(c, edges) {
    // 
    function createGraphesAndCompare(numbers, edges, i, j) {
        let disjointSet = []; // , maxNum = numbers.reduce((agg, current) => Math.max(agg, current));
        for (let idx = 0; idx < numbers.length; idx++)
            disjointSet[idx] = idx;

        function getRoot(disjointSet, idx) {
            while (disjointSet[idx] !== idx)
                idx = disjointSet[idx];

            return idx;
        }

        function rootAToB(disjointSet, a, b) {
            let root_A = getRoot(disjointSet, a);
            let root_B = getRoot(disjointSet, b);
            if (root_A !== root_B)
                disjointSet[root_A] = root_B;
        }

        function addToCountMap(number2Count, number) {
            let cnt = 1;
            if (number2Count.has(number))
                cnt += number2Count.get(number);

            number2Count.set(number, cnt);
        }

        // use disjointSet to group numbers
        for (let idx = 0; idx < edges.length; idx++) {
            if (idx === i || idx === j)
                continue;

            let edge = edges[idx], idxA = edge[0] - 1, idxB = edge[1] - 1;
            rootAToB(disjointSet, idxA, idxB);
        }

        let root2Count = new Map();
        for (let idx = 0; idx < c.length; idx++) {
            let rootI = getRoot(disjointSet, idx), cnt = numbers[idx];
            if (root2Count.has(rootI))
                cnt += root2Count.get(rootI);

            root2Count.set(rootI, cnt);
        }

        let number2Count = new Map();
        for (let cnt of root2Count.values())
            addToCountMap(number2Count, cnt);

        if (number2Count.size !== 2)
            return -1;

        let cnts = Array.from(number2Count.keys());
        let smallerCnt = Math.min(...cnts), biggerCnt = Math.max(...cnts);
        if (number2Count.get(smallerCnt) === 1)
            return biggerCnt - smallerCnt;
        else
            return -1;
    }

    let finalRresult = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < edges.length; i++) {
        for (let j = i + 1; j < edges.length; j++) {
            let result = createGraphesAndCompare(c, edges, i, j);
            if (result !== -1)
                finalRresult = Math.min(finalRresult, result);
        }
    }

    return finalRresult === Number.MAX_SAFE_INTEGER ? -1 : finalRresult;
}

main();
function main() {
    let inputs = [`1
    5
    15 12 8 14 13
    1 2
    1 3
    1 4
    4 5`, `2
    5
    1 2 2 1 1
    1 2
    1 3
    3 5
    1 4
    3
    1 3 5
    1 3
    1 2`];  // expects 19, 2, -1

   let  dinputs = [`5
    6
    7 7 4 1 1 1
    1 2
    3 1
    2 4
    2 5
    2 6
    8
    1 1 1 18 10 11 5 6
    1 2
    1 4
    2 3
    1 8
    8 7
    7 6
    5 7
    6
    12 7 11 17 20 10
    1 2
    2 3
    4 5
    6 5
    1 4
    8
    10 4 1 5 6 4 5 5
    1 2
    2 3
    1 4
    5 4
    5 6
    7 8
    7 5
    6
    100 100 99 99 98 98
    1 3
    3 5
    1 2
    2 4
    4 6`];      // expects -1, 10, 13, 5, 297

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10), c = lines[index++].split(' ').map(cTemp => parseInt(cTemp, 10));

            let edges = Array(n - 1);
            for (let i = 0; i < n - 1; i++)
                edges[i] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));

            const result = balancedForest(c, edges);
            console.log(result + '\n');
        }
    }
}