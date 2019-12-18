'use strict'

main();

/*
 * Complete the roadsInHackerland function below.
 */
function roadsInHackerland(n, roads) {
    let dist = [];
    for (let i = 0; i < n; i++) {
        let arr = [];
        arr[i] = 0n;
        dist.push(arr);
    }

    for (let road of roads) {
        dist[road[0] - 1][road[1] - 1] = BigInt(Math.pow(2, road[2]));
        dist[road[1] - 1][road[0] - 1] = BigInt(Math.pow(2, road[2]));
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== undefined && dist[k][j] !== undefined) {
                    let runnningCost = dist[i][k] + dist[k][j];
                    if (dist[i][j] === undefined || dist[i][j] > runnningCost)
                        dist[i][j] = runnningCost;
                }
            }
        }
    }

    for (let i = 0; i < dist.length; i++) {
        let row = dist[i];
        console.log(row.join(' '));
    }
    console.log();

    let total = 0n;
    for (let i = 0; i < dist.length; i++) {
        let row = dist[i];
        for (let j = i + 1; j < row.length; j++) {
            total += row[j];
        }
    }

    return Number(total).toString(2);
}

function main() {
    let inputs = [`18 23
    5 12 18
    17 2 5
    7 18 3
    17 6 0
    15 12 16
    2 3 8
    14 9 20
    4 9 11
    13 1 21
    13 12 15
    15 12 10
    6 16 9
    11 18 2
    9 16 17
    12 4 4
    7 4 19
    17 1 12
    10 14 7
    8 5 13
    18 3 14
    4 11 6
    15 3 1
    12 5 22`,
        `20 30
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
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
        let roads = Array(m);
        for (let roadsRowItr = 0; roadsRowItr < m; roadsRowItr++)
            roads[roadsRowItr] = lines[index++].split(' ').map(roadsTemp => parseInt(roadsTemp, 10));


        let result = roadsInHackerland(n, roads);
        console.log(result);
    }
}
