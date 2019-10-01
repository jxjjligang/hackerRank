'use strict'

main();

// Complete the chiefHopper function below.
function chiefHopper(arr) {
    let prevEnergy;
    for (let i = arr.length - 1; i >= 0; i--) {
        let valueI = arr[i];
        if (prevEnergy === undefined)
            prevEnergy = Math.ceil(valueI / 2);
        else
            prevEnergy = Math.ceil((valueI + prevEnergy) / 2);
    }

    return prevEnergy;
}

function main() {
    let inputs = [`5
    3 4 3 2 4`, `3
    4 4 4`,`3
    1 6 4`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = chiefHopper(arr);
        console.log(result + "\n");
    }
}
