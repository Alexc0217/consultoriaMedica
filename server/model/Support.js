const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    question: {type: String, required: true},
    createdAt: {
            type: Date,
            default: new Date()
        }
})

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;