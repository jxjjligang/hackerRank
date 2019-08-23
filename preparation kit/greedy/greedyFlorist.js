'use strict'

function getMinimumCost(k, c) {
    c.sort((a, b) => b - a);
    let times, cost = 0;  // means the multiplication of flower price
    for (let i = 0; i < c.length; i++) {
        let times = 1 + Math.floor(i / k);
        cost += times * c[i];
    }

    return cost;
}

main();
function main() {
    let input = `3 3
    2 5 6`;

    input = `3 2
    2 5 6`;

    input = `5 3
    1 3 5 7 9`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10), c = lines[index++].split(' ').map(cTemp => parseInt(cTemp, 10));

    const minimumCost = getMinimumCost(k, c);
    console.log(minimumCost);
}