/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
  }
};
