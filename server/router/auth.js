const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Authenticate = require('../middleware/authenticate');
const User = require('../model/Schema');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

//connecting database 
require('../db/connection');


router.get('/getdata', Authenticate, (req, res) => {
    res.send(req.rootUser);
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
            return res.status(400).json({ error: "plz fill all details" });
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
                res.status(400).json({ error: "invalid credentials" });
            }
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/contact', Authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "Please fill message" });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            return res.status(200).json({ message: "Message sent successfully" });
        }

    } catch (err) {
        console.log(err);
    }
})

module.exports = router;