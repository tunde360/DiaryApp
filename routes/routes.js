const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const bcrypt = require('bcrypt');


const initializePassport = require("../passport-config");
initializePassport(passport);

router.get('/home', (req, res) => {
    res.render('index', {title: 'home'})
})

router.get('/register', (req, res) => {
    res.render('register', {title: 'register'});
})

router.get('/diary', (req, res) => {
    res.render('diary.ejs', {title: 'diary'});
})

router.post('/home', passport.authenticate('local', { failureRedirect: '/register'}),
function(req, res){
    res.redirect('/diary')
})

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    user.save((err) => {
        if(err){
            res.send('error saving to database')
        } else {
            console.log(user);
        }
        res.redirect('/home')
    })
})
module.exports = router;