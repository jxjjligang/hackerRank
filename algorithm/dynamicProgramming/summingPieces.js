'use strict'

main();

/**
 * Use idea from [Gurupad] in Discussion board.
 * 
 * @param {*} arr 
 */
function summingPieces(arr) {
    const ARR_LEN = arr.length, MOD = 1000000007n;
    function getTwoPowers(n) {
        let arr = [1n];

        for (let i = 1; i <= n; i++)
            arr[i] = (2n * arr[i - 1]) % MOD;

        return arr;
    }

    if (ARR_LEN === 1)
        return arr[0];

    let twoPowers = getTwoPowers(ARR_LEN), timesArr = [twoPowers[ARR_LEN] - 1n], decP = BigInt(ARR_LEN - 2), incP = 0n;
    for (let i = 1; i < ARR_LEN; i++) {
        let prev = timesArr[i - 1];
        timesArr[i] = (MOD + prev + twoPowers[decP] - twoPowers[incP]) % MOD;
        decP--;
        incP++;
    }

    return (timesArr.reduce((prevValue, curValue, index) => (prevValue + curValue * BigInt(arr[index])) % MOD, 0n)).toString();
}

function main() {
    let inputs = [`48
    477 392 161 421 245 50 530 889 750 16 545 303 898 785 162 279 677 664 126 149 814 360 334 681 473 293 267 120 825 21 267 301 413 779 73 657 181 602 897 930 969 441 232 218 577 745 848 253`, `3
    1 3 6`, `5
    4 2 9 10 1`];

    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const arrCount = parseInt(lines[index++], 10);
        const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = summingPieces(arr);
        console.log(result + "\n");
    }
}
