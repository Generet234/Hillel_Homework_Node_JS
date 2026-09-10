interface Email {
    to: string;
    channel: "email";
    subject: string;
    body: string;
    attachments?: string[];
    priority: "low" | "normal" | "high";
}
interface Sms {
    channel: "sms";
    to: string;
    text: string;
    priority: "low" | "normal" | "high";
}
interface Push {
    channel: "push";
    deviceToken: string;
    title: string;
    body: string;
    badge?: string;
    priority: "low" | "normal" | "high";
}
interface Telegram {
    channel: "telegram";
    chatId: string;
    text: string;
}
export type NotificationPayload = Email & Sms & Push & Telegram;
export {};
//# sourceMappingURL=payload.d.ts.map