'use strict'

// the result >= Max(v1,v2) <= v1+v2;
function andXorOr(v1, v2) {
    // return (v1 & v2) & (v1 ^ v2) ^ (v1 | v2);
    return (v1 & v2) & (v1 ^ v2) ^ (v1 | v2);
}

console.log(andXorOr(2, 3));
console.log(andXorOr(6, 9));
console.log(andXorOr(6, 2));
console.log(andXorOr(91, 9));
console.log(andXorOr(3, 7));
console.log(andXorOr(11, 67));
console.log(andXorOr(37, 81));