'use strict'

main();


/*
 * Complete the 'getCost' function below.
 *
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

function getCost(gNodes, gFrom, gTo, gWeight) {
    const INVALID_FARE = Number.MAX_SAFE_INTEGER, START_NODE = 1;

    function createMST(gNodes, gFrom, gTo, gWeight) {
        function constructGraph(gFrom, gTo, gWeight) {
            function addToMap(map, from, toAndgWeight) {
                let toAndgWeightArr;
                if (map.has(from))
                    toAndgWeightArr = map.get(from);
                else {
                    toAndgWeightArr = [];
                    map.set(from, toAndgWeightArr);
                }

                toAndgWeightArr.push(toAndgWeight);
            }

            let start2EndAndWeight = new Map();
            for (let i = 0; i < gFrom.length; i++) {
                addToMap(start2EndAndWeight, gFrom[i], [gTo[i], gWeight[i]]);
                addToMap(start2EndAndWeight, gTo[i], [gFrom[i], gWeight[i]]);
            }

            return start2EndAndWeight;
        }

        let mstNodes = [], node2Fare = new Set();
        for (let i = 1; i <= gNodes; i++)
            mstNodes.push({ node: i, runningFare: (i === START_NODE ? 0 : INVALID_FARE) });

        let graph = constructGraph(gFrom, gTo, gWeight), visited = new Set(), nextNode = mstNodes[0];
        while (nextNode !== undefined) {
            set.add(nextNode);
            let edgeStart = nextNode.node, runningFare = nextNode.runningFare;
            let adjacentEdges = graph.get(nextNode);
            for (let edge of adjacentEdges) {
                let edgeEnd = edge[0], edgeFare = edge[1];
                if (visited.has(edgeEnd))
                    continue;

                if (edgeFare<=runningFare)
            }

        }
    }
}

function main() {
    let inputs = [`5 5
    1 2 60
    3 5 70
    1 4 120
    4 5 150
    2 3 80`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const gNodesEdges = lines[index++].split(' ');

        const gNodes = parseInt(gNodesEdges[0], 10);
        const gEdges = parseInt(gNodesEdges[1], 10);

        let gFrom = [];
        let gTo = [];
        let gWeight = [];

        for (let i = 0; i < gEdges; i++) {
            const gFromToWeight = lines[index++].split(' ');

            gFrom.push(parseInt(gFromToWeight[0], 10));
            gTo.push(parseInt(gFromToWeight[1], 10));
            gWeight.push(parseInt(gFromToWeight[2], 10));
        }

        getCost(gNodes, gFrom, gTo, gWeight);
    }
}