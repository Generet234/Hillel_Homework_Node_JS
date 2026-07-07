const fs = require('fs/promises')
const path = require('path')
async function readTasks(){
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    const data = await fs.readFile(filePath, 'utf-8');
    if(data.length > 0 && data.trim() !== ''){
        return JSON.parse(data)
    }
    else{
        return []
    }
}

async function saveTasks(tasks){
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    await fs.writeFile(filePath,JSON.stringify(tasks), "utf-8")
}

async function initStorage(){
    const filePath = path.join(__dirname, '..', 'data', 'tasks.json')
    const directoryPath = path.join(__dirname, '..', 'data')
    await fs.mkdir(directoryPath, { recursive: true })
    if (fs.existsSync(filePath)) {
        await fs.access(filePath)
    } else {
        await fs.writeFile(filePath, JSON.stringify([]))
    }
}
module.exports = {
    initStorage,
    saveTasks,
    readTasks,
}