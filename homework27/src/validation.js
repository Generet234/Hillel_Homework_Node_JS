"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNotificationPayload(value) {
    if (value === null || typeof value !== "object") {
        return false;
    }
    const result = value;
    const channel = ["push", 'sms', 'email'];
    const priority = ["low", 'normal', 'high'];
    if (!result.to) {
        return false;
    }
    if (!result.text) {
        return false;
    }
    if (!result.channel || typeof result.channel !== "string" || result.channel !== channel[0] || result.channel !== channel[1] || result.channel !== channel[2]) {
        return false;
    }
    if (!result.priority || typeof result.priority !== "string" || result.priority !== priority[0] || result.priority !== priority[1] || result.priority !== priority[2]) {
        return false;
    }
    return true;
}
function handleIncoming(raw) {
    isNotificationPayload(raw);
}
handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" }); // валідно
handleIncoming({ channel: "sms", to: "+380...", priority: "low" }); // немає text
handleIncoming({ channel: "carrier-pigeon", text: "hi" }); // невідомий канал
handleIncoming(null); // не впасти!
handleIncoming("просто рядок"); // теж не впасти
//# sourceMappingURL=validation.js.map