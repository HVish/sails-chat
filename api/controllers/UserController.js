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
        User.verify(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.view('login', {
                    signinError: true,
                    signin: true,
                    mobile: mobile,
                    password: password
                });
            } else {
                req.session.auth = true;
                req.session.userId = result.id;
                req.session.name = result.username;
                res.redirect('/');
            }
        });
    },
    signUp: (req, res) => {
        User.register(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.view('login', {
                    signupError: true,
                    message: err,
                    signup: true,
                    name: req.body.username,
                    mobile: req.body.mobile,
                    password: req.body.password
                });
            } else {
                res.view('login', {
                    signupSuccess: true,
                    signin: true
                });
            }
        });
    }
};
