// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const User = require("../models/User.model");

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const mongoose = require("mongoose");
const { isLoggedOut, isLoggedIn } = require('../middlewares/route-guard');

// GET route ==> to display the signup form to users
router.get("/signup", (req, res) => {
    res.render("auth/signup")
});

// POST route ==> to process form data
router.post("/signup", (req, res, next) => {
    // const { username, email, password } = req.body;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // make sure users fill all mandatory fields:
    if (!username || !email || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res
            .status(500)
            .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

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
        .then((userCreated) => {
            console.log(userCreated);
            res.redirect("/userProfile");
        })
        .catch(error => {
            // copy the following if-else statement
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            } else {
                next(error);
            }
        }) // close .catch()

});

// GET route ==> to display the login form to users
router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    console.log('SESSION =====> ', req.session);

    if (email === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                console.log("Email not registered. ");
                res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user;
                res.render('users/user-profile', { user });
            } else {
                console.log("Incorrect password. ");
                res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
            }
        })
        .catch(error => next(error));
});

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/');
    });
})

router.get('/userProfile', isLoggedIn, (req, res) => {
    const user = req.session.currentUser;
    res.render('users/user-profile', { user });
});

module.exports = router;
