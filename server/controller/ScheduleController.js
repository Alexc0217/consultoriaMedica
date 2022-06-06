const Schedule = require('../model/Schedule');
const async = require('../../node_modules/async');
const User = require('../model/User');
const { ObjectID } = require('bson');
const { default: mongoose } = require('mongoose');
const { findById, findOne } = require('../model/User');

exports.create = async (req, res) => {

    const userId = req.body.id;
    console.log(userId);


    const newSchedule = new Schedule({
        state: req.body.state,
        service: req.body.service,
        unit: req.body.unit,
        date: req.body.date,
        hour: req.body.hour,
        user: mongoose.Types.ObjectId(userId),
    });

    try{
        await newSchedule.save();
        const userUpdated = User.findByIdAndUpdate(userId, {schedule: newSchedule._id}).then(data =>{
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
        console.log(newSchedule);
        res.redirect('/user/my-account/' + userId);
    }catch(err){
        res.send(err);
    }
}

exports.delete = async (req, res) => {
    const scheduleId = req.params.id;
    Schedule.findByIdAndDelete(scheduleId)
    .populate('user')
    .then(dataSchedule => {
        const userUpdated = User.findByIdAndUpdate(dataSchedule.user._id, {schedule: null}).then(data =>{
            console.log(data);
            res.redirect('/user/user-page/' + data._id, {status_code: 200}, {user: data})
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        res.send(err);
    })
}

exports.schedules = async (req, res) => {
    Schedule.find().populate('user')
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.send("Não foi encontrado nenhum agendamento. ");
        })
}

