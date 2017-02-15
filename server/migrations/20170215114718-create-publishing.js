'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('publishing', {

      configid: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      siteid: {
        type: DataTypes.UUID
      },
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      schedulecron: {
        type: DataTypes.STRING
      },
      targets: {
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
      }

    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('publishing');
  }
};
