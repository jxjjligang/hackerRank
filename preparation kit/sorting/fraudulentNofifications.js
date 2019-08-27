'use strict'

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {
    // cretae map between distinct value and its count
    function getValue2Count(arr, length) {
        let map = new Map();
        for (let i = 0; i < length; i++) {
            let count = 1, value = arr[i];
            if (map.has(value))
                count += map.get(value);

            map.set(value, count);
        }

        return map;
    }

    function decreaseCount(map, value) {
        if (map.has(value)) {
            let count = map.get(value);
            if (count > 1)
                map.set(value, count - 1);
            else
                map.delete(value);
        }
    }

    function incrementCount(map, value) {
        let count = 1;
        if (map.has(value))
            count += map.get(value);

        map.set(value, count);
    }

    function getMedianValue(map, d) {
        let sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);
        let indexes = [];
        if (d % 2 === 0) {
            indexes.push(d / 2 - 1);
            indexes.push(d / 2);
        }
        else
            indexes.push((d - 1) / 2);

        const TARGET_AMOUNT = indexes.length;
        let countOfKeys = 0, targetIdx = indexes.shift(), values = [];
        for (let i = 0; i < sortedKeys.length; i++) {
            let key = sortedKeys[i];
            countOfKeys += map.get(key);
            while (countOfKeys >= 1 + targetIdx) {
                values.push(key);
                if (indexes.length < 1)
                    break;
                targetIdx = indexes.shift();
            }
            if (values.length === TARGET_AMOUNT)
                break;
        }

        return (values.reduce((agg, cur) => agg + cur)) / values.length;
    }

    let count = 0, map = getValue2Count(expenditure, d);
    for (let i = d; i < expenditure.length; i++) {
        let prev = expenditure[i - d], incoming = expenditure[i];
        if (incoming >= 2 * getMedianValue(map, d))
            count++;

        decreaseCount(map, prev);
        incrementCount(map, incoming);
    }

    return count;
}

main();
function main() {
    let inputs = [`9 5
    2 3 4 2 3 6 8 4 5`, 
    `5 4
    1 2 3 4 4`]; // expects 2, 0, 

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const nd = lines[index++].split(' '), n = parseInt(nd[0], 10), d = parseInt(nd[1], 10);
        const expenditure = lines[index++].split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

        let result = activityNotifications(expenditure, d);
        console.log(result + "\n");
    }
}