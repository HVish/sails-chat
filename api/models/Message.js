/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
"use strict";

module.exports = {
    schema: true,
    tableName: 'message',
    autoUpdatedAt: false,
    autoCreatedAt: true,
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        fromUser: {
            model: "user"
        },
        toUser: {
            model: "user"
        },
        message: {
            type: 'string',
            required: true
        },
        status: {
            type: 'string',
            enum: ['read', 'unread'],
            required: false,
            defaultsTo: 'unread'
        },
        createdAt: {
            type: 'datetime'
        }
    },
    newMsg: (body, cb) => {
        let msg = Object.assign({}, body);
        let buffer = new Buffer(msg.message, "utf8");
        msg.message = Cipher.encrypt(buffer).toString("base64");
        Message.create(msg, cb);
    },
    getMsg: (body, cb) => {
        Message
            .find({
                or: [{
                        toUser: body.userId
                    },
                    {
                        fromUser: body.userId
                    }
                ]
            })
            .skip(body.skip || 0)
            .limit(20)
            .sort("createdAt DESC")
            .then((messages) => {
                for (let i = 0; i < messages.length; i++) {
                    let buffer = new Buffer(messages[i].message, "base64");
                    messages[i].message = Cipher.decrypt(buffer).toString("utf8");
                    messages[i].isLeft = !(body.myId == messages[i].fromUser);
                }
                cb(null, messages);
            })
            .catch((err) => {
                cb(err);
            });
    }
};
