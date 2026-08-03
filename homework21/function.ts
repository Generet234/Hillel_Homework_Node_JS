interface Goods {
    name: string;
    price: number;
    inStock: boolean;
}
let goods: Goods = {name:"Sweets",price:300,inStock:true}


function informationAboutGoods(goods:Goods) {
    return `Goods : ${goods.name}, Price: ${goods.price} UAH, in Stock: ${goods.inStock}`
}
console.log(informationAboutGoods(goods));