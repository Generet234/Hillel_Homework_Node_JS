const taskService = require('./modules/taskService.js');
const taskFormatter = require("./modules/taskFormatter.js");
const fileStorage = require('./modules/fileStorage.js');
const myEmitter = require("./modules/eventLogger.js");
const systemInfo = require("./modules/systemInfo.js");

async function main(){
    myEmitter.emit('appStarted');
    systemInfo.systemInfo()
    await fileStorage.initStorage()
    let tasks = await fileStorage.readTasks()

    tasks = taskService.addTask(tasks,'Learn Node.js modules')
    tasks = taskService.addTask(tasks,"Practice fs module")
    tasks = taskService.addTask(tasks,"Build a CLI tool")

    myEmitter.emit('taskCreated', tasks[0]);
    await fileStorage.saveTasks(tasks)
    myEmitter.emit('taskDeleted', tasks[1]);

    tasks.forEach((task) => {
        taskFormatter.taskFormatter(task);
    })
}
main()
