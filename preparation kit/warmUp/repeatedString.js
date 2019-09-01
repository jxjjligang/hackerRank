'use strict'
function repeatedString(s, n) {
    function getCount(indexArr, upperIndex) {
        let count = 0;
        for (let i = 0; i < indexArr.length; i++) {
            if (indexArr[i] < upperIndex)
                count++;
        }

        return count;
    }

    let times = Math.floor(n / s.length);
    let indexesOfA = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a')
            indexesOfA.push(i);
    }

    if (times === 0)
        return getCount(indexesOfA, n);
    else
        return indexesOfA.length * times + getCount(indexesOfA, n - times * s.length);
}