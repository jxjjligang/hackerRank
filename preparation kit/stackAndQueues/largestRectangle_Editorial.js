'use strict'

// Based on the idea from Editorial
function largestRectangle(h) {
    let stack = [0], n = h.length, width = [];
    stack.empty = function () {
        return stack.length === 0;
    };
    stack.top = function () {
        return stack[stack.length - 1];
    }

    for (let index = 1; index < n; index++) {
        let height = h[index];
        while (!stack.empty() && height <= h[stack.top()]) {
            let biggerIndex = stack.top();
            width[biggerIndex] = index - (stack.length > 1 ? stack[stack.length - 2] : -1) - 1;
            stack.pop();
        }
        stack.push(index);
    }

    let stackLen = stack.length;
    for (let i = 0; i < stackLen; i++) {
        let leftIndex = (i === 0 ? -1 : stack[i - 1]), rightIndex = n, arrayIndex = stack[i];
        width[arrayIndex] = rightIndex - leftIndex - 1;
    }

    let maxArea = 0;
    for (let i = 0; i < n; i++)
        maxArea = Math.max(maxArea, h[i] * width[i]);

    return maxArea;
}

let strArr = `6320 6020 6098 1332 7263 672 9472 2838 3401 9494`;
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