const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride ('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let students = [
    { id: uuidv4(), name: "Riya",  age: 20, course: "BCA"    },
    { id: uuidv4(), name: "Parul", age: 22, course: "BBA"    },
    { id: uuidv4(), name: "Rixx",  age: 21, course: "B.Tech" },
];

// GET - (read) all students
app.get('/students', (req, res) => {
    res.render("show.ejs", {students});
});

//show form for new studnets
app.get('/students/new', (req, res) => {
    res.render("new.ejs");
});

// POST - new created student
app.post("/students", (req, res) => {
    let {name, age, course, id} = req.body;
    students.push({ id: uuidv4(), name, age, course });
    res.redirect("/students");
});

// render page for update data
app.get('/students/:id/edit', (req, res) => {
    let {id} = req.params;
    let student = students.find((s) => id === s.id);
    res.render("edit.ejs", {student});
})

//PUT / PATCH - update existed data 
app.patch('/students/:id', (req, res) => {
    let {id} = req.params;
    const { name, age, course} = req.body;
    let student = students.find((s) => id === s.id);
    student.name = name;
    student.age = age;
    student.course = course;
    res.redirect('/students');
});

//DESTROY - DELETE route 
app.delete('/students/:id', (req, res) => {
    let {id} = req.params;
    students = students.filter((p) => id !== p.id);
    res.redirect("/students");
})

app.listen(8080, () => console.log("server running on port 8080"));