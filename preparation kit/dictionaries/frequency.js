'use strict'


function freqQuery(queries) {
    function addNumberToMap(num2Cnt, num, cnt2Nums) {
        let cnt = 1, previousCnt;
        if (num2Cnt.has(num)) {
            previousCnt = num2Cnt.get(num);
            cnt += previousCnt;
        }
        num2Cnt.set(num, cnt);

        if (previousCnt && cnt2Nums.has(previousCnt)) {
            let numsSet = cnt2Nums.get(previousCnt);
            numsSet.delete(num);
            if (numsSet.size === 0)
                cnt2Nums.delete(previousCnt);
        }
        let numsSet = (cnt2Nums.has(cnt) ? cnt2Nums.get(cnt) : new Set());
        numsSet.add(num);
        cnt2Nums.set(cnt, numsSet);
    }

    function decreaseNumOccurence(num2Cnt, num, cnt2Nums) {
        if (num2Cnt.has(num)) {
            let cnt = num2Cnt.get(num), previousCnt = cnt;
            if (cnt > 1) {
                cnt--;
                num2Cnt.set(num, cnt);
            }
            else
                num2Cnt.delete(num);

            if (cnt2Nums.has(previousCnt)) {
                let set = cnt2Nums.get(previousCnt);
                set.delete(num);
                if (set.size === 0)
                    cnt2Nums.delete(previousCnt);
            }

            let countKey = previousCnt - 1;
            if (countKey > 0) {
                let numsSet = (cnt2Nums.has(countKey) ? cnt2Nums.get(countKey) : new Set());
                numsSet.add(num);
                cnt2Nums.set(countKey, numsSet);
            }
        }
    }

    let result = [], num2Cnt = new Map(), cnt2Nums = new Map();
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];
        switch (query[0]) {
            case 1:         // Insert x in your data structure. 
                addNumberToMap(num2Cnt, query[1], cnt2Nums)
                break;
            case 2:         // Delete one occurence of y from your data structure, if present. 
                decreaseNumOccurence(num2Cnt, query[1], cnt2Nums);
                break;
            case 3:         // Check if any integer is present whose frequency is exactly . If yes, print 1 else 0.
                result.push(cnt2Nums.has(query[1]) ? 1 : 0);
                break;

            default:
                break;
        }
    }

    return result;
}

main();
function main() {
    let inputs = [`8
            1 5
            1 6
            3 2
            1 10
            1 10
            1 6
            2 5
            3 2`, `4
            3 4
            2 1003
            1 16
            3 1`, `10
            1 3
            2 3
            3 2
            1 4
            1 5
            1 5
            1 4
            3 2
            2 4
            3 2` ];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
        const q = parseInt(lines[index++].trim(), 10);

        let queries = Array(q);
        for (let i = 0; i < q; i++)
            queries[i] = lines[index++].replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));

        const ans = freqQuery(queries);
        console.log(ans.join('\n') + '\n');
    }
}
