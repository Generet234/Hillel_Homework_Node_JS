type UserId = number & { readonly __brand:"UserId"};
type OrderId = number & { readonly __brand:"OrderId"};

function getUser(id: UserId){
    console.log(id);
}
const orderId = 42 as OrderId;
const userId = 32 as UserId;

// getUser(orderId)
// Argument of type OrderId is not assignable to parameter of type UserId
// Type OrderId is not assignable to type { readonly __brand: "UserId"; }
// Types of property __brand are incompatible.
//     Type "OrderId" is not assignable to type "UserId"
getUser(userId)

