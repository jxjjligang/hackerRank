'use strict'
main();

// Complete the evenForest function below.
function evenForest(t_nodes, t_edges, t_from, t_to) {
    // Based on the idea from Editorial 
    // construct undirected graph
    function constructGraph(t_from, t_to) {
        function addNodeAndChild(map, node, child) {
            let children;
            if (map.has(node))
                children = map.get(node);
            else {
                children = new Set();
                map.set(node, children);
            }

            children.add(child);
        }

        let node2Children = new Map();
        for (let i = 0; i < t_from.length; i++) {
            let from = t_from[i], to = t_to[i];
            addNodeAndChild(node2Children, from, to);
            addNodeAndChild(node2Children, to, from);
        }

        return node2Children;
    }

    function dfsRemove(node, visited) {
        if (!node)
            return 0;

        visited.add(node);
        let numberOfVertex = 0, children = node2Children.get(node);
        for (let child of children) {
            if (!visited.has(child)) {
                let vertexCount = dfsRemove(child, visited);
                if (vertexCount % 2 === 0) {
                    canBeRemoved++;
                    // console.log(`node: ${child}, canBeRemoved:${canBeRemoved}`);
                }
                else
                    numberOfVertex += vertexCount;
            }
        }

        return 1 + numberOfVertex;
    }

    const ROOT = 1;
    let node2Children = constructGraph(t_from, t_to);

    let visited = new Set(), canBeRemoved = 0;
    dfsRemove(ROOT, visited);
    return canBeRemoved;
}

function main() {
    let inputs = [`30 29
    2 1
    3 2
    4 3
    5 2
    6 4
    7 4
    8 1
    9 5
    10 4
    11 4
    12 8
    13 2
    14 2
    15 8
    16 10
    17 1
    18 17
    19 18
    20 4
    21 15
    22 20
    23 2
    24 12
    25 21
    26 17
    27 5
    28 27
    29 4
    30 25`, `10 9
    2 1
    3 1
    4 3
    5 2
    6 1
    7 2
    8 6
    9 8
    10 8`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const tNodesEdges = lines[index++].split(' '), tNodes = parseInt(tNodesEdges[0], 10), tEdges = parseInt(tNodesEdges[1], 10);
        let tFrom = [], tTo = [];

        for (let i = 0; i < tEdges; i++) {
            const tFromTo = lines[index++].split(' ');
            tFrom.push(parseInt(tFromTo[0], 10));
            tTo.push(parseInt(tFromTo[1], 10));
        }

        const res = evenForest(tNodes, tEdges, tFrom, tTo);
        console.log(res + '\n');
    }
}