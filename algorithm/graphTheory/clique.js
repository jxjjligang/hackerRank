'use strict'

main();


function clique(n, m) {
    const MAX_EDGES = n * (n - 1) / 2;
    function getEstimateEdges(n, r) {
        let mod = (n % r), ceil = Math.ceil(n / r), floor = Math.floor(n / r);

        let result= MAX_EDGES - mod * ceil * (ceil - 1) / 2 - (r - mod) * floor * (floor - 1) / 2;
        return result;
    }

    if (m >= MAX_EDGES)
        return n;

    let r = 1;
    while (m > getEstimateEdges(n, r ))
        r++;

    return r;
}

function main() {
    let inputs = [`1  
    15 144
    3 2  
    4 6  
    5 7`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++].trim(), 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' ');
            const n = parseInt(firstMultipleInput[0], 10), m = parseInt(firstMultipleInput[1], 10);

            const result = clique(n, m);
            console.log(result + '\n');
        }
    }
}
