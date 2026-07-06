
    let taskId = 1
    let isCompleted = false
    const tasks = []

    function addTask(title) {
        const struct = {
            id: taskId++,
            title: title,
            completed: isCompleted,
            createdAt: Date.now().toLocaleString('uk-UA'),
        }
        tasks.push(struct)
        return struct
    }

    function getTasks() {
        return tasks
    }

    function completeTask(id) {
        let foundTask = tasks.find((task) => task.id === id)
        if(foundTask) {
            foundTask.completed = !isCompleted
        }
    }

    function deleteTask(id) {
        let deletedTask = tasks.find((task) => task.id === id)
        if(deletedTask) {
            tasks.splice(deletedTask,1 )
        }
    }
    module.exports = {
        addTask,
        getTasks,
        completeTask,
        deleteTask
    }