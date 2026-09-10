"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describe(payload) {
    console.log(payload);
    switch (payload) {
        case "sms":
            // return payload.subject;
            return "sms";
        case "push":
            return "push";
        case "email":
            return "email";
        default: {
            const exhaustive = payload;
            throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`);
        }
    }
}
// const Lolka = {
//     channel:"telegram",
//     id:3,
//     text:"haha"
// }
// describe(Lolka)
//The intersection NotificationPayload was reduced to never because property channel has conflicting types in some constituents
//# sourceMappingURL=payload.js.map