const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
})

const User = mongoose.model('User', userSchema);

module.exports = User;