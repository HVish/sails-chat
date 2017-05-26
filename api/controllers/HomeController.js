/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: (req, res) => {
        if (req.session.auth) {
            User.onlineUsers(req.session.userId, (err, result) => {
                if (err) {
                    console.error(err);
                    result.error = true;
                }
                res.view('home', result);
            });
        } else {
            res.view('login', {
                signin: true
            });
        }
    },
    logout: (req, res) => {
        req.session.destroy(function(err) {
            if (err) {
                console.error(err);
            }
            res.redirect("/");
        });
    }
};
