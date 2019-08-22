'use strict'

function processData(input) {
    function shortestReach(edges, startNode, nodeCount) {
        function getAdjacentNodes(edges, node) {
            let nodes = [];
            for (let i = 0; i < edges.length; i++) {
                let edge = edges[i];
                if (edge[0] === node)
                    nodes.push(edge[1]);
                else if (edge[1] === node)
                    nodes.push(edge[0]);
            }

            return nodes;
        }

        let visitedNodes = new Set(), queue = [{ node: startNode, depth: 0 }], node2Depth = new Map();  // the depth value is counted from the startNode
        visitedNodes.add(startNode);

        while (queue.length > 0) {
            let nodeObj = queue.shift(), childrenNodes = getAdjacentNodes(edges, nodeObj.node);
            for (let i = 0; i < childrenNodes.length; i++) {
                let nextNode = childrenNodes[i];
                if (visitedNodes.has(nextNode))
                    continue;

                visitedNodes.add(nextNode);
                node2Depth.set(nextNode, nodeObj.depth + 1);
                queue.push({ node: nextNode, depth: nodeObj.depth + 1 });
            }
        }

        let reaches = [];
        for (let i = 1; i <= nodeCount; i++) {
            if (i === startNode)
                continue;

            if (!node2Depth.has(i))
                reaches.push(-1);
            else
                reaches.push(6 * node2Depth.get(i));
        }

        return reaches;
    }


    //Enter your code here
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const q = parseInt(lines[index++], 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const node_edge_count = lines[index++].split(' ');
        const nodeCount = parseInt(node_edge_count[0], 10);
        const edgeCount = parseInt(node_edge_count[1], 10);

        let edges = Array(edgeCount);
        for (let i = 0; i < edgeCount; i++)
            edges[i] = lines[index++].split(' ').map(node => parseInt(node, 10));
        let startNode = parseInt(lines[index++]);
        const result = shortestReach(edges, startNode, nodeCount);
        console.log(result.join(' '));
    }
}

main();

function main() {
    let input = `2
4 2
1 2
1 3
1
3 1
2 3
2`;

    processData(input);
}