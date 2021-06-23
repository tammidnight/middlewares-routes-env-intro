// setup for express
const express = require("express");
const app = express();

require('dotenv').config()



const port = 3000;

// require some data form your data.js file
let {students, instructors, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello im the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views' )


const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')


// ROUTES DEFINED BELOW

app.get("/", (req, res) => {
    let myName = 'Manish'
    console.log (  process.env.PASSWORD  )
    res.render('landing.hbs', {name: myName, age: 19})
});

app.get('/students', (req, res) => {
    // Consuming a promise here
    getStudents()
        .then(( myStudents ) => {
            console.log(myStudents)
            let uppercaseNames = myStudents.map((student) => {
                student.name = student.name.toUpperCase()
                return student
            })
        
            res.render('students.hbs', {students: uppercaseNames})
        })
        .catch(() => {
            console.log('Students failed to fetch')
        })
})

app.get('/instructors', (req, res) => {
    // Consuming a promise here
    getTeachers()
        .then(( teachers) => {    
            res.render('instructors.hbs', {instructors: teachers, layout: false})
        })
        .catch(() => {
            console.log('Instructors failed to fetch')
        })
})

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);