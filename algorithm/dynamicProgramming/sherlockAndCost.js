'use strict'

main();

function cost(B) {
    let result = [[0, 0]];

    for (let i = 1; i < B.length; i++) {
        let prev = B[i - 1], current = B[i];
        result[i] = [];
        let curResults = result[i], prevResults = result[i - 1];
        curResults[0] = Math.max(prevResults[0], prevResults[1]+ Math.abs(prev - 1));
        curResults[1] = Math.max(prevResults[0] + Math.abs(current-1), prevResults[1] + Math.abs(prev - current));
    }
    let finalResults = result[B.length - 1];
    return Math.max(finalResults[0], finalResults[1]);
}

function main() {
    let inputs = [`1
    5
    10 1 10 1 10`];
    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10), B = lines[index++].split(' ').map(BTemp => parseInt(BTemp, 10));
            let result = cost(B);
            console.log(result + "\n");
        }
    }
}


