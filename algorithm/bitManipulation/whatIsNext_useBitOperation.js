'use strict'

main();

/*
 * Complete the whatsNext function below.
 */
function whatsNext(bigIntArr) {
    function bigIntPower(oneCount) {
        let two = 2n, result = 1n;
        while (oneCount > 0n) {
            result *= two;
            oneCount--;
        }

        return result - 1n;
    }

    function getArray(bigInt) {
        let bitsArray = [];
        let prevCount = 1n, prevBit = bigInt & 1n, isOne = (prevBit === 1n);
        while (bigInt > 0n) {
            bigInt = bigInt >> 1n;
            let currentBit = bigInt & 1n;
            if (currentBit === prevBit)
                prevCount++;
            else {
                bitsArray.push(prevCount);
                prevBit = currentBit;
                prevCount = 1n;
            }
        }

        return bitsArray.reverse();
    }

    let number;
    let values = bigIntArr.map((element, index) => {
        if (index % 2 === 0)
            return bigIntPower(element);
        else
            return 0n;
    });

    let finalValue = values[0];
    for (let i = 1; i < values.length; i++) {
        finalValue = finalValue << bigIntArr[i];
        finalValue |= values[i];
    }

    let index = 0n, shiftRight = finalValue, prevBit = shiftRight & 1n, currentBit;
    while (true) {
        shiftRight = shiftRight >> 1n;
        currentBit = shiftRight & 1n;
        index++;
        if (currentBit === 0n && prevBit === 1n)
            break;

        prevBit = currentBit;
    }

    let oneZero = 1n;
    oneZero = oneZero << index;
    finalValue |= oneZero;
    oneZero = oneZero >> 1n;
    finalValue -= oneZero;

    let bitsArray = getArray(finalValue);
    console.log(bitsArray.length);
    console.log(bitsArray.join(' '));
}

function main() {
    let inputs = [`1
    6
    1 9857 3569 6225 7042 1`,
        `1
    5
    4 1 3 2 4`];

    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const arrCount = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => BigInt(arrTemp));

            whatsNext(arr);
        }
    }
}