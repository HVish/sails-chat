/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const crypto = require('crypto');
const validator = require('validator');
module.exports = {
    verify: (req, res) => {
        var mobile = req.body.mobile;
        var password = req.body.password;
        User.verify(mobile, password, (err, result) => {
            if (err) {
                console.error(err);
                res.view('login', {
                    signinError: true,
                    signin: true,
                    mobile: mobile,
                    password: password
                });
            } else {
                res.redirect('/');
            }
        });
    },
    signUp: (req, res) => {

        var name = req.body.username;
        var mobile = req.body.mobile;
        var password = req.body.password;
        if (validator.isMobilePhone(mobile, 'en-IN') && validator.isAlpha(name, 'en-IN') && !validator.isEmpty(password)) {
            User.create({
                username: req.body.username,
                mobile: req.body.mobile,
                password: crypto.createHash('md5').update(req.body.password).digest("hex")
            }).exec((err, user) => {
                if (err) {
                    console.error(err);
                    res.view('login', {
                        signupError: true,
                        message: "Invalid Entries",
                        signup: true,
                        name: req.body.username,
                        mobile: req.body.mobile,
                        password: req.body.password
                    });
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.view('login', {
                signupError: true,
                message: "Invalid Entries",
                signup: true,
                name: req.body.username,
                mobile: req.body.mobile,
                password: req.body.password
            });
        }
    }
};
