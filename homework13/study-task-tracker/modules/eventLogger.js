const EventEmitter = require("events")
const fs = require('fs')
const path = require("path")
const myEmitter = new EventEmitter()
const eventsLog = path.join(__dirname, '..', 'data', 'events.log')
const crypto = require("crypto")

myEmitter.on('taskCreated', (task) => {
    const time = new Date().toLocaleString("uk-UA")
    console.log( time + " | taskCreated" + ` | Task ${task.title} was created`)
    fs.appendFile(eventsLog, time + " | taskCreated" + ` | Task ${task.title} was created`,"utf-8" , (error) => {
        if(error){
            console.error(error)
        }
    })
    const hash = crypto.createHash('sha256').update(`${task.id}-${task.title}-${task.createdAt}`).digest('hex');
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    fs.readFile(filePath, 'utf-8',(error, data) => {
        let tasks = []
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (e) {
                console.error("Ошибка парсинга JSON (файл поврежден):", e);
                return;
            }
        }
        const index = tasks.findIndex(taskFind => taskFind.id === task.id)

        if(index !== -1) {
            tasks[index] = {...tasks[index], hash:hash}
            fs.writeFile(filePath,JSON.stringify(tasks), "utf-8", (error) => {
                if(error){
                    console.error(error)
                }
            })
        }
    })
})
myEmitter.on('taskCompleted', (task) => {
    const time = new Date().toLocaleString("uk-UA")
    console.log( time + " | taskCompleted" + ` | Task ${task.title} was completed`)
    fs.appendFile(eventsLog,  time + " | taskCompleted" + ` | Task ${task.title} was completed`,"utf-8" , (error) => {
        if(error){
            console.error(error)
        }
    })
    const hash = crypto.createHash('sha256').update(`${task.id}-${task.title}-${task.createdAt}`).digest('hex');
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    fs.readFile(filePath, 'utf-8', (error, data) => {
        let tasks = []
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (e) {
                console.error("Ошибка парсинга JSON (файл поврежден):", e);
                return;
            }
        }
        const index = tasks.findIndex(taskFind => taskFind.id === task.id)

        if(index !== -1) {
            tasks[index] = {...tasks[index], hash:hash}
            fs.writeFile(filePath,JSON.stringify(tasks), "utf-8", (error) => {
                if(error){
                    console.error(error)
                }
            })
        }
    })
})
myEmitter.on('taskDeleted', (task) => {
    const time = new Date().toLocaleString("uk-UA")
    console.log( time + " | taskDeleted" + ` | Task ${task.title} was deleted`)
    fs.appendFile(eventsLog, time + " | taskDeleted" + ` | Task ${task.title} was deleted`, "utf-8" ,(error) => {
        if(error){
            console.error(error)
        }
    })
    const hash = crypto.createHash('sha256').update(`${task.id}-${task.title}-${task.createdAt}`).digest('hex');
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    fs.readFile(filePath, 'utf-8', (error, data) => {
        let tasks = []
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (e) {
                console.error("Ошибка парсинга JSON (файл поврежден):", e);
                return;
            }
        }
        const index = tasks.findIndex(taskFind => taskFind.id === task.id)

        if(index !== -1) {
            tasks[index] = {...tasks[index], hash:hash}
            fs.writeFile(filePath,JSON.stringify(tasks), "utf-8", (error) => {
                if(error){
                    console.error(error)
                }
            })
        }
    })
})
myEmitter.on('appStarted', () => {
    const time = new Date().toLocaleString("uk-UA")
    console.log( time + " | appStarted" + ` | App was started`)
    fs.writeFile(eventsLog, time + " | appStarted" + ` | App was started`,"utf-8" , (error) => {
        if(error){
            console.error(error)
        }
    })
})

module.exports = myEmitter;