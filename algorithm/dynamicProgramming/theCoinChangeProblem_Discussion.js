'use strict'

countTime(main)();

function getWays(n, c) {
    const m = c.length;
    let numways = [1];   // numways[x] means # ways to get sum x
    for (let i = 1; i <= n; i++)
        numways[i] = 0;

    // go thru coins 1-by-1 to build up numways[] dynamically
    // just need to consider cases where sum j>=c[i]    
    for (let i = 0; i < m; i++) {
        for (let j = c[i]; j <= n; j++) {
            // find numways to get sum j given value c[i]
            // it consists of those found earlier plus
            // new ones.
            // E.g. if c[]=1,2,3... and c[i]=3,j=5,
            //      new ones will now include '3' with
            //      numways[2] = 2, that is:
            //      '3' with '2', '3' with '1'+'1'
            numways[j] += numways[j - c[i]];
        }
    }

    return numways[n];
}

function main() {
    let inputs = [`152 6
    100 50 25 10 5 1`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10), m = parseInt(firstMultipleInput[1], 10);

        const c = lines[index++].replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));
        // Print the number of ways of making change for 'n' units using coins having the values given by 'c'
        const ways = getWays(n, c);
        console.log(ways + '\n');
    }
}

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}