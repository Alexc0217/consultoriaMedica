const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    state: {type: String, required: true},
    service: {type: String, required: true},
    unit: {type: String, required: true},
    date: {type: Date, required: true},
    hour: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;