const Support = require('../model/Support.js');
const async = require('../../node_modules/async');

exports.send = async (req, res) => {
    if(!req.body){
        res.send({message: "Preencha todos os campos para enviar sua pergunta. "});
    }

    const newSupport = new Support({
        name: req.body.name,
        email: req.body.email,
        question: req.body.question
    })

    await newSupport.save().then((response) => {
        console.log(response)
        res.render('support/support', {user: {}, message: ''})
    }).catch((error) => {
        console.log(error)
        res.send(error);
    })

}

