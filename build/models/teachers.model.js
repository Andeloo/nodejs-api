"use strict";

module.exports = function (sequelize, Sequelize) {
  var Teachers = sequelize.define("teachers", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name: Sequelize.STRING,
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });
  Teachers.removeAttribute('id');
  Teachers.removeAttribute('createdAt');
  Teachers.removeAttribute('updatedAt');
  return Teachers;
};