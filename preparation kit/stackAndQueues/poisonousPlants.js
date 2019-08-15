'use strict'


// use the straightforward compare method, can get correct answer but not good performance
function poisonousPlants(p) {
    let deadIndexes = [], plants = p.slice(), hasDead = false, days = 0;
    do {
        for (let i = 1; i < plants.length; i++) {
            let current = plants[i], leftPlant = plants[i - 1];
            if (current > leftPlant)
                deadIndexes.push(i);
        }
        hasDead = deadIndexes.length > 0;
        if (hasDead) {
            plants = plants.filter((p, idx) => deadIndexes.find(e => e === idx) === undefined);
            days++;
        }
        deadIndexes = [];
    }
    while (hasDead);

    return days;
}
main();
function main() {
    let input = `9
    3 7 1 2 4 8 2 7 10`;

    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const n = parseInt(lines[index++], 10), p = lines[index++].split(' ').map(pTemp => parseInt(pTemp, 10));
    let result = poisonousPlants(p);
    console.log(result + "\n");
}
