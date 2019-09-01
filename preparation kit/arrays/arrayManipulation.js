'use strict'

function arrayManipulation(n, queries) {
    let rangeArr = [];
    let upperBound = queries.reduce((agg, current) => Math.max(agg, current[1]), 0);
    for (let i = 0; i <= upperBound; i++)
        rangeArr[i] = 0;

    for (let i = 0; i < queries.length; i++) {
        let query = queries[i], fromIdx = query[0] - 1, toIdx = query[1] ;
        rangeArr[fromIdx] += query[2];
        rangeArr[toIdx] -= query[2];
    }

    let result = rangeArr[0];
    for (let i = 1; i < upperBound; i++) {
        rangeArr[i] += rangeArr[i - 1];
        result = Math.max(result, rangeArr[i]);
    }

    return result;
}

main();
function main() {
    let inputs = [`10 4
    2 6 8
    3 5 7
    1 8 1
    5 9 15`, `5 3
    1 2 100
    2 5 100
    3 4 100`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

        let queries = Array(m);
        for (let i = 0; i < m; i++)
            queries[i] = lines[index++].split(' ').map(queriesTemp => parseInt(queriesTemp, 10));

        let result = arrayManipulation(n, queries);
        console.log(result + "\n");
    }
}
