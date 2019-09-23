'use strict'


// Complete the fibonacciModified function below.
function fibonacciModified(t1, t2, n) {
    let index = 3, valueOfIndex, prev = BigInt(t2), prevPrev = BigInt(t1);
    while (true) {
        valueOfIndex = prevPrev + prev * prev;
        if (index === n)
            return valueOfIndex.toString();
        else    
            console.log(`index:${index}, valueOfIndex:${valueOfIndex}`);

        index++;
        prevPrev = prev;
        prev = valueOfIndex;
    }
}

main();
function main() {
    let input = `0 1 10`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const t1T2n = lines[index++].split(' ');

    const t1 = parseInt(t1T2n[0], 10), t2 = parseInt(t1T2n[1], 10), n = parseInt(t1T2n[2], 10);

    let result = fibonacciModified(t1, t2, n);
    console.log(result + "\n");
}