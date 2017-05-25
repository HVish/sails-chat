/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
                req.session.auth = true;
                req.session.userId = result.id;
                req.session.name = result.username;
                res.redirect('/');
            }
        });
    }
};
