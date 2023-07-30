const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//connecting database 
require('../db/connection');
const User = require('../model/Schema');

router.get('/', (req, res) => {
    res.send("hello from router page");
})

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill all details" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user registered succesfully" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "plz fill all details" });
        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password);
            token = await userExist.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (isMatch) {
                res.status(201).json({ message: "Login sucsessfull" });
            } else {
                res.status(400).json({ message: "invalid credentials" });
            }
        } else {
            res.status(400).json({ message: "user not found" });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;