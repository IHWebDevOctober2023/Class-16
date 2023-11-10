
// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
    // This is the part where we kick the user out if they are not logged in
    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    // Or we proceed to the next middleware or to display the page 
    next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

// EXAMPLE OF CUSTOM MIDDLEWARES TO CHECK IF IT's POSSIBLE ADD MORE THAN ONE
const customMiddleware1 = (req, res, next) => {
    console.log("This is the middleware 01");
    next();
}
const customMiddleware2 = (req, res, next) => {
    console.log("This is the middleware 02");
    next();
}

// multiple export, we export an object with this two functions
module.exports = {
    isLoggedIn,
    isLoggedOut, 
    customMiddleware1,
    customMiddleware2
};