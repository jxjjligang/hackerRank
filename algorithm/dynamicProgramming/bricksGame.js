'use strict'

main();

function bricksGame(arr) {
    const ARR_LENGTH = arr.length;

    function getBriks(isFirstPlayer, index) {
        if (ARR_LENGTH - index <= 3) {
            if (isFirstPlayer) {
                let total = 0;
                for (let i = index; i < ARR_LENGTH; i++)
                    total += arr[i];

                return total;
            }
            else
                return 0;
        }

        let maxValue = Number.MIN_SAFE_INTEGER;
        if (isFirstPlayer) {
            let partialResult = getBriks(false, index + 1);
            if (arr[index] + partialResult > maxValue)
                maxValue = arr[index] + partialResult;

            partialResult = getBriks(false, index + 2);
            if (arr[index] + arr[index + 1] + partialResult > maxValue)
                maxValue = arr[index] + arr[index + 1] + partialResult;

            partialResult = getBriks(false, index + 3);
            if (arr[index] + arr[index + 1] + arr[index + 2] + partialResult > maxValue)
                maxValue = arr[index] + arr[index + 1] + arr[index + 2] + partialResult;

            return maxValue;
        }
        else {
            let partialResult = getBriks(true, index + 1), maxPartial;
            if (arr[index] - partialResult > maxValue) {
                maxValue = arr[index] - partialResult;
                maxPartial = partialResult;
            }

            partialResult = getBriks(true, index + 2);
            if (arr[index] + arr[index + 1] - partialResult > maxValue) {
                maxValue = arr[index] + arr[index + 1] - partialResult;
                maxPartial = partialResult;
            }

            partialResult = getBriks(true, index + 3);
            if (arr[index] + arr[index + 1] + arr[index + 2] - partialResult > maxValue) {
                maxValue = arr[index] + arr[index + 1] + arr[index + 2] - partialResult;
                maxPartial = partialResult;
            }
            return maxPartial;
        }
    }

    return getBriks(true, 0);
}

function main() {
    let inputs = [`3
    10
    321 386 740 595 161 176 606 64 577 316
    10
    267 744 264 372 943 683 506 607 504 441
    10
    3 559 416 40 263 747 634 135 817 34`,
        `2
  5
  999 1 1 1 0
  5
  0 1 1 1 999`];
    for (let i = 0; i < 1; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const arrCount = parseInt(lines[index++], 10);
            const arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

            let result = bricksGame(arr);
            console.log(result + "\n");
        }
    }
}