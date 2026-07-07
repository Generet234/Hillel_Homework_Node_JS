
    let taskId = 1
    let isCompleted = false
    const tasks = []

    function addTask(tasks, title) {
        const duplicate = tasks.some(task => task.id === taskId)
        if(duplicate) {
            return tasks
        }
        const struct = {
            id: taskId++,
            title: title,
            completed: isCompleted,
            createdAt: new Date().toLocaleString('uk-UA'),
        }
        return [...tasks, struct]
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