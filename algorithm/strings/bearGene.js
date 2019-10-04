'use strict'

main();


// Complete the steadyGene function below.
function steadyGene(gene) {
    function addToMap(map, char, index) {
        let array;
        if (map.has(char))
            array = map.get(char);
        else {
            array = [];
            map.set(char, array);
        }

        array.push(index);
    }

    let quarter = gene.length / 4, char2Indexes = new Map();
    for (let i = 0; i < gene.length; i++)
        addToMap(char2Indexes, gene[i], i);

    let charIndexes = [];                   // index of character whose amount is mroe than quarter
    let char2ExtraCount = new Map();        // mapping between character and its extra amount (= its array size - quarter)
    for (let kv of char2Indexes) {
        let char = kv[0], idxArray = kv[1], arrayLen = idxArray.length;
        if (arrayLen > quarter) {
            char2ExtraCount.set(char, arrayLen - quarter);
            charIndexes = charIndexes.concat(idxArray);
        }
    }

    if (charIndexes.length === 0)
        return 0;
    else {

    }
}

function main() {
    let input = `8  
    GAAATAAA`, lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

    const n = parseInt(lines[index++], 10), gene = lines[index++];
    let result = steadyGene(gene);
    console.log(result + "\n");
}
