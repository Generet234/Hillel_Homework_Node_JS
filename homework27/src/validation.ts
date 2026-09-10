import {describe, NotificationPayload} from './payload'
type Channel = "push" | 'sms' | 'email'
type Priority = "low" | "normal" | "high"

function isNotificationPayload(value: unknown):value is NotificationPayload{

    if(value === null || typeof value !== "object"){
        return false;
    }
    const result = value as Record<string,unknown>
    const channel : Channel[] = ["push" , 'sms' , 'email']
    const priority : Priority[] = ["low" , 'normal' , 'high']

    if(!result.to){
        return false;
    }
    if(!result.text || typeof result.text !== "string"){
        return false;
    }
    if(!result.channel || typeof result.channel !== "string" || !channel.includes(result.channel as Channel) ){
        return false;
    }
    if(!result.priority || typeof result.priority !== "string" || !priority.includes(result.priority as Priority) ){
        return false;
    }
    return true;
}

function handleIncoming(raw:unknown) {
    if(isNotificationPayload(raw)){
        console.log(raw.channel)
        describe(raw)
    }
}

handleIncoming({ channel: "sms", to: "+380...", text: "hi", priority: "low" });  // валідно
handleIncoming({ channel: "sms", to: "+380...", priority: "low" });              // немає text
handleIncoming({ channel: "carrier-pigeon", text: "hi" });                       // невідомий канал
handleIncoming(null);                                                            // не впасти!
handleIncoming("просто рядок");                                                  // теж не впасти
