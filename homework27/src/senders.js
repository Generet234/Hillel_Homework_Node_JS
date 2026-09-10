"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailSender = async (payload) => {
    console.log(payload);
    return { ok: true, messageId: '323-34', sentAt: new Date() };
};
emailSender.isAvailable = () => true;
emailSender.channel = "email";
const smsSender = async (payload) => {
    console.log(payload);
    return { ok: true, messageId: '123-54', sentAt: new Date() };
};
smsSender.isAvailable = () => false;
smsSender.channel = "sms";
const pushSender = async (payload) => {
    console.log(payload);
    return { ok: true, messageId: '444-23', sentAt: new Date(), channel: "push" };
};
pushSender.isAvailable = () => false;
pushSender.channel = "push";
async function sendWithLogging(payload, sender, sendLogger) {
    const result = await sender(payload);
    sendLogger(result);
    return result;
}
const logger = (result) => {
    if (result.ok) {
        console.log(result.sentAt);
    }
    else {
        console.log(result.error);
    }
};
//# sourceMappingURL=senders.js.map