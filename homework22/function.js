"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let number = { deepness: 4 };
function createTree(recursive) {
    if (recursive.deepness <= 0)
        return null;
    return { value: recursive.deepness, child: createTree({ deepness: recursive.deepness - 1 }) };
}
console.log(JSON.stringify(createTree(number), null, 2));
//# sourceMappingURL=function.js.map