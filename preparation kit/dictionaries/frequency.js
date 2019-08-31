'use strict'


function freqQuery(queries) {
    return [];
}

main();
function main() {
    let inputs = [`8
    1 5
    1 6
    3 2
    1 10
    1 10
    1 6
    2 5
    3 2`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const q = parseInt(lines[index++].trim(), 10);

        let queries = Array(q);
        for (let i = 0; i < q; i++)
            queries[i] = lines[index++].replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));

        const ans = freqQuery(queries);
        console.log(ans.join('\n') + '\n');
    }
}
