'use strict'

main();

// Complete the timeInWords function below.
function timeInWords(h, m) {
    return 'abc';
}

function main() {
    let inputs = [`5
    47`, `3
    00`, `7
    15`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const h = parseInt(lines[index++], 10), m = parseInt(lines[index++], 10);

        let result = timeInWords(h, m);
        console.log(result + "\n");
    }
}