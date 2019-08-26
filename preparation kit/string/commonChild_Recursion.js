'use strict'

/**
 * Recursion way is starightforward, but its time complexity will be 2 power n, means impossible to solve problem with realistic time.
 * @param {*} s1 
 * @param {*} s2 
 */
function commonChild(s1, s2) {
    const S1_LENGTH = s1.length, S2_LENGTH = s2.length;
    if (S1_LENGTH === 0 || S2_LENGTH === 0)
        return 0;
    else if (S1_LENGTH === 1 || S2_LENGTH === 1) {
        let char = s1, s = s2;
        if (S2_LENGTH === 1) {
            char = s2;
            s = s1;
        }
        return (s.indexOf(char) !== -1) ? 1 : 0;
    }

    let s1Last = s1[S1_LENGTH - 1], s2Last = s2[S2_LENGTH - 1];
    if (s1Last === s2Last)
        return 1 + commonChild(s1.slice(0, S1_LENGTH - 1), s2.slice(0, S2_LENGTH - 1))
    else
        return Math.max(commonChild(s1.slice(0, S1_LENGTH - 1), s2), commonChild(s1, s2.slice(0, S2_LENGTH - 1)));
}

main();
function main() {
    let inputs = [`HARRY
    SALLY`, `AA
    BB`, `SHINCHAN
    NOHARAAA`]; // expects 2, 0, 3

    inputs = [`WEWOUCUIDGCGTRMEZE
               FDAGCXGKCTKWNECHMR`];

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const s1 = lines[index++], s2 = lines[index++];

        let result = countTime(commonChild)(s1, s2);
        console.log(result);
    }
}


function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}
