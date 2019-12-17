'use strict'

main();

/*
 * Complete the roadsInHackerland function below.
 */
function roadsInHackerland(n, roads) {
    function updateMinimumRoads(start, end, cost, minimumRoads) {
        function updateRoadMinimumValue(start, end, cost, minimumRoads) {
            let startMap;
            if (minimumRoads.has(start))
                startMap = minimumRoads.get(start);
            else {
                startMap = new Map();
                minimumRoads.set(start, startMap);
            }
            if (!startMap.has(end) || (startMap.get(end) > cost))
                startMap.set(end, cost);
        }

        updateRoadMinimumValue(start, end, cost, minimumRoads);
        for (let kv of minimumRoads) {
            let mapStart = kv[0], map = kv[1];
            if (mapStart !== end && map.has(start)) {
                let runningCost = map.get(start);
                if (!map.has(end) || (map.get(end) > (runningCost + cost))) {
                    map.set(end, runningCost + cost);
                    updateRoadMinimumValue(end, mapStart, runningCost + cost, minimumRoads);
                    updateMinimumRoads(mapStart, end, runningCost + cost, minimumRoads);
                }

            }
        }
    }

    // minimumRoads saves the [minimum travel cost] between any 2 nodes
    let directedRoads = [], minimumRoads = new Map();
    for (let road of roads) {
        directedRoads.push(road);
        directedRoads.push([road[1], road[0], road[2]]);
    }
    for (let road of directedRoads)
        road[2] = BigInt(Math.pow(2, road[2]));

    let queue = [directedRoads[0]];
    while (queue.length > 0) {
        let road = queue.shift(), start = road[0], end = road[1], cost = road[2];
        // update minimumRoads
        updateMinimumRoads(start, end, cost, minimumRoads);
        // updateMinimumRoads(end, start, cost, minimumRoads);
        road.visited = true;

        // find roads (not visited) that starts from end 
        let roads = directedRoads.filter(r => r[0] === end && r.visited !== true);
        queue = queue.concat(roads);
    }

    let total = 0n;
    for (let kv of minimumRoads) {
        let mapStart = kv[0], map = kv[1];
        for (let endAndCost of map) {
            let end = endAndCost[0], cost = endAndCost[1];
            if (cost !== minimumRoads.get(end).get(mapStart)) {
                console.log('Wrong');
            }

            if (mapStart < end)
                total += cost;
        }
    }
    return Number(total).toString(2);
}

function main() {
    let inputs = [`20 30
    4 11 27
    7 9 14
    13 6 23
    18 10 3
    19 4 19
    2 7 6
    11 13 20
    6 15 0
    14 18 2
    16 5 26
    2 20 10
    16 17 21
    6 2 9
    11 5 25
    20 19 28
    14 4 29
    10 4 24
    9 7 8
    7 1 15
    12 13 7
    8 3 22
    8 13 4
    17 14 1
    8 15 11
    1 10 5
    18 15 18
    7 13 17
    12 9 16
    14 6 12
    9 2 13`,
        `7 10
    4 3 4
    2 5 3
    5 7 8
    5 3 1
    1 2 5
    7 5 6
    7 4 7
    6 2 9
    3 2 0
    7 3 2`,
        `5 6
1 3 5
4 5 0
2 1 3
3 2 1
4 3 4
4 2 2`];
    for (let i = 0; i < 3; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
        let roads = Array(m);
        for (let roadsRowItr = 0; roadsRowItr < m; roadsRowItr++)
            roads[roadsRowItr] = lines[index++].split(' ').map(roadsTemp => parseInt(roadsTemp, 10));


        let result = roadsInHackerland(n, roads);
        console.log(result);
    }
}
