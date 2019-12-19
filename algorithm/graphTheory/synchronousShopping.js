'use strict'

main();

/*
 * Complete the 'shop' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. STRING_ARRAY centers
 *  4. 2D_INTEGER_ARRAY roads
 */

function shop(n, k, centers, roads) {
    // Write your code here
    function getCenter2Fish(centers) {
        let center2Fish = new Map(), centerID = 1;
        for (let center of centers) {
            let arr = center.split(' ').map(element => parseInt(element)), fishValue = 0;
            for (let i = 1; i < arr.length; i++)
                fishValue += 1 << arr[i];

            center2Fish.set(centerID, fishValue);
            centerID++;
        }

        return center2Fish;
    }

    let center2Fish = getCenter2Fish(centers), fishValue2Time = new Map(), queue = [1];
    fishValue.set(center2Fish.get(1), 0);
    while (queue.length > 0) {

    }
}

function main() {
    let inputs = [`5 5 5
1 1
1 2
1 3
1 4
1 5
1 2 10
1 3 10
2 4 10
3 5 10
4 5 10`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10), m = parseInt(firstMultipleInput[1], 10), k = parseInt(firstMultipleInput[2], 10);
        let centers = [];
        for (let i = 0; i < n; i++) {
            const centersItem = lines[index++];
            centers.push(centersItem);
        }

        let roads = Array(m);
        for (let i = 0; i < m; i++)
            roads[i] = lines[index++].replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));

        const res = shop(n, k, centers, roads);
        console.log(res + '\n');
    }
}