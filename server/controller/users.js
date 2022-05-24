const User = require("../model/User.js");

exports.get = (req, res) => {
    try {
        
        const users = User.find();
        console.log(users);

        //res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(newUser)
    .then(data => {
        console.log(newUser)
        res.redirect('/user/form');
    })
    .catch(err => {
    })
}
