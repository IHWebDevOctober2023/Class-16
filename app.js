const bcrypt = require('bcryptjs');

const saltRounds = 10;
 
const plainPassword1 = 'HelloWorld';
const plainPassword2 = 'helloworld';
 
const salt = bcrypt.genSaltSync(saltRounds); // generate the SALT (we need to pass the number of salts)
// Now Bcrypt is ready to hash the password with this salt

const salt2 = bcrypt.genSaltSync(3) // we can generate a different salt but that's not common
 
console.log(`Salt => ${salt}`); // We are already getting a weird string here
 
const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt2);

console.log(`ENCRIPTED password 1 => ${hash1}`);

const verifyPass1 = bcrypt.compareSync("HelloWorld", hash1);
const verifyPass2 = bcrypt.compareSync('some wrong password', hash1);

console.log(`When the password is correct I get THIS => ${verifyPass1}`);
console.log(`When the password is NOT correct I get THIS => ${verifyPass2}`);