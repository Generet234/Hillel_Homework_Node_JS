interface Number {
    deepness: number;
}
let number: Number = {deepness:4 }


function createTree(recursive:Number): object | null {
    if(recursive.deepness <= 0) return null;
    return {value: recursive.deepness, child:createTree({deepness: recursive.deepness - 1})}
}
console.log(JSON.stringify(createTree(number), null, 2));