'use strict'
main();

/*
 * Complete the crabGraphs function below.
 */
function crabGraphs(n, t, graph) {
    function constructMap(edges) {
        function addToMap(parent, child, node2Children) {
            let children;
            if (node2Children.has(parent))
                children = node2Children.get(parent);
            else {
                children = new Set();
                node2Children.set(parent, children);
            }

            children.add(child);
        }

        let node2Children = new Map(), allNodes = new Set()
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            addToMap(edge[0], edge[1], node2Children);
            addToMap(edge[1], edge[0], node2Children);
            allNodes.add(edge[0]);
            allNodes.add(edge[1]);
        }

        return node2Children;
    }

    function getNodeCopy(nodeNumber, n) {
        return nodeNumber + n;
    }

    /* Create copy of existing node, and add [Source] node, [Sink] node; 
        (1). Add edges between [source nodes] and [Source] node, capacity is min(t, node_degree);[Source] node
        (2). Add edges between [copy nodes] and [Sink] node, capacity is 1
        (3). Add edges between [source nodes] and [copy nodes], for each original edge, create 2 edges that one node is from [source nodes], and the other is from [copy nodes]
    */
    function createCopyNodesAndEdges(edges, t, node2Degree) {
        let sortedEdges = edges;
        let allEdges = [], edge2Capacity = new Map();
        for (let node = 1; node <= NODES_COUNT; node++) {
            // (1). Add edges between [source nodes] and [Source] node
            let srcEdge = [SOURCE_NODE, node];
            allEdges.push(srcEdge);
            // if (node2Degree.has(node))
            //     edge2Capacity.set(srcEdge, Math.min(node2Degree.get(node), t));

            // (2). Add edges between [copy nodes] and [Sink] node
            let sinkEdge = [node + NODES_COUNT, SINK_NODE];
            allEdges.push(sinkEdge);    // capacity is 1
            edge2Capacity.set(sinkEdge, t);
        }

        for (let edge of sortedEdges) {
            let start = edge[0], end = edge[1];

            allEdges.push([start, end + NODES_COUNT]);
            allEdges.push([start + NODES_COUNT, end]);
        }

        return [allEdges, edge2Capacity];
    }

    function bfs(allEdges) {
        let queue = [[SOURCE_NODE, []]], visited = new Set();

        while (queue.length > 0) {
            let nodeAndPath = queue.shift(), node = nodeAndPath[0], path = nodeAndPath[1];
            visited.add(node);

            let adjacentEdges = allEdges.filter(edge => edge[0] === node || edge[1] === node);
            for (let edge of adjacentEdges) {
                let anotherNode = (edge[0] === node ? edge[1] : edge[0]);
                if (!visited.has(anotherNode) && (anotherNode > node)) {
                    let copyPath = path.slice();
                    copyPath.push(edge);
                    queue.push([anotherNode, copyPath]);

                    if (anotherNode === SINK_NODE)
                        return copyPath;
                }

            }   // the end of for (let edge of adjacentEdges) {
        }   // the end of  while (queue.length > 0) {

        return [];
    }

    const SOURCE_NODE = 0, SINK_NODE = 1000, DEGREE_ONE = 1, NODES_COUNT = n;
    let node2Children = constructMap(graph), node2Degree = new Map(Array.from(node2Children).map(kv => [kv[0], kv[1].size]).filter(arr => arr[1] > DEGREE_ONE));
    let allEdgesAndCapacityMap = createCopyNodesAndEdges(graph, t, node2Degree), allEdges = allEdgesAndCapacityMap[0], edge2Capacity = allEdgesAndCapacityMap[1], bfsPath = bfs(allEdges), totalFlow = 0;
    while (bfsPath.length > 0) {
        console.log(bfsPath.join(' -> '));
        totalFlow++;
        // update allEdges
        for (let edge of bfsPath) {
            if (edge2Capacity.has(edge)) {
                let capacity = edge2Capacity.get(edge);
                if (capacity === 1) {
                    edge2Capacity.delete(edge);
                    allEdges = allEdges.filter(eg => eg !== edge);
                }
                else
                    edge2Capacity.set(edge, capacity - 1);
            }
            else
                allEdges = allEdges.filter(eg => eg !== edge);
        }

        bfsPath = bfs(allEdges);
    }

    return totalFlow;
}

function main() {
    let inputs = [`1
    5 2 4
    1 2    
    2 3
    1 4
    1 5`,
        `2  
        8 2 7  
        1 4  
        2 4  
        3 4  
        5 4  
        5 8  
        5 7  
        5 6  
        6 3 8  
        1 2  
        2 3  
        3 4  
        4 5  
        5 6  
        6 1  
        1 4  
        2 5`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const c = parseInt(lines[index++], 10);

        for (let cItr = 0; cItr < c; cItr++) {
            const ntm = lines[index++].split(' '), n = parseInt(ntm[0], 10), t = parseInt(ntm[1], 10), m = parseInt(ntm[2], 10);
            let graph = Array(m);
            for (let graphRowItr = 0; graphRowItr < m; graphRowItr++)
                graph[graphRowItr] = lines[index++].split(' ').map(graphTemp => parseInt(graphTemp, 10));

            let result = crabGraphs(n, t, graph);
            console.log(result);
        }
    }
}
