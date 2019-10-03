'use strict'

main();


// Complete the steadyGene function below.
function steadyGene(gene) {

return -1;
}

function main() {
    let input = `8  
    GAAATAAA`, lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

    const n = parseInt(lines[index++], 10), gene = lines[index++];
    let result = steadyGene(gene);
    console.log(result + "\n");
}
