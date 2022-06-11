const axios = require('axios');
const async = require('../../node_modules/async');
const Schedule = require('../model/Schedule');
const User = require('../model/User');
const Support = require('../model/Support')

exports.homeRoutes = (req, res) => {
    res.render('index', {user: {}});
}

exports.form = (req, res) => {
    res.render('user/form', {message: '', user: {}})
}

exports.login = async (req, res) => {
    res.render('user/login', {message: '', user: {}})
}

exports.my_account = async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password');

    if(!user){
        return res.status(404).json({message: 'Usuário não encontrado', user: {}})
    }

    const schedule = await Schedule.findById(user.schedule);

    res.status(200).render('user/myAccount', {message: '', user: user, schedule: schedule});
}

exports.users = (req, res) => {
    axios.get('http://localhost:3000/api/users/')
    .then(function(response){
        console.log(response.data)
        res.render('users', {message: '', data: response.data, user: {}})
    }).catch(err => {
        res.send(err);
    })
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("update_user", {message: '', user: userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.user_page = async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id, '-password');
    res.render('user/user_page', {message: '', user: user})
}

//agendamentos

exports.schedule_form = async (req, res) => {
    const id = req.params.id;

    const states = [
        "Selecione",
        "São Paulo",
        "Rio de Janeiro",
        "Bahia"
        ];

    const services = [
        "Selecione",
        "Fisioterapia",
        "Pediatra",
        "Clínico geral",
        "Cardiologista"
    ]

    const user = await User.findById(id, '-password');
    if(user.schedule != null){
        res.redirect("http://localhost:3000/user/my-account/" + user._id)
    }

    if(!user){
        res.send("Você precisa estar logado para criar um agendamento.")
    }
    res.render('schedule/form', {message: '', user: user, states: states, services: services})
}

exports.schedules = async (req, res) => {
    axios.get('http://localhost:3000/api/schedules/')
    .then(function(response){
        res.render('schedule/schedules', {message: '', data: response.data, user: {}})
    }).catch(err => {
        res.send(err);
    })
}


// support
exports.support = async (req, res) => {
    res.render('support/support', {message: '', user: {}})
}

exports.supports = async (req, res) => {
    questions = Support.find({})
        .then((response) => {
            res.status(200).render('support/supports', {data: response, message: '', user: {}});
        }).catch((error) => {
            res.status(404).send("deu erro aqui");
        })
}


exports.page_not_found = async (req, res) => {
    res.render('error/page_not_found', {message: '', user: {}})
}