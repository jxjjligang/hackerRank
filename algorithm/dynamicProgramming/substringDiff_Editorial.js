'use strict'

main();


// My solution is a greedy solution, therefore it can only be partial correct.
function substringDiff(k, s1, s2) {
    const STR_LEN = s1.length;  //  s1, s2 has the same length

    let s1s2Dif = [];
    for (let i = 0; i < STR_LEN; i++)
        s1s2Dif.push([]);

    // step 1, initialize difference array
    for (let i = 0; i < STR_LEN; i++) {
        let row = s1s2Dif[i];
        for (let j = 0; j < STR_LEN; j++)
            row[j] = ((s1[i] !== s2[j]) ? 1 : 0);
    }

    // step 2, 
    let maxSubStr = 0;
    for (let gap = 0; gap < STR_LEN; gap++) {
        let frontPtr = 0, backPtr1 = -1, backPtr2 = -1;
        let frontSum1 = 0, backSum1 = 0, frontSum2 = 0, backSum2 = 0;

        for (; frontPtr + gap < STR_LEN; frontPtr++ ) {
            frontSum1 += s1s2Dif[frontPtr][frontPtr + gap];
            frontSum2 += s1s2Dif[frontPtr + gap][frontPtr];

            while (frontSum1 - backSum1 > k) {
                backPtr1++;
                backSum1 += s1s2Dif[backPtr1][backPtr1 + gap];
            }

            while (frontSum2 - backSum2 > k) {
                backPtr2++;
                backSum2 += s1s2Dif[backPtr2 + gap][backPtr2];
            }

            maxSubStr = Math.max(maxSubStr, frontPtr - backPtr1);
            maxSubStr = Math.max(maxSubStr, frontPtr - backPtr2);
        }
    }

    return maxSubStr;
}

function main() {
    let inputs = [`3
    2 tabriz torino
    0 abacba abcaba
    3 helloworld yellomarin`]; 
    
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const kS1S2 = lines[index++].split(' '), k = parseInt(kS1S2[0], 10), s1 = kS1S2[1], s2 = kS1S2[2];

            let result = substringDiff(k, s1, s2);
            console.log(result + "\n");
        }
    }
}
