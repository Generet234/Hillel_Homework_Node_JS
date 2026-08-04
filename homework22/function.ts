
let deepness: number = 3


function createTree(recursive: number): object | null {
    if(recursive <= 0) return null;
    return {value: recursive, child:createTree(recursive - 1)}
}
console.log(JSON.stringify(createTree(deepness), null, 2));