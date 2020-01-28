'use strict'

main();

/**
 * Dynamic Programming is used in following way:
 * (1). High level (grid size of k+1) cube only cares about its 8 child sub-cube (grid size of k).
 * (2). Start from bottom (grid size of 1) up, once high level cube (grid size of 2) is constructed, replace [previous sub-cube map] with [current cube map]
 * (3). Map [cube element location] ( f(x,y,z) ) to [cube element value], this also helps above step 1 and 2.
 * @param {*} cube 
 */
function specialSubCubes(cube) {
    function getDimension(length) {
        for (let i = 1; i <= 50; i++) {
            if (i ** 3 === length)
                return i;
        }

        throw Error('function getDimension, should not reach here.');
    }

    const DIMENSION = getDimension(cube.length), DIMENSION_POWER = DIMENSION ** 2,
        ONE = 1, HUNDRED = 100, HUNDRED_POWER = HUNDRED ** 2;

    let result = [cube.filter(v => v === 1).length];
    if (DIMENSION === ONE)
        return result;

    let location2Value = new Map();
    for (let x = 1; x <= DIMENSION; x++) {
        for (let y = 1; y <= DIMENSION; y++) {
            for (let z = 1; z <= DIMENSION; z++) {
                let arrIndex = DIMENSION_POWER * (x - 1) + DIMENSION * (y - 1) + (z - 1);
                let location = HUNDRED_POWER * x + HUNDRED * y + z;
                location2Value.set(location, cube[arrIndex]);
            }
        }
    }

    let remaining = DIMENSION - 1, childrenMap = location2Value, k = 2;
    while (remaining > 0) {
        let parentMap = new Map();
        for (let x = 1; x <= remaining; x++) {
            for (let y = 1; y <= remaining; y++) {
                for (let z = 1; z <= remaining; z++) {
                    let startLoc = HUNDRED_POWER * x + HUNDRED * y + z, eightChild = [startLoc, startLoc + 1,
                        HUNDRED_POWER * x + HUNDRED * (y + 1) + z, HUNDRED_POWER * x + HUNDRED * (y + 1) + z + 1,
                        HUNDRED_POWER * (x + 1) + HUNDRED * y + z, HUNDRED_POWER * (x + 1) + HUNDRED * y + z + 1,
                        HUNDRED_POWER * (x + 1) + HUNDRED * (y + 1) + z, HUNDRED_POWER * (x + 1) + HUNDRED * (y + 1) + z + 1,
                    ];
                    parentMap.set(startLoc, eightChild.reduce((agg, cur) => Math.max(agg, childrenMap.get(cur)), Number.MIN_SAFE_INTEGER));
                }   // END of for (let z = 1;
            }       // END of for (let y = 1;
        }           // END of for (let x = 1;

        result.push(Array.from(parentMap.values()).filter(v => v === k).length);
        childrenMap = parentMap;
        remaining--;
        k++;
    }

    return result;
}

function main() {
    let inputs = [`2
    2
    2 1 1 1 1 1 1 1
    2
    1 1 1 1 2 1 1 2`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10);
            const cube = lines[index++].split(' ').map(cubeTemp => parseInt(cubeTemp, 10));

            let result = specialSubCubes(cube);
            console.log(result.join(" ") + "\n");
        }
    }
}