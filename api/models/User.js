/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";

const crypto = require('crypto');
const validator = require('validator');

module.exports = {
    schema: true,
    tableName: 'user',
    autoUpdatedAt: false,
    autoCreatedAt: true,
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        mobile: {
            type: 'integer',
            unique: true,
            required: true
        },
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        status: {
            type: 'string',
            enum: ['online', 'offline'],
            required: false,
            defaultsTo: 'offline'
        },
        createdAt: {
            type: 'datetime'
        }
    },
    verify: (body, cb) => {
        let mobile = body.mobile;
        let password = body.password;
        let setOnline = (user) => {
            User.update({
                id: user.id
            }, {
                status: "online"
            }, cb);
        };
        if (validator.isMobilePhone(mobile, 'en-IN') && !validator.isEmpty(password)) {
            User.findOne({
                mobile: mobile,
                password: crypto.createHash('md5').update(password).digest("hex")
            }).then((user) => {
                if (!user) {
                    throw new Error("Wrong credentials");
                } else {
                    setOnline(user);
                }
            }).catch((err) => {
                cb(err);
            });
        } else {
            cb("Invalid input");
        }
    },
    register: (body, cb) => {
        let name = body.username;
        let mobile = body.mobile;
        let password = body.password;
        let start = () => {
            User.create({
                username: name,
                mobile: mobile,
                password: crypto.createHash('md5').update(password).digest("hex")
            }).then((user) => {
                cb(null, user);
            }).catch((err) => {
                console.error(err);
                cb("Unable to create user!");
            });
        };
        let checkIfExist = () => {
            User.findOne({
                mobile: mobile
            }).then((user) => {
                if (user) {
                    throw new Error("Mobile already registered!");
                } else {
                    start();
                }
            }).catch((err) => {
                cb(err);
            });
        };
        if (!validator.isAlpha(name, 'en-IN')) {
            cb("Invalid name");
        } else if (!validator.isMobilePhone(mobile, 'en-IN')) {
            cb("Invalid Mobile");
        } else if (validator.isEmpty(password)) {
            cb("Invalid password");
        } else {
            checkIfExist();
        }
    },
    onlineUsers: (userId, cb) => {
        User.find({
            id: {
                '!': userId
            },
            status: 'online'
        }).then((users) => {
            cb(null, {
                users: users
            });
        }).catch((err) => {
            cb(err, {});
        });
    }
};
