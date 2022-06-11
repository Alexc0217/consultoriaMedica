const { default: axios } = require("axios");
const User = require("../model/User.js");
const Schedule = require('../model/Schedule.js')
const async = require('../../node_modules/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        User.find()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(500).send({message: err.message || "não foi possível achar os usuários. "})
            })
    }
}

exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //criando senha segura
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt)

    //criando o usuário
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        schedule: null
    });
    
    const userExist = await User.findOne({email: req.body.email});
    if(userExist){
        return res.render('user/form', {message: 'Email já cadastrado no banco de dados, utilize outro. ', user: {}})
    }

    try {
        await newUser.save()
        console.log(newUser);
        res.redirect('/user/login');
    } catch (error) {
        res.status(404).json({message: 'Erro não identificado. '})
    }
}

exports.update = async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "data empty"})
    }

    const id = req.params.id;
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        password: passwordHash
    }
    User.findByIdAndUpdate(id, updatedUser, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error update user information. "})
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then((response) => {
            console.log(response)
            if(response.schedule != null){
                User.findById(id).populate('schedule')
                    .then((userSuccess) => {
                        Schedule.findByIdAndDelete(userSuccess.schedule._id)
                        .then((scheduleSuccess) => {
                            res.status(200);
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((error) => {
                        console.log(error);
                    })
            }
            User.findByIdAndDelete(response._id)
                .then((success) => {
                    res.status(200).redirect('/');
                }).catch((error) => {
                    res.status(404).send(error);
                })            
        }).catch((error) => {
            res.status(404).send(error);
            console.log("error");
        })
}

exports.login = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password);

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.render('user/form', {message: "Essa conta não existe, crie uma. ", user: {}});
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.render('user/login', {message: 'Senha inválida, tente novamente.', user: {}});
    }

    try{
        const secret = process.env.SECRET;

        const token = jwt.sign({
            id: user._id,
        },
        secret,)
        res.status(200).redirect('/user/my-account/' + user._id);
    }catch(err){
        res.send(err);
    }
}