import User from "../model/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);

        //res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);

    try {
        await newUser.save();
        console.log(user);

        //res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}


export const form = async (req, res) => {
    res.send('caralho');
}