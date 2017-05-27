"use strict";
module.exports = {
    join: (req, res) => {
        let userRoom = 'user' + req.session.userId;
        let sendError = (err) => {
            console.error(err);
            res.status(400).end();
        };
        let joinAllUser = () => {
            sails.sockets.addRoomMembersToRooms(userRoom, "users", function(err) {
                if (err) {
                    sendError(err);
                } else {
                    res.json({
                        success: true
                    });
                }
            });
        };
        if (req.isSocket) {
            sails.sockets.join(req.socket, userRoom, (err) => {
                if (err) {
                    sendError(err);
                } else {
                    joinAllUser();
                }
            });
        } else {
            sendError('Not socket!');
        }
    },
    testConnection: () => {
        let interval = 2000;
        let counts = 3;
        let delay = interval * (counts + 1);
        let si = setInterval(() => {
            sails.sockets.broadcast("users", "testConnection", {
                data: "success"
            });
        }, interval);
        setTimeout(() => {
            clearInterval(si);
        }, delay);
    },
    loginEvent: (user) => {
        let joinAgain = (err) => {
            sails.sockets.addRoomMembersToRooms("user" + user.userId, "users");
        };
        let broadcast = (err) => {
            sails.sockets.broadcast("users", "login", {
                userId: user.userId,
                name: user.name
            });
            joinAgain();
        };
        let removeCurrentUser = (err, ids) => {
            sails.sockets.removeRoomMembersFromRooms("user" + user.userId, "users", broadcast);
        };
        removeCurrentUser();
    },
    logoutEvent: (userId) => {
        sails.sockets.broadcast("users", "logout", {
            userId: userId
        });
    },
    newMsgEvent: (msg) => {
        sails.sockets.broadcast("user" + msg.toUser, "newMsg", msg);
    }
};
