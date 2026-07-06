const taskService = require('./modules/taskService.js');
const taskFormatter = require("./modules/taskFormatter.js");

taskService.addTask('Learn Node.js modules')
taskService.addTask("Practice fs module")
taskService.addTask("Build a CLI tool")


const list = taskService.getTasks();

list.forEach((task) => {
    taskFormatter.taskFormatter(task)
})

taskService.completeTask(2)
taskService.deleteTask(3)

const updatedList = taskService.getTasks();

updatedList.forEach((task) => {
    taskFormatter.taskFormatter(task)
})