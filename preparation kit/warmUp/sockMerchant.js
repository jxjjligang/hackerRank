'use strict'

function sockMerchant(n, ar) {
    let countArr = [];
    for (let i = 0; i < ar.length; i++) {
        let color = ar[i];
        if (!countArr[color])
            countArr[color] = 1;
        else
            countArr[color]++;
    }

    let count = 0;
    for (let i = 0; i < countArr.length; i++) {
        if (countArr[i])
            count += Math.floor(countArr[i] / 2);
    }

    return count;
}