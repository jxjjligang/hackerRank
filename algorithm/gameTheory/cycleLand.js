'use strict'

console.log(cycleLand(2));
console.log(cycleLand(3));
console.log(cycleLand(5));

// It's about [Game Theory] - Combinatorial Game Theory, I solve it in a recursive way.
// But the most performant solution is to get the mod value of N against 3. If the mod value is 0, then Jack wins, otherwise Jelly wins.
// 
// Refer https://practice.geeksforgeeks.org/problems/cycle-race/0

/**
 * 
 * @param {the distance (in km unit) from house to school} n 
 */
function cycleLand(n) {
    let totalCycles = nestedCycle(n, true, 0);

    return (isOdd(totalCycles) === true) ? 'JELLY' : 'JACK';
}

function isOdd(number) {
    return ((number % 2) === 1);
}

function nestedCycle(remaining, isJellyTurn, cycleTimes) {
    if (remaining === 0)
        return cycleTimes;

    let nextCycles = [4, 2, 1], totalCycles;
    for (let cycle of nextCycles) {
        if (remaining < cycle)
            continue;

        totalCycles = nestedCycle(remaining - cycle, !isJellyTurn, cycleTimes + 1);
        let resultIsOdd = isOdd(totalCycles);
        if (isJellyTurn && (resultIsOdd === true))
            return totalCycles;
        if (!isJellyTurn && (resultIsOdd === false))
            return totalCycles;
    }

    return totalCycles;
}


