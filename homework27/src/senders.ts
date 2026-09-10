import type { NotificationPayload } from './payload.ts'
type SendResult =
    | { ok: true; messageId: string; sentAt: Date }
    | { ok: false; error: string; retryable: boolean };
interface Sender {
    (payload: NotificationPayload): Promise<SendResult>;
    channel: "email" | "push" | "sms";
    isAvailable(): boolean;
}
const emailSender: Sender = async (payload) => {
    console.log(payload)
    return {ok:true, messageId: '323-34',sentAt: new Date()}
}
emailSender.isAvailable = () => true;
emailSender.channel = "email";

const smsSender: Sender = async (payload) => {
    console.log(payload)
    return {ok:true, messageId: '123-54',sentAt: new Date()}
}
smsSender.isAvailable = () => false;
smsSender.channel = "sms";

const pushSender: Sender = async (payload) => {
    console.log(payload)
    return {ok:true, messageId: '444-23',sentAt: new Date(), channel:"push"}
}
pushSender.isAvailable = () => false;
pushSender.channel = "push";

interface SendLogger {
    (sendLogger: SendResult): void
}

async function sendWithLogging(payload : NotificationPayload ,sender : Sender,sendLogger : SendLogger): Promise<SendResult> {
    const result = await sender(payload)
    sendLogger(result)
    return result
}
const logger : SendLogger = (result: SendResult): void => {
    if(result.ok){
        console.log(result.sentAt)
    }
    else {
        console.log(result.error)
    }
}