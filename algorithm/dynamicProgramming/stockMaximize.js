'use strict'

main();


/*
 * Complete the 'stockmax' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY prices as parameter.
 */

function stockmax(prices) {
    let buySellQueue = [];
    for (let price of prices) {
        if (buySellQueue.length === 0)
            buySellQueue.push({ price: price });
        else {
            let profit = 0, days = 0;
            while (buySellQueue.length > 0) {
                let prevDay = buySellQueue[buySellQueue.length - 1];
                if (price > prevDay.price) {
                    if (prevDay.days === undefined) {
                        profit += (price - prevDay.price);
                        days++;
                    }
                    else {
                        profit += prevDay.profit;
                        profit += (1 + prevDay.days) * (price - prevDay.price);
                        days += (1 + prevDay.days);
                    }
                    buySellQueue.pop();
                }
                else
                    break;
            }
            if (profit > 0)
                buySellQueue.push({ price: price, profit: profit, days: days });
            else
                buySellQueue.push({ price: price });
        }
    }

    let totalProfit = buySellQueue.reduce((agg, cur) => {
        if (cur.profit !== undefined)
            return agg + cur.profit;
        else 
            return agg;
    }, 0);

    return totalProfit === undefined ? 0 : totalProfit;
}

function main() {
    let inputs = [`1
    5
    5 4 3 4 5`,
    `3
    3
    5 3 2
    3
    1 2 100
    4
    1 3 1 2`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++].trim(), 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++].trim(), 10);
            const prices = lines[index++].replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

            const result = stockmax(prices);
            console.log(result + '\n');
        }
    }
}