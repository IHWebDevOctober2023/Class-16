const request = {
    params: {username: "Paco", password: "DogFood"}
}
// if we don't add the package express-session the session is undefined
console.log(request.session);