const taskService = require('./modules/taskService.js');
const taskFormatter = require("./modules/taskFormatter.js");
const fileStorage = require('./modules/fileStorage.js');
const myEmitter = require("./modules/eventLogger.js");
const systemInfo = require("./modules/systemInfo.js");
const path = require("path")
const http = require("http")
const fs = require("fs/promises")
const crypto = require("crypto");

async function main(){
    const filePath = path.join(__dirname, 'data', 'tasks.json')
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let data = JSON.parse(fileContent);
    const server = http.createServer((req, res) => {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const pathname = parsedUrl.pathname;
        const parts = parsedUrl.pathname.split('/');
        const query = parsedUrl.searchParams.get('status');
        console.log(pathname);
        const foundId = data.filter((item) => item.id === parts[2])
        if(pathname === '/' && req.method === 'GET'){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end('<h1>Study Task Tracker API</h1>')
        }
        else if(pathname === '/tasks' && req.method === 'GET'){
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(data))
        }
        else if(query && req.method === 'GET'){
            res.writeHead(200, {'Content-Type': 'application/json'})
            const isCompleted = query === 'completed';
            const filteredData = data.filter(item => item.status === isCompleted)
            res.end(JSON.stringify(filteredData))
        }
        else if(query && req.method === 'GET'){
            res.writeHead(200, {'Content-Type': 'application/json'})
            const isCompleted = query === 'active';
            const filteredData = data.filter(item => item.status === isCompleted)
            res.end(JSON.stringify(filteredData))
        }
        else if(pathname === `/tasks` && req.method === 'POST'){
            const time = new Date()
            const task = {
                id: data.length + 1,
                title: 'Hello World',
                status: 'active',
                hash:  crypto.createHash('sha256').update(time).digest('hex'),
                createdAt: new Date().toLocaleString('uk-UA')
            };
                data = {
                    task: task,
                    ...data
                }
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(data))
        }
        else if(pathname === `/tasks/${foundId.id}` && req.method === 'POST'){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(foundId))
        }
        else{
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({ error: 'Task not found' }))
        }
    })
    server.listen(3000, () => {
        console.log('Сервер працює на порту 3000');
    })
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
