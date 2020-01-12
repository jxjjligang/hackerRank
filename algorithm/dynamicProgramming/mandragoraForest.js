'use strict'

main();

function mandragora(H) {
    let healthArr = H.map(element => BigInt(element));
    healthArr.sort((a, b) => a - b);
    let health = 1n, experience = 0n, remaining = healthArr.reduce((agg, cur) => agg + cur);
    for (let i = 0; i < healthArr.length; i++) {
        let current = healthArr[i];
        remaining -= current;
        let experienceGainByEat = remaining, experienceGainByBattle = health * current;
        if (experienceGainByEat > experienceGainByBattle)
            health++;
        else
            experience += health * current;
    }

    return experience.toString();
}

function main() {
    let inputs = [`1
    3
    3 2 2`, `1
    3
    3 2 5`];

    for (let i = 0; i < inputs.length; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10), H = lines[index++].split(' ').map(HTemp => parseInt(HTemp, 10));

            let result = mandragora(H);
            console.log(result + "\n");
        }
    }
}
