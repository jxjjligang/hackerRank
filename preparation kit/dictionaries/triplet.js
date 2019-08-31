'use strict'

function countTriplets(arr, r) {
    function addToMap(map, number, count) {
        let cnt = count;
        if (map.has(number))
            cnt += map.get(number);

        map.set(number, cnt);
    }

    let baseMap = new Map(), baseOneTime = new Map(), count = 0;
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        if (current % r === 0) {
            let division = current / r;
            if (baseOneTime.has(division))
                count += baseOneTime.get(division);

            if (baseMap.has(division))
                addToMap(baseOneTime, current, baseMap.get(division));
        }
        addToMap(baseMap, current, 1);
    }

    return count;
}

main();

function main() {
    let inputs = [`5 5
    1 5 5 25 125`, `6 3
    1 3 9 9 27 81`, `4 2
    1 2 2 4`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const nr = lines[index++].replace(/\s+$/g, '').split(' '), n = parseInt(nr[0], 10), r = parseInt(nr[1], 10);

        const arr = lines[index++].replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const ans = countTriplets(arr, r);
        console.log(ans + '\n');
    }
}
