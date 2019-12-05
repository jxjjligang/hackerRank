'use strict'

main()


// Complete the prims function below.
function prims(n, edges, start) {
    function addToMap(node, edge, nodes2EdgeMap) {
        let edgeArr;
        if (nodes2EdgeMap.has(node))
            edgeArr = nodes2EdgeMap.get(node);
        else {
            edgeArr = [];
            nodes2EdgeMap.set(node, edgeArr)
        }

        edgeArr.push(edge);
    }

    let allNodes = new Set();
    for (let edge of edges) {
        allNodes.add(edge[0]);
        allNodes.add(edge[1]);
    }

    // 1. Keep only one edge (with lowest weight) between 2 nodes;
    let nodes2Edge = new Map();
    edges.sort((e1, e2) => e1[2] - e2[2]);
    for (let edge of edges) {
        let n0 = edge[0], n1 = edge[1], nodes = (n0 < n1 ? n0 + ':' + n1 : n1 + ':' + n0);
        if (!nodes2Edge.has(nodes))
            nodes2Edge.set(nodes, edge);
        else {
            let existingEdge = nodes2Edge.get(nodes);
            if (edge[2] < existingEdge[2])
                nodes2Edge.set(nodes, edge);
        }
    }

    // 2. Starts from node that only has only 1 edge, then BFS all edges until all nodes are visited
    let allEdges = Array.from(nodes2Edge.values()), connectedNodes = new Set(), leftNodes = new Set(allNodes);
    leftNodes.delete(start);
    let node2Value = new Map();
    for (let node of allNodes) {
        if (node === start)
            node2Value.set(start, 0);
        else
            node2Value.set(node, Number.MAX_SAFE_INTEGER);
    }

    let totalWeight = 0;
    while (connectedNodes.size !== allNodes.size) {
        let minKeyValue = Array.from(node2Value).reduce((agg, cur) => (cur[1] < agg[1] ? cur : agg));
        let node = minKeyValue[0];
        totalWeight += minKeyValue[1];
        connectedNodes.add(node);
        leftNodes.delete(node);
        node2Value.delete(node);

        // update node2Value
        let adjacentEdges = allEdges.filter(eg => (eg[0] === node || eg[1] === node));
        for (let edge of adjacentEdges) {
            let theOtherNode = (edge[0] === node ? edge[1] : edge[0]);
            if (connectedNodes.has(theOtherNode))
                continue;

            let existingValue;
            if (node2Value.has(theOtherNode))
                existingValue = node2Value.get(theOtherNode);
            node2Value.set(theOtherNode, Math.min(existingValue, edge[2]));
        }
    }

    return totalWeight;
}

function main() {
    let inputs = [`5 6
1 2 3
1 3 4
4 2 6
5 2 2
2 3 5
3 5 7
1`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
        let edges = Array(m);
        for (let i = 0; i < m; i++)
            edges[i] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));

        const start = parseInt(lines[index++], 10);
        let result = prims(n, edges, start);
        console.log(result + "\n");
    }
}