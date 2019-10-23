'use strict'
main();

function bobAndBen(trees) {
    function gn(n) {
        if (n === 0 || n === 2)
            return 0;

        let gnResult = (n - 1) % 2 + 1;
        return gnResult;
    }

    let combinedXOR = trees.map(t => t[0]).reduce((agg, cur) => agg ^ gn(cur), 0);
    return combinedXOR !== 0 ? 'BOB' : 'BEN';
}

function main() {
    let inputs = [`2
    2
    1 2
    1 3
    1
    3 2`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const g = parseInt(lines[index++], 10);

        for (let gItr = 0; gItr < g; gItr++) {
            const n = parseInt(lines[index++], 10);

            let trees = Array(n);

            for (let treesRowItr = 0; treesRowItr < n; treesRowItr++) {
                trees[treesRowItr] = lines[index++].split(' ').map(treesTemp => parseInt(treesTemp, 10));
            }

            let result = bobAndBen(trees);

            console.log(result + "\n");
        }
    }
}
