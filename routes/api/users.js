// test route
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

router.post('/register', (req,res) => {
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({email: "A user has already registered with this address"})
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                )
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // look up user by email and verify they have right password using bcrypt
    User.findOne({ email: email })
        .then(user => {
            // if we can't find user
            if (!user) {
                // sending error status
                return res.status(404).json({email: "This user does not exist."});
            }

            // comparing bcrypt password to input password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            handle: user.handle,
                            email: user.email
                        }  
                    } else {
                        return res.status(400).json({ password: "Incorrect password"})
                    }
                })
        })
})

module.exports = router;