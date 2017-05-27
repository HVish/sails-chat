/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newMsg: (req, res) => {
        req.body.fromUser = req.session.userId;
        Message.newMsg(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.json({
                    error: true
                });
            } else {
                res.json(result);
            }
        });
    },
    getMsg: (req, res) => {
        req.query.myId = req.session.userId;
        Message.getMsg(req.query, (err, result) => {
            if (err) {
                console.error(err);
                res.json({
                    error: true
                });
            } else {
                res.json(result);
            }
        });
    }
};
