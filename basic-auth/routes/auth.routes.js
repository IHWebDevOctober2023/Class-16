// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const User = require("../models/User.model");

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

// GET route ==> to display the signup form to users
router.get("/signup", (req, res) => {
    res.render("auth/signup")
});

// POST route ==> to process form data
router.post("/signup", (req, res) => {
    // const { username, email, password } = req.body;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(passwordHash => {
           return User.create({
            email: email,
            username: username,
            passwordHash: passwordHash
           })
        })
        .then((userCreated)=>{
            console.log(userCreated);
            res.redirect("/userProfile");
        })
        .catch(error => next(error));

});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));

module.exports = router;
