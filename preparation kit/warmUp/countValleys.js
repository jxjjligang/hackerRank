'use strict'

function countingValleys(n, s) {
    let valleys = 0, prevLevel = 0, currentLevel = 0;
    for (let i = 0; i < s.length; i++) {
        let upOrDown = s[i];
        if (upOrDown === 'D')
            currentLevel--;
        else
            currentLevel++;

        if (prevLevel === 0 && currentLevel === -1)
            valleys++;
        prevLevel = currentLevel;
    }

    return valleys;
}