'use strict'
// Complete the maximumToys function below.
function maximumToys(prices, k) {
    prices.sort((a, b) => a - b);
    let count = 0, sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
        if (sum > k)
            return i;
    }
    return prices.length;
}

main();
function main() {
    let input = `7 50
    1 12 5 111 200 1000 10`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10), prices = lines[index++].split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    let result = maximumToys(prices, k);
    console.log(result + "\n");
}