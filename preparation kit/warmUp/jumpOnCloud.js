'use strict'

function jumpingOnClouds(c) {
    let totalJumps = 0, cloudIndex = 0;
    const CLOUD_AMOUNT = c.length;
    while (cloudIndex < CLOUD_AMOUNT - 1) {
        let jumps = 1;
        if (c[cloudIndex + 2] === 0)
            jumps = 2;

        cloudIndex += jumps;
        totalJumps++;
    }

    return totalJumps;
}

main();
function main() {
    let input = `6
    0 0 0 1 0 0`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const n = parseInt(lines[index++], 10), c = lines[index++].split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c);
    console.log(result + "\n");
}
