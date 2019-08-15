'use strict'

function riddle(arr) {
    let s = [], n = arr.length;
    s.empty = function () {
        return ;
    };
    s.top = function () {
        return s[s.length - 1];
    }

    let left = [], right = [], answers = [], len;
    for (let i = 0; i < n; ++i) {
        left[i] = -1;
        right[i] = n;
    }

    for (let i = 0; i < n; ++i) {
        while (s.length !== 0 && arr[s.top()] >= arr[i])
            s.pop();

        if (s.length !== 0)
            left[i] = s.top();

        s.push(i);
    }

    s.length = 0;
    for (let i = n - 1; i >= 0; --i) {
        while (!s.empty() && arr[s.top()] >= arr[i])
            s.pop();

        if (s.length !== 0)
            right[i] = s.top();

        s.push(i);
    }

    for (let i = 0; i <= n; i++)
        answers[i] = 0;
    for (let i = 0; i < n; ++i) {
        len = right[i] - left[i] - 1;
        answers[len] = Math.max(answers[len], arr[i]);
    }

    for (let i = n - 1; i >= 1; --i)
        answers[i] = Math.max(answers[i], answers[i + 1]);

    return answers.slice(1);
}

main();

function main() {

    let strArr = '2 6 1 12';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 12 2 1 1

    strArr = '1 2 3 5 1 13 3';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 13 3 2 1 1 1 1

    strArr = '3 5 4 7 6 2';
    // console.log(solve(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 7 6 4 4 3 2

    strArr = '11 2 3 14 5 2 11 12';

    strArr = '3 2 1';
 
    strArr = `789168277 694294362 532144299 20472621 316665904 59654039 685958445 925819184 371690486 285650353 522515445 624800694 396417773 467681822 964079876 355847868 424895284 50621903 728094833 535436067 221600465 832169804 641711594 518285605 235027997 904664230 223080251 337085579 5125280 448775176 831453463 550142629 822686012 555190916 911857735 144603739 751265137 274554418 450666269 984349810 716998518 949717950 313190920 600769443 140712186 218387168 416515873 194487510 149671312 241556542 575727819 873823206`;
    console.log(countTime(riddle)(strArr.split(' ').map(s => parseInt(s))).join(' ') + '\n');       // expects 12 2 1 1

}

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}