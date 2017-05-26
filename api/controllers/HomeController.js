/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";

module.exports = {
    index: (req, res) => {
        if (req.session.auth) {
            User.onlineUsers(req.session.userId, (err, result) => {
                if (err) {
                    console.error(err);
                    result.error = true;
                }
                // Socket.testConnection();
                res.view('home', result);
            });
        } else {
            res.view('login', {
                signin: true
            });
        }
    },
    logout: (req, res) => {
        let destroySession = (err, user) => {
            Socket.logoutEvent(req.session.userId);
            req.session.destroy(function(err) {
                if (err) {
                    console.error(err);
                }
                res.redirect("/");
            });
        };
        User.setOffline(req.session.userId, destroySession);
    },
    joinToSocket: Socket.join
};
