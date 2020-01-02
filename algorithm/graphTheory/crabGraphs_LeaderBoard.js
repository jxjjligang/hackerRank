'use strict'
main();

/*
 * Below code is from [Leader Board], I can't understand its logic.
 */
function crabGraphs(n, t, graph) {
    const NODE_COUNT = n, CRAB_LIMIT = t;

    let nodesCount = [], nodesEdges = [];
    for (let j = 0; j <= NODE_COUNT; j++) {
        nodesCount[j] = 0;
        nodesEdges.push([]);
    }
    for (let edge of graph) {
        nodesCount[edge[0]] += 1;
        nodesCount[edge[1]] += 1;
        nodesEdges[edge[0]].push(edge[1]);
        nodesEdges[edge[1]].push(edge[0]);
    }

    let remove = true;
    while (remove && Math.max(...nodesCount) > CRAB_LIMIT) {
        remove = false;
        for (let j = 1; j <= NODE_COUNT; j++) {
            if (nodesCount[j] == 1) {
                let ind = nodesEdges[j][0]
                for (let lar of nodesEdges[ind]) {
                    if (nodesCount[lar] > CRAB_LIMIT) {
                        nodesCount[ind] -= 1;
                        nodesCount[lar] -= 1;
                        nodesEdges[ind].splice(nodesEdges[ind].indexOf(lar), 1);
                        nodesEdges[lar].splice(nodesEdges[lar].indexOf(ind), 1);
                        remove = true;
                    }
                }
            }
        }
    }

    while (Math.max(...nodesCount) > CRAB_LIMIT) {
        let ind = nodesCount.indexOf(Math.max.apply(null, nodesCount));
        let maxEdg = nodesEdges[ind][0];
        for (let edg of nodesEdges[ind])
            if (nodesEdges[edg].length > nodesEdges[maxEdg].length)
                maxEdg = edg;
        nodesCount[ind] -= 1;
        nodesCount[maxEdg] -= 1;
        nodesEdges[ind].splice(nodesEdges[ind].indexOf(maxEdg), 1);
        nodesEdges[maxEdg].splice(nodesEdges[maxEdg].indexOf(ind), 1);
    }
    let cou = nodesCount.filter(nc => nc > 0).length;
    return cou;
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
