'use strict'

main();

/**
 * The logic is clear, all below steps are in while loop and exit condition is houses array is empty:
 * 1. Order houses by their location value.
 * 2. Find transmitter (the far right house that can be reached by the first house plus transmitter range), then push into array.
 * 3. Remove all the houses that will be covered by the newly-found transmitter.
 * @param {*} x 
 * @param {*} k 
 */
function hackerlandRadioTransmitters(x, k) {
    function findTransmitters(houses, range) {
        let rightMost = houses[0] + range;
        if (houses[houses.length - 1] <= rightMost)
            return houses[0];
        else
            return houses.find((h, index) => h <= rightMost && houses[index + 1] > rightMost);
    }

    function removeCoveredHouses(houses, transmitter, range) {
        let rightMost = transmitter + range;
        if (houses[houses.length - 1] <= rightMost)
            return [];
        else {
            let index = houses.findIndex(h => h > rightMost);
            return houses.slice(index);
        }
    }

    let houses = x.slice().sort((a, b) => a - b), transmitters = [];
    while (houses.length > 0) {
        let transmitter = findTransmitters(houses, k);
        transmitters.push(transmitter);
        houses = removeCoveredHouses(houses, transmitter, k);
    }

    return transmitters.length;
}

function main() {
    let inputs = [`5 1
    1 2 3 4 5`, `8 2
    7 2 4 6 5 9 12 11`];
    for (let i = 1; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);

        const x = lines[index++].split(' ').map(xTemp => parseInt(xTemp, 10));
        let result = hackerlandRadioTransmitters(x, k);
        console.log(result + "\n");
    }
}