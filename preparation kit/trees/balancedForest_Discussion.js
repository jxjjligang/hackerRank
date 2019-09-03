'use strict'

// Complete the balancedForest function below.
// Based on the idea from discussion, make changes based on Java source code (https://github.com/gitmartin/hackerrank/blob/master/Balanced_Forest.java)
/**
 * From venom1724
 * It's pretty straighforward, all done with DFS:

 1. First I calcualte the subtree sum for each node (in the uint64_t s variable) with dfs; 
    The root will then hold the Total sum of all nodes.
    
 2. While traversing the tree with dfs, I keep track of all encountered sums so far in the hash set s 
    and of all encountered sums on the way up to the root in q. 
    I will need that because the sums of all parent nodes to the one that I'm currently in include the sum of the current node.

 3. We can split the tree from the current node if we have encountered the same sum somewhere. 
    We will have 2 subtrees with the same sum. The 3rd subtree will have sum=Total-2current and we can calculate the answer for this case.

 4. There are 2 more cases for splitting the tree from the current node. 
    For example removing the current subtree will leave the tree with sum=Total-current. 
    Then if we have encountered a subtree with sum=(Total-current)/2, we can split the remaining tree 
    into 2 equal parts again and calculate the answer..
 * @param {} c 
 * @param {*} edges 
 */
function balancedForest(c, edges) {
    class Node {
        constructor(cost) {
            this.cost = cost;
            this.dfsVisited = false;
            this.solveVisited = false;
            this.adjacent = [];
        }
    }

    // s has sums encountered during depth first search excluding those from the root to the current node.
    // q has sums encountered during depth first search from the root to current node.
    function solve(idx, nodes) {
        let node = nodes[idx];
        if (node.solveVisited)
            return;

        node.solveVisited = true;
        let x = [2 * node.cost, 2 * sum - 4 * node.cost, sum - node.cost];
        let y = [3 * node.cost - sum, (sum - node.cost) / 2 - node.cost];

        // If removing the edge above the current node (node variable defined at the top of this method)
        // gives two trees whose total values are the same, then the node we add should have that
        // same value too to get 3 trees (one of which is our single node that we added) with the same value.
        if (sum % 2 === 0 && node.cost === (sum / 2))
            mini = Math.min(mini, sum / 2);

        // case 1a: When two non-overlapping subtrees in the overall tree have the same total value.
        if (s.has(node.cost)) {// ||                      // case 1a
            //                q.has(2*node.cost) ) {                  // ?
            if (y[0] >= 0)
                mini = Math.min(mini, y[0]);
        }

        // case 1b: (part B): Two non-overlapping subtrees in the overall tree.
        // case 2b: One edge to be removed is below the other edge to be removed in the overall tree.
        if (s.has(sum - 2 * node.cost) ||                 // case 1b (part B)
            q.has(sum - node.cost)) {                // case 2b
            if (y[0] >= 0)
                mini = Math.min(mini, y[0]);
        }

        // case 1b: (part A): Two non-overlapping subtrees in the overall tree.
        // case 2a: One edge to be removed is below the other edge to be removed in the overall tree.
        if ((sum - node.cost) % 2 === 0) {
            if (s.has((sum - node.cost) / 2) ||            // case 1b (part A)
                q.has((sum + node.cost) / 2)) {        // case 2a
                if (y[1] >= 0)
                    mini = Math.min(mini, y[1]);
            }
        }

        q.add(node.cost);
        for (let i = 0; i < node.adjacent.length; i++) {  // DFS!!
            solve(node.adjacent[i], nodes);           // recursive call
        }

        q.delete(node.cost);
        s.add(node.cost);
    }

    function dfs(idx, nodes) {
        let node = nodes[idx];
        if (node.dfsVisited)
            return 0;

        node.dfsVisited = true;
        for (let i = 0; i < node.adjacent.length; i++)
            node.cost += dfs(node.adjacent[i], nodes);

        return node.cost;
    }

    let s = new Set(), q = new Set();
    let nodes = [], node_values = c;
    for (let i = 0; i < node_values.length; i++)
        nodes.push(new Node(node_values[i]));

    for (let i = 0; i < edges.length; i++) {
        let edge = edges[i];
        let idx0 = edge[0] - 1;
        let idx1 = edge[1] - 1;
        nodes[idx0].adjacent.push(idx1);
        nodes[idx1].adjacent.push(idx0);
    }

    const sum = dfs(0, nodes);
    let mini = sum;
    solve(0, nodes);
    return mini === sum ? -1 : mini;
}

main();
function main() {
    let inputs = [`1
    5
    15 12 8 14 13
    1 2
    1 3
    1 4
    4 5`, `2
    5
    1 2 2 1 1
    1 2
    1 3
    3 5
    1 4
    3
    1 3 5
    1 3
    1 2`];  // expects 19, 2, -1

    inputs = [`5
    6
    7 7 4 1 1 1
    1 2
    3 1
    2 4
    2 5
    2 6
    8
    1 1 1 18 10 11 5 6
    1 2
    1 4
    2 3
    1 8
    8 7
    7 6
    5 7
    6
    12 7 11 17 20 10
    1 2
    2 3
    4 5
    6 5
    1 4
    8
    10 4 1 5 6 4 5 5
    1 2
    2 3
    1 4
    5 4
    5 6
    7 8
    7 5
    6
    100 100 99 99 98 98
    1 3
    3 5
    1 2
    2 4
    4 6`];      // expects -1, 10, 13, 5, 297

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10), c = lines[index++].split(' ').map(cTemp => parseInt(cTemp, 10));

            let edges = Array(n - 1);
            for (let i = 0; i < n - 1; i++)
                edges[i] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));

            const result = balancedForest(c, edges);
            console.log(result);
        }
    }
}