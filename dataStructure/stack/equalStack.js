'use strict'

function equalStacks(h1, h2, h3) {
    /*
     * Write your code here.
     */
    function accumulateHeight(arr) {
        let result = [];
        if (arr.length === 0)
            return [0];
        else if (arr.length === 1)
            return [arr[0]];
        else {
            result.push(arr[0]);
            for (let i = 1; i < arr.length; i++)
                result.push(result[i - 1] + arr[i]);

            return result;
        }
    }

    function putToMap(map, arr) {
        arr.forEach(element => {
            if (map.has(element))
                map.set(element, map.get(element) + 1);
            else
                map.set(element, 1);
        });
    }

    let height2Count = new Map();
    putToMap(height2Count, accumulateHeight(h1.reverse()));
    putToMap(height2Count, accumulateHeight(h2.reverse()));
    putToMap(height2Count, accumulateHeight(h3.reverse()));

    let maxCommonHeight = 0;
    for (let kv of height2Count) {
        if (kv[1] === 3)
            maxCommonHeight = Math.max(maxCommonHeight, kv[0]);
    }

    return maxCommonHeight;
}

function main() {
    let input = `5 3 4
    3 2 1 1 1
    4 3 2
    1 1 4 1`;

    let lines = input.split('\n').map(l => l.trim()), index = 0;
    const n1N2N3 = lines[index++].split(' ');
    const n1 = parseInt(n1N2N3[0], 10), n2 = parseInt(n1N2N3[1], 10), n3 = parseInt(n1N2N3[2], 10);

    const h1 = lines[index++].split(' ').map(h1Temp => parseInt(h1Temp, 10));
    const h2 = lines[index++].split(' ').map(h2Temp => parseInt(h2Temp, 10));
    const h3 = lines[index++].split(' ').map(h3Temp => parseInt(h3Temp, 10));

    let result = equalStacks(h1, h2, h3);
    console.log(result + "\n");
}

main();