'use strict'

// find Greatest Common Divisor between 2 numbers
function gcd(smaller, bigger, obj) {
    if (smaller === 0) {
        obj.x = 0;
        obj.y = 1;
        return bigger;
    }

    let gcdResult = gcd(bigger % smaller, smaller, obj);

    // Update x and y using results of recursive 
    // call 
    let newX = obj.y - Math.floor(bigger / smaller) * obj.x;
    let newY = obj.x;

    obj.x = newX;
    obj.y = newY;

    return gcdResult;
}

let numbers = [[30, 20], [10, 35], [31, 2], [3, 9], [16, 24]];
for (let i = 0; i < numbers.length; i++) {
    let n1 = numbers[i][0], n2 = numbers[i][1], obj = {}, smaller =Math.min(n1, n2) , bigger= Math.max(n1, n2);
    let result = gcd(smaller,bigger, obj);
    console.log(`GCD result ${result} = ${obj.x} * ${smaller} + ${obj.y} * ${bigger}`);
}


