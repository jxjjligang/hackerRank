'use strict'


// Complete the findShortest function below.

/*
 * For the unweighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] to <name>To[i].
 *
 */
function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    function getCount(arr, val) {
        let count = 0;
        arr.forEach(element => {
            if (element === val)
                count++;
        });

        return count;
    }

    // get Index of the node whose value === val
    function getIndexes(ids, val) {
        let indexes = [];

        ids.forEach((element, index) => {
            if (element === val)
                indexes.push(index + 1);
        });

        return indexes;
    }

    function constructEdges(fromArr, toArr) {
        let edges = [];
        for (let i = 0; i < fromArr.length; i++)
            edges.push([fromArr[i], toArr[i]]);

        return edges;
    }

    function getChildren(parentNode, allEdges) {
        let childrenNodes = [];
        for (let i = 0; i < allEdges.length; i++) {
            let edge = allEdges[i];
            if (edge[0] === parentNode)
                childrenNodes.push(edge[1]);
            else if (edge[1] === parentNode)
                childrenNodes.push(edge[0]);
        }

        return childrenNodes;
    }

    // use DFS (deepest-first-search strategy) to find another node whose value === startNode, returns the PATH length
    function findNearest(node, allEdges, targetVal) {

        function dfs(parentNode, allEdges, targetVal) {
            let children = getChildren(parentNode, allEdges);
            for (let i = 0; i < children.length; i++) {
                let childNode = children[i];
                if (visitedNode.has(childNode))
                    continue;

                visitedNode.add(childNode);
                let nodeValue = ids.find((id, index) => index + 1 === childNode);
                if (nodeValue === targetVal)
                    return node2Depth.get(parentNode) + 1;
                else {
                    node2Depth.set(childNode, node2Depth.get(parentNode) + 1);
                    let result = dfs(childNode, allEdges, targetVal);
                    if (result !== undefined)
                        return result;
                }
            }
        }

        let node2Depth = new Map(), visitedNode = new Set();   // the depth is counted from the nodeIndex
        node2Depth.set(node, 0);
        visitedNode.add(node);
        return dfs(node, allEdges, targetVal);
    }

    if (getCount(ids, val) <= 1)
        return -1;

    let allEdges = constructEdges(graphFrom, graphTo), nodeIndexes = getIndexes(ids, val), minimumRoute = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < nodeIndexes.length; i++) {
        minimumRoute = Math.min(minimumRoute, findNearest(nodeIndexes[i], allEdges, val));
        if (minimumRoute === 1)
            return 1;
    }
    return minimumRoute;
}

main();

function main() {
    let input = `4 3
    1 2
    1 3
    4 2
    1 2 1 1 
    1`;

input=`5 4
1 2
1 3
2 4
3 5
1 2 3 3 2
2`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const graphNodesEdges = lines[index++].split(' '), graphNodes = parseInt(graphNodesEdges[0], 10), graphEdges = parseInt(graphNodesEdges[1], 10);
    let graphFrom = [], graphTo = [];
    for (let i = 0; i < graphEdges; i++) {
        const graphFromTo = lines[index++].split(' ');

        graphFrom.push(parseInt(graphFromTo[0], 10));
        graphTo.push(parseInt(graphFromTo[1], 10));
    }

    const ids = lines[index++].split(' ').map(idsTemp => parseInt(idsTemp, 10)), val = parseInt(lines[index++], 10);
    const ans = findShortest(graphNodes, graphFrom, graphTo, ids, val);
    console.log(ans + '\n');
}