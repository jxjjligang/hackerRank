'use strict'
main();


/*
 * Complete the crabGraphs function below.
 */
function crabGraphs(n, t, graph) {
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

    function constructMap(edges) {
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

    let vertexCount = 0, crabFound = false;
    do {
        let node2Children = constructMap(graph);
        if (node2Children.size === 0)
            break;

        let allNodes = Array.from(node2Children.keys()), nodeObjs = [];
        for (let node of allNodes) {
            let children = node2Children.get(node);
            let grandChildCount = Array.from(children).reduce((a, current) => a + node2Children.get(current).size, 0);
            let nodeObj = { value: node, childCount: children.size, grandChildCount: grandChildCount };
            nodeObjs.push(nodeObj);
        }
        let validNodes = nodeObjs.filter(n => n.childCount >= t);
        crabFound = (validNodes.length > 0);
        if (crabFound) {
            validNodes.sort((n1, n2) => n1.childCount + n1.grandChildCount - n2.childCount - n2.grandChildCount);
            let crabHead = validNodes[0];
            vertexCount += Math.min(t, crabHead.childCount);
            let crabFeet = node2Children.get(crabHead.value);

            graph = graph.filter(edge => edge[0] !== crabHead.value && edge[1] !== crabHead.value && !crabFeet.has(edge[0]) && !crabFeet.has(edge[1]));
            node2Children = constructMap(graph);
        }
    }
    while (crabFound)

    return vertexCount;
}

function main() {
    let inputs = [
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
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const c = parseInt(lines[index++], 10);

        for (let cItr = 0; cItr < c; cItr++) {
            const ntm = lines[index++].split(' '), n = parseInt(ntm[0], 10), t = parseInt(ntm[1], 10), m = parseInt(ntm[2], 10);
            let graph = Array(m);
            for (let graphRowItr = 0; graphRowItr < m; graphRowItr++)
                graph[graphRowItr] = lines[index++].split(' ').map(graphTemp => parseInt(graphTemp, 10));

            let result = crabGraphs(n, t, graph);
            console.log(result + "\n");
        }
    }
}
