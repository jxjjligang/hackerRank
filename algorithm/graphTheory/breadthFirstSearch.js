'use strict'
main();

// Complete the bfs function below.
function bfs(n, m, edges, s) {
    let results = [];     // save the calculated [Total Length] from [start node] to each of others node.
    for (let i = 1; i <= n; i++)
        results[i] = -1;

    let node2Level = new Map(), queue = [s], visited = [];
    results[s] = 0;
    visited[s] = true;
    node2Level.set(s, 0);

    while (queue.length > 0) {
        let node = queue.shift(), children = edges.filter(e => e[0] === node || e[1] === node);
        for (let i = 0; i < children.length; i++) {
            let edge = children[i], theOtherNode = (edge[0] === node ? edge[1] : edge[0]);
            let theOtherNodeIndex = theOtherNode;
            if (visited[theOtherNodeIndex] === true)
                continue;

            let nodeLevel = node2Level.get(node);
            results[theOtherNodeIndex] = (nodeLevel + 1) * 6;
            node2Level.set(theOtherNodeIndex, nodeLevel + 1);

            queue.push(theOtherNode);
            visited[theOtherNodeIndex] = true;
        }
    }

    results.shift();
    results = results.filter(s => s !== 0)

    return results;
}


function main() {
    let input = `2
    4 2
    1 2
    1 3
    1
    3 1
    2 3
    2`;

    let lines = input.split('\n').map(s => s.trim()), index = 0
    const q = parseInt(lines[index++], 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

        let edges = Array(m);
        for (let i = 0; i < m; i++)
            edges[i] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));

        const s = parseInt(lines[index++], 10);
        let result = bfs(n, m, edges, s);
        console.log(result.join(" ") + "\n");
    }
}
