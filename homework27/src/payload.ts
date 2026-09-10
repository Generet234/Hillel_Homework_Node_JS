const CHANNELS = ["email", "sms", "push", "telegram"] as const;
type Channel = typeof CHANNELS[number];
const channels : Channel[] = ["email", "sms", "push", "telegram"];
interface Email{
    to:string;
    channel: "email";
    subject:string;
    body:string;
    attachments?:string[];
    priority: "low" | "normal" | "high"
}
interface Sms{
    channel:"sms";
    to:string;
    text:string;
    priority: "low" | "normal" | "high"
}
interface Push{
    channel:"push";
    deviceToken:string;
    title:string;
    body:string;
    badge?:string;
    priority: "low" | "normal" | "high"
}
interface Telegram{
    channel:"telegram";
    chatId:string;
    text:string;
}

export type NotificationPayload = Email | Sms | Push | Telegram

function describe(payload: NotificationPayload)  {
    console.log(payload);
    switch(payload.channel) {
        case "sms":
            // return payload.subject;
            return channels[1];
            case "push":
                return channels[2];
                case "email":
                    return channels[0];
                    case "telegram":
                        return channels[3];
                    default: {
                        const exhaustive: never = payload;
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

export {describe}