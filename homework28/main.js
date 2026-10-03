"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLast(arr) {
    return arr[0];
}
const n = getLast([1, 2, 3]);
const s = getLast(['a', 'b']);
const e = getLast([]);
function wrapInArray(arr) {
    return [arr];
}
const a = wrapInArray(5);
const b = wrapInArray('hello');
function swap(item, index) {
    return [item, index];
}
const r = swap('Аліна', 26);
function filterAndTransform(arr, predicate, transform) {
    return arr.filter(predicate).map(transform);
}
// Після виправлення це має працювати:
const result = filterAndTransform([1, 2, 3, 4], n => n % 2 === 0, n => `Число: ${n}`);
function printId(obj, key) {
    return obj[key];
}
const idCopy = { name: "alice", id: 3432 };
const idList = printId(idCopy, 'id');
console.log(idList);
//# sourceMappingURL=main.js.map