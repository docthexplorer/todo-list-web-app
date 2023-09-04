import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const days = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"];
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
const data = {
    date: new Date().getDate(),
    day: days[new Date().getDay()],
    month: months[new Date().getMonth()]
};
const todaysDate = `${data.day}, ${data.month} ${data.date}`;

let todoToday = [];
let todoWork = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) =>{
    res.render("index.ejs",{titleDate: todaysDate});
});

app.get("/work", (req,res) =>{
    res.render("work.ejs");
});

app.post("/", (req,res) =>{
    todoToday.push(req.body["NewItem"]);
    console.log(todoToday);
    res.render("index.ejs", {todoListToday: todoToday, titleDate: todaysDate});
});

app.post("/work", (req,res) =>{
    todoWork.push(req.body["NewItem"]);
    console.log(todoWork);
    res.render("work.ejs", {todoWorkList: todoWork});
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});