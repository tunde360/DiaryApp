require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const session = require("express-session");
const passport = require("passport");

//database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', ()=> console.log("database connected"));


//middleware
app.use(express.urlencoded({extended: false})); //STUDY
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true, 
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/assets/'))

//template engine
app.set("view engine", "ejs");

//routes
app.use("", require("./routes/routes"));


app.listen(PORT, (req,res) => {
    console.log(`Server started at http://localhost:${PORT}`);
    //console.log("/public")
})