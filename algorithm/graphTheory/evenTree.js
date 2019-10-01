'use strict'
main();

// Complete the evenForest function below.
function evenForest(t_nodes, t_edges, t_from, t_to) {
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

    // to construct directed graph, starts from ROOT
    function removeBackFromGraph(parent, node2Children) {
        let children = node2Children.get(parent);
        for (let child of children) {
            if (node2Children.has(child)) {
                let nodes = node2Children.get(child);
                nodes.delete(parent);
            }

            removeBackFromGraph(child, node2Children);
        }
    }

    // Recursived transverse graph, calculate node count (the value is its children plus itself) 
    function dfsVisit(node2Children, node, child2Parent) {
        if (!node)
            return 0;

        let children = node2Children.get(node);
        let childrenCount = 0;
        for (let child of children) {
            child2Parent.set(child, node);
            childrenCount += dfsVisit(node2Children, child, child2Parent);
        }

        let nodeCount = 1 + childrenCount;
        node2Count.set(node, nodeCount);
        return nodeCount;
    }

    function dfsRemove(node) {
        if (!node)
            return;

        let children = node2Children.get(node);
        for (let child of children)
            dfsRemove(child);

        let nodeCount = node2Count.get(node);
        if (node !== ROOT && isEvenAndLargerThanZero(nodeCount)) {
            decrementParentCount(node, nodeCount);
            canBeRemoved++;
            // console.log(`node: ${node}, canBeRemoved:${canBeRemoved}`);
        }
    }

    // Recursively update node's parent, grand-parent, ancestors
    function decrementParentCount(node, nodeCount) {
        let parent = child2Parent.get(node);
        while (parent !== undefined) {
            node2Count.set(parent, node2Count.get(parent) - nodeCount);
            parent = child2Parent.get(parent);
        }
    }

    function isEvenAndLargerThanZero(number) {
        return (number > 0) && (number % 2 === 0);
    }

    const ROOT = 1;
    let node2Children = constructGraph(t_from, t_to);
    removeBackFromGraph(ROOT, node2Children);

    let node2Count = new Map(), child2Parent = new Map();
    dfsVisit(node2Children, ROOT, child2Parent);

    let canBeRemoved = 0;
    dfsRemove(ROOT);
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