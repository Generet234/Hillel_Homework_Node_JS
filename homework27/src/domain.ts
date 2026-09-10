export interface User {
    readonly id: number;
    readonly createdAt: Date;
    email: string;
    phone?: string;
    role: 'admin' | 'user' | 'guest';
    preferences?: {
        emailEnabled?: boolean;
        smsEnabled?: boolean;
    }
}

interface Admin extends User {
    permissions: readonly string[];
    role: "admin"
}

const admin: User = {
    id: 3,
    createdAt: new Date(),
    email:'i.a.sadovoy@gmail.com',
    phone: "+38 098 88 888 88",
    role:"admin",
    preferences:{
        emailEnabled:true,
        smsEnabled:true,
    }
}
console.log(admin)


const guest: User = {
    id: 2,
    createdAt: new Date(),
    email:'ivansadovoy2008@gmail.com',
    role:"admin",
}
console.log(guest)

type WithStringId = {
    id: string,
    label:string
}

type WithNumberId = {
    id: number,
    count: number
}

type Broken = WithStringId & WithNumberId

type SafeMerge = Omit<WithStringId, 'id'> & WithNumberId
// const guest5 : Broken = {
//     id:4,
//     label:'haha',
//     count:5
// };
// Type number is not assignable to type never
// console.log(guest5)

const guest6 : SafeMerge = {
    id:4,
    label:'haha',
    count:5
};

// const guestError1: User = {
//     id: 2,
//     role:"admin",
// }
// Type { id: number; role: "admin"; } is missing the following properties from type User: createdAt, emai
//
// const guestError2: User = {
//     id: 2,
//     createdAt: new Date(),
// }
// Type { id: number; createdAt: Date; } is missing the following properties from type User: email, rol
//
// const guestError3: User = {
//     email:'ivansadovoy2008@gmail.com',
//     role:"admin",
// }
// Type { email: string; role: "admin"; } is missing the following properties from type User: id, createdAt