const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true, index: {unique: true}},
    email: {type: String, required: true, index: {unique: true}},
    type: {type: String, required: false, default: "user"},
    password: {type: String, required: true},
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;