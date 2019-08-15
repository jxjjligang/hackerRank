'use strict'

// Based on the C++ code from Editorial of [Min Max Riddle]
function largestRectangle(h) {
    let hIndexStack = [], height = h.slice();
    height.push(0);     // so that it can pop up all the left-values out of hIndexStack
    hIndexStack.empty = function () {
        return hIndexStack.length === 0;
    };

    hIndexStack.back = function () {
        return hIndexStack[hIndexStack.length - 1];
    };

    let maxArea = 0, rightIndex = 0;
    while (rightIndex < height.length) {
        if (hIndexStack.empty() || height[rightIndex] > height[hIndexStack.back()]) {
            hIndexStack.push(rightIndex);
            rightIndex++;
        }
        else {
            let peakHeightIndex = hIndexStack.back();
            hIndexStack.pop();

            maxArea = Math.max(maxArea, height[peakHeightIndex] * (hIndexStack.empty() ? rightIndex : rightIndex - hIndexStack.back() - 1));
        }
    }

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