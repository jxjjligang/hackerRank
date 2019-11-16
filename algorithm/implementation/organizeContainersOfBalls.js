'use strict'

main();


function organizingContainers(container) {
    function incrementKeyCount(map, key) {
        let count;
        if (map.has(key))
            count = map.get(key);
        else
            count = 0;

        count++;
        map.set(key, count);
    }

    function areTwoMapEqual(mapA, mapB) {
        if ((mapA === undefined) || (mapB === undefined))
            return false;

        for (let key of mapA.keys()) {
            if (mapB.has(key) === false)
                return false;

            if (mapA.get(key) !== mapB.get(key))
                return false;
        }

        return true;
    }

    const CONTAINER_COUNT = container.length;
    let ballTypeCountMap = new Map();
    for (let column = 0; column < CONTAINER_COUNT; column++) {
        let ballType = column, ballCount = 0;
        for (let row = 0; row < CONTAINER_COUNT; row++)
            ballCount += container[row][column];

        incrementKeyCount(ballTypeCountMap, ballCount);
    }

    let rowBallCountMap = new Map();
    for (let row = 0; row < CONTAINER_COUNT; row++) {
        let rowBallCount = container[row].reduce((agg, cur) => agg + cur);
        incrementKeyCount(rowBallCountMap, rowBallCount);
    }

    let equals = areTwoMapEqual(ballTypeCountMap, rowBallCountMap);
    return equals ? 'Possible' : 'Impossible';
}


function main() {

    let inputs = [`2
2
1 1
1 1
2
0 2
1 1`, `2
3
1 3 1
2 1 2
3 3 3
3
0 2 1
1 1 1
2 0 0`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const q = parseInt(lines[index++], 10);

        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10);
            let container = Array(n);
            for (let i = 0; i < n; i++)
                container[i] = lines[index++].split(' ').map(containerTemp => parseInt(containerTemp, 10));

            let result = organizingContainers(container);
            console.log(result + "\n");
        }
    }
}
