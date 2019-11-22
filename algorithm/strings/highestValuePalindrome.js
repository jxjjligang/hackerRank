'use strict'

main();

// Complete the highestValuePalindrome function below.
function highestValuePalindrome(s, n, k) {
    const STR_LEN = s.length, INPOSSIBLE_RESULT = -1, STR_HALF_LEN = Math.floor(STR_LEN / 2), CHAR_NINE = '9';

    // find the minimum changes required to make n a palindrome
    function getMinimumChanges(str) {
        let halfLen = Math.floor(STR_LEN / 2), min = 0;
        for (let i = 0; i < halfLen; i++) {
            let left = str[i], right = str[STR_LEN - 1 - i];
            if (left !== right)
                min++;
        }

        return min;
    }

    function makePalindrome(str, chancesFor9) {
        let charArr = str.split(''), remainChances = chancesFor9;
        for (let i = 0; i < STR_HALF_LEN; i++) {
            let leftIndex = i, rightIndex = STR_LEN - 1 - i;
            let left = charArr[leftIndex], right = charArr[rightIndex];
            if (left !== right) {   // means in getMinimumChanges function, we already count 1 time
                if (left === CHAR_NINE || right === CHAR_NINE) {
                    charArr[leftIndex] = CHAR_NINE;
                    charArr[rightIndex] = CHAR_NINE;
                }
                else {
                    if (remainChances >= 1) {
                        charArr[leftIndex] = CHAR_NINE;
                        charArr[rightIndex] = CHAR_NINE;
                        remainChances -= 1;
                    }
                    else {
                        let bigger = (left > right ? left : right);
                        charArr[leftIndex] = bigger;
                        charArr[rightIndex] = bigger;
                    }
                }
            }
            else {  // left === right, means we did not count them in getMinimumChanges function, so if we want change both of them to 9, we need 2 more chances remained
                if (left !== CHAR_NINE && remainChances >= 2) {
                    charArr[leftIndex] = CHAR_NINE;
                    charArr[rightIndex] = CHAR_NINE;
                    remainChances -= 2;
                }
            }
        }

        if (remainChances > 0 && (STR_LEN % 2 === 1))
            charArr[STR_HALF_LEN] = CHAR_NINE;

        return charArr.join('');
    }

    if (s.length === 1)
        return k > 0 ? CHAR_NINE : s;

    let minChanges = getMinimumChanges(s);
    if (minChanges > k)
        return INPOSSIBLE_RESULT;
    else
        return makePalindrome(s, k - minChanges);
}

function main() {

    let inputs = [`5 1
    12321`,
        `2 1
    69`,
        `1 1
    5`,
        `4 1
    3943`,
        `6 3
    092282`,
        `4 1
    0011`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10), s = lines[index++];

        let result = highestValuePalindrome(s, n, k);
        console.log(result + "\n");
    }
}
