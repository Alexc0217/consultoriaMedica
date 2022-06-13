const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    type: {type: String, required: false, default: "user"},
    password: {type: String, required: true},
    schedule: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: false},
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;