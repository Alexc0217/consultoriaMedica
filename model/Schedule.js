import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, required: true},
    hour: {type: String, required: true},
    state: {type: String, required: true}
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;