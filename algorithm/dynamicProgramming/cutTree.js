'use strict'

main();


// My own solution does not work, since I don't have the idea of cut trees
function cutTree(n, k, edges) {
    function buildPath(start, end, point2points) {
        let points;
        if (point2points.has(start))
            points = point2points.get(start)
        else
            points = new Set();

        points.add(end);
        point2points.set(start, points);
    }

    function dfs(nodeAndNextNodes, kvArr) {
        if (nodeAndNextNodes === undefined)
            return 0;

        let curNode = nodeAndNextNodes[0];
        if (visited.has(curNode))
            return 0;

        visited.add(curNode);
        // countOfSTs++;
        let sum = 1;
        for (let nextNode of nodeAndNextNodes[1])
            sum += dfs(kvArr.find(kv => kv[0] === nextNode), kvArr);
        return sum;
    }

    let point2points = new Map();
    for (let edge of edges) {
        buildPath(edge[0], edge[1], point2points);
        buildPath(edge[1], edge[0], point2points);
    }

    let kvArr = Array.from(point2points).filter(kv => kv[1].size <= (1 + k));
    kvArr.sort((kv1, kv2) => kv1[1].size - kv2[1].size);

    if (kvArr.length === 0)
        return 2;
    // count the number of subTrees that has no more than k connected edges to its complement part
    let countOfSTs = 0, visited = new Set();    // count of subTrees, 1 means case for [empty tree]
    return 2 * dfs(kvArr[0], kvArr);

    // return 2 * countOfSTs;
}

function main() {
    let inputs = [`10 3
    10 8
    7 10
    2 10
    5 4
    6 1
    2 6
    4 2
    9 2
    7 3`
        , `3 1
    2 1
    2 3`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
        let edges = Array(n - 1);
        for (let edgesRowItr = 0; edgesRowItr < n - 1; edgesRowItr++) {
            edges[edgesRowItr] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        console.log(cutTree(n, k, edges) + "\n");
    }
}