let numbers: number[] = [4,2,3,4]


function averageNumber(array: number[]): number {
    return array.reduce((a, b) => a + b)/array.length;
}
console.log(averageNumber(numbers));