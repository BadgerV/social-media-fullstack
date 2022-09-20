const express = require('express');
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const router = express.Router();

//REGISTER 

router.post("/register", async(req, res) => {
    
    try {
        //GENERATE NEW PASSWORD 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //CREATE NEW USER
        const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPassword,
    })

        //SAVE USER AND RETURN RESPONSE

        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        !user && res.status(404).send("User not found")
        

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router