'use strict'

/**
 * This function can't pass test case because it does not use greedy algothrim (get the best result by ensure every step gets the best result)
 */

// Complete the reverseShuffleMerge function below.
function reverseShuffleMerge(s) {
    const a_to_z = 'abcdefghijklmnopqrstuvwxyz';
    // lexically smallest
    function isCharSmallest(index, charAmountArr, taken2Amount, passed2Amount) {
        for (let i = 0; i <= index; i++) {
            if (charAmountArr[i] === 0)     // means no chars at index i
                continue;
            else {
                let maxTaken = charAmountArr[i] / 2, char = a_to_z[i];
                let takenAmount = taken2Amount.has(char) ? taken2Amount.get(char) : 0;
                let passedAmount = passed2Amount.has(char) ? passed2Amount.get(char) : 0;
                if (i < index) {
                    if (Math.max(takenAmount, passedAmount) === maxTaken)
                        continue;
                    else
                        return false;
                }
                else
                    return (takenAmount === maxTaken) ? false : true;
            }
        }

        throw Error(`Shouldn't reach here, function isCharSmallest.`);
    }

    function incrementCharAmount(map, char) {
        if (!map.has(char))
            map.set(char, 1);
        else
            map.set(char, 1 + map.get(char));
    }

    // charAmountArr used to save character count, 0 maps to character a, 1 maps to b, etc. 
    let charAmountArr = [];
    for (let i = 0; i < 26; i++)
        charAmountArr[i] = 0;

    const ASCII_CODE_A = 'a'.charCodeAt(0);
    for (let i = 0; i < s.length; i++)
        charAmountArr[s.charCodeAt(i) - ASCII_CODE_A]++;
    // charAmountArr.filter(element => element !== 0);

    const TARGET_LEN = s.length / 2;
    let targetStr = '', passed2Amount = new Map(), totalPassed = 0, taken2Amount = new Map();
    for (let i = s.length - 1; i >= 0; i--) {
        if (targetStr.length === TARGET_LEN)
            break;

        let char = s[i], charCode = s.charCodeAt(i);
        if (totalPassed === TARGET_LEN)
            targetStr += char;
        else {
            if (isCharSmallest(charCode - ASCII_CODE_A, charAmountArr, taken2Amount, passed2Amount)) {
                targetStr += char;
                incrementCharAmount(taken2Amount, char);
            }
            else {
                // check if char is eligible for passing
                let passedAmount = passed2Amount.has(char) ? passed2Amount.get(char) : 0;
                if (passedAmount < (charAmountArr[charCode - ASCII_CODE_A] / 2)) {
                    incrementCharAmount(passed2Amount, char);
                    totalPassed++;
                    continue;
                }
                else {
                    targetStr += char;
                    incrementCharAmount(taken2Amount, char);
                }
            }
        }
    }

    return targetStr;
}

main();

function main() {
    let inputs = [
        // `abcdefgabcdefg`, `aeiouuoiea`, `eggegg`, 'jjcddjggcdjd', 
        'djjcddjggbiigjhfghehhbgdigjicafgjcehhfgifadihiajgciagicdahcbajjbhifjiaajigdgdfhdiijjgaiejgegbbiigida'];
    // expects     agfedcb,          aeiou,        egg,      cgddjj

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

        const s = lines[index++];
        let result = reverseShuffleMerge(s);
        console.log(result);
    }
}