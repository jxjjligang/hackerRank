'use strict'

function findAllCombination(arr) {
    function recursiveFind(arr, acumulated) {
        if (arr.length === 0) {
            console.log(acumulated);
            return;
        }

        if (!acumulated)
            acumulated = [];
        for (let i = 0; i < arr.length; i++) {
            let arrCopy = [...arr.slice(0, i), ...arr.slice(i + 1)];
            acumulated.push(arr[i]);
            recursiveFind(arrCopy, acumulated);
            acumulated.pop();
        }
    }


    recursiveFind(arr);
}

findAllCombination([1, 2, 3, 4]);