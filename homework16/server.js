const express = require('express');
const app = express();
const dust = require('adaro')
const path = require('path');

app.engine('dust', dust.dust())
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, "views"));
app.engine('dustFound', dust.dust())
app.set('not found', 'dustFound');
app.set('notFound', path.join(__dirname, "views"));
app.engine('dustStudent', dust.dust())
app.set('student', 'dustStudent');
app.set('student', path.join(__dirname, "views"));

app.use(express.json())

app.use((req,res,next) => {
    const time = new Date().toLocaleString('uk-UA')
    console.log(`${req.method} ${req.url} - ${time}`);
    next();
})

app.get('/profile', (req, res) => {
    res.render('profile', {name: `Іван`, role: 'Студент курсу Node.js',hobbies: ['хобі 1', 'хобі 2', 'хобі 3'], isOnline: false});
})

app.get('/students', (req, res) => {
    res.render('students', {students: [{ name: 'Оля', level: 'junior' }, { name: 'Максим', level: 'middle' }, { name: 'Ірина', level: 'senior' }]});
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
    else {
        return res.status(400).send("The name field is required");
    }
})

app.get("/search", (req, res) => {
    const query = req.query.q;
    if (query) res.send(`You are looking for: ${query}`);
    else {
        res.send(`You do not mention search request`);
        return res.status(400).send("Bad request");
    }
})

app.get("/user/:id/orders", (req, res) => {
    const status = req.query.status;
    const id = req.params.id;
    if (status && id) res.send(`User order ${id} with status ${status}`);
    else {
        res.send(`You do not mention id/orders in your search request`);
        return res.status(404).send("Id or order do not Found");
    }
})

app.use((req, res) => {
    res.status(404).render('notFound', { url: req.url });
})

app.use(express.static("public"));

app.get('/crash', (req, res) => {
    throw new Error('Test error')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong")
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})