const express = require('express');
const app = express();

app.use(express.json())

app.use((req,res,next) => {
    const time = new Date().toLocaleString('uk-UA')
    console.log(`${req.method} ${req.url} - ${time}`);
    next();
})

app.get("/", (req, res) => {
    res.send("Welcome to the main page");
})

app.get("/about", (req, res) => {
    res.send("This is the ABOUT page");
})

app.get("/time", (req, res) => {
    const time = new Date().toLocaleTimeString('uk-UA')
    res.send(`The time right now is ${time}`);
})

app.get("/error", (req, res) => {
    res.status(500).send("Server Error");
})

app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    res.send(`User with ID: ${id}`);
})

app.post("/feedback", (req, res) => {
    const {name, message} = req.body
    if (name.length) res.send(`Thanks, ${name} for ${message}`);
    else res.status(400).send("The name field is required");
})

app.get("/search", (req, res) => {
    const query = req.query.q;
    if (query) res.send(`You are looking for: ${query}`);
    else {
        res.send(`You do not mention search request`);
        res.status(400).send("Bad request");
    }
})

app.get("/user/:id/orders", (req, res) => {
    const status = req.query.status;
    const id = req.params.id;
    if (status && id) res.send(`User order ${id} with status ${status}`);
    else {
        res.send(`You do not mention id/orders in your search request`);
        res.status(404).send("Id or order do not Found");
    }
})

app.use(express.static("public"));

app.get('/crash', (req, res) => {
    throw new Error('Test error')
})

app.use((req, res) => {
    res.status(404).send("Not Found")
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong")
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})