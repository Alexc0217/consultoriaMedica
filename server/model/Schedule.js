const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, required: true},
    hour: {type: String, required: true},
    unit: {type: String, required: true}
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;