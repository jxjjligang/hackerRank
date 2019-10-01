'use strict'
main();


/*
 * Complete the 'kruskals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 */
function kruskals(gNodes, gFrom, gTo, gWeight) {
    function rootAToB(rootArray, a, b) {
        let rootA = getRoot(rootArr, a), rootB = getRoot(rootArr, b);
        if (rootA !== rootB)
            rootArray[rootA] = rootB;
    }

    function getRoot(rootArray, node) {
        while (node !== rootArr[node])
            node = rootArr[node];

        return node;
    }

    let edges = [], rootArr = [];
    for (let i = 0; i <= gNodes; i++)
        rootArr[i] = i;

    for (let i = 0; i < gFrom.length; i++)
        edges.push({ from: gFrom[i], to: gTo[i], weight: gWeight[i] });

    edges.sort((e1, e2) => {
        if (e1.weight !== e2.weight)
            return e1.weight - e2.weight;
        else
            return (e1.from + e1.to - e2.from - e2.to);
    });

    let visited = new Set(), totalWeight = 0;
    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i], from = edge.from, to = edge.to;
        let rootFrom = getRoot(rootArr, from), rootTo = getRoot(rootArr, to);
        if (rootFrom === rootTo)
            continue;       // will introduce a cycle, therefore ignore this edge

        rootAToB(rootArr, rootFrom, rootTo);
        totalWeight += edge.weight;
        visited.add(from);
        visited.add(to);
    }

    return totalWeight;
}

function main() {
    let inputs = [`4 5
    1 2 1
    3 2 150
    4 3 99
    1 4 100
    3 1 200`, `4 6
    1 2 5
    1 3 3
    4 1 6
    2 4 7
    3 2 4
    3 4 5`, `5 7
    1 2 20
    1 3 50
    1 4 70
    1 5 90
    2 3 30
    3 4 40
    4 5 60`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];

        let lines = input.split('\n').map(s => s.trim()), index = 0
        const gNodesEdges = lines[index++].split(' '), gNodes = parseInt(gNodesEdges[0], 10), gEdges = parseInt(gNodesEdges[1], 10);

        let gFrom = [], gTo = [], gWeight = [];
        for (let i = 0; i < gEdges; i++) {
            const gFromToWeight = lines[index++].split(' ');
            gFrom.push(parseInt(gFromToWeight[0], 10));
            gTo.push(parseInt(gFromToWeight[1], 10));
            gWeight.push(parseInt(gFromToWeight[2], 10));
        }

        const res = kruskals(gNodes, gFrom, gTo, gWeight);
        console.log(res);
    }
}