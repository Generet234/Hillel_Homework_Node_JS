const {WebSocketServer} = require("ws")

const wss = new WebSocketServer({port: 8080})
console.log("WebSocket Server started on port 8080")

wss.on("connection", (socket) => {
    console.log('Connection connected')
    socket.on('message', (data) => {
        const text = data.toString()
        const time = new Date().toLocaleTimeString('uk-UA')
        const message = `[${time}] ${text}`
        console.log(`Received ${text}`)
        wss.clients.forEach((client) => {
            client.send(message)
        })
    })
    socket.on('close', () => {
        console.log('Connection disconnected')
    })
})