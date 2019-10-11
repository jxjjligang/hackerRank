'use strict'

main();

function gamingArray(arr) {
    let objs = arr.map((element, index) => {
        let obj = { ele: element, idx: index }
        return obj;
    });
    objs.sort((a, b) => a.ele - b.ele);

    let arrCopy = arr.slice(), bobWin = true;
    let prevObj = objs[objs.length - 1], objIndex = objs.length - 1;
    while (true) {
        if (prevObj.idx === 0)
            break;

        while (objIndex > 0) {
            objIndex--;
            if (objs[objIndex].idx < prevObj.idx) {
                prevObj = objs[objIndex];
                break;
            }
        }

        bobWin = !bobWin;
    }

    return bobWin ? 'BOB' : 'ANDY';
}

function main() {
    let inputs = [`2
    5
    5 2 6 3 4
    2
    3 1`, `2
    5
    1 3 5 7 9
    5
    7 4 6 5 9`];    // expects 23, 110
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const g = parseInt(lines[index++].trim(), 10);
        for (let gItr = 0; gItr < g; gItr++) {
            const arrCount = parseInt(lines[index++].trim(), 10);
            const arr = lines[index++].replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

            const result = gamingArray(arr);
            console.log(result);
        }

        console.log('\n-----------------------------------');
    }
}