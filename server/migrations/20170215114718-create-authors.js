'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('authors', {

      authorid: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      credentials: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      twitter: {
        type: DataTypes.STRING
      },
      facebook: {
        type: DataTypes.STRING
      },
      googleplus: {
        type: DataTypes.STRING
      },
      instagram: {
        type: DataTypes.STRING
      },
      deleted: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      passcode: {
        type: DataTypes.STRING
      }

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('authors');
  }
};
