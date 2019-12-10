'use strict'

main();


/**
 *  Below explanation is from discussion 
 *  Certainly an interesting challenge, and requires some insight into a general structure of a minimum possible permutation. My solution is similar to the editorial. The following is a hint:
    Consider the bit structure of an arbitrary sequence of numbers aligned by their binary place. For example,
        11100010101
        11110101010
        11010101011
        11100010000
        11111001010
        11000111110
        11011111010.

    The value of any permutation is left unchanged by trimming leading 1s that occur on every number: XOR(1,1)=0. Post-transformation sequence for the example above:
        100010101
        110101010
        010101011
        100010000
        111001010
        000111110
        011111010.
    Now consider a minimum permutation of this example sequence. Its value is given by the maximum XOR of two adjacent numbers in the sequence. ALL possible permutations necessarily has at least one number with a leading 0 adjacent to a number with a leading 1.
    Let's suppose that we have the minimum permutation. It should be possible to convince yourself that we can generally rearrange the permutation to give a permutation of equal value which has a sequence of numbers leading with 0 following by a sequence of numbers leading with 1. For above:

        0XXXXXXXX
        0XXXXXXXX
        0XXXXXXXX <-- A
        1XXXXXXXX <-- B
        1XXXXXXXX
        1XXXXXXXX
        1XXXXXXXX.
    The arrows point to the two values which in the minimum permutation have the maximum XOR value. This final transformed sequence obviously has its value determined by XOR(A,B) since that is the maximum possible XOR'ing of adjacent values (it is the only XOR'ing that has a 1 in the leading digit and hence is the maximum). The problem is now to find XOR(A,B).
 * @param {*} a 
 */
function anotherMinimaxProblem(a) {
    let set = new Set(a);
    if (set.size === 1)
        return 0;

    let maxValue = a.reduce((agg, cur) => Math.max(agg, cur)), logValue = Math.floor(Math.log2(maxValue));

    // number (in binary format) whose highest value 1 bit is in the same position as maxValue, all other numbers are pushed into zeroArray
    let oneArray = [], zeroArray = [], minMax = Number.MAX_SAFE_INTEGER;
    if (maxValue === (1 << logValue)) {
        minMax = a.reduce((agg, element) => {
            if (element !== maxValue)
                return Math.min(agg, maxValue ^ element);
            else
                return agg;
        }, minMax);
    }
    else {
        let twoTimes = 1 << logValue;
        while (a.every(element => (element & twoTimes) === twoTimes) === true) {   // we need shift 
            a.forEach((element, index) => a[index] = (element - twoTimes));
            twoTimes /= 2;
        }

        a.forEach(element => {
            if ((element & twoTimes) === twoTimes)
                oneArray.push(element);
            else
                zeroArray.push(element);
        });

        for (let oneElement of oneArray) {
            for (let zeroElement of zeroArray)
                minMax = Math.min(minMax, (oneElement ^ zeroElement));
        }
    }

    return minMax;
}

function main() {
    let inputs = [`5
    12 8 9 11 14`,
        `4
    1 2 3 4`,
        `3
    1 2 3`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const n = parseInt(lines[index++], 10), a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = anotherMinimaxProblem(a);
        console.log(result + "\n");
    }
}