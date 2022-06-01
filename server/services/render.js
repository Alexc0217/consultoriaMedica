const axios = require('axios');
const async = require('../../node_modules/async')
const User = require('../model/User')

exports.homeRoutes = (req, res) => {
    res.render('index');
}

exports.form = (req, res) => {
    res.render('user/form', {message: ''})
}

exports.login = async (req, res) => {
    res.render('user/login')
}

exports.my_account = async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id, '-password');

    if(!user){
        return res.status(404).json({message: 'Usuário não encontrado'})
    }

    res.status(200).render('user/myAccount', {data: user});
}

exports.users = (req, res) => {
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        console.log(response.data)
        res.render('users', {data: response.data})
    }).catch(err => {
        res.send(err);
    })
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("update_user", {user: userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}

