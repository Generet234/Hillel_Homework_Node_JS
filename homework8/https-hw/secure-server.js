const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("key.pem"), // private key
    cert: fs.readFileSync("cert.pem"), // certificate
}

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Захищене з'єднання працює! Дані зашифровані через TLS.")
})

server.listen(3443, () => {
    console.log('HTTPS-сервер запущено: https://localhost:3443')
});