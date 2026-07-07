const taskService = require('./modules/taskService.js');
const taskFormatter = require("./modules/taskFormatter.js");
const fileStorage = require('./modules/fileStorage.js');

async function main(){
    await fileStorage.initStorage()
    let tasks = await fileStorage.readTasks()

    tasks = taskService.addTask(tasks,'Learn Node.js modules')
    tasks = taskService.addTask(tasks,"Practice fs module")
    tasks = taskService.addTask(tasks,"Build a CLI tool")

    await fileStorage.saveTasks(tasks)


    tasks.forEach((task) => {
        taskFormatter.taskFormatter(task);
    })
}
main()
