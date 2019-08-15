'use strict'

// n is the size of array, index starts from 0
const START_INDEX = 1;
function findAllCombination(size) {
    let combinationOfSize = [[[1]]];
    for (let i = 1; i < size; i++) {
        let prevSize = combinationOfSize[i - 1];
        let thisSize = [];
        for (let j = 0; j < prevSize.length; j++) {
            let combination = prevSize[j];
            for (let k = 0; k <= combination.length; k++) {
                let copy = combination.slice();
                copy.splice(k, 0, i + 1);
                thisSize.push(copy);
            }
        }
        combinationOfSize.push(thisSize);
    }
    return combinationOfSize[size - 1];
}

let result = findAllCombination(3);
for (let i = 0; i < result.length; i++)
    console.log(result[i]);
