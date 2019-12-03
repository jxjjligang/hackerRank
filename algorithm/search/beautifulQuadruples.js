'use strict'

main();

function beautifulQuadruples(a, b, c, d) {
    let allCases = new Set();
    function addToCaseColletion(allCases, i, j, k, d) {
        let xorABC = i ^ j ^ k, dArray = [];
        for (let z = 1; z <= d; z++) {
            if (xorABC !== z)
                dArray.push(z);
        }

        for (let l = 0; l < dArray.length; l++) {
            let abcdArr = [i, j, k, dArray[l]].sort((a, b) => a - b);
            allCases.add(abcdArr.join(','));
        }
    }

    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            for (let k = 1; k <= c; k++) {
                addToCaseColletion(allCases, i, j, k, d);
            }
        }
    }

    return allCases.size;
}

function main() {
    for(let i=0; i<127535297312; i++){
        
    }
    console.log('finished');
    return;


    let inputs = [`115 15 85 42`,`1 2 3 4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const abcd = lines[index++].split(' ');
        const a = parseInt(abcd[0], 10), b = parseInt(abcd[1], 10), c = parseInt(abcd[2], 10), d = parseInt(abcd[3], 10);

        let result = beautifulQuadruples(a, b, c, d);
        console.log(result + "\n");
    }
}