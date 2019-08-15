'use strict'

// Based on the idea from Editorial of [Min Max Riddle]
function largestRectangle(h) {
    let s = [], n = h.length;
    s.empty = function () {
        return;
    };
    s.top = function () {
        return s[s.length - 1];
    }

    let left = [], right = [];
    for (let i = 0; i < n; ++i) {
        left[i] = -1;
        right[i] = n;
    }

    for (let i = 0; i < n; ++i) {
        while (s.length !== 0 && h[s.top()] >= h[i])
            s.pop();

        if (s.length !== 0)
            left[i] = s.top();

        s.push(i);
    }

    s.length = 0;
    for (let i = n - 1; i >= 0; --i) {
        while (!s.empty() && h[s.top()] >= h[i])
            s.pop();

        if (s.length !== 0)
            right[i] = s.top();

        s.push(i);
    }

    let maxArea = 0;
    for (let i = 0; i < n; i++)
        maxArea = Math.max(maxArea, h[i] * (right[i] - left[i] - 1));

    return maxArea;
}

let strArr=`1 2 3 4 5`;
console.log(countTime(largestRectangle)(strArr.split(' ').map(s => parseInt(s))));       // expects 12 2 1 1

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