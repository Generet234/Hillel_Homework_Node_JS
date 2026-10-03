function getLast<T>(arr: T[]): T | undefined {
    return arr[0];
}

const n = getLast([1,2,3])
const s = getLast(['a', 'b'])
const e = getLast([])

function wrapInArray<T>(arr: T) {
    return [arr]
}
const a = wrapInArray(5)
const b = wrapInArray('hello')

function swap<T, B>(item: T, index: B): [T,B] {
    return [item, index]
}
const r = swap('Аліна',26)

function filterAndTransform<T,B>(arr: T[], predicate: (item: T) => boolean, transform: (item: T) => B): T[] | B[] {
    return arr.filter(predicate).map(transform);
}

// Після виправлення це має працювати:
const result = filterAndTransform([1, 2, 3, 4], n => n % 2 === 0, n => `Число: ${n}`);
// result: string[]

interface Id{
    id: number,
    name?: string,
    email?: string
}
function printId<T,K extends keyof T>(obj:T, key:K):T[K]  {
    return obj[key]
}

const idCopy: Id = {name:"alice", id:3432}
const idList = printId(idCopy, 'id')

console.log(idList)