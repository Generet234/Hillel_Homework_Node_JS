function taskFormatter(task) {
    const statusText = task.completed ? "Completed" : "Failed"
    if(statusText) {
        console.log(`[${task.title} - ${task.completed}'}]`)
    }
}
module.exports = {
    taskFormatter
}