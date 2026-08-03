"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let arr = [1, 2, 3, 2, 4];
function reverseArray(array) {
    let reserved = [];
    for (let i = array.length - 1; i >= 0; i--) {
        let val = array[i];
        if (val !== undefined) {
            reserved.push(val);
        }
    }
    return reserved;
}
console.log(reverseArray(arr));
//# sourceMappingURL=function.js.map