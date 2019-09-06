'use strict'

function funnyString(s) {
    function getDifference(arr) {
        let difArr = [];
        for (let i = 1; i < arr.length; i++)
            difArr.push(Math.abs(arr[i] - arr[i - 1]));

        return difArr;
    }

    let codes = s.split('').map((c, index) => s.charCodeAt(index));
    let reverseCodes = codes.slice().reverse();
    let difCodes = getDifference(codes), difReverseCodes = getDifference(reverseCodes);

    let funny = true;
    for (let i = 0; i < codes.length; i++) {
        if (difCodes[i] !== difReverseCodes[i]) {
            funny = false;
            break;
        }
    }

    return funny === true ? 'Funny' : 'Not Funny';
}


// console.log(funnyString('abb'));
console.log(funnyString('acxz'));