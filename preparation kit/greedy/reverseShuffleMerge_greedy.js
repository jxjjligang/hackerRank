'use strict'

/**
 * This function works because it uses greedy algothrim (get the best result by ensure every step gets the best result)
 */

// Complete the reverseShuffleMerge function below.
function reverseShuffleMerge(s) {
    const TARGET_LEN = s.length / 2;
    function createIndexMap(s) {
        let char2IdxArr = new Map();
        for (let i = 0; i < s.length; i++) {
            let char = s[i], idxArr = [];
            if (char2IdxArr.has(char))
                idxArr = char2IdxArr.get(char);
            else
                char2IdxArr.set(char, idxArr);
            idxArr.push(i);
        }

        return char2IdxArr;
    }

    // return true when choose current char and index, it still has room (enough places to place character) for other characters.
    function isEligible(index, char, char2IdxArr, char2LeftCount) {
        for (let kv of char2LeftCount) {
            let matchedC = kv[0], remainCount = kv[1], idxArr = char2IdxArr.get(matchedC);
            let toRightCount = idxArr.reduce((agg, currentIdx) => (currentIdx >= index ? ++agg : agg), 0);

            if (toRightCount < remainCount)
                return false;
        }

        return true;
    }

    s = s.split('').reverse().join('');
    let char2IdxArr = createIndexMap(s), targetStr = '', char2LeftCount = new Map();
    let sortedChars = Array.from(char2IdxArr.keys()).sort(), lastIndex = -1;
    for (let char of sortedChars)
        char2LeftCount.set(char, char2IdxArr.get(char).length / 2);

    while (true) {
        if (targetStr.length === TARGET_LEN)
            break;

        for (let i = 0; i < sortedChars.length; i++) {
            let char = sortedChars[i];
            if (!char2LeftCount.has(char))
                continue;

            let index = char2IdxArr.get(char).find(idxValue => idxValue > lastIndex);
            if (index === undefined)
                continue;

            let eligible = isEligible(index, char, char2IdxArr, char2LeftCount);
            if (eligible === true) {
                lastIndex = index;
                targetStr += char;
                let remainCount = char2LeftCount.get(char) - 1;
                if (remainCount === 0)
                    char2LeftCount.delete(char);
                else
                    char2LeftCount.set(char, remainCount);

                break;
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