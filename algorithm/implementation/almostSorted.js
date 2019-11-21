'use strict'
main();

// Complete the almostSorted function below.
function almostSorted(arr) {
    const NO = 'no', YES = 'yes', SWAP = 'swap', REVERSE = 'reverse';

    let descendingObj, descendingObjs = [];   // object is created when descending occures
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i], previous = arr[i - 1];
        if (current < previous) {
            if (descendingObj === undefined) {
                descendingObj = { start: i - 1 };
                descendingObjs.push(descendingObj);
            }
            else {
                if (descendingObj.end !== undefined)    // we already have one descending object created, shouldn't create one more
                    return NO;
            }
        }
        else {  // current > previous
            if (descendingObj !== undefined && descendingObj.end === undefined) {
                descendingObj.end = i - 1;
                descendingObj.span = descendingObj.end - descendingObj.start + 1;
                descendingObj = undefined;
            }
        }
    }

    let descendings = descendingObjs.length;
    if (descendings === 0)
        return YES;
    else if (descendings === 1) {   // only one descendingObj created
        descendingObj = descendingObjs[0];
        if (descendingObj.end === undefined) {
        descendingObj.end = arr.length - 1;
            descendingObj.span = descendingObj.end - descendingObj.start + 1;
        }

        let prev = arr[descendingObj.start - 1] || Number.MIN_SAFE_INTEGER, next = arr[descendingObj.end + 1] || Number.MAX_SAFE_INTEGER;
        if (next > arr[descendingObj.start] && arr[descendingObj.end] > prev) {
            if (descendingObj.span <= 3) {   // like [1 9 8 11], [1 9 8 7 11]
                console.log(YES);
                console.log(`${SWAP} ${descendingObj.start + 1} ${descendingObj.end + 1}`);
                return;
            }
            else {
                console.log(YES);
                console.log(`${REVERSE} ${descendingObj.start + 1} ${descendingObj.end + 1}`);
                return;
            }
        }
        else {
            console.log(NO);
            return;
        }
    }
    else if (descendings === 2) {
        // this is the special case from test case #1
        let first = descendingObjs[0], second = descendingObjs[1];
        let firstStart = arr[first.start], firstEnd = arr[first.end];
        let sceondStart = arr[second.start], sceondEnd = arr[second.end];
        if (first.span === 2 && second.span === 2 && firstStart > sceondStart && firstStart < arr[second.end + 1]
            && sceondEnd < firstEnd && sceondEnd > arr[first.start - 1]) {
            console.log(YES);
            console.log(`${SWAP} ${first.start + 1} ${second.end + 1}`);
            return;
        }
        else {
            console.log(NO);
            return;
        }
    }
    else {
        console.log(NO);
        return;
    }
}


function main() {
    let inputs = [`100
    4104 8529 49984 54956 63034 82534 84473 86411 92941 95929 108831 894947 125082 137123 137276 142534 149840 154703 174744 180537 207563 221088 223069 231982 249517 252211 255192 260283 261543 262406 270616 274600 274709 283838 289532 295589 310856 314991 322201 339198 343271 383392 385869 389367 403468 441925 444543 454300 455366 469896 478627 479055 484516 499114 512738 543943 552836 560153 578730 579688 591631 594436 606033 613146 621500 627475 631582 643754 658309 666435 667186 671190 674741 685292 702340 705383 722375 722776 726812 748441 790023 795574 797416 813164 813248 827778 839998 843708 851728 857147 860454 861956 864994 868755 116375 911042 912634 914500 920825 979477`,
        `2  
4 2`,
        `3
3 1 2`,
        `6
1 5 4 3 2 6`];

    for (let i = 1; i < 2; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const n = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => parseInt(arrTemp, 10));

        almostSorted(arr);
        console.log(`--------------------------------------`);
    }
}