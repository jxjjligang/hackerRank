'use strict'
main();


/*
 * Complete the crabGraphs function below.
 */
function crabGraphs(n, t, graph) {
    const SOURCE_INDEX = 0, SINK_INDEX = 2 * n + 1, MATRIX_LENGTH = 2 * n + 1;
    const VERTEX_COUNT = n, LEG_LIMIT = t, INVALID_INDEX = -1;

    function createResidualGraph(origGraph) {
        let rsGraph = [];
        for (let i = 0; i <= MATRIX_LENGTH; i++)
            rsGraph.push([]);

        for (let edge of origGraph) {
            let from = edge[0], to = edge[1], fromCopy = from + VERTEX_COUNT, toCopy = to + VERTEX_COUNT;
            // Add edge between [Source Node] and other nodes
            rsGraph[SOURCE_INDEX][from] = rsGraph[SOURCE_INDEX][from] === undefined ? 1 : Math.min(1 + rsGraph[SOURCE_INDEX][from], LEG_LIMIT);
            rsGraph[SOURCE_INDEX][to] = rsGraph[SOURCE_INDEX][to] === undefined ? 1 : Math.min(1 + rsGraph[SOURCE_INDEX][to], LEG_LIMIT);

            // Add edge between [Sink Node] and other nodes
            rsGraph[SINK_INDEX][fromCopy] = 1;
            rsGraph[SINK_INDEX][toCopy] = 1;

            // Add edge between [Original Node] and [Copy Node] 
            rsGraph[from][toCopy] = 1;
            rsGraph[toCopy][from] = 0;

            rsGraph[fromCopy][to] = 1;
            rsGraph[to][fromCopy] = 0;
        }
        return rsGraph;
    }

    function getMaxFlow(rsGraph) {
        function bfsSearch(prevArr, graph) {
            let queue = [SOURCE_INDEX], visited = new Set();

            prevArr[SOURCE_INDEX] = INVALID_INDEX
            visited.add(SOURCE_INDEX);
            while (queue.length > 0) {
                let from = queue.shift(), tos = graph[from];
                for (let i = 0; i < tos.length; i++) {
                    let to = i, capacity = tos[i];
                    if (capacity === undefined || capacity <= 0)
                        continue;

                    prevArr[to] = from;
                    queue.push(to);

                    if (to === SINK_INDEX)
                        return true;
                }
            }

            return false;
        }

        let maxFlow = 0, prev = [];

        while (bfsSearch(prev, rsGraph) === true) {
            let path = [SINK_INDEX], parent = prev[SINK_INDEX];
            while (parent !== -1) {
                path.unshift(parent);
                parent = prev[parent];
            }

            let minFlow = Number.MAX_SAFE_INTEGER;
            for (let i = 1; i < path.length; i++) {
                let from = path[i - 1], to = path[i];
                minFlow = Math.min(minFlow, rsGraph[from][to]);
            }

            maxFlow += minFlow;
            for (let i = 1; i < path.length; i++) {
                let from = path[i - 1], to = path[i];
                rsGraph[from][to] -= minFlow;

                if (rsGraph[to][from] === undefined)
                    throw Error('rsGraph[to][from] shouldn not be undefined');
                rsGraph[to][from] += minFlow;

            }
            // update residual graph

            prev = [];
        }

        return maxFlow;
    }

    let rsGraph = createResidualGraph(graph);
    let maxFlow = getMaxFlow(rsGraph);
    return maxFlow;
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
