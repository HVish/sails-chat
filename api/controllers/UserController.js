/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";

const crypto = require('crypto');
const validator = require('validator');
module.exports = {
    verify: AsyncAwait.async((req, res) => {

        let {err, result} = AsyncAwait.await(User.verify(req.body));

        if (err) {
            console.error(err);
            res.view('login', {
                signinError: true,
                errMsg: err,
                signin: true,
                mobile: req.body.mobile,
                password: req.body.password
            });
        } else {
            req.session.auth = true;
            req.session.userId = result[0].id;
            req.session.name = result[0].username;
            Socket.loginEvent(req.session);
            res.redirect('/');
        }

    }),
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
