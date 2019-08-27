'use strict'

function countInversions(arr) {

}

main();
function main() {
    let input = `2  
    5  
    1 1 1 2 2  
    5  
    2 1 3 1 2`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const t = parseInt(lines[index++], 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);
        console.log(result );
    }
}
