"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let deepness = 3;
function createTree(recursive) {
    if (recursive <= 0)
        return null;
    return { value: recursive, child: createTree(recursive - 1) };
}
console.log(JSON.stringify(createTree(deepness), null, 2));
//# sourceMappingURL=function.js.map