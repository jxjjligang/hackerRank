'use strict'

main();


function shortPalindrome(s) {
    function getCombination(num, limit) {
        if (num < 3)
            return 1;

        if (cache.has(num))
            return cache.get(num);

        let result = 1n, divisor = 1n, n=num;
        while (limit > 0) {
            result *= BigInt(n);
            divisor *= BigInt(limit);
            limit--;
            n--;
        }
        result = (result / divisor) % BigInt(MODULO);

        let numberResult = Number(result);
        cache.set(num, numberResult);
        return numberResult;
    }

    const CHARCODE_a = 'a'.charCodeAt(0), MODULO = Math.pow(10, 9) + 7;
    let cache = new Map(), countArr = [];

    for (let idx = 0; idx < s.length; idx++) {
        let arrayIndex = s.charCodeAt(idx) - CHARCODE_a;
        if (countArr[arrayIndex] === undefined)
            countArr[arrayIndex] = [idx];
        else
            countArr[arrayIndex].push(idx);
    }

    countArr = countArr.filter(element => element !== undefined && element.length > 1);
    if (countArr.length === 1)
        return getCombination(countArr[0].length, 4);

    let count = 0;
    for (let idxArr of countArr) {
        let idexArrLen = idxArr.length;
        for (let idxA = 0; idxA < idexArrLen - 1; idxA++) {
            for (let idxD = idxA + 1; idxD < idexArrLen; idxD++) {
                for (let idxBC of countArr) {
                    let start = idxArr[idxA], end = idxArr[idxD];
                    let bcLen = idxBC.filter(element => element > start && element < end).length;
                    if (bcLen > 1)
                        count = (count + getCombination(bcLen, 2)) % MODULO;
                }
            }
        }

    }

    return count;
}

function main() {
    let inputs = [`baabababaaaababbbbbbabbbbabbbaaabaaabbbbaabbbbbbab`, `kkkkkkz`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const s = lines[index++];

        let result = shortPalindrome(s);
        console.log(result + "\n");
    }
}