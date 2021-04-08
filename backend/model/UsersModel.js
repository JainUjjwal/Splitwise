
// console.log(dbo.collection("users"))
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    Fname: String,
    phoneNumber: String,
    lang: String,
    currency: String,
    password: String,
    imgPath: String,
    timeZone: String
})

let users = mongoose.model('users', UserSchema);
// export default users
module.exports = users