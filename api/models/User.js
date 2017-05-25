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
    verify: (mobile, password, cb) => {
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
    }
};
