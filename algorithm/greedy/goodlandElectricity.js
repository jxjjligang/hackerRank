'use strict'

main();


// Complete the pylons function below.
function pylons(k, arr) {
    const RANGE = k - 1;
    function getPlantPosition(start, array) {
        let end = (start === 0) ? RANGE : (2 * RANGE + start);
        for (let position = end; position >= start; position--) {
            if (array[position] === 1)
                return position;
        }

        return -1;
    }


    let start = 0, plantCount = 0, plantPosition;
    do {
        plantPosition = getPlantPosition(start, arr);
        if (plantPosition === -1)
            return -1;
        else {
            plantCount++;
            start = plantPosition + 1;
        }
    } while ((plantPosition + RANGE < (arr.length - 1)))

    return plantCount;
}

function main() {
    let inputs = [`10 3
    0 1 0 0 0 1 1 1 1 1`,
        `6 2
    0 1 1 1 1 0`,];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
        const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = pylons(k, arr);
        console.log(result + "\n");
    }
}
